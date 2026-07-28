import os
import json
import discord
from discord.ext import commands
import requests
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
# Using the local Kobold API which is OpenAI compatible
API_URL = "http://127.0.0.1:5001/v1/chat/completions" 

# Setup Bot
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

personas = {}

def load_personas():
    persona_dir = os.path.join(os.path.dirname(__file__), "..", "Deployment_Sets", "Backup_Set")
    if not os.path.exists(persona_dir):
        print(f"Persona directory {persona_dir} not found.")
        return

    for filename in os.listdir(persona_dir):
        if filename.endswith(".json"):
            filepath = os.path.join(persona_dir, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    name = data.get("name", "").lower()
                    if name:
                        personas[name] = data
                        print(f"Loaded persona: {name}")
            except Exception as e:
                print(f"Failed to load {filename}: {e}")

async def get_or_create_webhook(channel):
    webhooks = await channel.webhooks()
    for webhook in webhooks:
        if webhook.name == "BlackwaterBot":
            return webhook
    return await channel.create_webhook(name="BlackwaterBot")

def generate_response(character_name, user_message, chat_history):
    persona = personas.get(character_name.lower())
    if not persona:
        return "Error: Character not found."

    # Construct the system prompt from the SillyTavern JSON
    system_prompt = persona.get("description", "") + "\n\n"
    system_prompt += f"Personality: {persona.get('personality', '')}\n"
    if persona.get("mes_example"):
        system_prompt += f"Example Dialogue:\n{persona.get('mes_example')}\n"
    
    messages = [{"role": "system", "content": system_prompt}]
    
    # Add brief history (could be expanded)
    for msg in chat_history[-5:]:
        messages.append({"role": "user" if msg['is_user'] else "assistant", "content": msg['content']})
        
    messages.append({"role": "user", "content": user_message})

    payload = {
        "messages": messages,
        "max_tokens": 300,
        "temperature": 0.7,
        "mode": "chat"
    }

    try:
        response = requests.post(API_URL, json=payload, timeout=60)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"LLM API Error: {e}")
        return f"*The character remains silent. (Error connecting to local AI server at {API_URL})*"

@bot.event
async def on_ready():
    load_personas()
    print(f'Logged in as {bot.user.name}')
    print(f'Available triggers: {", ".join(["!" + p for p in personas.keys()])}')

@bot.event
async def on_message(message):
    if message.author.bot:
        return

    content = message.content.strip()
    if content.startswith("!"):
        parts = content.split(" ", 1)
        command = parts[0][1:].lower() # remove '!' and lowercase
        
        if command in personas:
            user_text = parts[1] if len(parts) > 1 else "*Looks at you expectedly*"
            
            async with message.channel.typing():
                # In a real app, you'd maintain a database of chat history. 
                # For this MVP, we just pass the current message.
                reply = generate_response(command, f"{message.author.display_name}: {user_text}", [])
                
                # Send via webhook
                webhook = await get_or_create_webhook(message.channel)
                
                # We capitalize the name for display
                display_name = personas[command].get("name", command.capitalize())
                await webhook.send(content=reply, username=display_name)
    
    await bot.process_commands(message)

if __name__ == "__main__":
    if not TOKEN:
        print("ERROR: DISCORD_TOKEN not found in .env file.")
    else:
        bot.run(TOKEN)

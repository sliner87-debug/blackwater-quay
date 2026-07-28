import json

file_path = r'h:\Antigravity\Novel\master_novel_complete.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to extract the array starting at `const novelChapters = [`
start_idx = content.find('const novelChapters = [')
if start_idx == -1:
    print("Could not find start")
    exit(1)

start_idx += len('const novelChapters = ')

# Read char by char to find the matching closing bracket
bracket_count = 0
in_string = False
escape = False
end_idx = -1

for i in range(start_idx, len(content)):
    char = content[i]
    if escape:
        escape = False
        continue
    if char == '\\':
        escape = True
        continue
    if char == '"':
        in_string = not in_string
    
    if not in_string:
        if char == '[':
            bracket_count += 1
        elif char == ']':
            bracket_count -= 1
        
        if bracket_count == 0:
            end_idx = i + 1
            break

array_str = content[start_idx:end_idx]

# Apply brute-force cleanup for the subagent injected syntax errors
array_str = array_str.replace(']  },\n[', '] },')
array_str = array_str.replace(']  }\n]', '] } ]')
array_str = array_str.replace(']  }', '] }')
array_str = array_str.replace('}\n[', '},')

try:
    # Use python's json.loads. We have to make sure keys are properly quoted, but they already are.
    # We'll just write it to a file and run a node script to eval it since JS objects might have unquoted keys or single quotes.
    with open(r'C:\Users\sline\.gemini\antigravity\brain\bd0be9a8-fcf9-4037-a05c-11b98aa54433\scratch\extracted.js', 'w', encoding='utf-8') as out:
        out.write(array_str)
    print("Wrote extracted.js")
except Exception as e:
    print("Error:", e)


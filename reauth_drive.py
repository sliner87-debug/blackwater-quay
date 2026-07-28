import os
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ['https://www.googleapis.com/auth/drive.file']

def reauthenticate():
    cred_path = 'credentials.json'
    token_path = 'token.json'
    
    if os.path.exists(token_path):
        print(f"Removing old {token_path}...")
        os.remove(token_path)
        
    if not os.path.exists(cred_path):
        print(f"Error: {cred_path} not found. You must download your OAuth client secrets from Google Cloud Console.")
        return

    print("Launching browser for Google Drive authentication...")
    flow = InstalledAppFlow.from_client_secrets_file(cred_path, SCOPES)
    creds = flow.run_local_server(port=0)
    
    with open(token_path, 'w') as token:
        token.write(creds.to_json())
        
    print(f"\nAuthentication successful! New {token_path} saved.")

if __name__ == '__main__':
    reauthenticate()

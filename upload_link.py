import os
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

SCOPES = ['https://www.googleapis.com/auth/drive.file']

def get_credentials():
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
    return creds

def upload_file():
    creds = get_credentials()
    if not creds:
        print("Failed to authenticate with Google Drive.")
        return

    service = build('drive', 'v3', credentials=creds)
    file_metadata = {'name': 'Blackwater_Quay_Live_Links.txt'}
    media = MediaFileUpload('Blackwater_Quay_Live_Links.txt', mimetype='text/plain')
    
    file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
    print(f"File uploaded successfully! File ID: {file.get('id')}")

if __name__ == '__main__':
    upload_file()

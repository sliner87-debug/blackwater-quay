import os
import sys
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

SCOPES = ['https://www.googleapis.com/auth/drive.file']

ROOT_FOLDER_NAME = "Sablehook Master Novel V2 (GrimDark Edition)"

MASTER_FILES = [
    'Sablehook_Master_Novel_v2.pdf',
    'Sablehook_Master_Novel_v2.docx',
    'Sablehook_Master_Novel_v2.html',
    'Sablehook_Master_Novel_v2.txt',
    'Sablehook_Master_Novel_v2.md'
]

CHAPTER_FILES = [f"Chapter{str(i).zfill(2)}-v2.md" for i in range(1, 23)]

ANALYSIS_FILES = [
    'walkthrough.md',
    'implementation_plan.md',
    'comparative_analysis.md',
    'craft_and_continuation_plan.md',
    'kael_chronal_senses.md'
]

def get_credentials():
    creds = None
    token_path = 'token.json'
    cred_path = 'credentials.json'

    if os.path.exists(token_path):
        try:
            creds = Credentials.from_authorized_user_file(token_path, SCOPES)
        except Exception as e:
            print(f"Token load error: {e}")

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
            except Exception:
                creds = None
        
        if not creds:
            if not os.path.exists(cred_path):
                print("\n=======================================================")
                print("GOOGLE DRIVE AUTHENTICATION REQUIRED")
                print("=======================================================")
                print("To upload your organized files to Google Drive:")
                print("1. Obtain your OAuth 2.0 Client Credentials JSON from Google Cloud Console.")
                print(f"2. Save it as 'credentials.json' in this folder: {os.getcwd()}")
                print("3. Run the script below in your terminal:")
                print("   python upload_to_gdrive.py")
                print("=======================================================\n")
                return None
            
            flow = InstalledAppFlow.from_client_secrets_file(cred_path, SCOPES)
            creds = flow.run_local_server(port=0)
            
            with open(token_path, 'w') as token:
                token.write(creds.to_json())

    return creds

def create_folder(service, folder_name, parent_id=None):
    file_metadata = {
        'name': folder_name,
        'mimeType': 'application/vnd.google-apps.folder'
    }
    if parent_id:
        file_metadata['parents'] = [parent_id]
        
    folder = service.files().create(body=file_metadata, fields='id, webViewLink').execute()
    print(f"Folder Created: {folder_name} (ID: {folder.get('id')})")
    return folder.get('id'), folder.get('webViewLink')

def upload_file(service, file_path, folder_id):
    # Check current directory and artifact directory
    artifact_dir = r"C:\Users\sline\.gemini\antigravity\brain\c3145eb2-69b1-46eb-b85e-5cc3e043badb"
    
    target_path = file_path
    if not os.path.exists(target_path):
        alt_path = os.path.join(artifact_dir, file_path)
        if os.path.exists(alt_path):
            target_path = alt_path
        else:
            print(f"Warning: {file_path} not found, skipping.")
            return None
    
    file_name = os.path.basename(target_path)
    file_metadata = {
        'name': file_name,
        'parents': [folder_id]
    }
    
    mime_type = 'text/plain'
    if target_path.endswith('.pdf'):
        mime_type = 'application/pdf'
    elif target_path.endswith('.docx'):
        mime_type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    elif target_path.endswith('.html'):
        mime_type = 'text/html'
    elif target_path.endswith('.txt') or target_path.endswith('.md'):
        mime_type = 'text/plain'
        
    media = MediaFileUpload(target_path, mimetype=mime_type, resumable=True)
    uploaded = service.files().create(body=file_metadata, media_body=media, fields='id, name, webViewLink').execute()
    print(f"  Uploaded: {file_name}")
    return uploaded

def main():
    creds = get_credentials()
    if not creds:
        return
    
    service = build('drive', 'v3', credentials=creds)
    root_id, root_link = create_folder(service, ROOT_FOLDER_NAME)
    
    print("\n--- Creating Organized Subfolders ---")
    sub1_id, _ = create_folder(service, "01_Master_Compiled_Formats", root_id)
    sub2_id, _ = create_folder(service, "02_Individual_V2_Chapters", root_id)
    sub3_id, _ = create_folder(service, "03_Analysis_and_Lore", root_id)
    
    print("\n--- Uploading Master Formats (PDF, DOCX, HTML, TXT, MD) ---")
    for f in MASTER_FILES:
        upload_file(service, f, sub1_id)
        
    print("\n--- Uploading 22 Individual V2 Chapters ---")
    for f in CHAPTER_FILES:
        upload_file(service, f, sub2_id)
        
    print("\n--- Uploading Analysis & Lore Documentation ---")
    for f in ANALYSIS_FILES:
        upload_file(service, f, sub3_id)
        
    print(f"\n=======================================================")
    print(f"All files uploaded in an organized structure to Google Drive!")
    print(f"Google Drive Main Folder Link: {root_link}")
    print(f"=======================================================")

if __name__ == '__main__':
    main()

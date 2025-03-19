
from fastapi import HTTPException # type: ignore [fastapi is installed]
import json
import os
import requests

current_file_dir = os.path.dirname(__file__)
other_path = os.path.join(current_file_dir, "..", "..", "data", "other.json")

def get_confirmation_credentials_from_json ():
    try:
        with open(other_path, "r") as other_file:
            other_data = json.load(other_file)
    except FileNotFoundError:
        with open(other_path, "w") as other_file:
            json.dump({}, other_file, indent=4)
        other_data = {}
    
    if "refresh_token" not in other_data:
        return { "credentials_found": False }
    
    return { "credentials_found": True }

def exchange_code_for_token_from_google (code: str):
    google_token_url = "https://oauth2.googleapis.com/token"

    payload = {
        "code": code,
        "client_id": os.environ["GOOGLE_CLIENT_ID"],
        "client_secret": os.environ["GOOGLE_CLIENT_SECRET"],
        "redirect_uri": "http://localhost:3000",
        "grant_type": "authorization_code",
        "access_type": "offline"
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    response = requests.post(google_token_url, data=payload, headers=headers)

    if response.status_code == 200:
        try: 
            with open(other_path, "r") as other_file:
                other_data = json.load(other_file)
        except FileNotFoundError:
            with open(other_path, "w") as other_file:
                json.dump({}, other_file, indent=4)
            other_data = {}
        
        response_json = response.json()

        if "refresh_token" not in response_json:
            raise HTTPException(status_code=404, detail="REFRESH_TOKEN_NOT_FOUND")
        
        other_data["refresh_token"] = response_json["refresh_token"]

        with open(other_path, "w") as other_file:
            json.dump(other_data, other_file, indent=4)

        return { "status": "success", "message": "Token exchanged successfully" }
    
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    
def exchange_refresh_token_for_access_token_from_google ():
    google_token_url = "https://oauth2.googleapis.com/token"

    try:
        with open(other_path, "r") as other_file:
            other_data = json.load(other_file)
    except FileNotFoundError:
        with open(other_path, "w") as other_file:
            json.dump({}, other_file, indent=4)
        other_data = {}

    if "refresh_token" not in other_data:
        raise HTTPException(status_code=404, detail="REFRESH_TOKEN_NOT_FOUND")
    
    refresh_token = other_data["refresh_token"]

    payload = {
        "refresh_token": refresh_token,
        "client_id": os.environ["GOOGLE_CLIENT_ID"],
        "client_secret": os.environ["GOOGLE_CLIENT_SECRET"],
        "grant_type": "refresh_token"
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    response = requests.post(google_token_url, data=payload, headers=headers)

    if response.status_code == 200:
        access_token = response.json()["access_token"]

        return { "status": "success", "access_token": access_token }
    
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)
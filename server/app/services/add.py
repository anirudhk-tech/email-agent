from fastapi import HTTPException # type: ignore [fastapi is installed]
import json
import os

current_file_dir = os.path.dirname(__file__)
templates_path = os.path.join(current_file_dir, "..", "..", "templates.json")
templates_path = os.path.abspath(templates_path)
emails_path = os.path.join(current_file_dir, "..", "..", "emails.json")
emails_path = os.path.abspath(emails_path)

def add_email_to_json (email: str, name: str):
    try:
        with open(emails_path, "r") as emails_file:
            email_data = json.load(emails_file)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="EMAIL_FILE_NOT_FOUND")
    
    emails = email_data["emails"]
    next_key = len(emails.keys()) + 1
    emails[str(next_key)] = ({"email": email, "name": name})
    
    with open(emails_path, "w") as emails_file:
        json.dump(email_data, emails_file, indent=4)
    
    return {
        "status": "success",
        "message": "Email added successfully"
    }

def add_template_to_json (subject: str, body: str):
    try:
        with open(templates_path, "r") as template_file:
            template_data = json.load(template_file)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="TEMPLATE_FILE_NOT_FOUND")
    
    templates = template_data["templates"]
    next_key = len(templates.keys()) + 1
    templates[str(next_key)] = ({"subject": subject, "body": body})

    with open(templates_path, "w") as template_file:
        json.dump(template_data, template_file, indent=4)
    
    return {
        "status": "success",
        "message": "Template added successfully"
    }

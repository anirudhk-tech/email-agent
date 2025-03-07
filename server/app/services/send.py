import json
import os
from fastapi import HTTPException # type: ignore [fastapi is installed]

current_file_dir = os.path.dirname(__file__)
templates_path = os.path.join(current_file_dir, "..", "..", "templates.json")
templates_path = os.path.abspath(templates_path)
emails_path = os.path.join(current_file_dir, "..", "..", "emails.json")
emails_path = os.path.abspath(emails_path)

def send_mails_with_template_id(template_id: int):
    mails = []

    try:
        with open(templates_path, "r") as template_file:
            template_data = json.load(template_file)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="TEMPLATE_FILE_NOT_FOUND")
    
    try:
        template = template_data["templates"][str(template_id)]
        
        subject = template["subject"]
        body = template["body"]
        
        try:
            with open(emails_path, "r") as emails_file:
                email_data = json.load(emails_file)
        except FileNotFoundError:
            raise HTTPException(status_code=404, detail="EMAIL_FILE_NOT_FOUND")
        
        emails = email_data["emails"]

        for key in emails.keys():
            email_data = emails[key]
            email_address = email_data["email"]
            email_name = email_data["name"]
            personalized_body = body 
            personalized_body = personalized_body.replace("{name}", email_name)

            mails.append({
                "to": email_address,
                "subject": subject,
                "body": personalized_body
            })

        return { # TODO: Implement sending of mails
            "mails": mails,
            "status": "success"
        }
    
    except KeyError:
        raise HTTPException(status_code=404, detail="TEMPLATE_NOT_FOUND")
    
    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e).capitalize())
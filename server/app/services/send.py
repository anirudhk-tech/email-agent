import json
import os

def send_mails_with_template_id(template_id: int):
    current_file_dir = os.path.dirname(__file__)
    templates_path = os.path.join(current_file_dir, "..", "..", "templates.json")
    templates_path = os.path.abspath(templates_path)
    emails_path = os.path.join(current_file_dir, "..", "..", "emails.json")
    emails_path = os.path.abspath(emails_path)

    try:
        with open(templates_path, "r") as template_file:
            template_data = json.load(template_file)
    except FileNotFoundError:
        return {
            "error": "Template file not found",
            "status": 404,
        }
    
    try:
        template = template_data["templates"][str(template_id)]
        
        subject = template["subject"]
        body = template["body"]
        
        try:
            with open(emails_path, "r") as emails_file:
                email_data = json.load(emails_file)
        except FileNotFoundError:
            return {
                "error": "Emails file not found",
                "status": 404,
            }
        
        emails = email_data["emails"]

        for email in emails:
            email_address = email["email"]
            email_name = email["name"]
            body = body.replace("{name}", email_name)

        return {
            "subject": subject,
            "body": body
        }
    
    except KeyError:
        return {
            "error": "Template not found",
            "status": 404,
        }
    
    except Exception as e:
        return {
            "error": str(e),
            "status": 500,
        }
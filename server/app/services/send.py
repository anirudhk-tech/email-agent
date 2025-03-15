import json
import os
from fastapi import HTTPException # type: ignore [fastapi is installed]
from datetime import datetime
from app.services.auth import exchange_refresh_token_for_access_token_from_google
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import base64
import requests

current_file_dir = os.path.dirname(__file__)
templates_path = os.path.join(current_file_dir, "..", "..", "templates.json")
templates_path = os.path.abspath(templates_path)
emails_path = os.path.join(current_file_dir, "..", "..", "emails.json")
emails_path = os.path.abspath(emails_path)
other_path = os.path.join(current_file_dir, "..", "..", "other.json")
other_path = os.path.abspath(other_path)

def send_mails_helper (mails):
    try:
        response = exchange_refresh_token_for_access_token_from_google()

        if response["status"] == "success":
            access_token = response["access_token"]

        else:
            raise HTTPException(status_code=404, detail="ACCESS_TOKEN_NOT_FOUND")

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }

        profile_response = requests.get("https://openidconnect.googleapis.com/v1/userinfo", headers=headers)

        if profile_response.status_code == 200:
            user_email = profile_response.json()["email"]

        else:
            raise HTTPException(status_code=profile_response.status_code, detail=profile_response.text)
        
        mail = MIMEMultipart()
        mail["From"] = user_email
        mail["To"] = ",".join([mail["to"] for mail in mails])
        mail["Subject"] = mails[0]["subject"]
        mail.attach(MIMEText(mails[0]["body"], "plain"))

        raw_message = base64.urlsafe_b64encode(mail.as_bytes()).decode()

        payload = {
            "raw": raw_message
        }

        mail_response = requests.post("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", json=payload, headers=headers)

        if mail_response.status_code == 200:
            return { "status": "success", "message": "Mails sent successfully" }
        
        else:
            raise HTTPException(status_code=mail_response.status_code, detail=mail_response.text)
        
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


def send_mails_with_template_id(template_key: str, email_list_key: str):
    mails = []

    try:
        with open(templates_path, "r") as template_file:
            template_data = json.load(template_file)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="TEMPLATE_FILE_NOT_FOUND")
    
    try:
        template = template_data["templates"][str(template_key)]
        
        subject = template["subject"]
        body = template["body"]
        
        try:
            with open(emails_path, "r") as emails_file:
                email_data = json.load(emails_file)
        except FileNotFoundError:
            raise HTTPException(status_code=404, detail="EMAIL_FILE_NOT_FOUND")
        
        emails = email_data[email_list_key]["emails"]

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

        send_mails_helper(mails)

        try:
            with open(other_path, "r") as other_file:
                other_data = json.load(other_file)
        except FileNotFoundError:
            raise HTTPException(status_code=404, detail="OTHER_FILE_NOT_FOUND")
        
        formatted_date = datetime.now().strftime("%Y-%m-%d")
        new_count_data = other_data["email_counts"]

        if formatted_date not in new_count_data:
            new_count_data[formatted_date] = 0

        new_count_data[formatted_date] += len(mails)
        daily_mails = new_count_data[formatted_date]

        with open(other_path, "w") as other_file:
            json.dump(other_data, other_file, indent=4)

        return { # TODO: Implement sending of mails
            "mails_send": len(mails),
            "mails_sent_in_day": daily_mails,
            "status": "success"
        }
    
    except KeyError:
        raise HTTPException(status_code=404, detail="TEMPLATE_NOT_FOUND")
    
    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e).capitalize())
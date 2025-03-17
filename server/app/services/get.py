from fastapi import HTTPException # type: ignore [fastapi is installed]
import json
import os

current_file_dir = os.path.dirname(__file__)
templates_path = os.path.join(current_file_dir, "..", "..", "templates.json")
emails_path = os.path.join(current_file_dir, "..", "..", "emails.json")
other_path = os.path.join(current_file_dir, "..", "..", "other.json")

def get_templates_from_json():
    try:
        with open(templates_path, "r") as template_file:
            template_data = json.load(template_file)
    except FileNotFoundError:
        with open(templates_path, "w") as template_file:
            json.dump({"templates": {}}, template_file, indent=4)
        template_data = {"templates": {}}
    
    return template_data["templates"]

def get_template_from_json (template_key: int):
    try:
        with open(templates_path, "r") as template_file:
            template_data = json.load(template_file)
    except FileNotFoundError:
        with open(templates_path, "w") as template_file:
            json.dump({"templates": {}}, template_file, indent=4)
        template_data = {"templates": {}}
    
    return template_data["templates"][str(template_key)]

def get_email_lists_from_json ():
    try:
        with open(emails_path, "r") as email_file:
            email_data = json.load(email_file)
    except FileNotFoundError:
        with open(emails_path, "w") as email_file:
            json.dump({}, email_file, indent=4)
        email_data = {}
    
    res_email_dict = {}
    for key in email_data.keys():
        res_email_dict[email_data[key]["name"]] = key
    
    return res_email_dict

def get_emails_from_list_from_json (email_list_key: str):
    try:
        with open(emails_path, "r") as email_file:
            email_data = json.load(email_file)
    except FileNotFoundError:
        with open(emails_path, "w") as email_file:
            json.dump({}, email_file, indent=4)
        email_data = {}

    if email_list_key not in email_data.keys():
        raise HTTPException(status_code=404, detail="EMAIL_LIST_KEY_NOT_FOUND")
    
    email_list = email_data[email_list_key]["emails"]
    res_email_list_name = email_data[email_list_key]["name"]
    res_emails_and_names = []

    for key in email_list.keys():
        res_emails_and_names.append(email_list[key])
        email_list[key]["key"] = key

    return {
        "name": res_email_list_name,
        "emails": res_emails_and_names,
    }

def get_day_email_count_from_json (day: str):
    try:
        with open(other_path, "r") as other_file:
            other_data = json.load(other_file)
    except FileNotFoundError:
        with open(other_path, "w") as other_file:
            json.dump({"email_counts": {}}, other_file, indent=4)
        other_data = {"email_counts": {}}
    
    if day not in other_data["email_counts"]:
        return { "count": 0 }
    
    return { "count": other_data["email_counts"][day] }

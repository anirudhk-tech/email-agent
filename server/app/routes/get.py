from fastapi import APIRouter # type: ignore [fastapi is installed]
from app.services.get import get_templates_from_json, get_template_from_json, get_email_lists_from_json, get_emails_from_list_from_json, get_day_email_count_from_json

router = APIRouter()

@router.get("/get_templates")
async def get_templates():
    response = get_templates_from_json()
    return response

@router.get("/get_template/{template_key}")
async def get_template(template_key):
    response = get_template_from_json(template_key)
    return response

@router.get("/get_email_lists")
async def get_email_lists():
    response = get_email_lists_from_json()
    return response

@router.get("/get_emails_from_list/{email_list_key}")
async def get_emails_from_list(email_list_key):
    response = get_emails_from_list_from_json(email_list_key)
    return response

@router.get("/get_day_email_count/{day}")
async def get_day_email_count(day: str):
    response = get_day_email_count_from_json(day)
    return response
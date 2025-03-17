from fastapi import APIRouter, Query, Body # type: ignore [fastapi is installed]
from app.services.edit import add_email_to_json, add_template_to_json, delete_template_from_json, edit_template_in_json, delete_email_from_json, edit_email_name_in_json, add_email_list_to_json, delete_email_list_from_json
from pydantic import BaseModel

router = APIRouter()

class TemplatePayload(BaseModel):
    subject: str
    body: str

@router.post("/add_email_list")
async def add_email_list (
    name: str = Query(..., description="Name of the new email list")
):
    response = add_email_list_to_json(name)
    return response

@router.post("/add_email")
async def add_email(
    email: str = Query(..., description="The email address to add"), 
    name: str = Query(..., description="The name to replace in body template"),
    email_list_key: str = Query(..., description="The email list key to add the record in")
):
    response = add_email_to_json(email, name, email_list_key)
    return response

@router.post("/delete_email")
async def delete_email(
    email_list_key: str = Query(..., description="The key of the email list"),
    email_key: str = Query(..., description="The key of the email in the specific list")
):
    response = delete_email_from_json(email_key, email_list_key)
    return response

@router.post("/delete_email_list/{email_list_key}")
async def delete_email_list(email_list_key):
    response = delete_email_list_from_json(email_list_key)
    return response

@router.post("/edit_email_name")
async def edit_email_name(
    email_list_key: str = Query(..., description="The key of the email list"),
    name: str = Query(..., description="The name to replace in body template")
):
    response = edit_email_name_in_json(email_list_key, name)
    return response

@router.post("/add_template")
async def add_template(template: TemplatePayload):
    response = add_template_to_json(template.subject, template.body)
    return response

@router.post("/delete_template/{template_key}")
async def delete_template(template_key):
    response = delete_template_from_json(template_key)
    return response

@router.post("/edit_template")
async def edit_template(
    template_key: int = Query(..., description="The id of the template to edit"), 
    template: TemplatePayload = Body(..., description="The new subject and body of the template")
):
    response = edit_template_in_json(template_key, template.subject, template.body)
    return response
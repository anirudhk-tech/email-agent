from fastapi import APIRouter, Query # type: ignore [fastapi is installed]
from app.services.add import add_email_to_json, add_template_to_json

router = APIRouter()

@router.post("/add_email")
async def add_email(
    email: str = Query(..., description="The email address to add"), 
    name: str = Query(..., description="The name to replace in body template")
):
    response = add_email_to_json(email, name)
    return response

@router.post("/add_template")
async def add_template(
    subject: str = Query(..., description="The subject of the template"), 
    body: str = Query(..., description="The body of the template")
):
    response = add_template_to_json(subject, body)
    return response
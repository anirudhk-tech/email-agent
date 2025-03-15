from fastapi import APIRouter, Query # type: ignore [fastapi is installed]
from app.services.send import send_mails_with_template_id

router = APIRouter()

@router.post("/send_mails")
async def send_mails(template_key: str = Query(..., description="The id of the template"), email_list_key: str = Query(..., description="The id of the email list")):
    response = send_mails_with_template_id(template_key, email_list_key)
    return response
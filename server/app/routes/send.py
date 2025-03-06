from fastapi import APIRouter # type: ignore [fastapi is installed]
from app.services.send import send_mails_with_template_id

router = APIRouter()

@router.post("/send_mails/{template_id}")
async def send_mails(template_id: int):
    response = send_mails_with_template_id(template_id)
    
    return response
from fastapi import APIRouter, Query # type: ignore [fastapi is installed]
from app.services.auth import get_confirmation_credentials_from_json, exchange_code_for_token_from_google

router = APIRouter()

@router.get("/get_confirmation_credentials")
async def get_confirmation_credentials():
    response = get_confirmation_credentials_from_json()
    return response

@router.post("/exchange_code_for_token")
async def exchange_code_for_token(code: str = Query(..., description="The code to exchange")):
    response = exchange_code_for_token_from_google(code)
    return response

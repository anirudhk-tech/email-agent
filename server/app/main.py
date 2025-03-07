from fastapi import FastAPI # type: ignore [fastapi is installed]
from app.routes.send import router as send_router
from app.routes.add import router as add_router

app = FastAPI()
app.include_router(send_router)
app.include_router(add_router)

@app.get("/")
async def root():
    return {"message": "Hello, this is an email agent!"}
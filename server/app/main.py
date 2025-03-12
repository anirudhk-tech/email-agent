from fastapi import FastAPI # type: ignore [fastapi is installed]
from fastapi.middleware.cors import CORSMiddleware # type: ignore [fastapi is installed]
from app.routes.send import router as send_router
from app.routes.edit import router as edit_router
from app.routes.get import router as get_router

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(send_router)
app.include_router(edit_router)
app.include_router(get_router)

@app.get("/")
async def root():
    return {"message": "Hello, this is an email agent!"}
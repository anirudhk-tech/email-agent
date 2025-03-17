# -------------------------------------------
# Stage 1: Build the FastAPI Python server 
# -------------------------------------------

FROM python:latest

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# -------------------------------------------
# Stage 2: Run the Using Uvicorn
# -------------------------------------------

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
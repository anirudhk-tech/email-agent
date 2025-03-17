# -------------------------------------------
# Stage 1: Build the FastAPI Python server 
# -------------------------------------------

FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# -------------------------------------------
# Stage 2: Run the Server Using Uvicorn
# -------------------------------------------

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

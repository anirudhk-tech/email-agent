from fastapi.testclient import TestClient  # type: ignore [fastapi is installed]
from app.main import app
import builtins
from tests.utils import mock_open_file
import os
import json
import pytest

client = TestClient(app)
EMAILS_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "emails.json"))
TEMPLATES_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "templates.json"))


# Cleanup after every test
@pytest.fixture(autouse=True)
def cleanup():
    if os.path.exists(EMAILS_PATH):
        with open(EMAILS_PATH, "r") as emails_file:
            original_emails = json.load(emails_file)
    else:
        original_emails = None
    
    if os.path.exists(TEMPLATES_PATH):
        with open(TEMPLATES_PATH, "r") as templates_file:
            original_templates = json.load(templates_file)
    else:
        original_templates = None
    
    yield

    if original_emails:
        with open(EMAILS_PATH, "w") as emails_file:
            json.dump(original_emails, emails_file, indent=4)
    
    if original_templates:
        with open(TEMPLATES_PATH, "w") as templates_file:
            json.dump(original_templates, templates_file, indent=4)

# The app's root endpoint is accessible at http://127.0.0.1:8000
def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, this is an email agent!"}

# The app responds to invalid template ids
def test_invalid_template_id():
    response = client.post("/send_mails/-1")
    assert response.status_code == 404
    assert response.json() == { "detail": "TEMPLATE_NOT_FOUND" }

# The app responds to no template file
def test_no_template_file(monkeypatch):
    monkeypatch.setattr(
        builtins,
        "open",
        lambda file, mode="r", *args, **kwargs: mock_open_file(file, "templates.json", mode, *args, **kwargs)
    )
    response = client.post("/send_mails/1")

    assert response.status_code == 404
    assert response.json() == { "detail": "TEMPLATE_FILE_NOT_FOUND" }

# The app responds to no email file
def test_no_email_file(monkeypatch):
    monkeypatch.setattr(
        builtins,
        "open",
        lambda file, mode="r", *args, **kwargs: mock_open_file(file, "emails.json", mode, *args, **kwargs)
    )
    response = client.post("/send_mails/1")

    assert response.status_code == 404
    assert response.json() == { "detail": "EMAIL_FILE_NOT_FOUND" }

# The app correctly adds an email
def test_add_email():
    response = client.post("/add_email?email=VgV4C@example.com&name=John Doe")
    assert response.status_code == 200
    assert response.json() == { "status": "success", "message": "Email added successfully" }

# The app correctly adds a template
def test_add_template():
    response = client.post("/add_template?subject=Hello&body=Hello {name}")
    assert response.status_code == 200
    assert response.json() == { "status": "success", "message": "Template added successfully" }
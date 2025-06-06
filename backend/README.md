# GenAI Course Platform Backend

This is the FastAPI backend for the Generative AI Course Platform.

## Features
- User authentication (JWT)
- Course catalog (CRUD)
- Lessons (video/text)
- Progress tracking
- Quizzes
- Discussion forums

## Getting Started
1. Create and activate your virtual environment:
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
2. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
3. Run the server:
   ```powershell
   uvicorn main:app --reload
   ```

---

# Folder Structure
- `main.py` - FastAPI entrypoint
- `models/` - SQLAlchemy models
- `schemas/` - Pydantic schemas
- `routers/` - API routes
- `core/` - Auth, config, utils

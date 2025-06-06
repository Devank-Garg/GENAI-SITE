from fastapi import FastAPI
from routers import user  # Import user router for user-related endpoints
from routers import *  # Import other routers for modular endpoints

app = FastAPI()
app.include_router(user.router)  # Register the user router

# Here you will include routers as you build them, e.g.:
# from routers import course
# app.include_router(course.router)

@app.get("/")
def read_root():
    return {"message": "GenAI Course Platform Backend is running!"}

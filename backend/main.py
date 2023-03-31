import fastapi as _fastapi
import fastapi.security as _security

import sqlalchemy.orm as _orm

import services as _services, schemas as _schemas

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

_services.create_database()

app = _fastapi.FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/token")
async def login( form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(), db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    employee = await _services.authenticate_employee(form_data.username, form_data.password, db)

    if not employee:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Credentials")

    return {"access_token": form_data.username, "token_type": "bearer"}
    
@app.get("/api/MyProfile", response_model=_schemas.Employee)
async def get_employee(employee: _schemas.Employee = _fastapi.Depends(_services.get_current_employee)):
    return employee

@app.get("/api/MyProfile", response_model=_schemas.EmployeeSkill)
async def get_employee_skills(
    employee: _schemas.Employee = _fastapi.Depends(_services.get_current_employee),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.get_employee_skills(employee=employee, db=db)

@app.get("/api")
async def root():
    return {"message": "Employee Viewer"}

    
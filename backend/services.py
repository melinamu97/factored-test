import database as _database
import sqlalchemy.orm as _orm
import passlib.hash as _hash ##
import models as _models
import schemas as _schemas
import fastapi as _fastapi
import fastapi.security as _security

oauth2schema = _security.OAuth2PasswordBearer(tokenUrl="/api/token")

def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)

def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_employee_by_email(email: str, db: _orm.Session):
    return db.query(_models.Employee).filter(_models.Employee.email == email).first()

async def authenticate_employee(email:str, password: str, db: _orm.Session):
    employee = await get_employee_by_email(db=db, email=email)

    if not employee: 
        return False
    
    if not employee.verify_password(password):
        return False
    
    return employee

async def get_current_employee(
        db: _orm.Session = _fastapi.Depends(get_db), 
        token: str = _fastapi.Depends(oauth2schema)
):
    try: 
        employee = await get_employee_by_email(db=db, email=token)
    except:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Credentials")
    return _schemas.Employee.from_orm(employee)

async def get_employee_skills(employee: _schemas.Employee, db: _orm.Session):
    employee_skills = db.query(_models.EmployeeSkill).filter_by(employee_id=employee.id)

    return list(map(_schemas.EmployeeSkill.from_orm, employee_skills))
import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash

import database as _database

class Employee(_database.Base):
    __tablename__ = "employees"
    
    id = _sql.Column(_sql.Integer, primary_key=True, index=True, autoincrement=True)
    email = _sql.Column(_sql.String, unique=True, index=True)
    password = _sql.Column(_sql.String)
    name = _sql.Column(_sql.String, index=True)
    position = _sql.Column(_sql.String, index=True)

    skills = _orm.relationship("EmployeeSkill", back_populates="employee")

    def verify_password(self, password: str):
        return password == self.password

class EmployeeSkill(_database.Base):
    __tablename__="employee_skills"
    
    id = _sql.Column(_sql.Integer, primary_key=True, index=True, autoincrement=True)
    employee_id = _sql.Column(_sql.Integer, _sql.ForeignKey("employees.id"), index=True)
    skill_id = _sql.Column(_sql.Integer, _sql.ForeignKey("skills.id"), index=True)
    level = _sql.Column(_sql.Integer, index=True, default=0)
    
    employee = _orm.relationship("Employee", back_populates="skills")
    skill = _orm.relationship("Skill", back_populates="employees")

class Skill(_database.Base):
    __tablename__ = "skills"
    
    id = _sql.Column(_sql.Integer, primary_key=True, index=True, autoincrement=True)
    name = _sql.Column(_sql.String, index=True)
    
    employees = _orm.relationship("EmployeeSkill", back_populates="skill")


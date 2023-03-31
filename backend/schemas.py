import pydantic as _pydantic

class _EmployeeSkillBase(_pydantic.BaseModel):
    level: int

class EmployeeSkillCreate(_EmployeeSkillBase):
    pass

class EmployeeSkill(_EmployeeSkillBase):
    id: int
    employee_id: int
    skill_id: int

    class Config:
        orm_mode = True
        
class _EmployeeBase(_pydantic.BaseModel):
    name: str
    position: str
    email: str

class EmployeeCreate(_EmployeeBase):
    password : str

    class Config:
        orm_mode = True

class Employee(_EmployeeBase):
    id: int
    skills: list[EmployeeSkill] = []

    class Config:
        orm_mode = True

class _SkillBase(_pydantic.BaseModel):
    name: str

class SkillCreate(_SkillBase):
    pass

class Skill(_SkillBase):
    id: int

    class Config:
        orm_mode = True
    


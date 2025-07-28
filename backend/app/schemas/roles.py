from pydantic import BaseModel

class RolCreate(BaseModel):
    nombre_rol: str

class RolResponse(BaseModel):
    id: int
    nombre_rol: str

    class Config:
        orm_mode = True
from pydantic import BaseModel
from typing import Optional

class EmpleadoCreate(BaseModel):
    nombre_completo: str
    rol_id: str
    activo: bool = True

class EmpleadoResponse(BaseModel):
    id: int
    nombre_completo: str
    rol_id: Optional[int]
    activo: bool

    class Config:
        orm_mode = True
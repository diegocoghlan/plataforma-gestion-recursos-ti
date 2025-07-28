from pydantic import BaseModel
from typing import Optional
from datetime import date

class EquipoBase(BaseModel):
    tipo_equipo: Optional[str]
    modelo: Optional[str]
    numero_serie: str
    estado: str
    costo: float
    especificaciones: Optional[dict]

class EquipoCreate(EquipoBase):
    pass

class EquipoResponse(EquipoBase):
    id: int
    fecha_ingreso: date

    class Config:
        orm_mode = True
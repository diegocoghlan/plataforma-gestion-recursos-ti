from typing import List
from pydantic import BaseModel
from datetime import datetime

class DetalleSolicitudCreate(BaseModel):
    rol_id: int
    cantidad_puestos: int

class SolicitudCreate(BaseModel):
    nombre_solicitud: str
    detalles: List[DetalleSolicitudCreate]

class DetalleSolicitudResponse(BaseModel):
    id: int
    rol_id: int
    cantidad_puestos: int

    class Config:
        orm_mode = True

class SolicitudResponse(BaseModel):
    id: int
    nombre_solicitud: str
    fecha: datetime
    estado: str
    detalles: List[DetalleSolicitudResponse] = []

    class Config:
        orm_mode = True

class PropuestaItem(BaseModel):
    rol_id: int
    rol_nombre: str
    cantidad: int
    equipos: list[str]

class PropuestaOptimaResponse(BaseModel):
    propuesta: List[PropuestaItem]
    costo_total: float
    mensaje: str
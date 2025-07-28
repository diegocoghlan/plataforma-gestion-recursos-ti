from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class SolicitudEquipamento(Base):
    __tablename__ = "solicitudes_equipamento"

    id = Column(Integer, primary_key=True, index=True)
    nombre_solicitud = Column(String(200), nullable=False)
    fecha = Column(DateTime, server_default=func.now(), nullable=False)
    estado = Column(String(50), default='pendiente', nullable=False)

    
class DetalleSolicitud(Base):
    __tablename__ = "detalles_solicitud"

    id = Column(Integer, primary_key=True, index=True)
    solicitud_id = Column(Integer, ForeignKey("solicitudes_equipamento.id"), nullable=False)
    rol_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    cantidad_puestos = Column(Integer, nullable=False)
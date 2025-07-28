from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from app.database import Base

class Empleado(Base):
    __tablename__ = "empleados"

    id = Column(Integer, primary_key=True, index=True)
    nombre_completo = Column(String(200), nullable=False)
    rol_id = Column(Integer, ForeignKey("roles.id", ondelete="SET NULL"))
    activo = Column(Boolean, default=True)
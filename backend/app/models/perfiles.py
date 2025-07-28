from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class PerfilRequerimiento(Base):
    __tablename__ = "perfiles_requerimientos"

    id = Column(Integer, primary_key=True, index=True)
    rol_id = Column(Integer, ForeignKey("roles.id", ondelete="CASCADE"), nullable=False)
    tipo_equipo = Column(String(100), nullable=False)
    cantidad = Column(Integer, nullable=False)
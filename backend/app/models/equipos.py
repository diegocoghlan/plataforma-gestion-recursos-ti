from sqlalchemy import Column, Integer, Numeric, String, Date, JSON
from sqlalchemy.sql import func
from app.database import Base

class Equipo(Base):
    __tablename__ = "equipos"

    id = Column(Integer, primary_key=True, index=True)
    tipo_equipo = Column(String(100))
    modelo = Column(String(100))
    numero_serie = Column(String(100), unique=True, nullable=False)
    estado = Column(String(50), nullable=False)
    costo = Column(Numeric(12,2), nullable=False)
    especificaciones = Column(JSON)
    fecha_ingreso = Column(Date, server_default=func.current_date(), nullable=False)

    def __repr__(self):
        return f"<Equipo(id={self.id}, tipo_equipo={self.tipo_equipo}, modelo={self.modelo}, numero_serie={self.numero_serie}, estado={self.estado})>"
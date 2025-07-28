from sqlalchemy.orm import relationship
from app.models.roles import Rol
from app.models.empleados import Empleado
from app.models.perfiles import PerfilRequerimiento
from app.models.solicitudes import DetalleSolicitud
from app.models.solicitudes import SolicitudEquipamento

Rol.empleados = relationship("Empleado", back_populates="rol", cascade="all, delete-orphan")
Rol.requerimientos = relationship("PerfilRequerimiento", back_populates="rol", cascade="all, delete-orphan")
Rol.detalles_solicitud = relationship("DetalleSolicitud", back_populates="rol", cascade="all, delete-orphan")

DetalleSolicitud.rol = relationship("Rol", back_populates="detalles_solicitud")

Empleado.rol = relationship("Rol", back_populates="empleados")

PerfilRequerimiento.rol = relationship("Rol", back_populates="requerimientos")

SolicitudEquipamento.detalles = relationship("DetalleSolicitud", back_populates="solicitud", cascade="all, delete-orphan")
DetalleSolicitud.solicitud = relationship("SolicitudEquipamento", back_populates="detalles")
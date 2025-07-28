from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.empleados import Empleado
from app.models.roles import Rol
from app.schemas.empleados import EmpleadoCreate, EmpleadoResponse

router = APIRouter(prefix="/api/empleados", tags=["Empleados"])

@router.post("/", response_model=EmpleadoResponse)
def crear_empleado(empleado: EmpleadoCreate, db: Session = Depends(get_db)):
    if empleado.rol_id:
        rol = db.query(Rol).filter(Rol.id == empleado.rol_id).first()
        if not rol:
            raise HTTPException(status_code=400, detail="El rol no existe")

    nuevo = Empleado(
        nombre_completo=empleado.nombre_completo,
        rol_id=empleado.rol_id,
        activo=empleado.activo
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.delete("/{empleado_id}", response_model=dict)
def eliminar_empleado(empleado_id: int, db: Session = Depends(get_db)):
    empleado = db.query(Empleado).filter(Empleado.id == empleado_id).first()
    if not empleado:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    db.delete(empleado)
    db.commit()
    return {"message": f"Empleado con id {empleado_id} eliminado"}
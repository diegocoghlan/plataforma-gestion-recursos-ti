from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.roles import Rol
from app.schemas.roles import RolCreate, RolResponse

router = APIRouter(prefix="/api/roles", tags=["Roles"])

@router.get("/", response_model=list[RolResponse])
def listar_roles(db: Session = Depends(get_db)):
    return db.query(Rol).all()

@router.post("/", response_model=RolResponse)
def crear_rol(rol: RolCreate, db: Session = Depends(get_db)):
    nuevo = Rol(nombre_rol=rol.nombre_rol)
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.delete("/{rol_id}", response_model=dict)
def eliminar_rol(rol_id: int, db: Session = Depends(get_db)):
    rol = db.query(Rol).filter(Rol.id == rol_id).first()
    if not rol:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    db.delete(rol)
    db.commit()
    return {"message": f"Rol con id {rol_id} eliminado"}
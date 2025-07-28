
from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from sqlalchemy.orm import Session
from app.schemas import equipos as schemas
from app.models import equipos as models
from app.database import get_db

router = APIRouter(prefix="/api/equipos", tags=["Equipos"])

@router.get("/", response_model=list[schemas.EquipoResponse])
def listar_equipos(estado: Optional[str] = None, tipo_equipo: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Equipo)
    if estado:
        query = query.filter(models.Equipo.estado == estado)
    if tipo_equipo:
        query = query.filter(models.Equipo.tipo_equipo == tipo_equipo)
    return query.all()

@router.post("/", response_model=schemas.EquipoResponse)
def crear_equipo(equipo: schemas.EquipoCreate, db: Session = Depends(get_db)):
    db_equipo = models.Equipo(**equipo.dict())
    db.add(db_equipo)
    db.commit()
    db.refresh(db_equipo)
    return db_equipo

@router.delete("/", response_model=schemas.EquipoResponse)
def borrar_equipo(equipo_id: int, db: Session = Depends(get_db)):
    db_equipo = db.query(models.Equipo).filter(models.Equipo.id == equipo_id).first()
    if db_equipo is None:
        raise HTTPException(status_code=404, detail="Equipo no encontrado")
    db.delete(db_equipo)
    db.commit()
    return db_equipo
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.solicitudes import SolicitudEquipamento, DetalleSolicitud
from app.schemas.solicitudes import SolicitudCreate, SolicitudResponse, PropuestaOptimaResponse, PropuestaItem
from app.models.roles import Rol
from app.models.equipos import Equipo
from app.models.perfiles import PerfilRequerimiento

router = APIRouter(prefix="/api/solicitudes", tags=["Solicitudes"])

@router.post("/", response_model=SolicitudResponse)
def crear_solicitud(solicitud_data: SolicitudCreate, db: Session = Depends(get_db)):
    nueva_solicitud = SolicitudEquipamento(nombre_solicitud=solicitud_data.nombre_solicitud)
    db.add(nueva_solicitud)
    db.commit()
    db.refresh(nueva_solicitud)

    for detalle in solicitud_data.detalles:
        nuevo_detalle = DetalleSolicitud(
            solicitud_id=nueva_solicitud.id,
            rol_id=detalle.rol_id,
            cantidad_puestos=detalle.cantidad_puestos
        )
        db.add(nuevo_detalle)
    db.commit()
    db.refresh(nueva_solicitud)

    return nueva_solicitud

@router.get("/", response_model=list[SolicitudResponse])
def listar_solicitudes(db: Session = Depends(get_db)):
    return db.query(SolicitudEquipamento).all()

@router.get("/{solicitud_id}", response_model=SolicitudResponse)
def obtener_solicitud(solicitud_id: int, db: Session = Depends(get_db)):
    solicitud = db.query(SolicitudEquipamento).filter(SolicitudEquipamento.id == solicitud_id).first()
    if not solicitud:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")
    return solicitud

@router.get("/{solicitud_id}/propuesta-optima", response_model=PropuestaOptimaResponse)
def propuesta_optima(solicitud_id: int, db: Session = Depends(get_db)):
    solicitud = db.query(SolicitudEquipamento).filter(SolicitudEquipamento.id == solicitud_id).first()
    if not solicitud:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")

    detalles = db.query(DetalleSolicitud).filter(DetalleSolicitud.solicitud_id == solicitud_id).all()
    
    # Caso borde: Solicitud sin detalles
    if not detalles:
        return PropuestaOptimaResponse(
            propuesta=[],
            costo_total=0.0,
            mensaje="La solicitud no tiene detalles de roles definidos."
        )
    
    propuesta = []
    costo_total = 0.0
    mensajes_error = []
    equipos_asignados = []  # Para evitar asignar el mismo equipo dos veces
    puede_completar_solicitud = True

    for detalle in detalles:
        rol = db.query(Rol).filter(Rol.id == detalle.rol_id).first()
        if not rol:
            mensajes_error.append(f"Rol con ID {detalle.rol_id} no encontrado.")
            puede_completar_solicitud = False
            continue
            
        # Obtener los requerimientos de equipos para este rol
        requerimientos = db.query(PerfilRequerimiento).filter(
            PerfilRequerimiento.rol_id == detalle.rol_id
        ).all()
        
        if not requerimientos:
            mensajes_error.append(f"No se encontraron requerimientos definidos para el rol {rol.nombre_rol}.")
            puede_completar_solicitud = False
            continue
        
        # Calcular equipos necesarios por tipo para todos los puestos
        equipos_por_puesto = {}
        for req in requerimientos:
            equipos_por_puesto[req.tipo_equipo] = req.cantidad * detalle.cantidad_puestos
        
        # Buscar equipos disponibles para cada tipo
        equipos_asignados_rol = []
        costo_rol = 0.0
        puede_completar_rol = True
        equipos_faltantes = {}
        
        for tipo_equipo, cantidad_necesaria in equipos_por_puesto.items():
            equipos_disponibles = db.query(Equipo).filter(
                Equipo.estado == "disponible",
                Equipo.tipo_equipo == tipo_equipo,
                ~Equipo.id.in_(equipos_asignados)  # Excluir equipos ya asignados
            ).order_by(Equipo.costo.asc()).limit(cantidad_necesaria).all()
            
            equipos_encontrados = len(equipos_disponibles)
            
            if equipos_encontrados < cantidad_necesaria:
                equipos_faltantes[tipo_equipo] = cantidad_necesaria - equipos_encontrados
                puede_completar_rol = False
                puede_completar_solicitud = False
            
            # Agregar los equipos encontrados (aunque no sean suficientes)
            for equipo in equipos_disponibles:
                # Formato: "Modelo - Número de Serie"
                equipo_info = f"{equipo.modelo} - {equipo.numero_serie}"
                equipos_asignados_rol.append(equipo_info)
                equipos_asignados.append(equipo.id)
                costo_rol += float(equipo.costo)
        
        # Generar mensaje detallado para este rol si hay faltantes
        if equipos_faltantes:
            detalles_faltantes = []
            for tipo, cantidad in equipos_faltantes.items():
                detalles_faltantes.append(f"{cantidad} {tipo}(s)")
            mensajes_error.append(
                f"Rol '{rol.nombre_rol}' ({detalle.cantidad_puestos} puesto(s)): "
                f"Faltan {', '.join(detalles_faltantes)}"
            )
        
        costo_total += costo_rol
        
        propuesta.append(PropuestaItem(
            rol_id=rol.id,
            rol_nombre=rol.nombre_rol,
            cantidad=detalle.cantidad_puestos,
            equipos=equipos_asignados_rol
        ))

    # Construir mensaje final
    if puede_completar_solicitud:
        mensaje = "Propuesta generada correctamente. Todos los requerimientos pueden ser satisfechos."
    else:
        mensaje = "Propuesta parcial generada. EQUIPOS FALTANTES: " + " | ".join(mensajes_error)

    return PropuestaOptimaResponse(
        propuesta=propuesta,
        costo_total=costo_total,
        mensaje=mensaje
    )
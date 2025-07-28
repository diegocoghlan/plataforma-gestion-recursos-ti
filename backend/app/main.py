from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import equipos, solicitudes, roles, empleados
from app.database import Base, engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # orígenes permitidos (Vite por defecto usa 5173)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(equipos.router)
app.include_router(solicitudes.router)
app.include_router(roles.router)
app.include_router(empleados.router)
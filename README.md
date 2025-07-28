# Plataforma de Gestión de Recursos de TI

**Prueba Técnica Full-Stack**  
*Fecha de Entrega*: 2025-07-28

## 📝 Descripción del Proyecto

Sistema de gestión de recursos de TI que permite optimizar la asignación de equipos a empleados según roles y requerimientos específicos. Implementa un algoritmo greedy de optimización por costo mínimo.

## 🏗️ Arquitectura

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: FastAPI 0.116.1 + SQLAlchemy 2.0.41
- **Base de Datos**: PostgreSQL 14.18
- **Comunicación**: API REST con CORS

## 📂 Estructura del Proyecto

```
examen/
├── backend/
│   ├── app/
│   │   ├── main.py              # Punto de entrada FastAPI
│   │   ├── database.py          # Configuración de BD
│   │   ├── models/
│   │   │   ├── empleados.py     # Modelo de empleados
│   │   │   ├── equipos.py       # Modelo de equipos
│   │   │   ├── perfiles.py      # Modelo de perfiles requerimientos
│   │   │   ├── relaciones.py    # Modelo de historial asignaciones
│   │   │   ├── roles.py         # Modelo de roles
│   │   │   └── solicitudes.py   # Modelo de solicitudes
│   │   ├── schemas/
│   │   │   ├── empleados.py     # Schemas Pydantic empleados
│   │   │   ├── equipos.py       # Schemas Pydantic equipos
│   │   │   ├── roles.py         # Schemas Pydantic roles
│   │   │   └── solicitudes.py   # Schemas Pydantic solicitudes
│   │   └── routers/
│   │       ├── empleados.py     # Endpoints de empleados
│   │       ├── equipos.py       # Endpoints de equipos
│   │       ├── roles.py         # Endpoints de roles
│   │       └── solicitudes.py   # Algoritmo de optimización
│   └── requirements.txt         # Dependencias específicas backend
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavBar.tsx       # Navegación principal
│   │   │   ├── Table.tsx        # Componente de tabla reutilizable
│   │   │   ├── Input.tsx        # Componente de input reutilizable
│   │   │   └── Select.tsx       # Componente de select reutilizable
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx    # Dashboard principal
│   │   │   ├── Solicitudes.tsx  # Gestión de solicitudes
│   │   │   └── Propuesta.tsx    # Vista de propuesta optimizada
│   │   ├── api/
│   │   │   ├── axios.ts         # Configuración de Axios
│   │   │   ├── equipos.ts       # API de equipos
│   │   │   ├── roles.ts         # API de roles
│   │   │   └── solicitudes.ts   # API de solicitudes
│   │   ├── types/
│   │   │   └── api.d.ts         # Tipos TypeScript para API
│   │   ├── App.tsx              # Aplicación principal
│   │   ├── App.css              # Estilos principales
│   │   ├── main.tsx             # Punto de entrada
│   │   └── vite-env.d.ts        # Tipos de Vite
│   ├── public/
│   │   └── vite.svg             # Logo de Vite
│   ├── index.html               # HTML base
│   ├── package.json             # Dependencias npm
│   ├── package-lock.json        # Lock de dependencias
│   ├── tsconfig.json            # Configuración TypeScript
│   ├── tsconfig.node.json       # TypeScript para Node
│   └── vite.config.ts           # Configuración Vite
├── requirements.txt             # Dependencias Python principales
├── esquema.sql                  # Esquema de base de datos
├── .gitignore                   # Archivos ignorados por Git
└── README.md                    # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- Git

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd examen
```

### 2. Configuración de Base de Datos

#### Crear Base de Datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE almacen_db;

# Crear usuario (opcional)
CREATE USER usuario_db WITH PASSWORD 'password_seguro';
GRANT ALL PRIVILEGES ON DATABASE almacen_db TO usuario_db;
```

#### Importar Esquema

```bash
# Importar estructura de tablas
psql -h localhost -p 5432 -d almacen_db -U usuario_db -f esquema.sql
```

### 3. Configuración del Backend

#### Crear Entorno Virtual

```bash
cd backend
python -m venv venv

# Activar entorno virtual
# En macOS/Linux:
source venv/bin/activate
# En Windows:
# venv\Scripts\activate
```

#### Instalar Dependencias

```bash
pip install -r ../requirements.txt
```

#### Variables de Entorno

Crear archivo `.env` en la carpeta `backend/`:

```env
DATABASE_URL=postgresql://usuario_db:password_seguro@localhost:5432/almacen_db
```

### 4. Configuración del Frontend

```bash
cd frontend
npm install
```

## ▶️ Ejecución

### 1. Iniciar Backend

```bash
cd backend
source venv/bin/activate  # Activar entorno virtual
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

El backend estará disponible en: `http://localhost:8000`  
Documentación API: `http://localhost:8000/docs`

### 2. Iniciar Frontend

```bash
cd frontend
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 🗄️ Poblado de Datos de Prueba

### Roles y Perfiles de Requerimientos

```sql
-- Insertar roles
INSERT INTO roles (nombre_rol) VALUES 
('Desarrollador'), ('Diseñador'), ('Gerente'), ('Analista');

-- Insertar perfiles de requerimientos
INSERT INTO perfiles_requerimientos (rol_id, tipo_equipo, cantidad) VALUES
(1, 'Laptop', 1), (1, 'Monitor', 2), (1, 'Teclado', 1),
(2, 'Laptop', 1), (2, 'Monitor', 1), (2, 'Tablet', 1),
(3, 'Desktop', 1), (3, 'Monitor', 1), (3, 'Impresora', 1),
(4, 'Laptop', 1), (4, 'Monitor', 1);
```

### Equipos de Ejemplo

```sql
-- Insertar equipos
INSERT INTO equipos (tipo_equipo, modelo, numero_serie, estado, costo, especificaciones) VALUES
('Laptop', 'MacBook Pro 13"', 'MBP001', 'disponible', 1500.00, '{"cpu": "M1", "ram": "8GB"}'),
('Laptop', 'Dell XPS 13', 'DXP001', 'disponible', 1200.00, '{"cpu": "i7", "ram": "16GB"}'),
('Monitor', 'Dell 24"', 'MON001', 'disponible', 300.00, '{"size": "24", "resolution": "1080p"}'),
('Monitor', 'LG 27"', 'MON002', 'disponible', 450.00, '{"size": "27", "resolution": "4K"}');
```

## 🎯 Uso del Sistema

### 1. Dashboard de Inventario
- Acceder a `http://localhost:5173`
- Ver equipos disponibles con filtros por estado y tipo
- Visualizar asignaciones actuales

### 2. Gestión de Solicitudes
- Crear nuevas solicitudes especificando roles y cantidades
- Ver lista de todas las solicitudes con su estado

### 3. Algoritmo de Optimización
- Hacer clic en "Ver Propuesta" en cualquier solicitud
- El sistema ejecutará el algoritmo greedy de optimización
- Mostrará la asignación óptima por costo mínimo

## 🔧 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/equipos` | Lista equipos con filtros opcionales |
| POST | `/api/equipos` | Crear nuevo equipo |
| GET | `/api/solicitudes` | Lista todas las solicitudes |
| POST | `/api/solicitudes` | Crear nueva solicitud |
| GET | `/api/solicitudes/{id}` | Detalles de solicitud específica |
| GET | `/api/solicitudes/{id}/propuesta-optima` | **Algoritmo de optimización** |

## 🧪 Testing

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
npm run test
```

## 🚧 Desarrollo

### Backend (FastAPI)
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

### Frontend (Vite)
```bash
cd frontend
npm run dev
```

## 📊 Algoritmo de Optimización

El sistema implementa un **algoritmo greedy** que:

1. **Entrada**: ID de solicitud con roles y cantidades
2. **Procesamiento**: Consulta requerimientos por rol en tabla `perfiles_requerimientos`
3. **Optimización**: Ordena equipos disponibles por costo ascendente
4. **Selección**: Asigna equipos más baratos primero
5. **Validación**: Verifica disponibilidad suficiente
6. **Salida**: Propuesta optimizada con costo total mínimo

**Complejidad**: O(n × r × e log e) donde n=roles, r=requerimientos/rol, e=equipos disponibles

## 🐛 Troubleshooting

### Error de Conexión a Base de Datos
```bash
# Verificar que PostgreSQL esté corriendo
brew services start postgresql  # macOS
sudo service postgresql start   # Linux

# Verificar conexión
psql -h localhost -p 5432 -d almacen_db -U usuario_db
```

### Error de CORS
- Verificar que el backend esté corriendo en puerto 8000
- Confirmar configuración CORS en `main.py`

### Error de Dependencias Frontend
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📄 Documentación Adicional

- **Documento de Justificación**: `documento_justificacion.tex` (compilar con LaTeX)
- **Esquema de BD**: `esquema.sql`
- **API Docs**: `http://localhost:8000/docs` (cuando el backend esté corriendo)

## 👨‍💻 Autor

Prueba Técnica Full-Stack - 2025-07-28

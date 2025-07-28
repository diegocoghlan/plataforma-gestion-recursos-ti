export type Equipo = {
    id: number;
    tipo_equipo: string;
    modelo: string;
    estado: string;
    numero_serie: string;
    costo: number;
    especificaciones: Record<string, any>;
    fecha_ingreso: string;
    empleado_id?: number | null;
};

export type Rol = {
    id: number;
    nombre_rol: string;
};

/**
 * Detalle de solicitud usado al enviar datos al backend.
 */
export type Detalle = {
    rol_id: number;
    cantidad_puestos: number;
};

/**
 * Respuesta de un detalle de solicitud desde el backend.
 */
export type DetalleResponse = {
    id: number;
    rol_id: number;
    cantidad_puestos: number;
};

/**
 * Tipo de una solicitud de equipamiento.
 */
export type Solicitud = {
    id: number;
    nombre_solicitud: string;
    estado: string;
    fecha: string;
    detalles: DetalleResponse[];
};

/**
 * Ítem de propuesta óptima para una solicitud.
 */
export type PropuestaItem = {
    rol_id: number;
    rol_nombre: string;
    cantidad: number;
    equipos: string[];
};

/**
 * Respuesta completa de propuesta óptima.
 */
export type PropuestaOptimaResponse = {
    propuesta: PropuestaItem[];
    costo_total: number;
    mensaje: string;
};

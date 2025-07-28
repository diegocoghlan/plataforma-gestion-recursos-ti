

import api from './axios';
import type { Solicitud, Detalle, PropuestaItem } from '../types/api';

/**
 * Obtiene todas las solicitudes existentes.
 */
export const getSolicitudes = async (): Promise<Solicitud[]> => {
    const response = await api.get<Solicitud[]>('/solicitudes');
    return response.data;
};

/**
 * Crea una nueva solicitud de equipamiento.
 * @param data Objeto con nombre_solicitud y array de detalles { rol_id, cantidad }
 */
export const createSolicitud = async (data: {
    nombre_solicitud: string;
    detalles: Detalle[];
}): Promise<Solicitud> => {
    const response = await api.post<Solicitud>('/solicitudes', data);
    return response.data;
};

/**
 * Obtiene la propuesta óptima de asignación para una solicitud.
 * @param id ID de la solicitud
 */
export const getPropuesta = async (id: number): Promise<PropuestaItem[]> => {
    const response = await api.get<PropuestaItem[]>(`/solicitudes/${id}/propuesta-optima`);
    return response.data;
};
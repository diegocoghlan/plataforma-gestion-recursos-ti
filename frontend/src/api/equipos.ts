import api from './axios';
import type { Equipo } from '../types/api';

/**
 * Obtiene la lista de equipos con filtros opcionales.
 * @param filters Objeto con keys 'estado' y/o 'tipo_equipo'
 */
export const getEquipos = async (filters: Record<string, string> = {}): Promise<Equipo[]> => {
    const response = await api.get<Equipo[]>('/equipos', { params: filters });
    return response.data;
};

/**
 * Crea un nuevo equipo en el inventario.
 * @param data Datos del equipo sin id ni fecha_ingreso.
 */
export const createEquipo = async (
    data: Omit<Equipo, 'id' | 'fecha_ingreso'>
): Promise<Equipo> => {
    const response = await api.post<Equipo>('/equipos', data);
    return response.data;
};

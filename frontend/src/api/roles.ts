import api from './axios';
import type { Rol } from '../types/api';

/**
 * Obtiene la lista de equipos con filtros opcionales.
 * @param filters Objeto con keys 'estado' y/o 'tipo_equipo'
 */
export const getRoles = async (filters: Record<string, string> = {}): Promise<Rol[]> => {
    const response = await api.get<Rol[]>('/roles', { params: filters });
    return response.data;
};

/**
 * Crea un nuevo equipo en el inventario.
 * @param data Datos del equipo sin id ni fecha_ingreso.
 */
export const createRol = async (
    data: Omit<Rol, 'id' | 'nombre_rol'>
): Promise<Rol> => {
    const response = await api.post<Rol>('/roles', data);
    return response.data;
};

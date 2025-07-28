import axios from 'axios';
import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Solicitud, Detalle } from '../types/api';
import { getSolicitudes, createSolicitud } from '../api/solicitudes';
import { getRoles } from '../api/roles';
import type { Rol } from '../types/api';

const Solicitudes: React.FC = () => {
    const navigate = useNavigate();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [nombre, setNombre] = useState<string>('');
    const [detalles, setDetalles] = useState<Detalle[]>([]);
    const [roles, setRoles] = useState<Rol[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setSolicitudes(await getSolicitudes());
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const r = await getRoles();
                setRoles(r);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    const addDetalle = () => {
        setDetalles([...detalles, { rol_id: 0, cantidad_puestos: 1 }]);
    };

    const removeDetalle = (index: number) => {
        setDetalles(detalles.filter((_, i) => i !== index));
    };

    const updateDetalle = (index: number, field: keyof Detalle, value: number) => {
        const newDetalles = [...detalles];
        newDetalles[index] = { ...newDetalles[index], [field]: value };
        setDetalles(newDetalles);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createSolicitud({ nombre_solicitud: nombre, detalles });
            setNombre('');
            setDetalles([]);
            const data = await getSolicitudes();
            setSolicitudes(data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Log the request payload and validation errors from the server
                console.error('Request payload:', { nombre_solicitud: nombre, detalles });
                console.error('Validation errors:', error.response.data);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div style={{ paddingTop: '6rem', padding: '1rem' }}>
            <h1>Solicitudes de Equipamiento</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Nombre de la solicitud:
                </label>
                <input
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                />
                <fieldset style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                    <legend style={{ padding: '0 0.5rem' }}>Roles requeridos</legend>
                    <p>Agrega uno o más roles y la cantidad necesaria para cada uno:</p>
                    {detalles.length === 0 ? (
                        <p style={{ color: '#777', padding: '1rem 0' }}>
                            No has agregado ningún rol aún.
                        </p>
                    ) : (
                        detalles.map((d, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <label htmlFor={`rol-${i}`} style={{ marginRight: '0.5rem' }}>Rol:</label>
                                <select
                                    id={`rol-${i}`}
                                    value={d.rol_id || ''}
                                    onChange={e => updateDetalle(i, 'rol_id', Number(e.target.value))}
                                    required
                                    style={{ marginRight: '1rem', padding: '0.5rem', width: '12rem' }}
                                >
                                    <option value="" disabled>Selecciona un rol</option>
                                    {roles.map(r => (
                                        <option key={r.id} value={r.id}>{r.nombre_rol}</option>
                                    ))}
                                </select>
                                <label htmlFor={`cant-${i}`} style={{ marginRight: '0.5rem' }}>Cantidad:</label>
                                <input
                                    id={`cant-${i}`}
                                    type="number"
                                    value={d.cantidad_puestos}
                                    onChange={e => updateDetalle(i, 'cantidad_puestos', Number(e.target.value))}
                                    min={1}
                                    required
                                    style={{ marginRight: '1rem', padding: '0.5rem', width: '4rem' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeDetalle(i)}
                                    style={{ padding: '0.25rem 0.5rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px' }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))
                    )}
                </fieldset>
                <button type="button" onClick={addDetalle} style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}>
                    + Agregar rol
                </button>
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>
                    Crear Solicitud
                </button>
            </form>

            <h2>Lista de Solicitudes</h2>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f5f5f5' }}>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Nombre</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Estado</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Fecha</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudes.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '1rem', color: '#777' }}>
                                    No hay solicitudes que mostrar
                                </td>
                            </tr>
                        ) : (
                            solicitudes.map((solicitud) => (
                                <tr key={solicitud.id}>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{solicitud.id}</td>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{solicitud.nombre_solicitud}</td>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{solicitud.estado}</td>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                        {new Date(solicitud.fecha).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                        <button
                                            onClick={() => navigate(`/propuesta/${solicitud.id}`)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: '#007bff',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Ver Propuesta
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Solicitudes;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../components/Table';
import type { Column } from '../components/Table';
import type { PropuestaItem } from '../types/api';

const columns: Column<PropuestaItem>[] = [
    { header: 'Rol', accessor: 'rol_nombre' },
    { header: 'Cantidad de Puestos', accessor: 'cantidad' },
    { header: 'Equipos Asignados', accessor: 'equipos' },
];

const Propuesta: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [propuesta, setPropuesta] = useState<PropuestaItem[]>([]);
    const [costoTotal, setCostoTotal] = useState<number>(0);
    const [mensaje, setMensaje] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!id) return;

        (async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8000/api/solicitudes/${id}/propuesta-optima`);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setPropuesta(data.propuesta || []);
                setCostoTotal(data.costo_total || 0);
                setMensaje(data.mensaje || '');
            } catch (e) {
                console.error('Error al obtener propuesta:', e);
                setError(e instanceof Error ? e.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) {
        return (
            <div style={{ paddingTop: '6rem', padding: '1rem' }}>
                <h1>Propuesta Óptima para Solicitud {id}</h1>
                <p>Cargando propuesta...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ paddingTop: '6rem', padding: '1rem' }}>
                <h1>Propuesta Óptima para Solicitud {id}</h1>
                <p style={{ color: 'red' }}>Error: {error}</p>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '6rem', padding: '1rem' }}>
            <h1>Propuesta Óptima para Solicitud {id}</h1>

            {/* Resumen de la propuesta */}
            <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <h3>Resumen</h3>
                <p><strong>Costo Total:</strong> ${costoTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
                <p><strong>Estado:</strong> {mensaje}</p>
            </div>

            {/* Tabla de asignaciones */}
            <Table<PropuestaItem> columns={columns} data={propuesta} />
        </div>
    );
};

export default Propuesta;
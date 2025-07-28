import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import type { Column } from "../components/Table";
import type { Equipo } from "../types/api";
import { getEquipos } from "../api/equipos";

const columns: Column<Equipo>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Tipo', accessor: 'tipo_equipo' },
    { header: 'Modelo', accessor: 'modelo' },
    { header: 'Estado', accessor: 'estado' },
    { header: 'Número de Serie', accessor: 'numero_serie' },
    { header: 'Costo', accessor: 'costo' },
    { header: 'Especificaciones', accessor: 'especificaciones' },
    { header: 'Fecha de Ingreso', accessor: 'fecha_ingreso' },
    { header: 'Asignado a', accessor: 'empleado_id' },
];

const Dashboard: React.FC = () => {
    const [equipos, setEquipos] = useState<Equipo[]>([]);
    const [estado, setEstado] = useState<string>("");
    const [tipo, setTipo] = useState<string>("");

    useEffect(() => {
        (async () => {
            try { setEquipos(await getEquipos({ estado, tipo_equipo: tipo })); }
            catch (e) { console.error(e); }
        })();
    }, [estado, tipo]);

    return (
        <div style={{ paddingTop: '6rem', padding: '1rem' }}>
            <h1>Dashboard de Inventario</h1>
            {/* Filtros */}
            <div>
                <label>Estado:</label>
                <select value={estado} onChange={e => setEstado(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="disponible">Disponible</option>
                    <option value="asignado">Asignado</option>
                </select>
                <label>Tipo:</label>
                <select value={tipo} onChange={e => setTipo(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Telefono">Teléfono</option>
                </select>
            </div>
            <Table<Equipo> columns={columns} data={equipos} />
        </div>
    );
};

export default Dashboard;
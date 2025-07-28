import React from "react";

export type Column<T> = {
    header: string;
    accessor: keyof T;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
}

const Table = <T extends Record<string, any>>({ columns, data }: TableProps<T>) => {
    const safeData = Array.isArray(data) ? data : [];
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                    {columns.map(col => (
                        <th
                            key={col.accessor as string}
                            style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}
                        >
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {safeData.length === 0 ? (
                    <tr>
                        <td
                            colSpan={columns.length}
                            style={{ textAlign: 'center', padding: '1rem', color: '#777' }}
                        >
                            No hay registros que mostrar
                        </td>
                    </tr>
                ) : (
                    safeData.map((row, idx) => (
                        <tr key={idx}>
                            {columns.map(col => (
                                <td
                                    key={col.accessor as string}
                                    style={{ padding: '0.75rem', border: '1px solid #ddd' }}
                                >
                                    {col.accessor === 'especificaciones'
                                        ? (row[col.accessor] && typeof row[col.accessor] === 'object'
                                            ? (
                                                <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                                                    {Object.entries(row[col.accessor]).map(([key, value]) => (
                                                        <li key={key}><strong>{key}:</strong> {String(value)}</li>
                                                    ))}
                                                </ul>
                                            )
                                            : row[col.accessor] ?? '—')
                                        : col.accessor === 'equipos' && Array.isArray(row[col.accessor])
                                            ? (
                                                <div>
                                                    {(row[col.accessor] as string[]).map((equipo, i) => (
                                                        <div key={i} style={{
                                                            padding: '0.25rem 0.5rem',
                                                            marginBottom: '0.25rem',
                                                            backgroundColor: '#e3f2fd',
                                                            borderRadius: '4px',
                                                            fontSize: '0.85rem'
                                                        }}>
                                                            {equipo}
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                            : row[col.accessor] ?? '—'}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default Table;
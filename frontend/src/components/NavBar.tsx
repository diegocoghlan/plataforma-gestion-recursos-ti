import React from "react";
import { Link } from "react-router-dom";


const LinkStyle: React.CSSProperties = {
    color: 'black',
    marginRight: '1rem',
    textDecoration: 'none'
};

const NavBar: React.FC = () => (
    <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 1rem',
        backgroundColor: 'lightgrey',
        color: 'black',
        zIndex: 1000,
    }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginRight: '2rem' }}>Gestión de Equipos</div>
        <div>
            <Link to="/dashboard" style={LinkStyle}>Inventario</Link>
            <Link to="/solicitudes" style={LinkStyle}>Solicitudes</Link>
        </div>

    </nav>
)

export default NavBar;
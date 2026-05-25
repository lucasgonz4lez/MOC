import React from 'react';
import { Link } from 'react-router-dom';

function Menu({ usuarioLogueado, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Mi aplicación</span>

        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#menuNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/incidencias">Ver incidencias</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registrar">Registrar incidencia</Link>
            </li>
            {usuarioLogueado?.rol?.nombre_rol === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/usuarios">Gestión de usuarios</Link>
              </li>
            )}
          </ul>

          {usuarioLogueado && (
            <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Menu;
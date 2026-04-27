import React, { useState, useEffect } from "react";

function MiLista(props) {
  const [sortedIncidencias, setSortedIncidencias] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id_incidencia', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIncidencias, setFilteredIncidencias] = useState([]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  useEffect(() => {
    const filtered = props.incidencias.filter(incidencia => {
      return (
        incidencia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incidencia.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incidencia.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incidencia.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incidencia.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incidencia.id_usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incidencia.id_incidencia.toString().includes(searchTerm)
      );
    });
    setFilteredIncidencias(filtered);
  }, [searchTerm, props.incidencias]);

  useEffect(() => {
    const sortableItems = [...(searchTerm ? filteredIncidencias : props.incidencias)];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    setSortedIncidencias(sortableItems);
  }, [props.incidencias, sortConfig, searchTerm, filteredIncidencias]);

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'abierto':
        return 'badge bg-warning text-dark';
      case 'cerrado':
        return 'badge bg-success';
      case 'en progreso':
        return 'badge bg-info text-dark';
      case 'pendiente':
        return 'badge bg-secondary';
      default:
        return 'badge bg-light text-dark border';
    }
  };

  const getUrgencyClass = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'alta':
        return 'text-danger fw-bold';
      case 'media':
        return 'text-warning fw-bold';
      case 'baja':
        return 'text-success fw-bold';
      default:
        return 'text-muted';
    }
  };
    
  return (
    <div className="container-fluid p-0">
      {/* Search Bar */}
      <div className="input-group mb-4">
        <span className="input-group-text bg-white border-end-0">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          placeholder="Buscar incidencias..."
          className="form-control border-start-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th className="sortable" onClick={() => requestSort('id_incidencia')}>
                ID {getSortIndicator('id_incidencia')}
              </th>
              <th className="sortable" onClick={() => requestSort('titulo')}>
                Título {getSortIndicator('titulo')}
              </th>
              <th>Descripción</th>
              <th className="sortable" onClick={() => requestSort('id_usuario')}>
                Usuario {getSortIndicator('id_usuario')}
              </th>
              <th className="sortable" onClick={() => requestSort('nivel_urgencia')}>
                Urgencia {getSortIndicator('nivel_urgencia')}
              </th>
              <th className="sortable" onClick={() => requestSort('fecha_registro')}>
                Fecha {getSortIndicator('fecha_registro')}
              </th>
              <th className="sortable" onClick={() => requestSort('categoria')}>
                Categoría {getSortIndicator('categoria')}
              </th>
              <th className="sortable" onClick={() => requestSort('estado')}>
                Estado {getSortIndicator('estado')}
              </th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {sortedIncidencias.length > 0 ? (
              sortedIncidencias.map((i) => (
                <tr key={i.id_incidencia} className="align-middle">
                  <td className="text-muted">#{i.id_incidencia}</td>
                  <td className="fw-bold">{i.titulo}</td>
                  <td className="text-truncate" style={{ maxWidth: '200px' }} title={i.descripcion}>
                    {i.descripcion}
                  </td>
                  <td>
                    <span className="badge bg-light text-dark">{i.id_usuario}</span>
                  </td>
                  <td className={getUrgencyClass(i.nivel_urgencia)}>
                    {i.nivel_urgencia}
                  </td>
                  <td>{new Date(i.fecha_registro).toLocaleDateString()}</td>
                  <td>
                    <span className="badge bg-primary">{i.categoria}</span>
                  </td>
                  <td>
                    <span className={getStatusBadgeClass(i.estado)}>
                      {i.estado}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark">
                      <i className="bi bi-geo-alt"></i> {i.ubicacion}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-muted">
                  No se encontraron incidencias que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Results Count */}
      <div className="text-muted small mt-2">
        Mostrando {sortedIncidencias.length} de {props.incidencias.length} incidencias
      </div>
    </div>
        )
}

export default MiLista;
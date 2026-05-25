function UserRoleManagement({ usuarios, setUsuarios, authHeaders, API }) {

  const onCambiarRol = async (emailUsuario) => {
    const usuario = usuarios.find(u => u.email === emailUsuario);
    const nuevoRol = usuario.rol.nombre_rol === 'admin'
      ? { id: 1, nombre_rol: 'comun', descripcion: 'Usuario regular del sistema' }
      : { id: 2, nombre_rol: 'admin', descripcion: 'Administrador del sistema con permisos totales' };

    try {
      const res = await fetch(`${API}/users/${usuario.id}`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ rol: nuevoRol }),
      });

      if (res.ok) {
        setUsuarios(prev =>
          prev.map(u => u.email === emailUsuario ? { ...u, rol: nuevoRol } : u)
        );
      } else {
        alert('Error al cambiar el rol');
      }
    } catch {
      alert('No se puede conectar con el servidor');
    }
  };

  return (
    <div className="card shadow-sm mt-3">
      <div className="card-body">
        <h3 className="h5 mb-4 fw-semibold">Gestión de Usuarios</h3>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol actual</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge ${u.rol.nombre_rol === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                    {u.rol.nombre_rol}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onCambiarRol(u.email)}
                  >
                    Cambiar Rol
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserRoleManagement;
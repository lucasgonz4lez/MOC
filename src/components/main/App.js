import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import MiLista from '../Lista/MiLista.js';
import Form from '../Form.js';
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import Login from '../login/Login.js';
import { Routes, Route } from 'react-router-dom';
import Menu from '../menu/Menu';
import UserRoleManagement from '../userRolManager/UserRolManager.js';

const API = 'http://localhost:3004';

function App() {
  const [incidencias, setIncidencias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [errorCarga, setErrorCarga] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${JSON.parse(token)}`;

    fetch(`${API}/users`, { headers })
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(() => setErrorCarga('Error al cargar usuarios'));
  }, []);

  useEffect(() => {
    if (!usuario) return;
    const token = JSON.parse(localStorage.getItem('authToken'));
    fetch(`${API}/incidencias`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => setIncidencias(data))
      .catch(() => setErrorCarga('Error al cargar incidencias'));
  }, [usuario]);

  const authHeaders = {
    'Content-Type': 'application/json',
    ...(usuario && { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authToken'))}` }),
  };

  const onLogin = async (email, password) => {
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return alert(`Error ${res.status}: credenciales incorrectas`);
      const data = await res.json();
      localStorage.setItem('authToken', JSON.stringify(data.accessToken));
      const decoded = jwtDecode(data.accessToken);
      const usuarioEncontrado = usuarios.find(u => u.email === decoded.email);
      setUsuario(usuarioEncontrado);
    } catch {
      alert('No se puede conectar con el servidor.');
    }
  };

  const onLogout = () => {
    setUsuario(null);
    setIncidencias([]);
    localStorage.removeItem('authToken');
  };

  const agregarIncidencia = async (email, titulo, descripcion, categoria, nivel_urgencia, ubicacion) => {
    const usuarioEncontrado = usuarios.find(u => u.email === email);
    if (!usuarioEncontrado) return alert(`Usuario ${email} no registrado.`);

    try {
      const res = await fetch(`${API}/incidencias`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          usuario: usuarioEncontrado.id,
          titulo, descripcion, categoria, nivel_urgencia, ubicacion,
          fecha_registro: new Date().toISOString().split('T')[0],
          estado: 'Abierta',
          comentarios: '',
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const nueva = await res.json();
      setIncidencias(prev => [...prev, nueva]);
      alert('Incidencia registrada con éxito.');
    } catch (e) {
      alert(`Fallo al enviar: ${e.message}`);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header usuarioLogueado={usuario} onLogout={onLogout} />

      <main className="flex-grow-1 py-4 bg-light">
        <div className="container-fluid">
          {!usuario ? (
            <div className="row justify-content-center">
              <div className="col-md-5">
                <Login onLogin={onLogin} />
              </div>
            </div>
          ) : (
            <>
              <Menu usuarioLogueado={usuario} onLogout={onLogout} />
              {errorCarga && <div className="alert alert-danger">{errorCarga}</div>}
              <Routes>
                <Route path="/" element={<h2 className="h3 mt-4 fw-bold">Bienvenido, {usuario.nombre}</h2>} />
                <Route path="/incidencias" element={<MiLista incidencias={incidencias} usuarios={usuarios} />} />
                <Route path="/registrar" element={<Form agregarIncidencia={agregarIncidencia} usuarioLogueado={usuario} />} />
                {usuario.rol?.nombre_rol === 'admin' && (
                  <Route path="/usuarios" element={
                    <UserRoleManagement
                      usuarios={usuarios}
                      setUsuarios={setUsuarios}
                      authHeaders={authHeaders}
                      API={API}
                    />
                  } />
                )}
              </Routes>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
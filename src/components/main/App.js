import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import MiLista from '../Lista/MiLista.js';
import Form from '../Form.js';
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import Login from '../login/Login.js';

const API = 'http://localhost:3004';

function App() {
  const [incidencias, setIncidencias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [errorCarga, setErrorCarga] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (!usuarios.length) return;
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      const decoded = jwtDecode(JSON.parse(token));
      const usuarioEncontrado = usuarios.find(u => u.email === decoded.email);
      if (usuarioEncontrado) setUsuario(usuarioEncontrado);
    } catch {
      localStorage.removeItem('authToken');
    }
  }, [usuarios]);

useEffect(() => {
  const obtenerUsuarioLogueado = () => {
    const savedUser = localStorage.getItem('authToken');
    if (savedUser) {
      const decodedUser = jwtDecode(localStorage.getItem('authToken'));
      console.log(decodedUser);
      if (decodedUser) {
        const user = usuarios.find((u) => u.email === decodedUser.email);
        user ? setUsuario(user) : setUsuario(null);
      }
    }
  };
  obtenerUsuarioLogueado();
}, [usuarios]);

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
      // Guardamos solo el token, no el objeto usuario completo
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
              <h2 className="h3 mb-4 fw-bold">
                Panel de Gestión de Incidencias
                <span className="fs-6 fw-normal text-muted ms-2">
                  Bienvenido, {usuario.nombre}
                </span>
              </h2>

              {errorCarga && <div className="alert alert-danger">{errorCarga}</div>}

              <div className="row g-4">
                <div className="col-lg-7">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h3 className="h5 mb-4 fw-semibold">Listado de Incidencias</h3>
                      <MiLista incidencias={incidencias} usuarios={usuarios} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h3 className="h5 mb-4 fw-semibold">Nueva Incidencia</h3>
                      <Form agregarIncidencia={agregarIncidencia} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
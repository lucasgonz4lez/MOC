import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

class Footer extends React.Component {
  render() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-dark text-white py-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-4">
              <h5 className="fw-bold mb-3">Sistema de Gestión de Incidencias</h5>
              <p className="text-muted">
                Plataforma para la gestión y seguimiento de incidencias técnicas. 
                Facilita la comunicación entre usuarios y el equipo de soporte.
              </p>
            </div>
            
            <div className="col-12 text-center mb-4">
              <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
                <a href="#inicio" className="text-white text-decoration-none me-3">Inicio</a>
                <a href="#incidencias" className="text-white text-decoration-none me-3">Incidencias</a>
                <a href="#nueva" className="text-white text-decoration-none me-3">Nueva Incidencia</a>
                <a href="#contacto" className="text-white text-decoration-none me-3">Contacto</a>
                <a href="#ayuda" className="text-white text-decoration-none">Ayuda</a>
              </div>
            </div>
            
            <div className="col-12">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border-top border-secondary pt-4">
                <div className="text-muted small mb-3 mb-md-0">
                  {currentYear} Sistema de Gestión de Incidencias. Todos los derechos reservados.
                </div>
                
                <div className="d-flex gap-3">
                  <a 
                    href="https://github.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white fs-5"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                  <a 
                    href="https://linkedin.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white fs-5"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                  <a 
                    href="https://twitter.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white fs-5"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a 
                    href="mailto:soporte@ejemplo.com" 
                    className="text-white fs-5"
                    aria-label="Email"
                  >
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
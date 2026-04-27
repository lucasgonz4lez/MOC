import React from "react";
import logo from "../../images/ghf.png";

class Header extends React.Component {
    render() {
        return (
            <header className="bg-primary text-white py-4 shadow-sm">
                <div className="container d-flex justify-content-between align-items-center">
                    <h1 className="h4 mb-0">Bienvenido a la página de contactos</h1>
                    <img 
                        src={logo} 
                        alt="Logo de la empresa" 
                        className="img-fluid" 
                        style={{ maxHeight: '50px' }}
                    />
                </div>
            </header>
        );
    }
}

export default Header;
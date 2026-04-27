import React from "react";

class Form extends React.Component {
  envioFormulario = (event) => {
    event.preventDefault();
    const form = event.target;

    this.props.agregarIncidencia(
      form.usuario.value,
      form.titulo.value,
      form.descripcion.value,
      form.categoria.value,
      form.nivel.value,
      form.ubicacion.value
    );
  };

  render() {
    return (
      <div className="container p-0">
        <form onSubmit={this.envioFormulario} className="bg-white p-4 rounded shadow-sm">
          <h2 className="h4 mb-4 text-center">Registrar incidencia</h2>
          
          <div className="mb-3">
            <label className="form-label fw-semibold">Título incidencia</label>
            <input type="text" name="titulo" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Usuario</label>
            <input type="text" name="usuario" className="form-control" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Descripción</label>
            <textarea name="descripcion" className="form-control" rows="4" required></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Nivel de urgencia</label>
            <select name="nivel" className="form-select" required>
              <option value="">Seleccionar...</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Categoría</label>
            <select name="categoria" className="form-select" required>
              <option value="">Seleccionar...</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Red">Red</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Ubicación</label>
            <input type="text" name="ubicacion" className="form-control" required />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Registrar Incidencia
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
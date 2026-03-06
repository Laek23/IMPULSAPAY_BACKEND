import "./AgregarNegocio.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  FaHome,
  FaStore,
  FaChartBar,
  FaHeadset,
  FaSignOutAlt
} from "react-icons/fa";

export default function AgregarNegocio() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    banco: "",
    negocio: "",
    telefono: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const insertarNegocio = () => {

    const nuevoNegocio = {
      id: Date.now(),
      nombre: form.negocio,
      propietario: form.nombre + " " + form.apellidos,
      correo: form.correo,
      estado: "activo",
      ventas: 0,
      ingresos: "$0"
    };

    localStorage.setItem("nuevoNegocio", JSON.stringify(nuevoNegocio));

    Swal.fire({
      icon: "success",
      title: "Negocio agregado",
      text: "El negocio se agregó correctamente.",
      confirmButtonColor: "#0d2b5c"
    }).then(() => {
      navigate("/admin/negocios");
    });
  };

  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">
        <div>
          <div className="admin-logo-container">
            <img src="/fluxpay.jpg" alt="FluxPay Logo" className="admin-logo" />
          </div>

          <ul className="sidebar-menu">
            <li onClick={() => navigate("/admin/dashboard")}>
              <FaHome /> Dashboard
            </li>

            <li className="active" onClick={() => navigate("/admin/negocios")}>
              <FaStore /> Gestión Negocios
            </li>

            <li>
              <FaChartBar /> Reportes globales
            </li>

            <li>
              <FaHeadset /> Soporte
            </li>
          </ul>
        </div>

        <div className="logout">
          <FaSignOutAlt /> Cerrar sesión
        </div>
      </aside>

      <div className="admin-main">

        <header className="header-wrapper">
          <div className="header-left">
            <h1>Agregar negocio</h1>
            <p>Crea un nuevo negocio y añádelo a este sitio.</p>
          </div>
        </header>

        <main className="admin-dashboard">

          <div className="form-card">

            <div className="form-left">

              <div className="form-group">
                <label>Nombre del cliente</label>
                <input name="nombre" onChange={handleChange}/>
              </div>

              <div className="form-group">
                <label>Apellidos</label>
                <input name="apellidos" onChange={handleChange}/>
              </div>

              <div className="form-group">
                <label>Correo</label>
                <input name="correo" onChange={handleChange}/>
              </div>

              <div className="form-group">
                <label>Banco</label>
                <input name="banco" onChange={handleChange}/>
              </div>

              <div className="form-group">
                <label>Negocio</label>
                <input name="negocio" onChange={handleChange}/>
              </div>

              <div className="form-group">
                <label>Teléfono</label>
                <input name="telefono" onChange={handleChange}/>
              </div>

              <div className="form-buttons">

                <button
                  className="btn-primary"
                  onClick={insertarNegocio}
                >
                  Insertar negocio
                </button>

                <button
                  className="btn-dark"
                  onClick={() => navigate("/admin/negocios")}
                >
                  Cancelar
                </button>

              </div>

            </div>

            <div className="form-right">
              <img
                src="https://i.pravatar.cc/200"
                alt="Perfil"
                className="profile-preview"
              />
              <p>Foto de perfil del cliente</p>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
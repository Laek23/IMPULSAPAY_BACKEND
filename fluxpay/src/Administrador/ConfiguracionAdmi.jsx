import "./ConfiguracionAdmi.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  FaHome,
  FaStore,
  FaChartBar,
  FaHeadset,
  FaSignOutAlt,
  FaCog
} from "react-icons/fa";

export default function ConfiguracionAdmi() {

  const navigate = useNavigate();

  const [adminData, setAdminData] = useState({
    nombre: "Alexander Castillo",
    correo: "alexander.castillo@gmail.com",
    telefono: "+52 999 473 5270",
    password: "********",
    foto: "https://i.pravatar.cc/100?u=alex"
  });

  const [editMode, setEditMode] = useState({
    nombre: false,
    correo: false,
    telefono: false,
    password: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAdminData({
      ...adminData,
      [name]: value
    });
  };

  const toggleEdit = (campo) => {

    if (editMode[campo]) {

      Swal.fire({
        icon: "success",
        title: "Datos actualizados",
        text: "La información se guardó correctamente.",
        confirmButtonColor: "#0d2b5c"
      });

    }

    setEditMode({
      ...editMode,
      [campo]: !editMode[campo]
    });
  };

  const handlePhoto = (e) => {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onload = () => {

        setAdminData({
          ...adminData,
          foto: reader.result
        });

        Swal.fire({
          icon: "success",
          title: "Foto actualizada",
          text: "La foto de perfil se cambió correctamente.",
          confirmButtonColor: "#0d2b5c"
        });

      };

      reader.readAsDataURL(file);
    }
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

            <li onClick={() => navigate("/admin/negocios")}>
              <FaStore /> Gestión Negocios
            </li>

            <li onClick={() => navigate("/admin/reportes")}>
              <FaChartBar /> Reportes globales
            </li>

            <li onClick={() => navigate("/admin/soporte")}>
              <FaHeadset /> Soporte
            </li>

          </ul>

        </div>

        <div>

          <ul className="sidebar-menu">
            <li className="active">
              <FaCog /> Configuración
            </li>
          </ul>

          <div
            className="logout"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <FaSignOutAlt /> Cerrar sesión
          </div>

        </div>

      </aside>

      <div className="admin-main">

        <header className="header-wrapper">
          <div className="header-left">
            <h1>Configuración</h1>
            <p>Administración de tu cuenta</p>
          </div>
        </header>

        <main className="admin-dashboard">

          <div className="config-card">

            <h2>Datos del administrador</h2>

            <div className="config-grid">

              {/* NOMBRE */}

              <div className="config-field">
                <label>Nombre</label>

                <input
                  type="text"
                  name="nombre"
                  value={adminData.nombre}
                  disabled={!editMode.nombre}
                  onChange={handleChange}
                />

                <button
                  className="btn-primary"
                  onClick={() => toggleEdit("nombre")}
                >
                  {editMode.nombre ? "Guardar" : "Editar nombre"}
                </button>

              </div>

              {/* CORREO */}

              <div className="config-field">
                <label>Correo</label>

                <input
                  type="text"
                  name="correo"
                  value={adminData.correo}
                  disabled={!editMode.correo}
                  onChange={handleChange}
                />

                <button
                  className="btn-primary"
                  onClick={() => toggleEdit("correo")}
                >
                  {editMode.correo ? "Guardar" : "Editar correo"}
                </button>

              </div>

              {/* TELEFONO */}

              <div className="config-field">
                <label>Teléfono</label>

                <input
                  type="text"
                  name="telefono"
                  value={adminData.telefono}
                  disabled={!editMode.telefono}
                  onChange={handleChange}
                />

                <button
                  className="btn-primary"
                  onClick={() => toggleEdit("telefono")}
                >
                  {editMode.telefono ? "Guardar" : "Editar teléfono"}
                </button>

              </div>

              {/* PASSWORD */}

              <div className="config-field">
                <label>Contraseña</label>

                <input
                  type="password"
                  name="password"
                  value={adminData.password}
                  disabled={!editMode.password}
                  onChange={handleChange}
                />

                <button
                  className="btn-danger"
                  onClick={() => toggleEdit("password")}
                >
                  {editMode.password ? "Guardar contraseña" : "Cambiar contraseña"}
                </button>

              </div>

              {/* FOTO */}

              <div className="config-field photo-field">

                <label>Foto de perfil</label>

                <div className="photo-box">

                  <img src={adminData.foto} alt="perfil"/>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                  />

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}
import "./DetalleNegocio.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaStore,
  FaChartBar,
  FaHeadset,
  FaSignOutAlt
} from "react-icons/fa";

export default function DetalleNegocio() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [editando, setEditando] = useState(false);

  const [negocio, setNegocio] = useState({
    nombre: "Café el roble",
    propietario: "Nicole Rodriguez",
    correo: "nicole@ejemplo.com",
    banco: "BBVA",
    telefono: "999 327 0981",
  });

  const eliminarNegocio = () => {
    const confirmar = window.confirm("¿Eliminar este negocio?");
    if (confirmar) {
      navigate("/administrador");
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
            <li onClick={() => navigate("/")}>
              <FaHome /> Dashboard
            </li>

            <li className="active">
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
            <h1>Detalle del negocio</h1>
            <p>ID: {id}</p>
          </div>
        </header>

        <main className="admin-dashboard">

          <div className="form-card">

            <div className="form-left">

              <div className="form-group">
                <label>Nombre del negocio</label>
                <input
                  disabled={!editando}
                  value={negocio.nombre}
                  onChange={(e) =>
                    setNegocio({ ...negocio, nombre: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Propietario</label>
                <input
                  disabled={!editando}
                  value={negocio.propietario}
                  onChange={(e) =>
                    setNegocio({ ...negocio, propietario: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Correo</label>
                <input
                  disabled={!editando}
                  value={negocio.correo}
                  onChange={(e) =>
                    setNegocio({ ...negocio, correo: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Banco</label>
                <input
                  disabled={!editando}
                  value={negocio.banco}
                  onChange={(e) =>
                    setNegocio({ ...negocio, banco: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Teléfono</label>
                <input
                  disabled={!editando}
                  value={negocio.telefono}
                  onChange={(e) =>
                    setNegocio({ ...negocio, telefono: e.target.value })
                  }
                />
              </div>

              <div className="form-buttons">

                {!editando ? (
                  <>
                    <button
                      className="btn-primary"
                      onClick={() => setEditando(true)}
                    >
                      Modificar
                    </button>

                    <button
                      className="btn-dark"
                      onClick={eliminarNegocio}
                    >
                      Eliminar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn-primary"
                      onClick={() => {
                        setEditando(false);
                        navigate("/administrador");
                      }}
                    >
                      Guardar cambios
                    </button>

                    <button
                      className="btn-dark"
                      onClick={() => setEditando(false)}
                    >
                      Cancelar
                    </button>
                  </>
                )}

              </div>

            </div>

            <div className="form-right">
              <img
                src="https://i.pravatar.cc/200"
                alt="Perfil"
                className="profile-preview"
              />
              <p>Foto del negocio</p>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
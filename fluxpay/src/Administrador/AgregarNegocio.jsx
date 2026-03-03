import "./AgregarNegocio.css";
import { useNavigate } from "react-router-dom";
import { 
  FaHome, 
  FaStore, 
  FaChartBar, 
  FaHeadset, 
  FaSignOutAlt 
} from "react-icons/fa";

export default function AgregarNegocio() {

  const navigate = useNavigate();

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

            <li 
              className="active"
              onClick={() => navigate("/admin/negocios")}
            >
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
                <input type="text" placeholder="Eduardo Emmanuel" />
              </div>

              <div className="form-group">
                <label>Apellidos</label>
                <input type="text" placeholder="Argaez Castro" />
              </div>

              <div className="form-group">
                <label>Correo Electrónico</label>
                <input type="email" placeholder="correo@gmail.com" />
              </div>

              <div className="form-group">
                <label>Banco registrado</label>
                <input type="text" placeholder="BBVA" />
              </div>

              <div className="form-group">
                <label>Negocio</label>
                <input type="text" placeholder="Frutería el angel" />
              </div>

              <div className="form-group">
                <label>Número de teléfono</label>
                <input type="text" placeholder="999 327 0981" />
              </div>

              <div className="form-buttons">
                <button className="btn-primary">
                  Insertar negocio
                </button>

                <button 
                  type="button"
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
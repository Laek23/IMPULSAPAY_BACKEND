import "./GestionNegocios.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaStore,
  FaChartBar,
  FaHeadset,
  FaSignOutAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock
} from "react-icons/fa";

export default function GestionNegocios() {

  const navigate = useNavigate();

  const [negociosData] = useState([
    {
      id: 1,
      nombre: "Café el roble",
      propietario: "Nicole Rodriguez",
      correo: "nicole@ejemplo.com",
      estado: "activo",
      ventas: 320,
      ingresos: "$105,430",
    },
    {
      id: 2,
      nombre: "Moda Express",
      propietario: "Jorge Ramirez",
      correo: "jorge@ejemplo.com",
      estado: "activo",
      ventas: 245,
      ingresos: "$56,920",
    },
    {
      id: 3,
      nombre: "Tienda Luna",
      propietario: "Ana Pérez",
      correo: "ana@ejemplo.com",
      estado: "inactivo",
      ventas: 128,
      ingresos: "$32,780",
    },
  ]);

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
            <h1>Gestión negocios</h1>
            <p>Administra todos los negocios registrados</p>
          </div>

          <button
            className="btn-primary"
            onClick={() => navigate("/admin/agregar")}
          >
            + Agregar negocio
          </button>
        </header>

        <main className="admin-dashboard">

          <div className="negocios-table">
            <div className="table-header">
              <div>Negocio</div>
              <div>Propietario</div>
              <div>Estado</div>
              <div>Ventas</div>
              <div>Acciones</div>
            </div>

            {negociosData.map((negocio) => (
              <div className="table-row" key={negocio.id}>
                <div>{negocio.nombre}</div>

                <div>
                  {negocio.propietario}
                  <br />
                  <small>{negocio.correo}</small>
                </div>

                <div>
                  {negocio.estado === "activo" && (
                    <span className="badge activo">
                      <FaCheckCircle /> Activo
                    </span>
                  )}
                  {negocio.estado === "inactivo" && (
                    <span className="badge inactivo">
                      <FaTimesCircle /> Inactivo
                    </span>
                  )}
                  {negocio.estado === "verificar" && (
                    <span className="badge verificar">
                      <FaClock /> Verificar
                    </span>
                  )}
                </div>

                <div>
                  {negocio.ventas} | {negocio.ingresos}
                </div>

                <div className="acciones">
                  <button
                    className="btn-dark small"
                    onClick={() =>
                      navigate(`/admin/negocio/${negocio.id}`)
                    }
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}

          </div>

        </main>
      </div>
    </div>
  );
}
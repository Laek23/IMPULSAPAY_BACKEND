import "./Soporte.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  FaHome,
  FaStore,
  FaChartBar,
  FaHeadset,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Soporte() {
  const navigate = useNavigate();

  /* ================= ESTADO ================= */
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const [tickets] = useState([
    {
      id: 1,
      cliente: "Javier López",
      negocio: "Café el roble",
      estado: "Pendiente",
      prioridad: "Alta",
      tiempo: "Hace 1 hora",
    },
    {
      id: 2,
      cliente: "Andrea Morales",
      negocio: "Moda Express",
      estado: "Pendiente",
      prioridad: "Baja",
      tiempo: "Hace 2 horas",
    },
    {
      id: 3,
      cliente: "Ricardo Fernandez",
      negocio: "Tacos los amigos",
      estado: "En curso",
      prioridad: "Media",
      tiempo: "Hace 3 horas",
    },
    {
      id: 4,
      cliente: "Ana Pérez",
      negocio: "Tienda luna",
      estado: "Pendiente",
      prioridad: "Media",
      tiempo: "Hace 1 día",
    },
    {
      id: 5,
      cliente: "Daniel García",
      negocio: "Tech solutions",
      estado: "Resuelto",
      prioridad: "Alta",
      tiempo: "Hace 8 horas",
    },
  ]);

  /* ================= FILTRADO DINÁMICO ================= */

  const ticketsFiltrados = useMemo(() => {
    return tickets.filter((t) => {
      const coincideBusqueda =
        t.negocio.toLowerCase().includes(busqueda.toLowerCase()) ||
        t.cliente.toLowerCase().includes(busqueda.toLowerCase());

      const coincideFiltro =
        filtro === "Todos" ||
        t.estado === filtro ||
        (filtro === "Importante" && t.prioridad === "Alta");

      return coincideBusqueda && coincideFiltro;
    });
  }, [tickets, busqueda, filtro]);

  /* ================= ESTADÍSTICAS AUTOMÁTICAS ================= */

  const total = tickets.length;
  const pendientes = tickets.filter((t) => t.estado === "Pendiente").length;
  const enCurso = tickets.filter((t) => t.estado === "En curso").length;
  const resueltas = tickets.filter((t) => t.estado === "Resuelto").length;

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

            <li className="active">
              <FaHeadset /> Soporte
            </li>
          </ul>
        </div>

        <div
          className="logout"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <FaSignOutAlt /> Cerrar sesión
        </div>
      </aside>

      <div className="admin-main">
        <header className="header-wrapper">
          <div className="header-left">
            <h1>Centro soporte</h1>
            <p>Gestión dinámica de tickets</p>
          </div>

          <div className="header-user">
            <img src="https://i.pravatar.cc/40" alt="user" />
            <div>
              <strong>Alexander Castillo</strong>
              <small>alexander.castillo@gmail.com</small>
            </div>
          </div>
        </header>

        <main className="admin-dashboard">
          {/* ====== ESTADÍSTICAS DINÁMICAS ====== */}
          <div className="soporte-stats">
            <div>Total consultas: {total}</div>
            <div>Pendientes: {pendientes}</div>
            <div>En curso: {enCurso}</div>
            <div>Resueltas: {resueltas}</div>
          </div>

          {/* ====== FILTROS ====== */}
          <div className="soporte-filtros">
            <input
              placeholder="Buscar negocio o cliente"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            {["Todos", "Pendiente", "En curso", "Resuelto", "Importante"].map(
              (tipo) => (
                <button
                  key={tipo}
                  className={`btn ${filtro === tipo ? "active" : ""}`}
                  onClick={() => setFiltro(tipo)}
                >
                  {tipo}
                </button>
              )
            )}
          </div>

          {/* ====== TABLA DINÁMICA ====== */}
          <div className="tickets-table">
            <div className="table-header">
              <div>Cliente</div>
              <div>Estado</div>
              <div>Prioridad</div>
              <div>Última Actualización</div>
              <div>Acciones</div>
            </div>

            {ticketsFiltrados.length === 0 ? (
              <div className="table-row">
                <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                  No se encontraron tickets
                </div>
              </div>
            ) : (
              ticketsFiltrados.map((t) => (
                <div key={t.id} className="table-row">
                  <div>
                    <strong>{t.cliente}</strong>
                    <br />
                    <small>{t.negocio}</small>
                  </div>

                  <div>
                    <span
                      className={`badge ${t.estado
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {t.estado}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`badge prioridad ${t.prioridad.toLowerCase()}`}
                    >
                      {t.prioridad}
                    </span>
                  </div>

                  <div>{t.tiempo}</div>

                  <div>
                    <button
                      className="btn-ver"
                      onClick={() => alert(`Abriendo ticket #${t.id}`)}
                    >
                      Ver ticket
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ====== PAGINACIÓN SIMULADA ====== */}
          <div className="pagination">
            <span className="active-page">1</span>
            <span>2</span>
            <span>3</span>
          </div>
        </main>
      </div>
    </div>
  );
}
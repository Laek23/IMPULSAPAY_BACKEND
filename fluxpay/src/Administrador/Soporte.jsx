import "./Soporte.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";
import {
  FaHome,
  FaStore,
  FaChartBar,
  FaHeadset,
  FaSignOutAlt,
  FaCog
} from "react-icons/fa";

export default function Soporte() {
  const navigate = useNavigate();

  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const ticketsPorPagina = 5;

  const [tickets] = useState([
    {
      id: 1,
      cliente: "Javier López",
      negocio: "Café el roble",
      estado: "Pendiente",
      prioridad: "Alta",
      tiempo: "Hace 1 hora",
      mensaje: "No puedo generar el código QR para recibir pagos en mi negocio."
    },
    {
      id: 2,
      cliente: "Andrea Morales",
      negocio: "Moda Express",
      estado: "Pendiente",
      prioridad: "Baja",
      tiempo: "Hace 2 horas",
      mensaje: "No logro conectar mi cuenta bancaria con la plataforma."
    },
    {
      id: 3,
      cliente: "Ricardo Fernandez",
      negocio: "Tacos los amigos",
      estado: "En curso",
      prioridad: "Media",
      tiempo: "Hace 3 horas",
      mensaje: "Los pagos aparecen como pendientes aunque ya se realizaron."
    },
    {
      id: 4,
      cliente: "Ana Pérez",
      negocio: "Tienda luna",
      estado: "Pendiente",
      prioridad: "Media",
      tiempo: "Hace 1 día",
      mensaje: "Necesito ayuda para actualizar los datos de mi negocio."
    },
    {
      id: 5,
      cliente: "Daniel García",
      negocio: "Tech solutions",
      estado: "Resuelto",
      prioridad: "Alta",
      tiempo: "Hace 8 horas",
      mensaje: "Tuve un problema con una transacción duplicada."
    },

    {
      id: 6,
      cliente: "Carlos Vega",
      negocio: "ElectroShop",
      estado: "Pendiente",
      prioridad: "Alta",
      tiempo: "Hace 4 horas",
      mensaje: "El sistema no registra algunos pagos realizados."
    },
    {
      id: 7,
      cliente: "Laura Sánchez",
      negocio: "Cocina casera",
      estado: "En curso",
      prioridad: "Media",
      tiempo: "Hace 6 horas",
      mensaje: "Necesito cambiar el correo de mi cuenta."
    },
    {
      id: 8,
      cliente: "Pedro Castillo",
      negocio: "Juguetería feliz",
      estado: "Pendiente",
      prioridad: "Baja",
      tiempo: "Hace 5 horas",
      mensaje: "No puedo actualizar los precios de mis productos."
    },
    {
      id: 9,
      cliente: "Lucía Torres",
      negocio: "Papelería escolar",
      estado: "Resuelto",
      prioridad: "Media",
      tiempo: "Hace 10 horas",
      mensaje: "Se solucionó el problema con el QR."
    },
    {
      id: 10,
      cliente: "Mario León",
      negocio: "Zapatería León",
      estado: "Pendiente",
      prioridad: "Alta",
      tiempo: "Hace 2 días",
      mensaje: "Error al generar reportes de ventas."
    },
    {
      id: 11,
      cliente: "Fernando Díaz",
      negocio: "Tech World",
      estado: "En curso",
      prioridad: "Alta",
      tiempo: "Hace 12 horas",
      mensaje: "Mi cuenta aparece suspendida sin motivo."
    },
    {
      id: 12,
      cliente: "Sofía Herrera",
      negocio: "MiniMarket Centro",
      estado: "Pendiente",
      prioridad: "Media",
      tiempo: "Hace 7 horas",
      mensaje: "No aparecen mis ventas del día."
    },
    {
      id: 13,
      cliente: "Luis Gómez",
      negocio: "Panadería Sol",
      estado: "Resuelto",
      prioridad: "Baja",
      tiempo: "Hace 1 día",
      mensaje: "Consulta sobre métodos de pago."
    },
    {
      id: 14,
      cliente: "Andrea Ruiz",
      negocio: "Boutique Glam",
      estado: "Pendiente",
      prioridad: "Alta",
      tiempo: "Hace 3 horas",
      mensaje: "Error al retirar dinero a mi banco."
    },
    {
      id: 15,
      cliente: "Daniel Ortiz",
      negocio: "Farmacia Vida",
      estado: "En curso",
      prioridad: "Media",
      tiempo: "Hace 9 horas",
      mensaje: "No puedo cambiar la contraseña."
    },
  ]);

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

  const indiceUltimo = paginaActual * ticketsPorPagina;
  const indicePrimero = indiceUltimo - ticketsPorPagina;

  const ticketsActuales = ticketsFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(ticketsFiltrados.length / ticketsPorPagina);

  const total = tickets.length;
  const pendientes = tickets.filter((t) => t.estado === "Pendiente").length;
  const enCurso = tickets.filter((t) => t.estado === "En curso").length;
  const resueltas = tickets.filter((t) => t.estado === "Resuelto").length;

  const verTicket = (ticket) => {
    Swal.fire({
      title: `Ticket #${ticket.id}`,
      html: `
        <b>Cliente:</b> ${ticket.cliente}<br>
        <b>Negocio:</b> ${ticket.negocio}<br><br>
        <b>Problema:</b><br>${ticket.mensaje}
      `,
      icon: "info",
      confirmButtonText: "Cerrar",
      confirmButtonColor: "#0d2b5c"
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

        <div>

          <ul className="sidebar-menu">

            <li onClick={() => navigate("/admin/configuracion")}>
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

          <div className="soporte-stats">
            <div>Total consultas: {total}</div>
            <div>Pendientes: {pendientes}</div>
            <div>En curso: {enCurso}</div>
            <div>Resueltas: {resueltas}</div>
          </div>

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
                  onClick={() => {
                    setFiltro(tipo);
                    setPaginaActual(1);
                  }}
                >
                  {tipo}
                </button>
              )
            )}

          </div>

          <div className="tickets-table">

            <div className="table-header">
              <div>Cliente</div>
              <div>Estado</div>
              <div>Prioridad</div>
              <div>Última Actualización</div>
              <div>Acciones</div>
            </div>

            {ticketsActuales.map((t) => (
              <div key={t.id} className="table-row">

                <div>
                  <strong>{t.cliente}</strong>
                  <br />
                  <small>{t.negocio}</small>
                </div>

                <div>
                  <span className={`badge ${t.estado.toLowerCase().replace(" ","-")}`}>
                    {t.estado}
                  </span>
                </div>

                <div>
                  <span className={`badge prioridad ${t.prioridad.toLowerCase()}`}>
                    {t.prioridad}
                  </span>
                </div>

                <div>{t.tiempo}</div>

                <div>
                  <button
                    className="btn-ver"
                    onClick={() => verTicket(t)}
                  >
                    Ver ticket
                  </button>
                </div>

              </div>
            ))}

          </div>

          <div className="pagination">

            <button
              className="page-btn"
              onClick={() => setPaginaActual(paginaActual - 1)}
              disabled={paginaActual === 1}
            >
              {"<"}
            </button>

            {[...Array(totalPaginas)].map((_, i) => (
              <button
                key={i}
                className={`page-btn ${paginaActual === i + 1 ? "active" : ""}`}
                onClick={() => setPaginaActual(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="page-btn"
              onClick={() => setPaginaActual(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
            >
              {">"}
            </button>

          </div>

        </main>
      </div>
    </div>
  );
}
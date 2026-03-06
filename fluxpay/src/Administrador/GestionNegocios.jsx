import "./GestionNegocios.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaStore,
  FaChartBar,
  FaHeadset,
  FaSignOutAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCog
} from "react-icons/fa";

export default function GestionNegocios() {

  const navigate = useNavigate();

  const negociosPorPagina = 5;

  const [paginaActual, setPaginaActual] = useState(1);

  const [negociosData, setNegociosData] = useState([
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
    {
      id: 4,
      nombre: "Panadería Sol",
      propietario: "Luis Gómez",
      correo: "luis@ejemplo.com",
      estado: "activo",
      ventas: 410,
      ingresos: "$89,200",
    },
    {
      id: 5,
      nombre: "ElectroShop",
      propietario: "Carlos Vega",
      correo: "carlos@ejemplo.com",
      estado: "verificar",
      ventas: 98,
      ingresos: "$24,500",
    },
    {
      id: 6,
      nombre: "MiniMarket Centro",
      propietario: "Sofía Herrera",
      correo: "sofia@ejemplo.com",
      estado: "activo",
      ventas: 522,
      ingresos: "$132,400",
    },
    {
      id: 7,
      nombre: "Zapatería León",
      propietario: "Mario León",
      correo: "mario@ejemplo.com",
      estado: "inactivo",
      ventas: 77,
      ingresos: "$12,700",
    },
    {
      id: 8,
      nombre: "Papelería Escolar",
      propietario: "Lucía Torres",
      correo: "lucia@ejemplo.com",
      estado: "activo",
      ventas: 201,
      ingresos: "$41,200",
    },
    {
      id: 9,
      nombre: "Juguetería Feliz",
      propietario: "Pedro Castillo",
      correo: "pedro@ejemplo.com",
      estado: "verificar",
      ventas: 54,
      ingresos: "$10,400",
    },
    {
      id: 10,
      nombre: "Boutique Glam",
      propietario: "Andrea Ruiz",
      correo: "andrea@ejemplo.com",
      estado: "activo",
      ventas: 189,
      ingresos: "$37,900",
    },
    {
      id: 11,
      nombre: "Farmacia Vida",
      propietario: "Daniel Ortiz",
      correo: "daniel@ejemplo.com",
      estado: "activo",
      ventas: 340,
      ingresos: "$78,500",
    },
    {
      id: 12,
      nombre: "Cocina Casera",
      propietario: "Laura Sánchez",
      correo: "laura@ejemplo.com",
      estado: "verificar",
      ventas: 63,
      ingresos: "$13,700",
    },
    {
      id: 13,
      nombre: "Tech World",
      propietario: "Fernando Díaz",
      correo: "fernando@ejemplo.com",
      estado: "activo",
      ventas: 275,
      ingresos: "$94,200",
    },
  ]);

  useEffect(() => {
    const nuevo = localStorage.getItem("nuevoNegocio");

    if (nuevo) {
      const negocio = JSON.parse(nuevo);
      setNegociosData((prev) => [...prev, negocio]);
      localStorage.removeItem("nuevoNegocio");
    }
  }, []);

  const indiceUltimo = paginaActual * negociosPorPagina;
  const indicePrimero = indiceUltimo - negociosPorPagina;

  const negociosActuales = negociosData.slice(indicePrimero, indiceUltimo);

  const totalPaginas = Math.ceil(negociosData.length / negociosPorPagina);

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

            <li onClick={() => navigate("/admin/reportes")}>
              <FaChartBar /> Reportes globales
            </li>

            <li>
              <FaHeadset /> Soporte
            </li>

          </ul>

        </div>

        {/* PARTE INFERIOR DEL SIDEBAR */}
        <div>

          <ul className="sidebar-menu">

            <li onClick={() => navigate("/admin/configuracion")}>
              <FaCog /> Configuración
            </li>

          </ul>

          <div className="logout" onClick={() => navigate("/login")}>
            <FaSignOutAlt /> Cerrar sesión
          </div>

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

            {negociosActuales.map((negocio) => (
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
                    onClick={() => navigate(`/admin/negocio/${negocio.id}`)}
                  >
                    Editar
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
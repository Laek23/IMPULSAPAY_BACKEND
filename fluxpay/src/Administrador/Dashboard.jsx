import "./DashboardAdmin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

import {
  FaHome,
  FaStore,
  FaChartBar,
  FaHeadset,
  FaSignOutAlt,
  FaBell,
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaCog
} from "react-icons/fa";

export default function DashboardAdmin() {

  const navigate = useNavigate();

  // MESES DINÁMICOS
  const fecha = new Date();

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const mesActual = meses[fecha.getMonth()];
  const mesAnterior = meses[fecha.getMonth() - 1 < 0 ? 11 : fecha.getMonth() - 1];

  // FUNCIÓN BONUS
  const getComparacion = (valor) => {
    const esPositivo = valor >= 0;

    return (
      <span className={esPositivo ? "positive" : "negative"}>
        {esPositivo ? "↑" : "↓"} {Math.abs(valor)}% respecto a {mesAnterior}
      </span>
    );
  };

  const [chartData] = useState({
    series: [
      { name: "Ingresos", data: [1200, 2100, 1800, 2500, 2200, 3000, 2800] },
      { name: "Transacciones", data: [30, 45, 38, 50, 42, 60, 55] },
    ],
    options: {
      chart: { type: "area", toolbar: { show: false } },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      colors: ["#0d2b5c", "#31b0bd"],
      fill: {
        type: "gradient",
        gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 },
      },
      xaxis: { categories: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] },
      legend: { position: "top" },
    },
  });

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <div>
          <div className="admin-logo-container">
            <img src="/fluxpay.jpg" alt="FluxPay Logo" className="admin-logo" />
          </div>

          <ul className="sidebar-menu">

            <li
              className="active"
              onClick={() => navigate("/admin/dashboard")}
            >
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

        {/* PARTE INFERIOR */}
        <div>

          <ul className="sidebar-menu">
            <li onClick={() => navigate("/admin/configuracion")}>
              <FaCog /> Configuración
            </li>
          </ul>

          <div
            className="logout"
            onClick={() => navigate("/")}
          >
            <FaSignOutAlt /> Cerrar sesión
          </div>

        </div>

      </aside>

      {/* MAIN */}
      <div className="admin-main">

        {/* HEADER */}
        <header className="header-wrapper modern-header">

          <div className="header-left">
            <h1>Dashboard de Administrador</h1>
            <p>Bienvenido administrador</p>
          </div>

          <div className="header-right">

            <div className="user-info">
              <div className="user-text">
                <strong>Alexander Castillo</strong>
                <span>castillobarbudoalexander@gmail.com</span>
              </div>

              <div className="avatar-container">
                <img
                  src="https://i.pravatar.cc/150?u=alex"
                  alt="User"
                  className="p-avatar"
                />
                <span className="status-dot"></span>
              </div>
            </div>

            <div className="notification-icon">
              <FaBell />
            </div>

          </div>
        </header>

        {/* CONTENIDO */}
        <main className="admin-dashboard">

          <div className="stats-grid">

            <div className="stat-card">
              <h4>Ventas del mes ({mesActual})</h4>
              <p>$12,350 {getComparacion(8)}</p>
            </div>

            <div className="stat-card">
              <h4>Transacciones del mes ({mesActual})</h4>
              <p>$56 {getComparacion(12)}</p>
            </div>

            <div className="stat-card">
              <h4>Ingresos del mes ({mesActual})</h4>
              <p>$45,230 {getComparacion(15)}</p>
            </div>

            <div className="stat-card">
              <h4>Total acumulado</h4>
              <p>$324,500 {getComparacion(-5)}</p>
            </div>

          </div>

          <div className="middle-section">
            <div className="chart-box">
              <h3>Ingresos Mensuales (visuales)</h3>
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="area"
                height={250}
              />
            </div>

            <div className="recent-business">
              <h3>Negocios recientes</h3>
              <ul>
                <li>
                  <strong>Café el roble</strong>
                  <span>12 ventas • $3,200</span>
                </li>
                <li>
                  <strong>Moda Express</strong>
                  <span>8 ventas • $2,150</span>
                </li>
                <li>
                  <strong>Tienda Luna</strong>
                  <span>5 ventas • $1,100</span>
                </li>
                <li>
                  <strong>Tech Solutions</strong>
                  <span>15 ventas • $4,500</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bottom-section">
            <div className="action-card">
              <h3>Gestión de Negocios</h3>
              <div className="actions">

                <button
                  className="btn-primary"
                  onClick={() => navigate("/admin/negocios")}
                >
                  Ver negocios
                </button>

                <button className="btn-dark">
                  Agregar negocio
                </button>

              </div>
            </div>

            <div className="action-card">
              <h3>Centro de soporte</h3>
              <div className="actions">
                <button
                  className="btn-primary"
                  onClick={() => navigate("/admin/soporte")}
                >
                  Ver consultas
                </button>
                <button className="btn-dark">Nuevo ticket</button>
              </div>
            </div>
          </div>

          <div className="reports">
            <div className="report-item">
              <FaUsers /> 245 Negocios registrados
            </div>
            <div className="report-item">
              <FaShoppingCart /> 8,450 Transacciones totales
            </div>
            <div className="report-item">
              <FaDollarSign /> $324,500 Ingresos totales
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
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
  FaSearch,
  FaBell,
  FaDollarSign,
  FaShoppingCart,
  FaUsers
} from "react-icons/fa";

export default function DashboardAdmin() {

  const navigate = useNavigate(); 

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

      <aside className="admin-sidebar">
        <div>
          <div className="admin-logo-container">
            <img src="/fluxpay.jpg" alt="FluxPay Logo" className="admin-logo" />
          </div>

          <ul className="sidebar-menu">
            <li className="active">
              <FaHome /> Dashboard
            </li>

            {/* 👇 AQUI ESTA EL CAMBIO */}
            <li onClick={() => navigate("/admin/negocios")} style={{ cursor: "pointer" }}>
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
            <h1>Dashboard</h1>
            <p>Hola, Alexander Castillo — Bienvenido de nuevo</p>
          </div>

          <div className="header-right">
            <div className="search-bar">
              <FaSearch />
              <input type="text" placeholder="Buscar..." />
            </div>

            <button className="notif-btn">
              <FaBell />
            </button>

            <div className="profile-section">
              <div className="profile-info">
                <span className="p-name">Alexander Castillo</span>
                <span className="p-role">Administrador</span>
              </div>
              <img
                src="https://i.pravatar.cc/150?u=alex"
                alt="User"
                className="p-avatar"
              />
            </div>
          </div>
        </header>

        <main className="admin-dashboard">

          <div className="stats-grid">
            <div className="stat-card">
              <h4>Ventas de hoy</h4>
              <p>$12,350 <span className="positive">+8%</span></p>
            </div>

            <div className="stat-card">
              <h4>Transacciones</h4>
              <p>56 <span className="positive">+12%</span></p>
            </div>

            <div className="stat-card">
              <h4>Ingresos del mes</h4>
              <p>$45,230 <span className="positive">+15%</span></p>
            </div>

            <div className="stat-card">
              <h4>Total acumulado</h4>
              <p>$324,500</p>
            </div>
          </div>

          <div className="middle-section">
            <div className="chart-box">
              <h3>Estadísticas recientes</h3>
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

                {/* 👇 TAMBIEN AQUI */}
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
                <button className="btn-primary">Ver consultas</button>
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
import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import {
    FaHome, FaMoneyBill, FaQrcode, FaHistory,
    FaBox, FaUsers, FaUniversity, FaChartBar,
    FaCog, FaSignOutAlt, FaBell
} from "react-icons/fa";
import "./LayoutNegocio.css";

export default function LayoutNegocio() {

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div>
                    <div className="admin-logo-container">
                        <div className="sidebar-logo-wrapper">
                            <img
                                src="/fluxpay.jpg"
                                alt="FluxPay Logo"
                                className="logo-img"
                            />
                        </div>
                    </div>

                    <nav>
                        <ul className="sidebar-menu">
                            <li>
                                <NavLink to="/Negocio/Dashboard">
                                    <FaHome /> <span>Dashboard</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/Negocio/Cobrar" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <FaMoneyBill /> <span>Cobrar</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/Negocio/Productos">
                                    <FaBox /> <span>Productos</span>
                                </NavLink>
                            </li>

                            <li className="menu-item-static">
                                <FaQrcode /> <span>QR</span>
                            </li>

                            <li>
                                <NavLink to="/Negocio/Historial">
                                    <FaHistory /> <span>Historial</span>
                                </NavLink>
                            </li>

                            <li className="menu-item-static">
                                <FaUsers /> <span>Clientes</span>
                            </li>

                            <li>
                                <NavLink to="/Negocio/Cuenta">
                                    <FaUniversity /> <span>Cuenta / Banco</span>
                                </NavLink>
                            </li>
                            {/* Cambia el <li> estático por un NavLink */}
                            <li>
                                <NavLink to="/Negocio/Reportes">
                                    <FaChartBar /> <span>Reportes</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/Negocio/Configuracion">
                                    <FaCog /> <span>Configuración</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div
                    className="logout"
                    style={{
                        display: 'flex',
                        alignItems: 'center', // Corregido: 'center' entre comillas
                        gap: '12px',
                        padding: '12px 20px',
                        cursor: 'pointer',
                        color: '#94a3b8',
                        fontWeight: '600',
                        fontSize: '14px',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        marginTop: 'auto'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        e.currentTarget.style.color = '#f87171';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#94a3b8';
                    }}
                    onClick={() => {
                        if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
                            console.log("Cerrando sesión...");
                            // Aquí puedes añadir: window.location.href = '/login';
                        }
                    }}
                >
                    <FaSignOutAlt style={{ fontSize: '18px' }} />
                    <span>Cerrar sesión</span>
                </div>
            </aside>

            {/* MAIN */}
            <main className="admin-main">

                {/* NUEVO HEADER */}
                <header className="negocio-header">

                    <div className="negocio-header-left">
                        <div>
                            <h1 className="negocio-title">
                                Panel de Negocio
                            </h1>
                            <p className="negocio-subtitle">
                                Administra tus ventas y productos fácilmente
                            </p>
                        </div>
                    </div>

                    <div className="negocio-header-right">

                        <div className="negocio-user-box">
                            <div className="negocio-user-info">
                                <span className="negocio-user-name">
                                    José Aguilar
                                </span>
                                <span className="negocio-user-email">
                                    joseagui@gmail.com
                                </span>
                            </div>

                            <div className="negocio-avatar-container">
                                <div className="negocio-avatar-wrapper">
                                    <img
                                        src="https://i.pravatar.cc/150?img=32"
                                        alt="Usuario"
                                    />
                                </div>

                                <div className="negocio-online-dot"></div>
                            </div>
                        </div>

                        <FaBell className="negocio-bell-icon" />

                    </div>
                </header>

                <section className="view-container">
                    <Outlet />
                </section>

            </main>
        </div>
    );
}
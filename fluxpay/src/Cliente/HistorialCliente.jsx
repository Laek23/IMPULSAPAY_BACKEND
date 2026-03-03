import "../styles.css";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import TarjetasCliente from "./TarjetasCliente";
import { Button, Card, Row, Col } from "react-bootstrap";
import PaymentForm from "./PaymentForm";
import DataGrid from "../DataGrid";

const HistorialCliente = () => {
    return (
    <div className="page">
    {/* Sidebar */}
      <div className="side-bar">
        <div className="logo-container">
          <img
            src="/fluxpay.jpg"
            alt="FluxPay Logo"
            className="logo-img"
          />
        </div>
      </div>
      {/* Contenido principal */}
    <div className="main-content">
        <Navbar
          nombre="Alexander Castillo"
          correo="Alexander.Correo@Gmail.com  "
          rol="Cliente"
        />
    <div style={{ width: "400px", margin: "60px auto 0 auto", textAlign: "center" }}>
        <h1>Historial de compras</h1>
    </div>
    <div>
    {/* Tabla de contenido */}
    <div className="container d-flex justify-content-center mt-4">
    <div style={{ width: "85%", maxWidth: "1100px" }}>
        <DataGrid
        columns={["Fecha", "Concepto", "Monto", "Estado"]}
        data={[
            ["2/12/2024", "Comida", "MXN 1912", "Pendiente"],
            ["2/03/2024", "Pago", "MXN 1912", "Pendiente"],
            ["5/09/2025", "Tienda", "MXN 1912", "Pendiente"],
            ["2/01/2026", "Disp", "MXN 1912", "Pendiente"],
        ]}
        />
    </div>
    </div>
    </div>
    </div>
    </div>
    )
}

export default HistorialCliente
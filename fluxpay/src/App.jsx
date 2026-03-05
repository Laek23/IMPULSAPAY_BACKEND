import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

/* ================= CLIENTE ================= */
import Dashboard from "./Cliente/Dashboard";
import ClienteTarjeta from "./Cliente/ClienteTarjeta";
import HistorialCliente from "./Cliente/HistorialCliente";
import ClienteConfiguracion from "./Cliente/ClienteConfiguracion";

/* ================= ADMIN ================= */
import DashboardAdmin from "./Administrador/Dashboard";
import GestionNegocios from "./Administrador/GestionNegocios";
import AgregarNegocio from "./Administrador/AgregarNegocio";
import DetalleNegocio from "./Administrador/DetalleNegocio";
import ReportesGlobales from "./Administrador/ReportesGlobales";
import Soporte from "./Administrador/Soporte";

/* ================= NEGOCIO ================= */
import DashboardNegocio from "./Negocio/Dashboard";
import ProductosNegocio from "./Negocio/Productos";
import LayoutNegocio from "./Negocio/LayoutNegocio";
import HistorialNegocio from "./Negocio/Historial";

function App() {
  return (
    <Routes>

      {/* ================= PUBLICO ================= */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= CLIENTE ================= */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cliente/clienteTarjetas" element={<ClienteTarjeta />} />
      <Route path="/cliente/historial" element={<HistorialCliente />} />
      <Route path="/cliente/configuracion" element={<ClienteConfiguracion />} />

      {/* ================= ADMIN ================= */}
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      <Route path="/admin/negocios" element={<GestionNegocios />} />
      <Route path="/admin/agregar" element={<AgregarNegocio />} />
      <Route path="/admin/negocio/:id" element={<DetalleNegocio />} />
      <Route path="/admin/reportes" element={<ReportesGlobales />} />
      <Route path="/admin/soporte" element={<Soporte />} />

      {/* ================= NEGOCIO ================= */}
      <Route path="/negocio" element={<LayoutNegocio />}>
        <Route index element={<DashboardNegocio />} />
        <Route path="dashboard" element={<DashboardNegocio />} />
        <Route path="productos" element={<ProductosNegocio />} />
        <Route path="historial" element={<HistorialNegocio />} />
      </Route>

    

    </Routes>
  );
}

export default App;
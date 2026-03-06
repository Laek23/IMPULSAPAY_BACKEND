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
import HistorialNegocio from './Negocio/Historial'; 
import ReportesNegocio from "./Negocio/Reportes"; // Asegúrate de que el nombre del archivo coincida
import CobrarNegocio from "./Negocio/Cobrar";
import GenerarQR from "./Negocio/GenerarQR";
import Cuenta from "./Negocio/Cuenta";
import ConfiguracionNegocio from "./Negocio/Configuracion";
import Clientes from './Negocio/Clientes';
function App() {
  return (
    <Routes>

      {/* ================= PUBLICO ================= */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= CLIENTE ================= */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Cliente/clienteTarjetas" element={<ClienteTarjeta />} />
         <Route path="/Cliente/HistorialCliente" element={<HistorialCliente/>} />
      <Route path="/Cliente/ClienteConfiguracion" element={<ClienteConfiguracion/>} />

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
        <Route path="Dashboard" element={<DashboardNegocio />} />
        <Route path="Productos" element={<ProductosNegocio />} />
        <Route path="Historial" element={<HistorialNegocio />} />
        <Route path="Reportes" element={<ReportesNegocio />} />
        <Route path="Cobrar" element={<CobrarNegocio />} />
        <Route path="QR" element={<GenerarQR />} />
        <Route path="Cuenta" element={<Cuenta />} />
       <Route path="Configuracion" element={<ConfiguracionNegocio />} />
       <Route path="Clientes" element={<Clientes />} />
      </Route>

    

    </Routes>
  );
}

export default App;


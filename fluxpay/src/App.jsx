import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Cliente/Dashboard";
import ClienteTarjeta from "./Cliente/ClienteTarjeta";

import DashboardAdmin from "./Administrador/Dashboard";
import GestionNegocios from "./Administrador/GestionNegocios";
import AgregarNegocio from "./Administrador/AgregarNegocio";
import DetalleNegocio from "./Administrador/DetalleNegocio";

function App() {
  return (
    <Routes>

      {/* PUBLICO */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* CLIENTE */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Cliente/clienteTarjetas" element={<ClienteTarjeta />} />

      {/* ADMIN */}
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      <Route path="/admin/negocios" element={<GestionNegocios />} />
      <Route path="/admin/agregar" element={<AgregarNegocio />} />
      <Route path="/admin/negocio/:id" element={<DetalleNegocio />} />

    </Routes>
  );
}

export default App;
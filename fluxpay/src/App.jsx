import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Cliente/Dashboard";
import ClienteTarjeta from "./Cliente/ClienteTarjeta";
import DashboardAdmin from "./Administrador/Dashboard";
import HistorialCliente from "./Cliente/HistorialCliente";
import ClienteConfiguracion from "./Cliente/ClienteConfiguracion";





function App() {
  return (
    <Routes>
       {/*[PUBLICO*/} 
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/*ADMIN*/}
       <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />

      {/*CLIENTE*/}
      <Route path="/Cliente/clienteTarjetas" element={<ClienteTarjeta />} />
      <Route path="/Cliente/HistorialCliente" element={<HistorialCliente/>} />
      <Route path="/Cliente/ClienteConfiguracion" element={<ClienteConfiguracion/>} />
    </Routes>
  );
}

export default App;
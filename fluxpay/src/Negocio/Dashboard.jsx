import React, { useState, useEffect } from "react";
import { 
  FaChartLine, FaCookie, FaCandyCane, FaWineBottle, 
  FaAppleAlt, FaFileDownload 
} from "react-icons/fa";
import * as XLSX from "xlsx";
import axios from "axios";

export default function DashboardNegocio() {
  const [mesSeleccionado, setMesSeleccionado] = useState("Todos");
  const [activeTooltip, setActiveTooltip] = useState(null);

  // 🔥 ESTADOS INICIALIZADOS CORRECTAMENTE
  const [productos, setProductos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [resumen, setResumen] = useState({
    total: 0,
    efectivo: 0,
    qr: 0
  });

  // 🔌 CONEXIÓN A LARAVEL
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    // Petición de Productos
    axios.get("http://127.0.0.1:8000/api/tienda/dashboard/productos", config)
      .then(res => setProductos(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error("Error productos:", err));

    // Petición de Ingresos (para la gráfica)
    axios.get("http://127.0.0.1:8000/api/tienda/dashboard/ingresos", config)
      .then(res => setIngresos(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error("Error ingresos:", err));

    // Petición de Resumen (para las cards superiores)
    axios.get("http://127.0.0.1:8000/api/tienda/dashboard/resumen", config)
      .then(res => setResumen(res.data))
      .catch(err => console.error("Error resumen:", err));

  }, []);

  // 🔥 LÓGICA DE FILTRADO Y CÁLCULO
  const datosFiltrados = productos;

  // Corregido: Buscamos por 'metodo_pago' y extraemos 'total' según tu controlador de Laravel
  const efectivo = parseFloat(ingresos.find(i => i.metodo_pago === "efectivo")?.total || 0);
  const qr = parseFloat(ingresos.find(i => i.metodo_pago === "qr")?.total || 0);
  const totalGrafica = efectivo + qr || 1; // Evita división por cero

  // ICONOS
  const getIcon = (name) => {
    const iconStyle = { fontSize: "1.2rem", marginRight: "10px", display: "flex", alignItems: "center" };
    switch (name) {
      case "Galletas": return <FaCookie style={{ ...iconStyle, color: "#1e3a8a" }} />;
      case "Sabritas": return <FaAppleAlt style={{ ...iconStyle, color: "#0f172a" }} />;
      case "Refrescos": return <FaWineBottle style={{ ...iconStyle, color: "#1e40af" }} />;
      case "Golosinas": return <FaCandyCane style={{ ...iconStyle, color: "#1e3a8a" }} />;
      default: return <FaAppleAlt style={{ ...iconStyle, color: "#0f172a" }} />;
    }
  };

  const exportToExcel = () => {
    const worksheet1 = XLSX.utils.json_to_sheet([{ Concepto: "Total", Valor: resumen.total }, { Concepto: "Efectivo", Valor: resumen.efectivo }, { Concepto: "QR", Valor: resumen.qr }]);
    const worksheet2 = XLSX.utils.json_to_sheet(datosFiltrados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, "Resumen_Financiero");
    XLSX.utils.book_append_sheet(workbook, worksheet2, "Inventario_Detalle");
    XLSX.writeFile(workbook, `Reporte_FluxPay_${mesSeleccionado}.xlsx`);
  };

  return (
    <section className="admin-dashboard" style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h2 className="admin-title" style={{ color: "#0f172a", fontWeight: "800" }}>Dashboard</h2>
          <p className="welcome-text" style={{ color: "#334155" }}>Bienvenido a FluxPay</p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <select 
            value={mesSeleccionado} 
            onChange={(e) => setMesSeleccionado(e.target.value)}
            style={{ width: "160px", padding: "10px", borderRadius: "8px", border: "2px solid #0f172a", color: "#0f172a", fontWeight: "600", backgroundColor: "white" }}
          >
            <option value="Todos">Todos los meses</option>
            <option value="Enero">Enero</option>
            <option value="Febrero">Febrero</option>
            <option value="Marzo">Marzo</option>
          </select>

          <button onClick={exportToExcel} 
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "#0f172a", color: "white", border: "none", padding: "12px 20px", borderRadius: "10px", cursor: "pointer", fontWeight: "700" }}>
            <FaFileDownload /> Descargar Reporte
          </button>
        </div>
      </div>

      {/* CARDS SUPERIORES */}
      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <div className="stat-card glass-card" style={{ padding: "20px", background: "white", borderRadius: "15px", borderLeft: "5px solid #0f172a", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><h4>Ingresos efectivo</h4><FaChartLine style={{color: "#0f172a"}} /></div>
          <p style={{ fontSize: "1.8rem", fontWeight: "800", color: "#0f172a", margin: "10px 0 0" }}>${resumen.efectivo}</p>
        </div>
        <div className="stat-card glass-card" style={{ padding: "20px", background: "white", borderRadius: "15px", borderLeft: "5px solid #1e3a8a", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><h4>Ingresos en QR</h4><FaChartLine style={{color: "#1e3a8a"}} /></div>
          <p style={{ fontSize: "1.8rem", fontWeight: "800", color: "#1e3a8a", margin: "10px 0 0" }}>${resumen.qr}</p>
        </div>
        <div className="stat-card glass-card" style={{ padding: "20px", background: "white", borderRadius: "15px", borderLeft: "5px solid #1e40af", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><h4>Total General</h4><FaChartLine style={{color: "#1e40af"}} /></div>
          <p style={{ fontSize: "1.8rem", fontWeight: "800", color: "#1e40af", margin: "10px 0 0" }}>${resumen.total}</p>
        </div>
      </div>

      <div className="inventory-section" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
        <div>
          <h3 style={{ color: "#0f172a", marginBottom: "20px" }}>Inventario Actual</h3>
          <div style={{ background: "white", borderRadius: "20px", padding: "20px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                  <th style={{ color: "#64748b", padding: "15px", textAlign: "left" }}>Producto</th>
                  <th style={{ color: "#64748b", padding: "15px", textAlign: "center" }}>Unidades</th>
                  <th style={{ color: "#64748b", padding: "15px", textAlign: "right" }}>Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {datosFiltrados.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "15px", display: "flex", alignItems: "center", color: "#0f172a", fontWeight: "500" }}>
                      {getIcon(item.name)}
                      {item.name}
                    </td>
                    <td style={{fontWeight: "bold", color: "#1e3a8a", textAlign: "center"}}>{item.units}</td>
                    <td style={{color: "#0f172a", fontWeight: "bold", textAlign: "right"}}>${item.income}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GRÁFICA DE MÉTODOS DE PAGO */}
        <div style={{ background: "white", padding: "30px", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
          <p style={{fontWeight: "900", marginBottom: "40px", color: "#0f172a", textAlign: "center"}}>Método de Pago</p>
          
          <div style={{ height: "200px", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "40px" }}>
            {/* Barra Efectivo */}
            <div style={{ position: "relative", width: "50px", height: "100%", display: "flex", alignItems: "flex-end" }}
                 onMouseEnter={() => setActiveTooltip("efectivo")}
                 onMouseLeave={() => setActiveTooltip(null)}>
              {activeTooltip === "efectivo" && (
                <div style={{ position: "absolute", top: "-45px", left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "white", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", zIndex: 10 }}>
                  ${efectivo}
                </div>
              )}
              <div style={{ height: `${(efectivo / totalGrafica) * 100}%`, width: "100%", background: "linear-gradient(to top, #020617, #1e3a8a)", borderRadius: "8px 8px 0 0", transition: "height 0.5s ease" }}></div>
            </div>

            {/* Barra QR */}
            <div style={{ position: "relative", width: "50px", height: "100%", display: "flex", alignItems: "flex-end" }}
                 onMouseEnter={() => setActiveTooltip("qr")}
                 onMouseLeave={() => setActiveTooltip(null)}>
              {activeTooltip === "qr" && (
                <div style={{ position: "absolute", top: "-45px", left: "50%", transform: "translateX(-50%)", background: "#1e3a8a", color: "white", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", zIndex: 10 }}>
                  ${qr}
                </div>
              )}
              <div style={{ height: `${(qr / totalGrafica) * 100}%`, width: "100%", background: "linear-gradient(to top, #1e3a8a, #3b82f6)", borderRadius: "8px 8px 0 0", transition: "height 0.5s ease" }}></div>
            </div>
          </div>

          <div style={{marginTop: "30px", borderTop: "1px solid #f1f5f9", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "10px"}}>
            <div style={{display: "flex", justifyContent: "space-between", fontSize: "0.9rem"}}>
              <span style={{color: "#64748b"}}>● Efectivo</span>
              <span style={{fontWeight: "700", color: "#0f172a"}}>{((efectivo/totalGrafica)*100).toFixed(1)}%</span>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", fontSize: "0.9rem"}}>
              <span style={{color: "#3b82f6"}}>● Pago QR</span>
              <span style={{fontWeight: "700", color: "#1e3a8a"}}>{((qr/totalGrafica)*100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
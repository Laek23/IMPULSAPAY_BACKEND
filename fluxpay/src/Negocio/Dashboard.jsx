import React, { useState } from "react";
import { 
  FaChartLine, FaCookie, FaCandyCane, FaWineBottle, 
  FaAppleAlt, FaFileDownload 
} from "react-icons/fa";
import * as XLSX from "xlsx";

export default function DashboardNegocio() {
  const [mesSeleccionado, setMesSeleccionado] = useState("Todos");
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Mapeo de iconos con colores azul oscuro profundo
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

  const inventoryData = [
    { id: 1, name: "Galletas", units: 10, income: "$1912", mes: "Enero" },
    { id: 2, name: "Sabritas", units: 12, income: "$1121", mes: "Enero" },
    { id: 3, name: "Refrescos", units: 6, income: "$871", mes: "Febrero" },
    { id: 4, name: "Golosinas", units: 33, income: "$119", mes: "Marzo" },
  ];

  const datosFiltrados = mesSeleccionado === "Todos" 
    ? inventoryData 
    : inventoryData.filter(item => item.mes === mesSeleccionado);

  const exportToExcel = () => {
    const worksheet1 = XLSX.utils.json_to_sheet([{ Concepto: "Reporte", Valor: "Ingresos" }]);
    const worksheet2 = XLSX.utils.json_to_sheet(datosFiltrados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, "Resumen");
    XLSX.utils.book_append_sheet(workbook, worksheet2, "Inventario");
    XLSX.writeFile(workbook, `Reporte_Oscuro_${mesSeleccionado}.xlsx`);
  };

  return (
    <section className="admin-dashboard" style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h2 className="admin-title" style={{ color: "#0f172a", fontWeight: "800" }}>Dashboard</h2>
          <p className="welcome-text" style={{ color: "#334155" }}>Bienvenido Negocio</p>
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

      {/* STATS CARDS - AZULES OSCUROS */}
      <div className="stats-grid">
        <div className="stat-card glass-card" style={{ borderLeft: "5px solid #0f172a" }}>
          <div className="card-header"><h4>Ingresos efectivo</h4><FaChartLine style={{color: "#0f172a"}} /></div>
          <p className="amount" style={{ color: "#0f172a" }}>$50000.000</p>
        </div>
        <div className="stat-card glass-card" style={{ borderLeft: "5px solid #1e3a8a" }}>
          <div className="card-header"><h4>Ingresos en QR</h4><FaChartLine style={{color: "#1e3a8a"}} /></div>
          <p className="amount" style={{ color: "#1e3a8a" }}>$8200.000</p>
        </div>
        <div className="stat-card glass-card" style={{ borderLeft: "5px solid #1e40af" }}>
          <div className="card-header"><h4>Pagos recibidos</h4><FaChartLine style={{color: "#1e40af"}} /></div>
          <p className="amount" style={{ color: "#1e40af" }}>$500.000</p>
        </div>
      </div>

      <div className="inventory-section">
        <h3 className="section-subtitle" style={{ color: "#0f172a", marginBottom: "20px" }}>Inventario Actual</h3>
        <div className="inventory-container">
          
          {/* TABLA SIN LINEA AZUL EN HEADER */}
          <table className="inventory-table" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                <th style={{ color: "#0f172a", padding: "15px", textAlign: "left" }}>Producto</th>
                <th style={{ color: "#0f172a", padding: "15px", textAlign: "center" }}>Unidades</th>
                <th style={{ color: "#0f172a", padding: "15px", textAlign: "right" }}>Ingresos</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td className="product-cell" style={{ padding: "15px" }}>
                    {getIcon(item.name)}
                    {item.name}
                  </td>
                  <td style={{fontWeight: "bold", color: "#1e3a8a", textAlign: "center"}}>{item.units}</td>
                  <td className="income-text" style={{color: "#0f172a", fontWeight: "bold", textAlign: "right"}}>{item.income}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* GRÁFICA EN AZULES MUY OSCUROS */}
          <div className="category-chart glass-card" style={{padding: "20px", borderRadius: "20px", position: "relative", border: "1px solid #e2e8f0"}}>
            <p className="chart-title" style={{fontWeight: "900", marginBottom: "40px", color: "#0f172a", textAlign: "center"}}>Método de Pago</p>
            
            <div style={{ height: "150px", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "50px" }}>
              
              {/* Barra Efectivo - Medianoche */}
              <div style={{ position: "relative", width: "55px", height: "100%", display: "flex", alignItems: "flex-end" }}
                   onMouseEnter={() => setActiveTooltip("efectivo")}
                   onMouseLeave={() => setActiveTooltip(null)}>
                {activeTooltip === "efectivo" && (
                  <div style={{ position: "absolute", top: "-45px", left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "white", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", zIndex: 10 }}>
                    $50,000.00
                  </div>
                )}
                <div style={{ height: "85%", width: "100%", background: "linear-gradient(to top, #020617, #1e3a8a)", borderRadius: "6px 6px 0 0", cursor: "pointer" }}></div>
              </div>

              {/* Barra QR - Navy */}
              <div style={{ position: "relative", width: "55px", height: "100%", display: "flex", alignItems: "flex-end" }}
                   onMouseEnter={() => setActiveTooltip("qr")}
                   onMouseLeave={() => setActiveTooltip(null)}>
                {activeTooltip === "qr" && (
                  <div style={{ position: "absolute", top: "-45px", left: "50%", transform: "translateX(-50%)", background: "#1e3a8a", color: "white", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", zIndex: 10 }}>
                    $8,200.00
                  </div>
                )}
                <div style={{ height: "45%", width: "100%", background: "linear-gradient(to top, #1e3a8a, #1e40af)", borderRadius: "6px 6px 0 0", cursor: "pointer" }}></div>
              </div>

            </div>

            <div className="chart-legend" style={{marginTop: "30px", borderTop: "1px solid #f1f5f9", paddingTop: "15px", display: "flex", justifyContent: "center", gap: "25px"}}>
              <span style={{fontSize: "0.85rem", color: "#0f172a", fontWeight: "700"}}><span className="dot" style={{backgroundColor: "#020617"}}></span> Efectivo</span>
              <span style={{fontSize: "0.85rem", color: "#1e3a8a", fontWeight: "700"}}><span className="dot" style={{backgroundColor: "#1e3a8a"}}></span> QR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
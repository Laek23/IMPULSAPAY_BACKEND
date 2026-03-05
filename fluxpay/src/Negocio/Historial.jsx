import React, { useState, useEffect } from "react";
import { 
    FaSearch, FaTimes, FaCalendarAlt, 
    FaDownload, FaCircle, FaFileExcel 
} from "react-icons/fa";

// Librerías para la descarga
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function HistorialNegocio() {
    // Paleta de colores FluxPay
    const colores = {
        primario: "#0e2a5a",
        azulBoton: "#11264c",
        acento: "#3b82f6",
        textoGris: "#64748b",
        fondoCuerpo: "#f8fafc",
        pendiente: "#f59e0b",
        completado: "#10b981",
    };

    const datosOriginales = [
        { id: 1, fecha: "2026-12-02", concepto: "Comida", monto: "$1912", hora: "07:00", estado: "Pendiente" },
        { id: 2, fecha: "2026-12-02", concepto: "Pago Recibido", monto: "$1121", hora: "12:00", estado: "En curso" },
        { id: 3, fecha: "2025-12-05", concepto: "Venta Tienda", monto: "$871", hora: "09:00", estado: "Pendiente" },
        { id: 4, fecha: "2026-01-02", concepto: "Dispositivo", monto: "$119", hora: "08:00", estado: "Completado" },
    ];

    const [transacciones, setTransacciones] = useState(datosOriginales);
    const [busqueda, setBusqueda] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    // Lógica de filtrado
    useEffect(() => {
        const filtrados = datosOriginales.filter((t) => {
            const fechaT = new Date(t.fecha);
            const inicio = fechaInicio ? new Date(fechaInicio) : null;
            const fin = fechaFin ? new Date(fechaFin) : null;

            const coincideBusqueda = t.concepto.toLowerCase().includes(busqueda.toLowerCase());
            const coincideFecha = (!inicio || fechaT >= inicio) && (!fin || fechaT <= fin);
            return coincideBusqueda && coincideFecha;
        });
        setTransacciones(filtrados);
    }, [busqueda, fechaInicio, fechaFin]);

    const limpiarFiltros = () => {
        setBusqueda("");
        setFechaInicio("");
        setFechaFin("");
    };

    // Función para descargar Excel
    const exportarExcel = () => {
        // Formateamos los datos para el Excel
        const datosExcel = transacciones.map(t => ({
            "FECHA": t.fecha,
            "CONCEPTO": t.concepto,
            "MONTO": t.monto,
            "HORA": t.hora,
            "ESTADO": t.estado
        }));

        const worksheet = XLSX.utils.json_to_sheet(datosExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Historial");

        // Ajuste de ancho de columnas
        worksheet['!cols'] = [{ wch: 15 }, { wch: 25 }, { wch: 12 }, { wch: 10 }, { wch: 15 }];

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(data, `FluxPay_Historial_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const getEstadoStyle = (estado) => {
        if (estado === "Pendiente") return { color: "#b45309", bg: "#fef3c7" };
        if (estado === "Completado") return { color: "#047857", bg: "#d1fae5" };
        return { color: "#1e40af", bg: "#dbeafe" };
    };

    return (
        <div style={{ padding: "40px", backgroundColor: colores.fondoCuerpo, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
            
            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
                <div>
                    <h2 style={{ color: colores.primario, fontWeight: "800", fontSize: "32px", margin: 0, letterSpacing: "-0.5px" }}>
                        Historial de Actividad
                    </h2>
                    <p style={{ color: colores.textoGris, margin: "5px 0 0 0" }}>Gestiona y visualiza todos tus movimientos financieros</p>
                </div>
                <button onClick={exportarExcel} style={estiloBtnExportar}>
                    <FaDownload /> Exportar Excel
                </button>
            </div>

            <div style={estiloCardPrincipal}>
                
                {/* FILTROS */}
                <div style={estiloBarraFiltros}>
                    <div style={estiloContenedorInput}>
                        <FaSearch style={{ color: "#94a3b8" }} />
                        <input 
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar transacción..." 
                            style={estiloInputInner} 
                        />
                    </div>

                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <div style={estiloContenedorFecha}>
                            <FaCalendarAlt style={{ color: colores.textoGris, fontSize: "12px" }} />
                            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} style={estiloInputFecha} />
                        </div>
                        <span style={{ color: "#cbd5e1" }}>—</span>
                        <div style={estiloContenedorFecha}>
                            <FaCalendarAlt style={{ color: colores.textoGris, fontSize: "12px" }} />
                            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} style={estiloInputFecha} />
                        </div>
                    </div>

                    {(fechaInicio || fechaFin || busqueda) && (
                        <button onClick={limpiarFiltros} style={estiloBtnLimpiar}>
                            <FaTimes /> Limpiar filtros
                        </button>
                    )}
                </div>

                {/* TABLA */}
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
                        <thead>
                            <tr style={{ textAlign: "left" }}>
                                <th style={estiloTh}>FECHA</th>
                                <th style={estiloTh}>CONCEPTO</th>
                                <th style={estiloTh}>MONTO</th>
                                <th style={estiloTh}>HORA</th>
                                <th style={{ ...estiloTh, textAlign: "center" }}>ESTADO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transacciones.length > 0 ? (
                                transacciones.map((t) => {
                                    const styleStatus = getEstadoStyle(t.estado);
                                    return (
                                        <tr key={t.id} style={estiloTr}>
                                            <td style={estiloTd}>
                                                <div style={{ fontWeight: "600", color: colores.primario }}>{t.fecha}</div>
                                            </td>
                                            <td style={estiloTd}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <div style={estiloIconoConcepto}>FP</div>
                                                    {t.concepto}
                                                </div>
                                            </td>
                                            <td style={{ ...estiloTd, fontSize: "16px", fontWeight: "700", color: colores.primario }}>
                                                {t.monto}
                                            </td>
                                            <td style={{ ...estiloTd, color: colores.textoGris }}>{t.hora}</td>
                                            <td style={{ padding: "12px", textAlign: "center" }}>
                                                <span style={estiloStatusBadge(styleStatus.bg, styleStatus.color)}>
                                                    <FaCircle style={{ fontSize: "6px", marginRight: "6px" }} />
                                                    {t.estado}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center", padding: "60px", color: colores.textoGris }}>
                                        No se encontraron registros.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// --- ESTILOS EN LÍNEA (Objetos JS) ---
const estiloCardPrincipal = {
    background: "white",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
    border: "1px solid #f1f5f9"
};

const estiloBarraFiltros = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    gap: "20px",
    flexWrap: "wrap"
};

const estiloContenedorInput = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#f1f5f9",
    padding: "12px 20px",
    borderRadius: "14px",
    width: "350px"
};

const estiloContenedorFecha = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "white",
    padding: "8px 15px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0"
};

const estiloInputInner = { border: "none", background: "transparent", outline: "none", width: "100%", color: "#0e2a5a", fontSize: "14px", fontWeight: "500" };
const estiloInputFecha = { border: "none", outline: "none", color: "#475569", fontSize: "13px", fontWeight: "500", cursor: "pointer" };
const estiloTh = { padding: "12px 20px", color: "#94a3b8", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" };
const estiloTd = { padding: "16px 20px", fontSize: "14px", color: "#475569" };
const estiloTr = { background: "#ffffff", borderBottom: "1px solid #f8fafc" };

const estiloStatusBadge = (bg, color) => ({
    background: bg,
    color: color,
    padding: "6px 14px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "700",
    display: "inline-flex",
    alignItems: "center",
    minWidth: "100px",
    justifyContent: "center"
});

const estiloIconoConcepto = {
    width: "32px", height: "32px", background: "#eff6ff", color: "#3b82f6", 
    borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "10px", fontWeight: "bold"
};

const estiloBtnExportar = {
    background: "#0e2a5a", color: "white", border: "none", padding: "12px 24px",
    borderRadius: "14px", fontWeight: "600", fontSize: "14px", cursor: "pointer",
    display: "flex", alignItems: "center", gap: "10px"
};

const estiloBtnLimpiar = {
    background: "none", color: "#ef4444", border: "1px solid #fee2e2", padding: "10px 18px",
    borderRadius: "12px", cursor: "pointer", fontWeight: "600", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px"
};
import React, { useState, useMemo } from 'react';
import { 
  FaCheckCircle, FaPlus, FaWallet, 
  FaClock, FaArrowCircleDown, FaUniversity 
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const Cuenta = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaCuenta, setNuevaCuenta] = useState({ banco: '', clabe: '' });
  const [periodo, setPeriodo] = useState("Todos");

  const [cuentasVinculadas, setCuentasVinculadas] = useState([
    { id: 1, banco: 'BBVA', nombreFull: 'BBVA Bancomer (****123)', color: '#004481' },
    { id: 2, banco: 'Santander', nombreFull: 'Santander (****567)', color: '#ec0000' }
  ]);

  const transferenciasData = [
    { fecha: "02/12/2026", concepto: "Venta: Almuerzos Ejecutivos", monto: 1912, tipo: 'ingreso', mes: "Diciembre", status: 'Completado' },
    { fecha: "10/12/2026", concepto: "Retiro a Cuenta Personal", monto: 1500, tipo: 'retiro', mes: "Diciembre", status: 'Enviado' },
    { fecha: "15/12/2026", concepto: "Venta: Refrescos y Bebidas", monto: 800, tipo: 'proceso', mes: "Diciembre", status: 'Pendiente' },
    { fecha: "05/01/2026", concepto: "Venta: Pack Familiar", monto: 871, tipo: 'ingreso', mes: "Enero", status: 'Completado' },
    { fecha: "20/01/2026", concepto: "Pago de Proveedor Carnes", monto: 300, tipo: 'retiro', mes: "Enero", status: 'Enviado' },
    { fecha: "25/01/2026", concepto: "Reembolso Cliente #102", monto: 540, tipo: 'proceso', mes: "Enero", status: 'Pendiente' },
  ];

  const filtradas = useMemo(() => {
    if (periodo === "Todos") return transferenciasData;
    return transferenciasData.filter(t => t.mes === periodo);
  }, [periodo, transferenciasData]);

  const metricas = useMemo(() => {
    const recibidos = filtradas.filter(t => t.tipo === 'ingreso').reduce((acc, curr) => acc + curr.monto, 0);
    const enProceso = filtradas.filter(t => t.tipo === 'proceso').reduce((acc, curr) => acc + curr.monto, 0);
    const retiros = filtradas.filter(t => t.tipo === 'retiro').reduce((acc, curr) => acc + curr.monto, 0);
    return { recibidos, enProceso, retiros };
  }, [filtradas]);

  const manejarGuardar = (e) => {
    e.preventDefault();
    const clabesValidas = ["123456789012345678", "000000000000000000"]; 

    if (!clabesValidas.includes(nuevaCuenta.clabe)) {
      Swal.fire({ title: 'Error', text: 'La CLABE no es válida.', icon: 'error', confirmButtonColor: '#0f172a' });
      return;
    }

    const nuevaTarjeta = {
      id: Date.now(),
      banco: nuevaCuenta.banco,
      nombreFull: `${nuevaCuenta.banco} (****${nuevaCuenta.clabe.slice(-4)})`,
      color: '#475569' // Color genérico para nuevos bancos
    };

    setCuentasVinculadas([...cuentasVinculadas, nuevaTarjeta]);
    Swal.fire({ title: 'Éxito', text: 'Cuenta vinculada.', icon: 'success', confirmButtonColor: '#0f172a' });
    setMostrarFormulario(false);
    setNuevaCuenta({ banco: '', clabe: '' });
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>Gestión de Fondos</h2>
          <p style={subtitleStyle}>Control de ingresos y cuentas bancarias</p>
        </div>
        <select style={selectPeriodoStyle} value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
          <option value="Todos">Todos los registros</option>
          <option value="Enero">Enero 2026</option>
          <option value="Diciembre">Diciembre 2025</option>
        </select>
      </div>

      <div style={metricsRowStyle}>
        <div style={metricCardStyle}>
          <div style={metricHeader}>
            <span style={metricLabelStyle}>Pagos Recibidos</span>
            <FaWallet color="#0f172a" opacity={0.3} />
          </div>
          <h3 style={metricValueStyle}>${metricas.recibidos.toLocaleString()}.00</h3>
        </div>
        <div style={metricCardStyle}>
          <div style={metricHeader}>
            <span style={metricLabelStyle}>En Proceso</span>
            <FaClock color="#0f172a" opacity={0.3} />
          </div>
          <h3 style={metricValueStyle}>${metricas.enProceso.toLocaleString()}.00</h3>
        </div>
        <div style={metricCardStyle}>
          <div style={metricHeader}>
            <span style={metricLabelStyle}>Retiros</span>
            <FaArrowCircleDown color="#0f172a" opacity={0.3} />
          </div>
          <h3 style={metricValueStyle}>-${metricas.retiros.toLocaleString()}.00</h3>
        </div>
      </div>

      <div style={mainGridStyle}>
        <div style={cardStyle}>
          <h4 style={cardTitleStyle}>Historial de Movimientos</h4>
          <table style={tableStyle}>
            <thead>
              <tr style={thRowStyle}>
                <th style={thStyle}>FECHA</th>
                <th style={thStyle}>CONCEPTO</th>
                <th style={thStyle}>ESTATUS</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>MONTO</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((item, index) => (
                <tr key={index} style={trStyle}>
                  <td style={tdStyle}>{item.fecha}</td>
                  <td style={nameText}>{item.concepto}</td>
                  <td style={tdStyle}>
                    <span style={statusBadge}>{item.status}</span>
                  </td>
                  <td style={amountTextStyle}>
                    {item.tipo === 'retiro' ? '-' : ''}${item.monto.toLocaleString()}.00
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={cardStyle}>
            <h4 style={cardTitleStyle}>Cuentas Vinculadas</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cuentasVinculadas.map((cta) => (
                <div key={cta.id} style={bankCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ ...logoCircle, backgroundColor: cta.color }}>
                      <FaUniversity color="white" size={14} />
                    </div>
                    <div>
                      <div style={{ ...bankNameTagStyle, color: cta.color }}>{cta.banco}</div>
                      <div style={bankFullStyle}>{cta.nombreFull}</div>
                    </div>
                  </div>
                  <FaCheckCircle color={cta.color} opacity={0.8} />
                </div>
              ))}
              <button style={btnAddAccountStyle} onClick={() => setMostrarFormulario(true)}>
                <FaPlus size={12} /> Vincular nueva cuenta
              </button>
            </div>
          </div>
          <div style={securityNoteStyle}>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>
              FluxPay utiliza cifrado avanzado para proteger tus datos. No almacenamos credenciales de acceso.
            </p>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {mostrarFormulario && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <div style={modalHeader}>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>Vincular Cuenta</h3>
            </div>
            <form onSubmit={manejarGuardar} style={{ padding: '24px' }}>
              <div style={inputGroup}>
                <label style={labelStyle}>Banco</label>
                <select required style={inputStyle} value={nuevaCuenta.banco} onChange={(e) => setNuevaCuenta({...nuevaCuenta, banco: e.target.value})}>
                  <option value="">Seleccionar...</option>
                  <option value="BBVA">BBVA</option>
                  <option value="Santander">Santander</option>
                  <option value="Banorte">Banorte</option>
                  <option value="Nu Mexico">Nu México</option>
                </select>
              </div>
              <div style={inputGroup}>
                <label style={labelStyle}>CLABE Interbancaria</label>
                <input type="text" maxLength="18" required style={inputStyle} placeholder="18 dígitos" value={nuevaCuenta.clabe} onChange={(e) => setNuevaCuenta({...nuevaCuenta, clabe: e.target.value})} />
              </div>
              <div style={modalFooter}>
                <button type="button" onClick={() => setMostrarFormulario(false)} style={btnCancel}>Cancelar</button>
                <button type="submit" style={btnSave}>Vincular</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- ESTILOS ---
const containerStyle = { padding: "40px", background: "#f8fafc", minHeight: "100vh", fontFamily: "'Inter', sans-serif" };
const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" };
const titleStyle = { margin: 0, color: "#0f172a", fontSize: "24px", fontWeight: "700" };
const subtitleStyle = { margin: "4px 0 0 0", color: "#64748b", fontSize: "14px" };
const selectPeriodoStyle = { padding: "10px 15px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", color: "#0f172a", fontWeight: "600", cursor: 'pointer' };

const metricsRowStyle = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' };
const metricCardStyle = { background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' };
const metricHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const metricLabelStyle = { fontSize: '13px', color: '#64748b', fontWeight: '600' };
const metricValueStyle = { fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '12px 0 0 0' };

const mainGridStyle = { display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '30px' };
const cardStyle = { background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0" };
const cardTitleStyle = { margin: "0 0 20px 0", fontSize: "14px", color: "#64748b", fontWeight: "700", textTransform: 'uppercase', letterSpacing: '1px' };

const tableStyle = { width: "100%", borderCollapse: "collapse" };
const thRowStyle = { borderBottom: "1px solid #f1f5f9" };
const thStyle = { padding: "12px 16px", textAlign: "left", color: "#94a3b8", fontSize: "10px", fontWeight: "800", letterSpacing: '1px' };
const trStyle = { borderBottom: "1px solid #f8fafc" };
const tdStyle = { padding: "16px", fontSize: "13px", color: "#475569" };
const nameText = { ...tdStyle, fontWeight: "600", color: "#0f172a" };
const amountTextStyle = { ...tdStyle, textAlign: 'right', fontWeight: '700', color: '#0f172a' };

const statusBadge = { fontSize: '10px', padding: '4px 8px', borderRadius: '4px', fontWeight: '700', backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' };

const bankCardStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', borderRadius: '12px', border: '1px solid #f1f5f9', background: '#fcfcfc' };
const logoCircle = { width: '34px', height: '34px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const bankNameTagStyle = { fontSize: '13px', fontWeight: '800' };
const bankFullStyle = { fontSize: '11px', color: '#94a3b8' };
const btnAddAccountStyle = { marginTop: '10px', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'transparent', color: '#0f172a', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px' };

const securityNoteStyle = { padding: '15px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #f1f5f9' };

const overlayStyle = { position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.3)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100 };
const modalStyle = { background: "white", borderRadius: "16px", width: "360px", boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' };
const modalHeader = { padding: "20px", borderBottom: "1px solid #f1f5f9" };
const inputGroup = { marginBottom: "16px" };
const labelStyle = { display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", marginBottom: "6px", textTransform: 'uppercase' };
const inputStyle = { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box" };
const modalFooter = { display: "flex", gap: "10px", marginTop: "20px" };
const btnSave = { flex: 2, padding: "12px", background: "#0f172a", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" };
const btnCancel = { flex: 1, padding: "12px", background: "white", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: "8px", cursor: "pointer", fontWeight: "600" };

export default Cuenta;
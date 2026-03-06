import React, { useState, useMemo } from 'react';
import { 
  FaCheckCircle, 
  FaPlus,
  FaTimes,
  FaLock,
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const Cuenta = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaCuenta, setNuevaCuenta] = useState({ banco: '', clabe: '' });
  const [periodo, setPeriodo] = useState("Todos");

  const [cuentasVinculadas, setCuentasVinculadas] = useState([
    { id: 1, banco: 'BBVA', nombreFull: 'BBVA bancomer (****123)', clase: 'bbva' },
    { id: 2, banco: 'Santander', nombreFull: 'Santander (****567)', clase: 'santander' }
  ]);

  // 1. DATA EXTENDIDA CON RETIROS Y PROCESOS
  const transferenciasData = [
    { fecha: "2/12/2026", concepto: "Comida", monto: 1912, tipo: 'ingreso', mes: "Diciembre" },
    { fecha: "10/12/2026", concepto: "Retiro Cajero", monto: 1500, tipo: 'retiro', mes: "Diciembre" },
    { fecha: "15/12/2026", concepto: "Pendiente Venta", monto: 800, tipo: 'proceso', mes: "Diciembre" },
    { fecha: "5/01/2026", concepto: "Tienda", monto: 871, tipo: 'ingreso', mes: "Enero" },
    { fecha: "20/01/2026", concepto: "Pago Servicio", monto: 300, tipo: 'retiro', mes: "Enero" },
    { fecha: "25/01/2026", concepto: "Reembolso", monto: 540, tipo: 'proceso', mes: "Enero" },
  ];

  // 2. FILTRADO BASE
  const filtradas = useMemo(() => {
    if (periodo === "Todos") return transferenciasData;
    return transferenciasData.filter(t => t.mes === periodo);
  }, [periodo]);

  // 3. CÁLCULOS DINÁMICOS PARA LAS 3 TARJETAS
  const metricas = useMemo(() => {
    const recibidos = filtradas
      .filter(t => t.tipo === 'ingreso')
      .reduce((acc, curr) => acc + curr.monto, 0);

    const enProceso = filtradas
      .filter(t => t.tipo === 'proceso')
      .reduce((acc, curr) => acc + curr.monto, 0);

    const retiros = filtradas
      .filter(t => t.tipo === 'retiro')
      .reduce((acc, curr) => acc + curr.monto, 0);

    return { recibidos, enProceso, retiros };
  }, [filtradas]);

  const manejarGuardar = (e) => {
    e.preventDefault();
    const clabesValidas = ["123456789012345678", "000000000000000000"]; 

    if (!clabesValidas.includes(nuevaCuenta.clabe)) {
      Swal.fire({
        title: 'Error de Vinculación',
        text: 'La cuenta ingresada no existe.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
      return;
    }

    const nuevaTarjeta = {
      id: Date.now(),
      banco: nuevaCuenta.banco,
      nombreFull: `${nuevaCuenta.banco} (****${nuevaCuenta.clabe.slice(-3)})`,
      clase: nuevaCuenta.banco.toLowerCase().replace(" ", "")
    };

    setCuentasVinculadas([...cuentasVinculadas, nuevaTarjeta]);
    Swal.fire({ title: '¡Cuenta Vinculada!', icon: 'success', confirmButtonColor: '#0e2a5a' });
    setMostrarFormulario(false);
    setNuevaCuenta({ banco: '', clabe: '' });
  };

  return (
    <div className="cuenta-container" style={{ position: 'relative' }}>
      {/* MODAL (SIN CAMBIOS) */}
      {mostrarFormulario && (
        <div style={estiloOverlay}>
          <div style={estiloModal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#0e2a5a' }}>Vincular Nueva Cuenta</h3>
              <FaTimes onClick={() => setMostrarFormulario(false)} style={{ cursor: 'pointer', color: '#64748b' }} />
            </div>
            <form onSubmit={manejarGuardar}>
               <div style={{ marginBottom: '15px' }}>
                <label style={estiloLabel}>Institución Bancaria</label>
                <select required style={estiloInput} value={nuevaCuenta.banco} onChange={(e) => setNuevaCuenta({...nuevaCuenta, banco: e.target.value})}>
                  <option value="">Selecciona un banco</option>
                  <option value="BBVA">BBVA</option>
                  <option value="Santander">Santander</option>
                  <option value="Banorte">Banorte</option>
                  <option value="Nu Mexico">Nu México</option>
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={estiloLabel}>CLABE (Prueba: 123456789012345678)</label>
                <input type="text" maxLength="18" required style={estiloInput} value={nuevaCuenta.clabe} onChange={(e) => setNuevaCuenta({...nuevaCuenta, clabe: e.target.value})} />
              </div>
              <button type="submit" style={estiloBtnGuardar}>Guardar y Vincular</button>
            </form>
          </div>
        </div>
      )}

      {/* FILTRO */}
      <div className="cuenta-header">
        <select className="filter-select" value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
          <option value="Todos">Todos los registros</option>
          <option value="Enero">Enero</option>
          <option value="Diciembre">Diciembre</option>
        </select>
      </div>

      <h2 className="cuenta-main-title">Gestión de Cuenta Bancaria</h2>

      {/* MÉTRICAS DINÁMICAS (AHORA TODAS SE MUEVEN) */}
      <div className="metrics-row">
        <div className="metric-card">
          <span className="metric-label">Pagos recibidos</span>
          <h3 className="metric-value">${metricas.recibidos.toLocaleString()}.00</h3>
        </div>
        <div className="metric-card">
          <span className="metric-label">Pagos en proceso</span>
          <h3 className="metric-value">${metricas.enProceso.toLocaleString()}.00</h3>
        </div>
        <div className="metric-card card-highlight">
          <span className="metric-label">Último retiro</span>
          <h3 className="metric-value negative">-${metricas.retiros.toLocaleString()}.00</h3>
        </div>
      </div>

      <div className="cuenta-content-grid">
        {/* HISTORIAL FILTRADO */}
        <div className="history-section">
          <div className="section-card">
            <h4 className="card-title">Historial de transferencias</h4>
            <table className="transfer-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Concepto</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                {filtradas.filter(t => t.tipo === 'ingreso').map((item, index) => (
                  <tr key={index}>
                    <td>{item.fecha}</td>
                    <td>{item.concepto}</td>
                    <td className="amount-text">${item.monto.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CUENTAS VINCULADAS */}
        <div className="accounts-section">
          <h4 className="card-title">Cuentas vinculadas</h4>
          <div className="bank-list">
            {cuentasVinculadas.map((cta) => (
              <div key={cta.id} className={`bank-card ${cta.clase}`}>
                <div className="bank-info">
                  <div className="bank-logo-name">
                    <FaCheckCircle className="check-icon" />
                    <span className="bank-name-tag">{cta.banco}</span>
                  </div>
                  <p className="bank-full-name">{cta.nombreFull}</p>
                </div>
              </div>
            ))}
            <button className="btn-add-account" onClick={() => setMostrarFormulario(true)}>
              <FaPlus /> Vincular nueva cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ESTILOS (IGUALES) ---
const estiloOverlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(14, 42, 90, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' };
const estiloModal = { background: 'white', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' };
const estiloLabel = { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#475569' };
const estiloInput = { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px', boxSizing: 'border-box' };
const estiloBtnGuardar = { width: '100%', padding: '14px', background: '#0e2a5a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' };

export default Cuenta;
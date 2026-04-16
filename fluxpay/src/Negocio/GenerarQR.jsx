import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react'; 
import { 
  FaHourglassHalf, FaQrcode, FaUser, FaDollarSign, FaShieldAlt, 
  FaSpinner, FaCheckCircle, FaPlus, FaHistory, FaExclamationTriangle, FaWrench
} from 'react-icons/fa';

const GenerarQR = () => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [nuevoQR, setNuevoQR] = useState({ cliente: "", monto: "" });
  const [qrActivo, setQrActivo] = useState(null);
  const [isAnalizando, setIsAnalizando] = useState(false);
  const [progreso, setProgreso] = useState(0);
  
  const [error, setError] = useState(null); 
  const [showReporte, setShowReporte] = useState(false);

  const [historial, setHistorial] = useState([
    { id: "TX-88291", cliente: "Mariana Gómez", monto: "5,443.00", hora: '10:30 AM', status: 'PAGADO' },
    { id: "TX-11202", cliente: "Fridda Pérez", monto: "1,200.00", hora: '09:15 AM', status: 'EXPIRADO' },
  ]);

  const puedeGenerar = nuevoQR.cliente.trim() !== "" && parseFloat(nuevoQR.monto) > 0;

  useEffect(() => {
    if (!qrActivo || timeLeft <= 0 || isAnalizando) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, qrActivo, isAnalizando]);

  const iniciarCobro = () => {
    if (!puedeGenerar) return;
    setIsAnalizando(true);
    setProgreso(0);
    setError(null);
    setShowReporte(false);

    let intervaloCarga = setInterval(() => {
      setProgreso(prev => {
        if (prev >= 100) {
          clearInterval(intervaloCarga);
          if (Math.random() < 0.2) {
            setIsAnalizando(false);
            setError("ERR_CONNECTION_TIMEOUT: El servidor no respondió.");
            return 0;
          }
          setIsAnalizando(false);
          const nuevaID = `TX-${Math.floor(Math.random() * 90000)}`;
          const nuevaData = { 
            id: nuevaID, 
            cliente: nuevoQR.cliente, 
            monto: parseFloat(nuevoQR.monto).toLocaleString('en-US', { minimumFractionDigits: 2 }), 
            hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'PAGADO'
          };
          setHistorial([nuevaData, ...historial]);
          setQrActivo({ id: nuevaID, cliente: nuevoQR.cliente, monto: nuevoQR.monto });
          setTimeLeft(300);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={styles.layout}>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spin-icon { animation: spin 1s linear infinite; }
        .history-row:hover { background: #f8fafc; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(6px); }
      `}</style>

      {/* MODAL ERROR */}
      {error && (
        <div className="modal-overlay">
          <div style={styles.modalCard}>
            {!showReporte ? (
              <>
                <FaExclamationTriangle size={50} color="#ef4444" />
                <h2 style={styles.modalTitle}>Error de Transacción</h2>
                <p style={styles.errorText}>{error}</p>
                <div style={styles.modalActions}>
                  <button style={styles.btnRetry} onClick={iniciarCobro}>Reintentar Cobro</button>
                  <button style={styles.btnReport} onClick={() => setShowReporte(true)}>Generar Reporte</button>
                </div>
                <button style={styles.btnLink} onClick={() => setError(null)}>Cerrar</button>
              </>
            ) : (
              <>
                <FaWrench size={40} color="#0f172a" />
                <h2 style={styles.modalTitle}>Ticket de Soporte</h2>
                <div style={styles.qrReportBox}>
                  <QRCodeSVG value={`SUPPORT_TICKET_${Date.now()}`} size={160} />
                </div>
                <p style={styles.supportNote}>Escanea para diagnóstico técnico.</p>
                <button style={styles.btnRetry} onClick={() => setError(null)}>Volver a la Terminal</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* PANEL IZQUIERDO */}
      <main style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.title}>Terminal de Cobro QR</h1>
          <p style={styles.subtitle}>Gestión de activos y seguridad en tiempo real</p>
        </div>

        <div style={styles.whiteCard}>
          <h3 style={styles.cardLabel}><FaPlus /> REGISTRAR TRANSACCIÓN</h3>
          <div style={styles.formRow}>
            <div style={styles.inputBox}>
              <FaUser color="#94a3b8" />
              <input 
                style={styles.input} 
                placeholder="Nombre del Cliente"
                value={nuevoQR.cliente}
                onChange={(e) => setNuevoQR({...nuevoQR, cliente: e.target.value})}
              />
            </div>
            <div style={styles.inputBox}>
              <FaDollarSign color="#94a3b8" />
              <input 
                style={styles.input} 
                placeholder="Monto"
                type="number"
                value={nuevoQR.monto}
                onChange={(e) => setNuevoQR({...nuevoQR, monto: e.target.value})}
              />
            </div>
          </div>
          <button 
            style={{
              ...styles.btnAction, 
              backgroundColor: puedeGenerar ? '#0f172a' : '#e2e8f0',
              color: puedeGenerar ? 'white' : '#94a3b8',
              cursor: puedeGenerar ? 'pointer' : 'not-allowed'
            }} 
            onClick={iniciarCobro}
          >
            Generar Código de Pago
          </button>
        </div>

        <div style={{ marginTop: '45px' }}>
          <h3 style={styles.cardLabel}><FaHistory /> ACTIVIDAD RECIENTE</h3>
          <div style={styles.historyTable}>
            {historial.map(item => (
              <div key={item.id} className="history-row" style={styles.historyRow}>
                <div style={styles.historyLeft}>
                  <div style={{...styles.dot, backgroundColor: item.status === 'PAGADO' ? '#0f172a' : '#64748b'}}>
                    {item.status === 'PAGADO' ? <FaCheckCircle size={14}/> : '!'}
                  </div>
                  <div>
                    <div style={styles.hID}>{item.id} • {item.hora}</div>
                    <div style={styles.hClient}>{item.cliente}</div>
                  </div>
                </div>
                <div style={styles.hMonto}>${item.monto}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* PANEL DERECHO */}
      <aside style={styles.sidePanel}>
        <div style={styles.sideHeader}>RESUMEN DE PAGO</div>
        <div style={styles.monitorContent}>
          {isAnalizando ? (
            <div style={styles.centered}>
              <FaSpinner className="spin-icon" size={40} color="white" />
              <p style={styles.loadingText}>Vinculando transacción...</p>
              <div style={styles.pBar}><div style={{...styles.pFill, width: `${progreso}%`}}></div></div>
            </div>
          ) : qrActivo ? (
            <div style={styles.activeContainer}>
              <div style={styles.qrBox}><QRCodeSVG value={qrActivo.id} size={200} /></div>
              <h2 style={styles.sideMonto}>${qrActivo.monto}</h2>
              <p style={styles.sideUser}>{qrActivo.cliente}</p>
              <div style={styles.timerBox}><FaHourglassHalf /> {formatTime(timeLeft)}</div>
              <button style={styles.btnCancelSide} onClick={() => setQrActivo(null)}>Nueva Operación</button>
            </div>
          ) : (
            <div style={styles.emptySide}>
              <FaQrcode size={60} style={{opacity: 0.2, marginBottom: '20px'}} />
              <p style={styles.emptyText}>Esperando datos para<br/>generar código QR</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

const styles = {
  layout: { display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Inter', sans-serif" },
  mainContent: { flex: 1, padding: '50px 80px' },
  header: { marginBottom: '40px' },
  title: { fontSize: '28px', color: '#0f172a', fontWeight: '800', margin: 0 },
  subtitle: { color: '#64748b', fontSize: '16px', marginTop: '4px' },
  whiteCard: { background: 'white', borderRadius: '20px', padding: '30px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' },
  cardLabel: { fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', letterSpacing: '1px' },
  formRow: { display: 'flex', gap: '20px', marginBottom: '25px' },
  inputBox: { flex: 1, background: '#fcfcfc', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #e2e8f0' },
  input: { border: 'none', background: 'transparent', outline: 'none', width: '100%', fontWeight: '600', color: '#0f172a', fontSize: '16px' },
  btnAction: { width: '100%', padding: '18px', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '16px', transition: '0.3s' },
  
  historyTable: { background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0' },
  historyRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 25px', borderBottom: '1px solid #f1f5f9' },
  historyLeft: { display: 'flex', alignItems: 'center', gap: '18px' },
  dot: { width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' },
  hID: { fontSize: '12px', color: '#94a3b8', fontWeight: '700' },
  hClient: { fontSize: '16px', fontWeight: '600', color: '#0f172a' },
  hMonto: { fontSize: '17px', fontWeight: '800', color: '#0f172a' },

  sidePanel: { width: '400px', background: '#0f172a', color: 'white', padding: '40px', display: 'flex', flexDirection: 'column' },
  sideHeader: { fontSize: '13px', fontWeight: '800', textAlign: 'center', letterSpacing: '2px', opacity: 0.5, marginBottom: '60px' },
  monitorContent: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  emptySide: { textAlign: 'center' },
  emptyText: { opacity: 0.4, fontSize: '16px', lineHeight: '1.6' },
  activeContainer: { width: '100%', textAlign: 'center' },
  qrBox: { background: 'white', padding: '20px', borderRadius: '24px', display: 'inline-block', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' },
  sideMonto: { fontSize: '48px', fontWeight: '900', margin: '30px 0 10px 0' },
  sideUser: { opacity: 0.6, fontSize: '18px', marginBottom: '40px' },
  timerBox: { background: 'rgba(255,255,255,0.1)', padding: '12px 30px', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '16px', fontWeight: '700' },
  btnCancelSide: { width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '15px', borderRadius: '12px', marginTop: '50px', cursor: 'pointer', fontWeight: '700' },

  modalCard: { background: 'white', padding: '40px', borderRadius: '24px', width: '380px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' },
  modalTitle: { margin: '20px 0 10px', fontSize: '22px', color: '#0f172a', fontWeight: '800' },
  errorText: { fontSize: '15px', color: '#64748b', marginBottom: '30px', lineHeight: '1.5' },
  modalActions: { display: 'flex', flexDirection: 'column', gap: '12px' },
  btnRetry: { background: '#0f172a', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' },
  btnReport: { background: '#f1f5f9', color: '#475569', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' },
  btnLink: { background: 'transparent', border: 'none', color: '#94a3b8', marginTop: '20px', cursor: 'pointer', fontSize: '14px' },
  qrReportBox: { background: '#f8fafc', padding: '20px', borderRadius: '20px', display: 'inline-block', margin: '20px 0', border: '2px dashed #e2e8f0' },
  supportNote: { fontSize: '13px', color: '#94a3b8' },
  loadingText: { marginTop: '25px', fontSize: '16px', fontWeight: '600' },
  pBar: { width: '140px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginTop: '20px', marginInline: 'auto', overflow: 'hidden' },
  pFill: { height: '100%', background: 'white', transition: 'width 0.3s' }
};

export default GenerarQR;
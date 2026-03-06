import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react'; 
import { 
  FaHourglassHalf, FaPlus, FaQrcode, FaUser, FaDollarSign, FaShieldAlt, FaReceipt, FaSpinner, FaLock, FaExclamationTriangle, FaEdit, FaUndo, FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';

const GenerarQR = () => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [nuevoQR, setNuevoQR] = useState({ cliente: "", monto: "" });
  const [qrActivo, setQrActivo] = useState(null);
  const [errorForm, setErrorForm] = useState(false);
  
  const [isAnalizando, setIsAnalizando] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [esperandoVerificacion, setEsperandoVerificacion] = useState(null);
  
  const inputNombreRef = useRef(null);

  // Cambiado a estado con setHistorial para permitir actualizaciones
  const [historial, setHistorial] = useState([
    { id: "TX-88291", detalle: "Cobro Exitoso", cliente: "Mariana Gómez", monto: "5,443.00", estado: 'pagado', hora: '10:30 AM' },
    { id: "TX-11202", detalle: "Cobro Fallido", cliente: "Fridda Pérez", monto: "1,200.00", estado: 'expirado', hora: '09:15 AM' },
    { id: "TX-99821", detalle: "Cobro Exitoso", cliente: "Gael Puch", monto: "2,343.50", estado: 'pagado', hora: '08:00 AM' },
  ]);

  const puedeGenerar = nuevoQR.cliente.trim() !== "" && parseFloat(nuevoQR.monto) > 0;

  useEffect(() => {
    if (!qrActivo || timeLeft <= 0 || isAnalizando) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, qrActivo, isAnalizando]);
  

  const iniciarCobro = () => {
    if (!puedeGenerar) {
      setErrorForm(true);
      setTimeout(() => setErrorForm(false), 3000);
      return;
    }
    setErrorForm(false);

    // Creamos el objeto de la nueva transacción
    const nuevaID = `TX-${Math.floor(Math.random() * 90000)}`;
    const nuevaData = { 
      id: nuevaID, 
      detalle: "Cobro Generado", 
      cliente: nuevoQR.cliente, 
      monto: parseFloat(nuevoQR.monto).toLocaleString('en-US', { minimumFractionDigits: 2 }), 
      estado: 'pagado', 
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    // ACTUALIZACIÓN: Se añade al historial al generar
    setHistorial([nuevaData, ...historial]);
    
    setQrActivo({ id: nuevaID, cliente: nuevoQR.cliente, monto: nuevoQR.monto });
    setTimeLeft(300);
  };

  const solicitarAcceso = (item) => {
    setQrActivo(null);
    setIsAnalizando(false);
    setProgreso(0);
    setEsperandoVerificacion(item);
    if (item.estado === 'expirado') {
      setNuevoQR({ cliente: item.cliente, monto: item.monto.replace(',', '') });
    }
  };


  const handleEditar = () => {
    // Activamos la carga/sincronización antes de permitir editar
    setIsAnalizando(true);
    setProgreso(0);
    setQrActivo(null);
    setEsperandoVerificacion(null);

    let intervaloCarga = setInterval(() => {
      setProgreso(prev => {
        if (prev >= 100) {
          clearInterval(intervaloCarga);
          setIsAnalizando(false);
          // Una vez termina la carga, mandamos el foco al input
          setTimeout(() => inputNombreRef.current?.focus(), 100);
          return 100;
        }
        return prev + 25; // Un poquito más rápido para la edición
      });
    }, 100);
  };

  // ... resto del código (iniciarCobro, confirmarYGenerar, return, estilos) exactamente igual
  const confirmarYGenerar = () => {
    setIsAnalizando(true);
    setProgreso(0);
    const item = esperandoVerificacion;
    setEsperandoVerificacion(null);

    let intervaloCarga = setInterval(() => {
      setProgreso(prev => {
        if (prev >= 100) {
          clearInterval(intervaloCarga);
          setIsAnalizando(false);
          setQrActivo({ 
            id: item.id, 
            cliente: item.estado === 'expirado' ? item.cliente : `AUDITORÍA: ${item.cliente}`, 
            monto: item.monto,
            isAudit: item.estado !== 'expirado' 
          });
          setTimeLeft(300);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spin-icon { animation: spin 1s linear infinite; }
        .history-item:hover { transform: translateY(-2px); border-color: #cbd5e1 !important; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
      `}</style>

      <header style={styles.header}>
        <h1 style={styles.title}>Terminal de Cobro QR</h1>
        <p style={styles.subtitle}>Gestión de activos y seguridad en tiempo real</p>
      </header>

      <div style={styles.mainGrid}>
        <section>
          <div style={styles.glassCard}>
            <h3 style={styles.cardTitle}><FaPlus /> Registrar Transacción</h3>
            <div style={styles.formRow}>
              <div style={styles.inputBox}>
                <FaUser color="#64748b" size={14}/>
                <input 
                  ref={inputNombreRef}
                  style={styles.input} 
                  placeholder="Cliente"
                  value={nuevoQR.cliente}
                  onChange={(e) => setNuevoQR({...nuevoQR, cliente: e.target.value})}
                />
              </div>
              <div style={styles.inputBox}>
                <FaDollarSign color="#64748b" size={14}/>
                <input 
                  style={styles.input} 
                  placeholder="Monto"
                  type="number"
                  value={nuevoQR.monto}
                  onChange={(e) => setNuevoQR({...nuevoQR, monto: e.target.value})}
                />
              </div>
            </div>

            {errorForm && (
              <div style={styles.errorMessage}>
                <FaExclamationTriangle /> <span>Datos incompletos</span>
              </div>
            )}

            <button 
                style={{
                    ...styles.btnPrimary, 
                    backgroundColor: puedeGenerar ? '#17233f' : '#94a3b8',
                    cursor: puedeGenerar ? 'pointer' : 'not-allowed'
                }} 
                onClick={iniciarCobro}
            >
              Generar Código de Pago
            </button>
          </div>

          <div style={{ marginTop: '35px' }}>
            <div style={styles.historyHeader}>
                <h3 style={styles.cardTitle}><FaReceipt /> Actividad Reciente</h3>
                <span style={styles.historyCount}>{historial.length} Transacciones</span>
            </div>
            
            <div style={styles.historyList}>
              {historial.map(item => (
                <div 
                  key={item.id} 
                  className="history-item"
                  style={styles.historyCard} 
                  onClick={() => solicitarAcceso(item)}
                >
                  <div style={styles.historyMain}>
                    <div style={{
                        ...styles.iconStatus, 
                        backgroundColor: item.estado === 'pagado' ? '#ecfdf5' : '#fff1f2',
                        color: item.estado === 'pagado' ? '#10b981' : '#a70329'
                    }}>
                        {item.estado === 'pagado' ? <FaCheckCircle size={18}/> : <FaTimesCircle size={18}/>}
                    </div>
                    <div>
                        <div style={styles.historyID}>{item.id}</div>
                        <div style={styles.historyClient}>{item.cliente}</div>
                    </div>
                  </div>

                  <div style={styles.historyData}>
                    <div style={styles.historyAmount}>${item.monto}</div>
                    <div style={{
                        ...styles.statusBadge,
                        color: item.estado === 'pagado' ? '#06a875' : '#a70329'
                    }}>
                        {item.estado === 'pagado' ? 'PAGADO' : 'EXPIRADO'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div style={styles.monitorCard}>
            {esperandoVerificacion ? (
              <div style={styles.verifyContainer}>
                <div style={styles.lockCircle}>
                    {esperandoVerificacion.estado === 'expirado' ? <FaUndo size={28} color="#a70329"/> : <FaLock size={24} color="#16376b"/>}
                </div>
                <h3 style={{color: '#0f172a', marginBottom: '8px', fontWeight: 800}}>
                    {esperandoVerificacion.estado === 'expirado' ? 'Reintentar' : 'Verificar'}
                </h3>
                <p style={{color: '#64748b', fontSize: '13px', marginBottom: '25px', lineHeight: '1.5'}}>
                  {esperandoVerificacion.estado === 'expirado' 
                    ? `Se restaurarán los datos de ${esperandoVerificacion.cliente} para un nuevo intento.`
                    : `¿Autorizar acceso a la auditoría de ${esperandoVerificacion.id}?`}
                </p>
                <div style={{display: 'flex', gap: '10px'}}>
                  <button style={styles.btnVerify} onClick={confirmarYGenerar}>Confirmar</button>
                  <button style={styles.btnCancel} onClick={() => setEsperandoVerificacion(null)}>Cerrar</button>
                </div>
              </div>
            ) : isAnalizando ? (
              <div style={styles.loadingContainer}>
                <FaSpinner className="spin-icon" size={40} color="#3b82f6" />
                <h4 style={{marginTop: '20px', color: '#1e293b', fontWeight: '800'}}>Sincronizando...</h4>
                <div style={styles.progressBarBg}>
                  <div style={{...styles.progressBarFill, width: `${progreso}%`}}></div>
                </div>
              </div>
            ) : qrActivo ? (
              <>
                <div style={{...styles.monitorHeader, color: qrActivo.isAudit ? '#3b82f6' : '#10b981'}}>
                  <FaShieldAlt /> <span>{qrActivo.isAudit ? "MODO AUDITORÍA" : "PAGO EN CURSO"}</span>
                </div>
                <div style={styles.qrArea}>
                  <div style={styles.qrFrame}><QRCodeSVG value={qrActivo.id} size={200} level="H" /></div>
                </div>
                <h2 style={styles.montoValor}>${qrActivo.monto}</h2>
                <p style={styles.clienteName}>{qrActivo.cliente}</p>
                
                <button style={styles.btnEdit} onClick={handleEditar}>
                  <FaEdit /> Editar datos
                </button>

                <div style={styles.timerPill}>
                  <FaHourglassHalf /> <span>{formatTime(timeLeft)}</span>
                </div>
              </>
            ) : (
              <div style={styles.emptyState}>
                <FaQrcode size={50} style={{ marginBottom: '15px', opacity: 0.15 }} />
                <p style={{color: '#94a3b8', fontSize: '13px', fontWeight: 600}}>Esperando entrada...</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const styles = {
    page: { background: '#f1f5f9', minHeight: '100vh', padding: '40px', fontFamily: '"Inter", sans-serif' },
    header: { marginBottom: '35px' },
    title: { fontSize: '28px', color: '#0f172a', fontWeight: '900', margin: 0, letterSpacing: '-0.5px' },
    subtitle: { color: '#64748b', fontSize: '14px', marginTop: '4px' },
    mainGrid: { display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', maxWidth: '1100px', margin: '0 auto' },
    glassCard: { background: 'white', padding: '28px', borderRadius: '24px', boxShadow: '0 1px 3px rgba(39, 37, 37, 0.1)', border: '1px solid #e2e8f0' },
    cardTitle: { fontSize: '14px', color: '#13254e', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' },
    formRow: { display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '15px', marginBottom: '20px' },
    inputBox: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s' },
    input: { border: 'none', background: 'transparent', outline: 'none', width: '100%', fontWeight: '600', color: '#1e293b', fontSize: '15px' },
    btnPrimary: { color: 'white', border: 'none', width: '100%', padding: '16px', borderRadius: '14px', fontWeight: '800', fontSize: '14px', transition: 'all 0.3s' },
    errorMessage: { display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '12px', fontWeight: '800', marginBottom: '15px' },
    historyHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    historyCount: { fontSize: '12px', fontWeight: '700', color: '#94a3b8', background: '#fff', padding: '4px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' },
    historyList: { display: 'flex', flexDirection: 'column', gap: '12px' },
    historyCard: { background: '#ffffff', padding: '16px', borderRadius: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #e2e8f0', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' },
    historyMain: { display: 'flex', alignItems: 'center', gap: '15px' },
    iconStatus: { width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    historyID: { fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.5px' },
    historyClient: { fontSize: '15px', fontWeight: '700', color: '#1e293b' },
    historyData: { textAlign: 'right' },
    historyAmount: { fontSize: '16px', fontWeight: '900', color: '#0f172a' },
    statusBadge: { fontSize: '10px', fontWeight: '800', marginTop: '2px' },
    monitorCard: { background: '#ffffff', borderRadius: '32px', padding: '40px', textAlign: 'center', border: '1px solid #e2e8f0', minHeight: '520px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)' },
    monitorHeader: { position: 'absolute', top: '30px', width: '100%', left: 0, display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '11px', fontWeight: '900', letterSpacing: '1px' },
    qrArea: { margin: '20px auto' },
    qrFrame: { padding: '20px', background: 'white', borderRadius: '24px', boxShadow: '0 15px 30px -10px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' },
    montoValor: { fontSize: '44px', color: '#0f172a', margin: '10px 0', fontWeight: '900', letterSpacing: '-1px' },
    clienteName: { color: '#64748b', fontSize: '15px', fontWeight: '500', marginBottom: '20px' },
    btnEdit: { background: '#f1f5f9', border: 'none', color: '#475569', padding: '10px 20px', borderRadius: '12px', fontSize: '12px', fontWeight: '800', margin: '0 auto 25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
    timerPill: { padding: '10px 18px', background: '#0f172a', color: '#fff', borderRadius: '15px', display: 'inline-flex', alignItems: 'center', gap: '10px', margin: '0 auto', fontSize: '14px', fontWeight: '700' },
    verifyContainer: { padding: '10px' },
    lockCircle: { width: '64px', height: '64px', background: '#f8fafc', borderRadius: '20px', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' },
    btnVerify: { flex: 1, background: '#0f172a', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' },
    btnCancel: { flex: 1, background: '#f1f5f9', color: '#64748b', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' },
    loadingContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    progressBarBg: { width: '180px', height: '6px', background: '#f1f5f9', borderRadius: '10px', marginTop: '20px', overflow: 'hidden' },
    progressBarFill: { height: '100%', background: '#3b82f6', transition: 'width 0.2s ease' }
};

export default GenerarQR;
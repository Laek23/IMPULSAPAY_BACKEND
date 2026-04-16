import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  FaBarcode, FaQrcode, FaCreditCard, FaTimes, FaSpinner, FaLock, FaTrashAlt, FaPrint, FaClock, FaCheckCircle
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const FluxPaySystem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSearchProducts] = useState([]);
  const [showModalPago, setShowModalPago] = useState(false);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);
  const [pagoConfirmado, setPagoConfirmado] = useState(false);
  const [qrActivo, setQrActivo] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isAnalizando, setIsAnalizando] = useState(false);
  const barcodeInputRef = useRef(null);

  const fluxColors = {
    brand: "#1e3a8a",
    accent: "#3b82f6",
    success: "#10b981",
    text: "#1e293b",
    lightText: "#64748b",
    bg: "#f8fafc",
    border: "#e2e8f0",
  };

  const productos = [
    { id: 1, sku: "750105", nombre: "Café Sobre 50g", precio: 15.00 },
    { id: 2, sku: "750212", nombre: "Galletas Gamesa 100g", precio: 25.50 },
    { id: 3, sku: "750334", nombre: "Refresco Sprite", precio: 22.00 },
    { id: 4, sku: "750445", nombre: "Yakult", precio: 10.50 },
    { id: 5, sku: "750556", nombre: "Picafresa", precio: 1.00 },
  ];

  const subtotal = selectedProducts.reduce((acc, p) => acc + (p.precio * p.cant), 0);
  const total = subtotal * 1.18;

  useEffect(() => {
    if (!showModalPago) {
      const keepFocus = () => barcodeInputRef.current?.focus();
      document.addEventListener("click", keepFocus);
      return () => document.removeEventListener("click", keepFocus);
    }
  }, [showModalPago]);

  useEffect(() => {
    let timer;
    if (showModalPago && metodoSeleccionado === 'qr' && !pagoConfirmado) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setQrActivo({ id: `TX-${Date.now()}-${Math.floor(Math.random()*999)}` });
            return 300;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showModalPago, metodoSeleccionado, pagoConfirmado]);

  const addProduct = (prod) => {
    setSearchProducts(prev => {
      const exists = prev.find(item => item.id === prod.id);
      if (exists) return prev.map(item => item.id === prod.id ? { ...item, cant: item.cant + 1 } : item);
      return [...prev, { ...prod, cant: 1 }];
    });
  };

  const procesarPago = () => {
    setIsAnalizando(true);
    setTimeout(() => {
      setIsAnalizando(false);
      setPagoConfirmado(true);
    }, 1500);
  };

  const imprimirRecibo = () => {
    const ventanaImpresion = window.open('', '_blank');
    ventanaImpresion.document.write(`
      <html>
        <head>
          <title>FluxPay - Mérida</title>
          <style>
            body { font-family: 'Courier New', monospace; width: 280px; padding: 15px; font-size: 14px; }
            .text-center { text-align: center; }
            .divider { border-top: 1px dashed #000; margin: 10px 0; }
            .total { font-size: 18px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="text-center"><h3>FLUXPAY</h3><p>${new Date().toLocaleString()}</p></div>
          <div class="divider"></div>
          ${selectedProducts.map(p => `<div style="display:flex;justify-content:space-between"><span>${p.cant}x ${p.nombre}</span><span>$${(p.precio * p.cant).toFixed(2)}</span></div>`).join('')}
          <div class="divider"></div>
          <div class="total text-center">TOTAL: $${total.toFixed(2)}</div>
          <p class="text-center">¡Gracias por su compra!</p>
        </body>
      </html>
    `);
    ventanaImpresion.document.close();
    ventanaImpresion.print();
    resetVenta();
  };

  const resetVenta = () => {
    setShowModalPago(false);
    setSearchProducts([]);
    setQrActivo(null);
    setMetodoSeleccionado(null);
    setPagoConfirmado(false);
    Swal.fire({ title: 'Listo', text: 'Venta finalizada correctamente', icon: 'success', timer: 1500, showConfirmButton: false });
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: fluxColors.bg, color: fluxColors.text, fontFamily: "'Inter', sans-serif" }}>
      
      <main style={{ flex: 1, display: "flex", padding: "25px", gap: "25px" }}>
        
        {/* CATÁLOGO IZQUIERDA */}
        <section style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
          <header style={styles.header}>
             <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Flux<span style={{ color: fluxColors.accent }}>Pay</span></h2>
             <span style={styles.badge}>Mérida Centro</span>
          </header>

          <div style={styles.scannerWrapper}>
            <FaBarcode style={styles.inputIcon} size={22} />
            <input 
              ref={barcodeInputRef}
              style={styles.mainInput} 
              placeholder="Escanea el código del producto..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                  const p = productos.find(x => x.sku === searchTerm);
                  if(p) addProduct(p);
                  setSearchTerm("");
                }
              }}
            />
          </div>

          <div style={styles.productGrid}>
            {productos.map(p => (
              <div key={p.id} onClick={() => addProduct(p)} style={styles.productCard}>
                <span style={{ fontSize: '12px', color: fluxColors.lightText }}>#{p.sku}</span>
                <h4 style={{ margin: '8px 0', fontSize: '16px' }}>{p.nombre}</h4>
                <strong style={{ color: fluxColors.brand, fontSize: '18px' }}>${p.precio.toFixed(2)}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* TICKET DERECHA */}
        <aside style={styles.ticketContainer}>
          <div style={styles.ticketHeader}>
              <FaPrint color={fluxColors.lightText} size={16} />
              <h3 style={{ fontSize: '16px', margin: 0 }}>TICKET DE VENTA</h3>
          </div>

          <div style={styles.ticketScrollArea}>
            {selectedProducts.length === 0 ? (
              <div style={styles.emptyState}>No hay productos en lista</div>
            ) : (
              selectedProducts.map(item => (
                <div key={item.id} style={styles.ticketItem}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '15px' }}>{item.nombre}</div>
                    <div style={{ fontSize: '13px', color: fluxColors.lightText }}>{item.cant} x ${item.precio.toFixed(2)}</div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '700', fontSize: '16px' }}>${(item.precio * item.cant).toFixed(2)}</span>
                    <button onClick={() => setSearchProducts(prev => prev.filter(p => p.id !== item.id))} style={styles.btnDelete}><FaTrashAlt size={14} /></button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={styles.footerSection}>
            <div style={styles.summaryRow}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div style={styles.totalRow}><span>TOTAL</span><span>${total.toFixed(2)}</span></div>
            <button 
              style={{ ...styles.btnPagar, backgroundColor: selectedProducts.length > 0 ? fluxColors.accent : '#cbd5e1' }} 
              onClick={() => selectedProducts.length > 0 && setShowModalPago(true)}
            >
              PROCESAR COBRO
            </button>
          </div>
        </aside>
      </main>

      {/* MODAL DE PAGO */}
      {showModalPago && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.btnClose} onClick={() => pagoConfirmado ? resetVenta() : setShowModalPago(false)}><FaTimes /></button>
            
            {pagoConfirmado ? (
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <FaCheckCircle size={60} color={fluxColors.success} />
                <h2 style={{ fontSize: '26px', marginTop: '15px' }}>¡Pago Exitoso!</h2>
                <p style={{ color: fluxColors.lightText, fontSize: '16px' }}>La transacción se completó con éxito.</p>
                <button style={{ ...styles.btnConfirmarFinal, background: fluxColors.success, marginTop: '20px' }} onClick={imprimirRecibo}>
                  <FaPrint style={{ marginRight: '10px' }} /> IMPRIMIR TICKET
                </button>
              </div>
            ) : !metodoSeleccionado ? (
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ marginBottom: '25px', fontSize: '22px' }}>Selecciona Método</h2>
                <div style={styles.methodGrid}>
                  <div style={styles.methodCard} onClick={() => { setMetodoSeleccionado('qr'); setQrActivo({id: 'init'}); }}>
                    <FaQrcode size={40} color={fluxColors.accent} />
                    <span style={{ marginTop: '15px', fontWeight: '600', fontSize: '16px' }}>QR FluxPay</span>
                  </div>
                  <div style={styles.methodCard} onClick={() => setMetodoSeleccionado('card')}>
                    <FaCreditCard size={40} color="#3a4787a8" />
                    <span style={{ marginTop: '15px', fontWeight: '600', fontSize: '16px' }}>Tarjeta/Terminal</span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                {isAnalizando ? (
                  <div style={styles.loadingArea}>
                    <FaSpinner size={40} className="spin" color={fluxColors.accent} />
                    <p style={{ marginTop: '15px', fontSize: '18px' }}>Validando transacción...</p>
                  </div>
                ) : metodoSeleccionado === 'qr' ? (
                  <div style={styles.qrContainer}>
                    <div style={styles.qrBadge}><FaClock size={12} style={{ marginRight: '8px' }} /> Cambia en: {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</div>
                    <div style={styles.qrFrame}><QRCodeSVG value={qrActivo?.id || "flux"} size={180} /></div>
                    <h1 style={{ fontSize: '38px', margin: '20px 0', color: fluxColors.brand }}>${total.toFixed(2)}</h1>
                    <button style={styles.btnConfirmarFinal} onClick={procesarPago}>CONFIRMAR PAGO RECIBIDO</button>
                  </div>
                ) : (
                  <div style={{ padding: '20px' }}>
                    <FaLock size={40} color={fluxColors.lightText} />
                    <h2 style={{ fontSize: '32px', margin: '20px 0' }}>${total.toFixed(2)}</h2>
                    <p style={{ marginBottom: '20px', fontSize: '16px' }}>Deslice o inserte la tarjeta en la terminal</p>
                    <button style={styles.btnConfirmarFinal} onClick={procesarPago}>CONFIRMAR TERMINAL</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <style>{`.spin { animation: rotate 1s linear infinite; } @keyframes rotate { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const styles = {
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  badge: { background: '#dbeafe', color: '#1e40af', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' },
  scannerWrapper: { background: 'white', padding: '12px', borderRadius: '15px', position: 'relative', display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0' },
  mainInput: { width: '100%', padding: '12px 12px 12px 50px', borderRadius: '10px', border: '1px solid #f1f5f9', fontSize: '16px', outline: 'none', background: '#f8fafc' },
  inputIcon: { position: 'absolute', left: '20px', color: '#94a3b8' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' },
  productCard: { background: 'white', padding: '15px', borderRadius: '18px', cursor: 'pointer', border: '1px solid #e2e8f0', textAlign: 'center', transition: '0.2s' },
  
  ticketContainer: { width: '340px', backgroundColor: 'white', borderRadius: '25px', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', overflow: 'hidden' },
  ticketHeader: { padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' },
  ticketScrollArea: { flex: 1, overflowY: 'auto', padding: '15px' },
  ticketItem: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #f8fafc' },
  emptyState: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: '#94a3b8' },
  btnDelete: { background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', opacity: 0.6 },
  
  footerSection: { padding: '20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '15px', color: '#64748b' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: '800', margin: '12px 0', color: '#1e3a8a' },
  btnPagar: { width: '100%', padding: '15px', borderRadius: '12px', border: 'none', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer' },

  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' },
  modalContent: { background: 'white', width: '400px', padding: '35px', borderRadius: '30px', position: 'relative' },
  btnClose: { position: 'absolute', top: '20px', right: '20px', border: 'none', background: '#f1f5f9', width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  methodGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  methodCard: { padding: '25px 15px', border: '2px solid #f1f5f9', borderRadius: '20px', cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  qrBadge: { background: '#fef3c7', color: '#92400e', padding: '6px 15px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', marginBottom: '20px', display: 'inline-flex', alignItems: 'center' },
  qrFrame: { padding: '15px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', display: 'inline-block' },
  btnConfirmarFinal: { background: '#1e3a8a', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', width: '100%', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loadingArea: { padding: '40px 0', textAlign: 'center' }
};

export default FluxPaySystem;
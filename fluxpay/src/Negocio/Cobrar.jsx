import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaQrcode, FaCreditCard, FaTimes, FaReceipt, FaHourglassHalf, FaCheckCircle, FaTrash, FaMoneyBillWave, FaBarcode, FaUniversity, FaPrint } from 'react-icons/fa';

const FluxPaySystem = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [metodo, setMetodo] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [qrToken, setQrToken] = useState(Math.random().toString(36).substring(7).toUpperCase());
  const [barcodeInput, setBarcodeInput] = useState("");
  const [efectivoRecibido, setEfectivoRecibido] = useState("");
  const [ventaFinalizada, setVentaFinalizada] = useState(null);

  const productos = [
    { id: 1, nombre: "Café Sobre 50g", precio: 15.00, code: "750101" },
    { id: 2, nombre: "Galletas Gamesa", precio: 25.50, code: "750102" },
    { id: 3, nombre: "Refresco Sprite", precio: 22.00, code: "750103" },
    { id: 4, nombre: "Yakult", precio: 10.50, code: "750104" },
  ];

  // --- LÓGICA DE CÁLCULOS ---
  const subtotal = selectedProducts.reduce((acc, p) => acc + (p.precio * p.cant), 0);
  const gananciaFlux = subtotal > 0 ? (subtotal * 0.02) : 0;

  const calcularTotalFinal = () => {
    if (metodo === 'qr') return (subtotal + gananciaFlux + 3.00) / (1 - 0.036);
    if (metodo === 'card') return (subtotal + 3.00) / (1 - 0.036);
    return subtotal;
  };

  const total = calcularTotalFinal();
  
  // Cálculo de cambio dinámico
  const montoNumerico = parseFloat(efectivoRecibido) || 0;
  const cambio = montoNumerico > 0 ? montoNumerico - total : 0;

  useEffect(() => {
    let timer;
    if (showModal && metodo === 'qr') {
      timer = setInterval(() => {
        setTimeLeft((p) => (p <= 1 ? (setQrToken(Math.random().toString(36).substring(7).toUpperCase()), 300) : p - 1));
      }, 1000);
    }
    return () => {
        clearInterval(timer);
        if (!showModal) setTimeLeft(300);
    };
  }, [showModal, metodo]);

  const handleBarcodeSearch = (e) => {
    e.preventDefault();
    const productoEncontrado = productos.find(p => p.code === barcodeInput);
    if (productoEncontrado) {
      addProduct(productoEncontrado);
      setBarcodeInput("");
    }
  };

  const addProduct = (p) => {
    setSelectedProducts(prev => {
      const exists = prev.find(x => x.id === p.id);
      if (exists) return prev.map(x => x.id === p.id ? { ...x, cant: x.cant + 1 } : x);
      return [...prev, { ...p, cant: 1 }];
    });
  };

  const removeProduct = (id) => setSelectedProducts(prev => prev.filter(p => p.id !== id));

  // --- QR DATA FORMATEADO BONITO ---
  const comisionServicio = total - subtotal;
  const qrDataString = `
--- FLUXPAY ---

SUBTOTAL: $${subtotal.toFixed(2)}
IMPUESTOS/SERV: $${comisionServicio.toFixed(2)}
-----------------------
TOTAL A PAGAR: $${total.toFixed(2)}
-----------------------
¡Gracias por su preferencia!
  `.trim();

  const finalizarVenta = () => {
    setVentaFinalizada({
        productos: [...selectedProducts],
        total: total,
        subtotal: subtotal,
        comision: total - subtotal,
        metodo,
        fecha: new Date().toLocaleString()
    });
    setShowModal(false);
  };

  const resetTodo = () => {
    setVentaFinalizada(null);
    setSelectedProducts([]);
    setMetodo(null);
    setEfectivoRecibido("");
  };

  const imprimirTicket = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Ticket FluxPay</title>
          <style>
            body { font-family: 'Courier New', monospace; width: 80mm; padding: 5mm; color: #000; }
            .center { text-align: center; }
            .divider { border-top: 1px dashed #000; margin: 5px 0; }
            table { width: 100%; font-size: 12px; }
            .total { font-size: 16px; font-weight: bold; margin-top: 10px; }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="center">
            <h2 style="margin:0">FLUXPAY</h2>
            <p style="font-size:10px">MÉRIDA, YUCATÁN<br>${ventaFinalizada.fecha}</p>
          </div>
          <div class="divider"></div>
          <table>
            ${ventaFinalizada.productos.map(p => `
              <tr>
                <td>${p.cant}x ${p.nombre}</td>
                <td align="right">$${(p.precio * p.cant).toFixed(2)}</td>
              </tr>
            `).join('')}
          </table>
          <div class="divider"></div>
          <div style="font-size:12px">
            <div style="display:flex;justify-content:space-between"><span>SUBTOTAL:</span><span>$${ventaFinalizada.subtotal.toFixed(2)}</span></div>
            <div style="display:flex;justify-content:space-between"><span>COMISIÓN/SERV:</span><span>$${ventaFinalizada.comision.toFixed(2)}</span></div>
            <div class="total" style="display:flex;justify-content:space-between"><span>TOTAL:</span><span>$${ventaFinalizada.total.toFixed(2)}</span></div>
          </div>
          <div class="divider"></div>
          <p class="center" style="font-size:10px">¡GRACIAS POR SU COMPRA!</p>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div style={styles.terminalBg}>
      <div style={styles.mainLayout}>
        <section style={{ flex: 1, padding: '40px' }}>
          <header style={styles.header}>
            <h2 style={styles.logo}>Flux<span style={{color: '#0e2a5a'}}>Pay</span></h2>
            <div style={styles.badge}>TERMINAL DE COBRO MÉRIDA</div>
          </header>

          <form onSubmit={handleBarcodeSearch} style={styles.barcodeContainer}>
            <FaBarcode color="#0e2a5a" size={20} />
            <input 
              type="text" 
              placeholder="Escanea o escribe el código de barras..." 
              style={styles.barcodeInput}
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              autoFocus
            />
          </form>

          <div style={styles.grid}>
            {productos.map(p => (
              <div key={p.id} onClick={() => addProduct(p)} style={styles.cardProduct}>
                <strong style={styles.productTitle}>{p.nombre}</strong>
                <p style={styles.priceTag}>${p.precio.toFixed(2)}</p>
                <span style={styles.productCode}>Código: {p.code}</span>
              </div>
            ))}
          </div>
        </section>

        <aside style={styles.sidebar}>
          <div style={styles.ticketHeader}><FaReceipt /> RESUMEN DE ORDEN</div>
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            {selectedProducts.length === 0 && <div style={styles.emptyState}>Selecciona productos</div>}
            {selectedProducts.map(item => (
              <div key={item.id} style={styles.ticketItem}>
                <div>
                  <div style={styles.itemMainText}>{item.cant}x {item.nombre}</div>
                  <div style={styles.itemSubText}>${(item.precio * item.cant).toFixed(2)}</div>
                </div>
                <button onClick={() => removeProduct(item.id)} style={styles.deleteBtn}><FaTrash size={12}/></button>
              </div>
            ))}
          </div>
          <div style={styles.sidebarFooter}>
            <div style={styles.row}><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
            <div style={styles.totalRow}><span>TOTAL:</span><span>${subtotal.toFixed(2)}</span></div>
            <button 
                style={{...styles.btnCobrar, opacity: subtotal > 0 ? 1 : 0.5}} 
                onClick={() => subtotal > 0 && setShowModal(true)}
                disabled={subtotal <= 0}
            >PROCEDER AL PAGO</button>
          </div>
        </aside>
      </div>

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button onClick={() => {setShowModal(false); setMetodo(null); setEfectivoRecibido("")}} style={styles.closeBtn}><FaTimes/></button>
            
            {!metodo ? (
              <div style={{padding: '30px'}}>
                <h2 style={styles.modalTitle}>Método de Pago</h2>
                <div style={styles.methodGrid}>
                  <div style={styles.methodCard} onClick={() => setMetodo('qr')}><FaQrcode size={30}/><p>Código QR</p></div>
                  <div style={styles.methodCard} onClick={() => setMetodo('card')}><FaCreditCard size={30}/><p>Tarjeta</p></div>
                  <div style={styles.methodCard} onClick={() => setMetodo('trans')}><FaUniversity size={30}/><p>Transferencia</p></div>
                  <div style={styles.methodCard} onClick={() => setMetodo('cash')}><FaMoneyBillWave size={30}/><p>Efectivo</p></div>
                </div>
              </div>
            ) : (
              <div style={styles.modalContent}>
                <div style={styles.receiptContainer}>
                   <span style={styles.receiptTopLabel}>COBRO EN CURSO</span>
                   <div style={styles.receiptDivider}></div>
                   <p style={styles.labelTotal}>TOTAL A PAGAR</p>
                   <h1 style={styles.modalBigTotal}>${total.toFixed(2)}</h1>
                </div>

                {metodo === 'qr' && (
                  <div style={styles.centeredColumn}>
                    <div style={styles.statusBadge}>
                      <FaHourglassHalf/> PAGO PENDIENTE ({Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')})
                    </div>
                    <div style={styles.qrBox}>
                      <QRCodeSVG value={qrDataString} size={180} level="M" fgColor="#0e2a5a" />
                    </div>
                  </div>
                )}

                {metodo === 'card' && (
                  <div style={styles.centeredColumn}>
                    <div style={styles.loaderSpinner}></div>
                    <p style={{fontWeight: 'bold', color: '#0e2a5a', marginTop: '15px'}}>Procesando Tarjeta...</p>
                  </div>
                )}

                {metodo === 'cash' && (
                  <div style={styles.cashContainer}>
                    <input 
                      type="number" 
                      placeholder="$ Recibido" 
                      style={styles.cashInput}
                      value={efectivoRecibido}
                      onChange={(e) => setEfectivoRecibido(e.target.value)}
                      autoFocus
                    />
                    <div style={{...styles.cambioBox, background: cambio >= 0 && montoNumerico > 0 ? '#f0fdf4' : '#fff1f2'}}>
                      <span>CAMBIO:</span>
                      <strong style={{color: cambio >= 0 && montoNumerico > 0 ? '#16a34a' : '#ef4444'}}>
                        ${cambio >= 0 ? cambio.toFixed(2) : "0.00"}
                      </strong>
                    </div>
                  </div>
                )}

                {metodo === 'trans' && (
                  <div style={styles.centeredColumn}>
                    <FaUniversity size={40} color="#0e2a5a"/>
                    <p style={{fontWeight: 'bold', color: '#0e2a5a', marginTop: '15px'}}>Esperando Transferencia...</p>
                  </div>
                )}

                <button 
                  style={{...styles.btnFinalize, opacity: (metodo === 'cash' && montoNumerico < total) ? 0.5 : 1}} 
                  disabled={metodo === 'cash' && montoNumerico < total}
                  onClick={finalizarVenta}
                > 
                  <FaCheckCircle/> CONFIRMAR PAGO
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {ventaFinalizada && (
        <div style={styles.overlay}>
            <div style={{...styles.modal, width: '380px', padding: '30px'}}>
                <div style={{textAlign: 'center', marginBottom: '20px'}}>
                    <FaCheckCircle size={50} color="#16a34a" />
                    <h2 style={{color: '#0e2a5a', marginTop: '10px'}}>¡Venta Exitosa!</h2>
                    <p style={{fontSize: '12px', color: '#94a3b8'}}>{ventaFinalizada.fecha}</p>
                </div>
                
                <div style={{marginTop: '20px', borderTop: '2px solid #f1f5f9', paddingTop: '10px'}}>
                    <div style={styles.row}><span>Productos:</span><span>${ventaFinalizada.subtotal.toFixed(2)}</span></div>
                    <div style={styles.row}><span>Cargos:</span><span>${ventaFinalizada.comision.toFixed(2)}</span></div>
                    <div style={{...styles.row, fontWeight: 'bold', color: '#0e2a5a', fontSize: '18px', marginTop: '5px'}}>
                        <span>TOTAL:</span><span>${ventaFinalizada.total.toFixed(2)}</span>
                    </div>
                </div>

                <div style={{display: 'flex', gap: '10px', marginTop: '25px'}}>
                  <button style={{...styles.btnFinalize, background: '#f1f5f9', color: '#475569', flex: 1}} onClick={imprimirTicket}>
                      <FaPrint/> TICKET
                  </button>
                  <button style={{...styles.btnFinalize, flex: 2}} onClick={resetTodo}>
                      NUEVA VENTA
                  </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

// --- ESTILOS ---
const styles = {
  terminalBg: { backgroundColor: '#f4f7f9', height: '100vh', fontFamily: "'Inter', sans-serif" },
  mainLayout: { display: 'flex', height: '100%' },
  logo: { color: '#0e2a5a', fontWeight: '900', fontSize: '28px', margin: 0 },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' },
  badge: { background: '#0e2a5a', color: 'white', padding: '6px 16px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold' },
  barcodeContainer: { display: 'flex', alignItems: 'center', background: 'white', padding: '12px 20px', borderRadius: '15px', marginBottom: '30px', border: '1px solid #e2e8f0' },
  barcodeInput: { border: 'none', marginLeft: '15px', width: '100%', outline: 'none', fontSize: '15px', color: '#0e2a5a' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' },
  cardProduct: { background: 'white', padding: '25px', borderRadius: '20px', border: '1px solid #e2e8f0', cursor: 'pointer', textAlign: 'center' },
  productTitle: { fontSize: '16px', color: '#1e293b', display: 'block', marginBottom: '8px' },
  priceTag: { color: '#0e2a5a', fontWeight: '800', fontSize: '24px', margin: '0' },
  productCode: { fontSize: '11px', color: '#94a3b8', marginTop: '10px', display: 'block' },
  sidebar: { width: '400px', background: 'white', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' },
  ticketHeader: { padding: '25px', fontWeight: 'bold', borderBottom: '1px solid #f1f5f9', color: '#475569' },
  ticketItem: { display: 'flex', justifyContent: 'space-between', padding: '15px 20px', alignItems: 'center', borderBottom: '1px solid #f8fafc' },
  itemMainText: { fontSize: '14px', color: '#1e293b', fontWeight: '600' },
  itemSubText: { fontSize: '14px', color: '#0e2a5a', fontWeight: 'bold' },
  deleteBtn: { background: '#f8fafc', color: '#94a3b8', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' },
  sidebarFooter: { padding: '25px', borderTop: '4px solid #f4f7f9' },
  row: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#64748b', fontSize: '14px' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '28px', color: '#0e2a5a', fontWeight: '900', marginTop: '10px' },
  btnCobrar: { width: '100%', padding: '18px', background: '#0e2a5a', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(14, 42, 90, 0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(6px)' },
  modal: { background: 'white', borderRadius: '35px', width: '440px', position: 'relative', overflow: 'hidden' },
  closeBtn: { position: 'absolute', top: '20px', right: '20px', border: 'none', background: '#f1f5f9', borderRadius: '50%', padding: '10px', cursor: 'pointer', zIndex: 10 },
  modalContent: { padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  centeredColumn: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
  receiptContainer: { textAlign: 'center', width: '100%', marginBottom: '20px' },
  receiptTopLabel: { fontSize: '12px', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px' },
  receiptDivider: { borderTop: '1px dashed #e2e8f0', margin: '15px 0' },
  labelTotal: { fontSize: '14px', color: '#64748b', marginBottom: '5px' },
  modalBigTotal: { fontSize: '58px', fontWeight: '900', color: '#0e2a5a', margin: '0' },
  statusBadge: { background: '#fffbeb', color: '#b45309', padding: '10px 20px', borderRadius: '50px', fontSize: '13px', fontWeight: 'bold', display: 'inline-flex', gap: '8px', marginBottom: '20px' },
  qrBox: { padding: '20px', background: 'white', borderRadius: '25px', border: '1px solid #f1f5f9', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'center', marginBottom: '15px' },
  cashContainer: { width: '100%', textAlign: 'center' },
  cashInput: { width: '100%', padding: '15px', fontSize: '28px', textAlign: 'center', borderRadius: '15px', border: '2px solid #e2e8f0', color: '#0e2a5a', fontWeight: 'bold', outline: 'none', marginBottom: '15px' },
  cambioBox: { padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' },
  loaderSpinner: { width: '45px', height: '45px', border: '4px solid #f3f3f3', borderTop: '4px solid #0e2a5a', borderRadius: '50%', animation: 'spin 1s linear infinite' },
  btnFinalize: { width: '100%', background: '#0e2a5a', color: 'white', border: 'none', padding: '20px', borderRadius: '18px', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', marginTop: '10px' },
  methodGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  methodCard: { padding: '25px', border: '1px solid #e2e8f0', borderRadius: '20px', cursor: 'pointer', textAlign: 'center', color: '#0e2a5a', fontWeight: 'bold' }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(styleSheet);

export default FluxPaySystem;
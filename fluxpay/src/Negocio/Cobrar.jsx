import React, { useState, useEffect } from 'react';
import { FaSearch, FaQrcode, FaBackspace, FaTrashAlt, FaCheck, FaCreditCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { QRCodeSVG } from 'qrcode.react';
import ReactDOM from 'react-dom/client';

const Cobrar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [monto, setMonto] = useState("0");

  const productos = [
    { id: 1, nombre: "Café Sobre 50g", precio: 15 },
    { id: 2, nombre: "Galletas Gamesa 100g", precio: 25 },
    { id: 3, nombre: "Refresco Sprite", precio: 22 },
    { id: 4, nombre: "Yakult", precio: 10 },
    { id: 5, nombre: "Picafresa", precio: 5 },
  ];

  useEffect(() => {
    const totalSelected = selectedProducts.reduce((acc, prod) => acc + prod.precio, 0);
    setMonto(totalSelected > 0 ? totalSelected.toString() : "0");
  }, [selectedProducts]);

  // --- 1. COBRO CON TARJETA (Simulación de Terminal Bancaria) ---
  const handleTarjeta = () => {
    const total = parseFloat(monto);
    if (total === 0) {
      Swal.fire({ icon: 'error', title: 'Monto en cero', text: 'No hay nada que cobrar.', confirmButtonColor: '#ef4444' });
      return;
    }

    Swal.fire({
      title: 'Procesando Tarjeta',
      html: `
        <div style="margin: 20px 0;">
          <p>Monto a cobrar: <b>$${total}</b></p>
          <div class="swal2-loading" style="display: flex; margin: 20px auto;"></div>
          <p style="font-size: 0.9rem; color: #666;">Conectando con la terminal...</p>
        </div>
      `,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        Swal.fire({
          icon: 'success',
          title: '¡Pago Aprobado!',
          html: `<p>Operación: <b>#${Math.floor(Math.random() * 888888 + 111111)}</b></p>`,
          confirmButtonColor: '#112240',
          confirmButtonText: 'Listo'
        });
        handleKeypress("C");
      }
    });
  };

  // --- 2. COBRO CON QR (Generación inmediata) ---
  const handleIrAQR = () => {
    if (parseFloat(monto) === 0) {
      Swal.fire({ icon: 'info', title: 'Atención', text: 'Ingresa un monto para generar el QR.', confirmButtonColor: '#3b82f6' });
      return;
    }

    Swal.fire({
      title: 'Pago con QR',
      html: '<div id="qr-container" style="display:flex; flex-direction:column; align-items:center; padding:10px;"></div>',
      didOpen: () => {
        const container = document.getElementById('qr-container');
        if (container) {
          const root = ReactDOM.createRoot(container);
          root.render(
            <>
              <QRCodeSVG value={`fluxpay_v2_trans:${Date.now()}_amt:${monto}`} size={200} level="H" includeMargin={true} />
              <h2 style={{ marginTop: '15px', color: '#243f6b' }}>Total: $${monto}</h2>
            </>
          );
        }
      },
      showConfirmButton: true,
      confirmButtonText: 'Confirmar Recepción',
      confirmButtonColor: '#112240',
    }).then((result) => {
      if (result.isConfirmed) handleKeypress("C");
    });
  };

  // --- LÓGICA DE TECLADO ---
  const handleKeypress = (val) => {
    if (val === "C") {
      setMonto("0");
      setSelectedProducts([]);
      return;
    }
    if (val === "del") {
      setMonto(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
      return;
    }
    setMonto(prev => {
      if (prev.length > 8) return prev;
      if (prev === "0" && val !== ".") return val.toString();
      if (val === "." && prev.includes(".")) return prev;
      return prev + val.toString();
    });
  };

  const toggleProduct = (prod) => {
    if (selectedProducts.find(p => p.id === prod.id)) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== prod.id));
    } else {
      setSelectedProducts([...selectedProducts, prod]);
    }
  };

  return (
    <div className="pos-wrapper">
      <h2 className="pos-title">Punto de Venta Digital</h2>
      
      <div className="pos-grid">
        {/* Inventario */}
        <div className="pos-card">
          <h3 className="card-label">Inventario</h3>
          <div className="pos-search">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Buscar producto..." 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="pos-scroll-list">
            {productos.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((prod) => {
              const active = selectedProducts.find(p => p.id === prod.id);
              return (
                <div key={prod.id} className={`pos-item ${active ? 'is-selected' : ''}`} onClick={() => toggleProduct(prod)}>
                  <div className="pos-item-info">
                    <div className="pos-checkbox">{active && <FaCheck />}</div>
                    <span>{prod.nombre}</span>
                  </div>
                  <span className="pos-price">${prod.precio}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Display y Métodos de Pago */}
        <div className="pos-card">
          <div className="pos-display">
            <span span style={{fontSize: '13px', fontWeight: 'bold'}}>TOTAL A COBRAR</span>
            <h2 className="pos-display-value">${monto}</h2>
          </div>

          <div className="pos-keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0].map(n => (
              <button key={n} className="key-btn" onClick={() => handleKeypress(n)}>{n}</button>
            ))}
            <button className="key-btn key-del" onClick={() => handleKeypress("del")}><FaBackspace /></button>
          </div>

          <button className="key-clear" onClick={() => handleKeypress("C")}>
            <FaTrashAlt /> Limpiar Cuenta
          </button>

          {/* Solo QR y Tarjeta */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <button className="btn-qr" onClick={handleIrAQR} style={{ backgroundColor: '#466699', color: 'white', padding: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <FaQrcode size={24} /> <span style={{fontSize: '13px', fontWeight: 'bold'}}>PAGO CON QR</span>
            </button>
            
            <button className="btn-card" onClick={handleTarjeta} style={{ backgroundColor: '#364384', color: 'white', padding: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <FaCreditCard size={24} /> <span style={{fontSize: '13px', fontWeight: 'bold'}}>TARJETA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cobrar;
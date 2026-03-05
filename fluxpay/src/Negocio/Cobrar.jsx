import React, { useState, useEffect } from 'react';
import { FaSearch, FaQrcode, FaMoneyCheckAlt, FaBackspace, FaTrashAlt, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

  // Lógica de navegación y pago
  const handlePagar = () => {
    if (parseFloat(monto) === 0) {
      alert("El monto debe ser mayor a 0 para procesar un pago.");
      return;
    }
    // Aquí podrías disparar una petición a tu API para registrar la venta
    alert(`¡Pago procesado con éxito por $${monto}!`);
    handleKeypress("C"); // Limpia la cuenta tras el éxito
  };
const handleIrAQR = () => {
  if (parseFloat(monto) === 0) {
    alert("Ingresa un monto primero.");
    return;
  }
  // IMPORTANTE: El path debe coincidir con el de App.js (/Negocio/QR)
  navigate('/Negocio/QR', { state: { montoCobro: monto } });
};
  const handleKeypress = (val) => {
    if (val === "C") { setMonto("0"); setSelectedProducts([]); return; }
    if (val === "del") { setMonto(prev => prev.length > 1 ? prev.slice(0, -1) : "0"); return; }
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
      <h2 className="pos-title">Punto de Venta</h2>
      
      <div className="pos-grid">
        <div className="pos-card">
          <h3 className="card-label">Inventario de Productos</h3>
          <div className="pos-search">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Buscar por nombre..." 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="pos-scroll-list">
            {productos.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((prod) => {
              const active = selectedProducts.find(p => p.id === prod.id);
              return (
                <div key={prod.id} className={`pos-item ${active ? 'is-selected' : ''}`} onClick={() => toggleProduct(prod)}>
                  <div className="pos-item-info">
                    <div className="pos-checkbox">
                      {active && <FaCheck />}
                    </div>
                    <span>{prod.nombre}</span>
                  </div>
                  <span className="pos-price">${prod.precio}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pos-card">
          <div className="pos-display">
            <span className="pos-display-label">TOTAL NETO</span>
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

          <div className="pos-actions">
            {/* Botones con funciones asignadas */}
            <button className="btn-qr" onClick={handleIrAQR}>
              <FaQrcode /> QR
            </button>
            <button className="btn-pay" onClick={handlePagar}>
              <FaMoneyCheckAlt /> Pagar Total
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cobrar;
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaBarcode, FaPrint, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Cobrar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const barcodeInputRef = useRef(null);

  const productos = [
    { id: 1, sku: "750105", nombre: "Café Sobre 50g", precio: 15 },
    { id: 2, sku: "750212", nombre: "Galletas Gamesa 100g", precio: 25 },
    { id: 3, sku: "750334", nombre: "Refresco Sprite", precio: 22 },
    { id: 4, sku: "750445", nombre: "Yakult", precio: 10 },
    { id: 5, sku: "750556", nombre: "Picafresa", precio: 5 },
  ];

  // Lógica de Escaneo: Si el usuario escribe rápido (o usa escáner), busca el producto
  const handleBarcodeSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    const found = productos.find(p => p.sku === value);
    if (found) {
      addProduct(found);
      setSearchTerm(""); // Limpia para el siguiente escaneo
    }
  };

  const addProduct = (prod) => {
    setSelectedProducts(prev => {
      const exists = prev.find(item => item.id === prod.id);
      if (exists) {
        return prev.map(item => item.id === prod.id 
          ? { ...item, cant: item.cant + 1 } 
          : item
        );
      }
      return [...prev, { ...prod, cant: 1 }];
    });
  };

  const updateCant = (id, delta) => {
    setSelectedProducts(prev => prev.map(item => 
      item.id === id ? { ...item, cant: Math.max(1, item.cant + delta) } : item
    ));
  };

  const removeProduct = (id) => {
    setSelectedProducts(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = selectedProducts.reduce((acc, p) => acc + (p.precio * p.cant), 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  const handlePrint = () => {
    window.print(); // Esto activará el diálogo de impresión del navegador
  };

  return (
    <div className="pos-container">
      <div className="pos-left">
        <div className="search-section">
          <label><FaBarcode /> Escanear o Buscar Producto</label>
          <div className="pos-search-input">
            <input 
              ref={barcodeInputRef}
              type="text" 
              placeholder="Código de barras o nombre..." 
              value={searchTerm}
              onChange={handleBarcodeSearch}
              autoFocus
            />
          </div>
        </div>

        <div className="product-grid">
          {productos.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.includes(searchTerm)).map(p => (
            <div key={p.id} className="product-card-item" onClick={() => addProduct(p)}>
              <span className="sku-tag">{p.sku}</span>
              <h4>{p.nombre}</h4>
              <p className="price-tag">${p.precio.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pos-right ticket-area" id="ticket-to-print">
        <div className="ticket-header">
          <h3>BODEGA CARMENCITA</h3>
          <p>Fecha: {new Date().toLocaleDateString()} | {new Date().toLocaleTimeString()}</p>
          <hr />
        </div>

        <div className="ticket-table">
          <div className="t-head">
            <span>Prod</span>
            <span>Cant</span>
            <span>Total</span>
          </div>
          <div className="t-body">
            {selectedProducts.map(item => (
              <div key={item.id} className="t-row">
                <div className="t-info">
                  <span className="t-name">{item.nombre}</span>
                  <div className="qty-controls no-print">
                    <button onClick={(e) => {e.stopPropagation(); updateCant(item.id, -1)}}><FaMinus/></button>
                    <button onClick={(e) => {e.stopPropagation(); updateCant(item.id, 1)}}><FaPlus/></button>
                    <button className="btn-del" onClick={(e) => {e.stopPropagation(); removeProduct(item.id)}}><FaTrash/></button>
                  </div>
                </div>
                <span>x{item.cant}</span>
                <span>${(item.precio * item.cant).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ticket-footer">
          <div className="f-row"><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></div>
          <div className="f-row"><span>IGV (18%):</span> <span>${igv.toFixed(2)}</span></div>
          <div className="f-row total"><span>TOTAL:</span> <span>${total.toFixed(2)}</span></div>
        </div>

        <div className="action-buttons no-print">
          <button className="btn-print" onClick={handlePrint}><FaPrint /> Imprimir Ticket</button>
          <button className="btn-pay-qr">Pago QR / Tarjeta</button>
        </div>
      </div>
    </div>
  );
};

export default Cobrar;
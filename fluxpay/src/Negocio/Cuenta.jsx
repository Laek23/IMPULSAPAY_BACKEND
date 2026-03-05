import React from 'react';
import { 
  FaUniversity, 
  FaArrowUp, 
  FaArrowDown, 
  FaCheckCircle, 
  FaEllipsisV, 
  FaPlus 
} from 'react-icons/fa';

const Cuenta = () => {
  // Datos simulados para el historial
  const transferencias = [
    { fecha: "2/12/2012", concepto: "Comida", monto: "$1912", tipo: "ingreso" },
    { fecha: "2/12/2012", concepto: "Pago", monto: "$1121", tipo: "ingreso" },
    { fecha: "5/12/2025", concepto: "Tienda", monto: "$871", tipo: "ingreso" },
    { fecha: "2/01/2012", concepto: "Disp", monto: "$119", tipo: "ingreso" },
  ];

  return (
    <div className="cuenta-container">
      {/* Header de la Vista */}
      <div className="cuenta-header">
        <select className="filter-select">
          <option>La semana pasada</option>
          <option>Este mes</option>
        </select>
      </div>

      <h2 className="cuenta-main-title">Gestion de Cuenta Bancaria</h2>

      {/* Tarjetas de Métricas Superiores */}
      <div className="metrics-row">
        <div className="metric-card">
          <span className="metric-label">Pagos recibidos</span>
          <h3 className="metric-value">$5,300.000</h3>
        </div>
        <div className="metric-card">
          <span className="metric-label">Pagos en proceso</span>
          <h3 className="metric-value">$1,340.000</h3>
        </div>
        <div className="metric-card card-highlight">
          <span className="metric-label">Último retiro</span>
          <h3 className="metric-value negative">-$1,500.000</h3>
        </div>
      </div>

      {/* Contenido Principal: Tabla y Cuentas Vinculadas */}
      <div className="cuenta-content-grid">
        
        {/* Lado Izquierdo: Historial de Transferencias */}
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
                {transferencias.map((item, index) => (
                  <tr key={index}>
                    <td>{item.fecha}</td>
                    <td>{item.concepto}</td>
                    <td className="amount-text">{item.monto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lado Derecho: Cuentas Vinculadas */}
        <div className="accounts-section">
          <div className="section-header-flex">
            <h4 className="card-title">Cuentas vinculadas</h4>
          </div>
          
          <div className="bank-list">
            {/* Tarjeta BBVA */}
            <div className="bank-card bbva">
              <div className="bank-info">
                <div className="bank-logo-name">
                  <FaCheckCircle className="check-icon" />
                  <span className="bank-name-tag">BBVA</span>
                </div>
                <p className="bank-full-name">BBVA bancomer (****123)</p>
              </div>
            </div>

            {/* Tarjeta Santander */}
            <div className="bank-card santander">
              <div className="bank-info">
                <div className="bank-logo-name">
                  <span className="bank-icon-santander">S</span>
                  <span className="bank-name-tag">Santander</span>
                </div>
                <p className="bank-full-name">(****567)</p>
              </div>
            </div>

            <button className="btn-add-account">
              <FaPlus /> Vincular nueva cuenta
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cuenta;
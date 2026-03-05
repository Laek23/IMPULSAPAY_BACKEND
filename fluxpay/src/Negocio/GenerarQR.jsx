import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; 
import { FaArrowLeft, FaHourglassHalf, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const GenerarQR = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const monto = location.state?.montoCobro || "0";
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="qr-page-wrapper">
      <div className="qr-container">
        {/* Botón superior */}
        <button className="qr-btn-back" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Volver al punto de venta
        </button>

        <div className="qr-glass-card">
          <div className="qr-status-header">
            <span className="status-dot"></span>
            Esperando pago...
          </div>

          <div className="qr-main-info">
            <p className="label-text">Total a recibir</p>
            <h1 className="monto-display">${monto}</h1>
          </div>

          <div className={`qr-render-area ${timeLeft === 0 ? 'expired' : ''}`}>
            <QRCodeSVG 
              value={`fluxpay://checkout?amount=${monto}`} 
              size={220}
              level={"H"}
              includeMargin={false}
              className="svg-qr"
            />
            {timeLeft === 0 && (
              <div className="expired-overlay">
                <FaExclamationCircle />
                <p>QR Expirado</p>
              </div>
            )}
          </div>

          <div className="qr-instructions">
            <p>Escanea este código desde la app móvil para confirmar la transacción</p>
          </div>

          <div className={`qr-timer-pill ${timeLeft < 60 ? 'critical' : ''}`}>
            <FaHourglassHalf className={timeLeft < 60 ? 'spin' : ''} />
            <span>El código expira en <strong>{formatTime(timeLeft)}</strong></span>
          </div>
        </div>

        <div className="qr-security-info">
          <FaCheckCircle /> Pago seguro encriptado por FluxPay
        </div>
      </div>
    </div>
  );
};

export default GenerarQR;
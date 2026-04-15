import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./plan.css";

export default function VistaPlan(){
  return (
    <div className="plan-page">

{/* LOGO CON IMAGEN ORIGINAL */}
<div className="plan-logo-wrapper">
  <img src="/fluxpay.jpg" alt="FluxPay Logo" className="plan-logo-premium" />
</div>

      <div className="plan-container">

        <h1 className="plan-title">Elige tu plan</h1>
        <p className="plan-subtitle">
          Escoge el plan que mejor se adapte a tu negocio
        </p>

        <div className="plan-cards">

          {/* GRATIS */}
          <div className="plan-card">
            <div className="plan-badge">PRUEBA</div>
            <h2>Gratuita</h2>

            <ul>
              <li>75 productos</li>
              <li>10 transferencias semanales</li>
              <li>14 días de prueba</li>
              <li>Anuncios</li>
            </ul>

            <div className="plan-price">Gratis</div>
            <button className="plan-btn">Empezar</button>
          </div>

          {/* ESTANDAR */}
          <div className="plan-card popular">
            <div className="plan-badge popular-badge">Más usado</div>
            <h2>Estándar</h2>

            <ul>
              <li>150 productos</li>
              <li>25 transferencias semanales</li>
              <li>Acceso a negocios</li>
              <li>Gráficas de ingresos</li>
              <li>Top productos</li>
            </ul>

            <div className="plan-price">$150 <span>/mes</span></div>
            <button className="plan-btn">Suscribirse</button>
          </div>

          {/* PREMIUM */}
          <div className="plan-card premium">
            <div className="plan-badge premium-badge">PRO</div>
            <h2>Premium</h2>

            <ul>
              <li>Productos ilimitados</li>
              <li>Transferencias ilimitadas</li>
              <li>Todo desbloqueado</li>
              <li>Soporte 24/7</li>
              <li>Sin anuncios</li>
            </ul>

            <div className="plan-price">$500 <span>/mes</span></div>
            <button className="plan-btn">Ir Premium</button>
          </div>

        </div>
      </div>
    </div>
  );
}
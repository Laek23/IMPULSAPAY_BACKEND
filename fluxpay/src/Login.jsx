import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/admin/dashboard");
  };

  return (
    <div className="login-container">

      {/* Fondo con overlay */}
      <div className="login-overlay">

        {/* Panel izquierdo estilo referencia */}
        <div className="login-left">
          <div className="left-content">
            <h1>
              Bienvenido a <span>FluxPay</span>
            </h1>
            <p>
              Gestiona tus negocios, analiza ingresos y controla
              tus transacciones desde un solo lugar.
            </p>
            <button
              className="btn-register"
              onClick={() => navigate("/register")}
            >
              Registrate
            </button>
          </div>
        </div>

        {/* Card login derecha */}
        <div className="login-right">
          <div className="login-card">

            <div className="logo-box">
              <img
                src="/fluxpay.jpg"
                alt="FluxPay Logo"
                className="login-logo"
              />
            </div>

            <h2>Iniciar sesión</h2>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Correo electrónico"
                required
              />

              <input
                type="password"
                placeholder="Contraseña"
                required
              />

              <button type="submit" className="btn-login">
                Iniciar sesión
              </button>

              <p className="forgot">Olvidé mi contraseña</p>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
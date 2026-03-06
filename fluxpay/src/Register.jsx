import { useNavigate } from "react-router-dom";
import "./register.css";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Cuenta creada",
      text: "Tu cuenta fue registrada correctamente.",
      confirmButtonText: "Continuar",
      confirmButtonColor: "#0d2b5c",
      background: "#ffffff",
      color: "#333"
    });
  };

  return (
    <div className="register-page">

      {/* SECCIÓN IZQUIERDA */}
      <div className="register-left">
        <img 
          src="/fluxpay.jpg" 
          alt="FluxPay Logo" 
          className="hero-logo"
        />

        <h1>
          Impulsa tu negocio con <span>FluxPay</span>
        </h1>

        <p>
          Acepta pagos digitales, genera códigos QR y administra tus 
          ingresos desde una sola plataforma segura y moderna.
        </p>
      </div>

      {/* CARD DERECHA */}
      <form className="register-card" onSubmit={handleRegister}>
        <h2>Crear Cuenta</h2>

        <div className="register-grid">
          <input type="email" placeholder="Correo" required />
          <input type="text" placeholder="Nombre" required />
          <input type="password" placeholder="Contraseña" required />
          <input type="text" placeholder="Banco" required />
          <input type="text" placeholder="Nombre del negocio" />
          <input type="text" placeholder="Cuenta bancaria" />
        </div>

        <button type="submit" className="btn-primary">
          Registrarme
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate("/")}
        >
          Volver al Login
        </button>
      </form>
    </div>
  );
}

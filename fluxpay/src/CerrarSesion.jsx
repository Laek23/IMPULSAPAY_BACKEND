import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { FaHome,FaSignOutAlt,FaHistory,FaCog, } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CerrarSesion(){
    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      localStorage.removeItem("token");
      window.location.href = "/";

    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div className="logout" onClick={handleLogout} style={{cursor:"pointer"}}>
    <FaSignOutAlt />
      Cerrar sesión
    </div>
  );
}

export default CerrarSesion;
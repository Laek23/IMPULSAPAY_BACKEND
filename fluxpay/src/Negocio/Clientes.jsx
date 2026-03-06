import React, { useState } from "react";
import { 
  FaUserPlus, FaTrash, FaUserEdit, FaUserCircle, 
  FaExclamationTriangle, FaCalendarAlt, FaDollarSign,
  FaChevronLeft, FaChevronRight 
} from "react-icons/fa";

export default function Clientes() {
  // --- ESTADOS ---
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  
  // Estados de Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 5;

  const colores = {
    primario: "#0e2a5a",
    azulBoton: "#11264c",
    secundario: "#1e417c",
    fondoCapa: "#eef2f7",
    fondoCírculo: "#f0f4f9", 
    textoGris: "#64748b",
    eliminar: "#ef4444" 
  };

  const [clientes, setClientes] = useState([
    { id: 1, nombre: "Ramón Sanchez", fecha: "12/12/2021", ingresos: "$1912", img: "https://i.pravatar.cc/150?u=1" },
    { id: 2, nombre: "Pedro Polanco", fecha: "15/01/2022", ingresos: "$1121", img: "https://i.pravatar.cc/150?u=2" },
    { id: 3, nombre: "Enrique Malahierba", fecha: "20/03/2023", ingresos: "$871", img: "https://i.pravatar.cc/150?u=3" },
    { id: 4, nombre: "Vanesa Aliz", fecha: "12/12/2021", ingresos: "$119", img: "https://i.pravatar.cc/150?u=4" },
    { id: 5, nombre: "Juan Pérez", fecha: "05/05/2024", ingresos: "$500", img: "https://i.pravatar.cc/150?u=5" },
    { id: 6, nombre: "Lucía Méndez", fecha: "10/06/2024", ingresos: "$1200", img: "https://i.pravatar.cc/150?u=6" },
  ]);

  // --- LÓGICA DE PAGINACIÓN ---
  const totalPaginas = Math.ceil(clientes.length / ITEMS_POR_PAGINA);
  const indiceUltimo = paginaActual * ITEMS_POR_PAGINA;
  const indicePrimero = indiceUltimo - ITEMS_POR_PAGINA;
  const clientesVisibles = clientes.slice(indicePrimero, indiceUltimo);

  const cambiarPagina = (numero) => {
    if (numero >= 1 && numero <= totalPaginas) {
      setPaginaActual(numero);
    }
  };

  // --- MANEJADORES ---
  const handleGuardar = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nombre = formData.get("nombre");
    const ingresos = formData.get("ingresos");
    const fecha = formData.get("fecha");

    if (editandoId) {
      setClientes(clientes.map(c => 
        c.id === editandoId 
          ? { ...c, nombre: nombre, ingresos: `$${ingresos}`, fecha: fecha } 
          : c
      ));
    } else {
      const nuevo = {
        id: Date.now(),
        nombre: nombre,
        fecha: fecha,
        ingresos: `$${ingresos}`,
        img: `https://i.pravatar.cc/150?u=${Date.now()}`
      };
      setClientes([nuevo, ...clientes]);
      setPaginaActual(1); // Volver a la 1 para ver el nuevo registro
    }
    cerrarModal();
  };

  const prepararEdicion = (cliente) => {
    setEditandoId(cliente.id);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setEditandoId(null);
  };

  const ejecutarEliminacion = () => {
    const nuevosClientes = clientes.filter(c => c.id !== clienteAEliminar.id);
    setClientes(nuevosClientes);
    // Si la página se queda vacía al borrar, retroceder una página
    if (nuevosClientes.slice(indicePrimero, indiceUltimo).length === 0 && paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
    setShowDeleteModal(false);
    setClienteAEliminar(null);
  };

  return (
    <div className="clientes-view" style={{ padding: "40px", backgroundColor: "#f4f7fa", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "35px" }}>
        <h2 style={{ color: colores.primario, margin: 0, fontSize: "28px", fontWeight: "800" }}>Clientes</h2>
        <button 
          onClick={() => setShowModal(true)} 
          style={{ 
            background: colores.azulBoton, color: "white", padding: "14px 24px", borderRadius: "12px", 
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", 
            fontWeight: "700", fontSize: "15px", boxShadow: "0 4px 12px rgba(17, 38, 76, 0.2)"
          }}
        >
          <FaUserPlus /> Agregar cliente
        </button>
      </div>

      {/* CONTENEDOR DE TABLA */}
      <div style={{ background: "white", borderRadius: "24px", padding: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 15px" }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th style={{ padding: "0 20px", color: colores.primario, fontSize: "15px", fontWeight: "700" }}>Clientes</th>
              <th style={{ padding: "0 20px", color: colores.primario, fontSize: "15px", fontWeight: "700" }}>Fecha en que ingreso</th>
              <th style={{ padding: "0 20px", color: colores.primario, fontSize: "15px", fontWeight: "700" }}>Ingresos</th>
              <th style={{ padding: "0 20px", color: colores.primario, fontSize: "15px", fontWeight: "700", textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesVisibles.map((item) => (
              <tr key={item.id} style={{ transition: "all 0.3s" }}>
                <td style={{ padding: "10px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                    <img src={item.img} alt="avatar" style={{ width: "55px", height: "55px", borderRadius: "50%", objectFit: "cover", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }} />
                    <span style={{ fontWeight: "600", color: "#475569", fontSize: "16px" }}>{item.nombre}</span>
                  </div>
                </td>
                <td style={{ padding: "10px 20px", color: "#3b82f6", fontWeight: "500" }}>{item.fecha}</td>
                <td style={{ padding: "10px 20px", color: "#64748b", fontWeight: "600" }}>{item.ingresos}</td>
                <td style={{ padding: "10px 20px", textAlign: "right" }}>
                  <button onClick={() => prepararEdicion(item)} style={{ color: "#3b82f6", background: "#eff6ff", border: "none", padding: "10px", borderRadius: "10px", cursor: "pointer", marginRight: "10px" }}><FaUserEdit size={18} /></button>
                  <button onClick={() => { setClienteAEliminar(item); setShowDeleteModal(true); }} style={{ color: colores.eliminar, background: "#fef2f2", border: "none", padding: "10px", borderRadius: "10px", cursor: "pointer" }}><FaTrash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* CONTROLES DE PAGINACIÓN (Basado en tu imagen) */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "20px", paddingBottom: "10px" }}>
          <button 
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            style={estiloBtnPaginacion(false, paginaActual === 1)}
          >
            <FaChevronLeft size={12} />
          </button>

          {[...Array(totalPaginas)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => cambiarPagina(i + 1)}
              style={estiloBtnPaginacion(paginaActual === i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button 
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            style={estiloBtnPaginacion(false, paginaActual === totalPaginas)}
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* MODAL AGREGAR/EDITAR */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(14, 42, 90, 0.4)", backdropFilter: "blur(6px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "white", padding: "35px", borderRadius: "28px", width: "400px", boxShadow: "0 25px 50px rgba(0,0,0,0.2)" }}>
            <h3 style={{ color: colores.primario, marginTop: 0, fontSize: "22px", marginBottom: "25px", textAlign: "center" }}>
              {editandoId ? "Actualizar Datos" : "Información del Cliente"}
            </h3>
            <form onSubmit={handleGuardar} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ position: "relative" }}>
                <label style={{ fontSize: "13px", color: colores.textoGris, fontWeight: "600", display: "block", marginBottom: "8px" }}>Nombre Completo</label>
                <div style={{ display: "flex", alignItems: "center", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "2px 12px" }}>
                  <FaUserCircle color="#94a3b8" />
                  <input name="nombre" placeholder="Nombre del cliente" defaultValue={editandoId ? clientes.find(c => c.id === editandoId).nombre : ""} required style={{ width: "100%", padding: "12px", border: "none", background: "transparent", outline: "none", fontWeight: "500" }} />
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <label style={{ fontSize: "13px", color: colores.textoGris, fontWeight: "600", display: "block", marginBottom: "8px" }}>Fecha de Ingreso</label>
                <div style={{ display: "flex", alignItems: "center", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "2px 12px" }}>
                  <FaCalendarAlt color="#94a3b8" />
                  <input name="fecha" type="text" placeholder="DD/MM/AAAA" defaultValue={editandoId ? clientes.find(c => c.id === editandoId).fecha : new Date().toLocaleDateString()} required style={{ width: "100%", padding: "12px", border: "none", background: "transparent", outline: "none", fontWeight: "500" }} />
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <label style={{ fontSize: "13px", color: colores.textoGris, fontWeight: "600", display: "block", marginBottom: "8px" }}>Monto de Ingreso</label>
                <div style={{ display: "flex", alignItems: "center", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "2px 12px" }}>
                  <FaDollarSign color="#94a3b8" />
                  <input name="ingresos" type="number" placeholder="Ej: 1500" defaultValue={editandoId ? clientes.find(c => c.id === editandoId).ingresos.replace("$", "") : ""} required style={{ width: "100%", padding: "12px", border: "none", background: "transparent", outline: "none", fontWeight: "500" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                <button type="button" onClick={cerrarModal} style={{ flex: 1, padding: "14px", borderRadius: "14px", border: "1px solid #e2e8f0", background: "white", color: "#64748b", fontWeight: "700", cursor: "pointer" }}>Cancelar</button>
                <button type="submit" style={{ flex: 1, padding: "14px", background: colores.azulBoton, color: "white", border: "none", borderRadius: "14px", fontWeight: "800", cursor: "pointer", boxShadow: "0 4px 12px rgba(17, 38, 76, 0.2)" }}>Guardar Cliente</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR */}
      {showDeleteModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(14, 42, 90, 0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1100 }}>
          <div style={{ background: "white", padding: "40px", borderRadius: "28px", width: "340px", textAlign: "center", boxShadow: "0 25px 50px rgba(0,0,0,0.2)" }}>
            <div style={{ background: "#fef2f2", width: "70px", height: "70px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <FaExclamationTriangle size={30} color={colores.eliminar} />
            </div>
            <h3 style={{ color: colores.primario, fontSize: "20px", marginBottom: "10px" }}>¿Eliminar cliente?</h3>
            <p style={{ color: colores.textoGris, fontSize: "14px", lineHeight: "1.5", marginBottom: "30px" }}>Esta acción no se puede deshacer. Se borrará permanentemente a <b>{clienteAEliminar?.nombre}</b>.</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setShowDeleteModal(false)} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "white", color: "#64748b", fontWeight: "700", cursor: "pointer" }}>No, volver</button>
              <button onClick={ejecutarEliminacion} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "none", background: colores.eliminar, color: "white", fontWeight: "800", cursor: "pointer" }}>Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos dinámicos para los botones de paginación
const estiloBtnPaginacion = (activo, desactivado = false) => ({
  width: "38px",
  height: "38px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  background: activo ? "#0e2a5a" : "white",
  color: activo ? "white" : "#0e2a5a",
  cursor: desactivado ? "not-allowed" : "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  opacity: desactivado ? 0.5 : 1,
  transition: "all 0.2s"
});
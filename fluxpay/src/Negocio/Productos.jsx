import React, { useState } from "react";
import { 
  FaPlus, FaTrash, FaEdit, FaSmile, FaExclamationTriangle,
  FaChevronLeft, FaChevronRight 
} from "react-icons/fa";

export default function ProductosNegocio() {
  // --- ESTADOS ---
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [emojiSeleccionado, setEmojiSeleccionado] = useState("🛍️");

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

  const opcionesEmojis = ["🥡", "🍪", "🥤", "🍬", "🍞", "🍎", "🍕", "🍦", "🍟", "🛍️"];

  const [productos, setProductos] = useState([
    { id: 1, name: "Galletas", units: 10, income: "$1912", emoji: "🍪" },
    { id: 2, name: "Sabritas", units: 12, income: "$1121", emoji: "🥡" },
    { id: 3, name: "Refrescos", units: 6, income: "$871", emoji: "🥤" },
    { id: 4, name: "Pan Dulce", units: 20, income: "$450", emoji: "🍞" },
    { id: 5, name: "Jugos", units: 15, income: "$300", emoji: "🍎" },
    { id: 6, name: "Helados", units: 8, income: "$240", emoji: "🍦" },
  ]);

  // --- LÓGICA DE PAGINACIÓN ---
  const totalPaginas = Math.ceil(productos.length / ITEMS_POR_PAGINA);
  const indiceUltimo = paginaActual * ITEMS_POR_PAGINA;
  const indicePrimero = indiceUltimo - ITEMS_POR_PAGINA;
  const productosVisibles = productos.slice(indicePrimero, indiceUltimo);

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
    const unidades = formData.get("unidades");
    const precio = formData.get("precio");
    const emojiFinal = formData.get("emojiManual") || emojiSeleccionado;

    if (editandoId) {
      setProductos(productos.map(p => 
        p.id === editandoId 
          ? { ...p, name: nombre, units: unidades, income: `$${precio}`, emoji: emojiFinal } 
          : p
      ));
    } else {
      const nuevo = {
        id: Date.now(),
        name: nombre,
        units: unidades,
        income: `$${precio}`,
        emoji: emojiFinal
      };
      setProductos([...productos, nuevo]);
      setPaginaActual(1);
    }
    cerrarModal();
  };

  const prepararEdicion = (producto) => {
    setEditandoId(producto.id);
    setEmojiSeleccionado(producto.emoji);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setEditandoId(null);
    setEmojiSeleccionado("🛍️");
  };

  const ejecutarEliminacion = () => {
    const nuevosProductos = productos.filter(p => p.id !== productoAEliminar.id);
    setProductos(nuevosProductos);
    if (nuevosProductos.slice(indicePrimero, indiceUltimo).length === 0 && paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
    setShowDeleteModal(false);
    setProductoAEliminar(null);
  };

  return (
    <div className="productos-view" style={{ padding: "30px", backgroundColor: "#f4f7fa", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h2 style={{ color: colores.primario, margin: 0, fontSize: "24px", fontWeight: "bold" }}>Productos</h2>
        <button 
          onClick={() => setShowModal(true)} 
          style={{ 
            background: colores.azulBoton, color: "white", padding: "12px 20px", borderRadius: "10px", 
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", 
            fontWeight: "600", fontSize: "14px"
          }}
        >
          <FaPlus size={12} /> Agregar producto
        </button>
      </div>

      {/* TABLA CON PAGINACIÓN */}
      <div style={{ background: "white", borderRadius: "18px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", overflow: "hidden", padding: "10px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #f1f5f9" }}>
              <th style={{ padding: "20px", color: colores.textoGris, fontSize: "14px", fontWeight: "600" }}>Producto</th>
              <th style={{ padding: "20px", color: colores.textoGris, fontSize: "14px", fontWeight: "600" }}>Unidades</th>
              <th style={{ padding: "20px", color: colores.textoGris, fontSize: "14px", fontWeight: "600" }}>Ingresos</th>
              <th style={{ padding: "20px", color: colores.textoGris, fontSize: "14px", fontWeight: "600", textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosVisibles.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                <td style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: "15px" }}>
                  <div style={{ 
                    width: "42px", height: "42px", backgroundColor: colores.fondoCírculo, 
                    borderRadius: "50%", display: "flex", alignItems: "center", 
                    justifyContent: "center", fontSize: "20px" 
                  }}>
                    {item.emoji}
                  </div>
                  <span style={{ fontWeight: "600", color: colores.primario }}>{item.name}</span>
                </td>
                <td style={{ padding: "20px", color: colores.primario, fontWeight: "500" }}>{item.units}</td>
                <td style={{ padding: "20px", color: colores.primario, fontWeight: "700" }}>{item.income}</td>
                <td style={{ padding: "20px", textAlign: "right" }}>
                  <button onClick={() => prepararEdicion(item)} style={{ color: colores.secundario, background: "none", border: "none", cursor: "pointer", marginRight: "12px" }}><FaEdit size={16} /></button>
                  <button onClick={() => { setProductoAEliminar(item); setShowDeleteModal(true); }} style={{ color: colores.eliminar, background: "none", border: "none", cursor: "pointer" }}><FaTrash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* CONTROLES DE PAGINACIÓN */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "25px", paddingBottom: "15px" }}>
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

      {/* MODAL NUEVO / EDITAR */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "white", padding: "30px", borderRadius: "24px", width: "380px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}>
            <h3 style={{ marginTop: 0, color: colores.primario, marginBottom: "20px" }}>{editandoId ? "Editar Producto" : "Nuevo Producto"}</h3>
            <form onSubmit={handleGuardar} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ fontSize: "13px", color: colores.textoGris, marginBottom: "5px", display: "block" }}>Nombre</label>
                <input name="nombre" placeholder="Ej. Sabritas" defaultValue={editandoId ? productos.find(p => p.id === editandoId).name : ""} required style={{ width: "93%", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0" }} />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "13px", color: colores.textoGris, marginBottom: "5px", display: "block" }}>Unidades</label>
                  <input name="unidades" type="number" placeholder="0" defaultValue={editandoId ? productos.find(p => p.id === editandoId).units : ""} required style={{ width: "85%", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "13px", color: colores.textoGris, marginBottom: "5px", display: "block" }}>Precio</label>
                  <input name="precio" placeholder="0.00" defaultValue={editandoId ? productos.find(p => p.id === editandoId).income.replace("$", "") : ""} required style={{ width: "85%", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "13px", color: colores.textoGris, marginBottom: "10px", display: "block" }}>Icono</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
                  {opcionesEmojis.map(emo => (
                    <span key={emo} onClick={() => setEmojiSeleccionado(emo)} style={{ fontSize: "20px", cursor: "pointer", padding: "8px", borderRadius: "8px", background: emojiSeleccionado === emo ? "#eef2f7" : "#f8fafc", border: emojiSeleccionado === emo ? `1px solid ${colores.azulBoton}` : "1px solid transparent" }}>{emo}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="button" onClick={cerrarModal} style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "white", color: colores.textoGris, fontWeight: "600", cursor: "pointer" }}>Cancelar</button>
                <button type="submit" style={{ flex: 1, padding: "14px", background: colores.azulBoton, color: "white", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR */}
      {showDeleteModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1100 }}>
          <div style={{ background: "white", padding: "40px", borderRadius: "24px", width: "350px", textAlign: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <FaExclamationTriangle size={50} color={colores.eliminar} style={{ marginBottom: "20px" }} />
            <h3 style={{ color: colores.primario, margin: "0 0 10px 0" }}>¿Eliminar producto?</h3>
            <p style={{ color: colores.textoGris, fontSize: "14px", marginBottom: "30px" }}>
              ¿Estás seguro de que quieres eliminar <b>{productoAEliminar?.name}</b>?
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setShowDeleteModal(false)} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "white", fontWeight: "600", cursor: "pointer" }}>Cancelar</button>
              <button onClick={ejecutarEliminacion} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "none", background: colores.eliminar, color: "white", fontWeight: "bold", cursor: "pointer" }}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilo de los botones de paginación
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
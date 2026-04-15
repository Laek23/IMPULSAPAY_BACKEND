import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaTicketAlt, FaPlusCircle, FaHistory, FaUser, FaStore, FaTag } from 'react-icons/fa';

const Reportes = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ESTADOS PARA QUE LOS SELECTS SEAN EDITABLES
  const [categoria, setCategoria] = useState("Pago QR");
  const [prioridad, setPrioridad] = useState("Baja");

  useEffect(() => { fetchTickets(); }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tickets');
      if (!response.ok) throw new Error("Error en servidor");
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Error FluxPay:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const datosEnvio = {
      cliente: formData.get('cliente_nombre'), 
      negocio_id: formData.get('negocio_id'),
      mensaje: formData.get('asunto'), 
      prioridad: prioridad, // Usamos el estado actual
      categoria: categoria, // Usamos el estado actual
      estado: 'Pendiente'
    };

    try {
      const response = await fetch('http://localhost:8000/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosEnvio)
      });

      if (response.ok) {
        e.target.reset();
        setCategoria("Pago QR"); // Reiniciamos a valor por defecto
        setPrioridad("Baja");    // Reiniciamos a valor por defecto
        fetchTickets(); 
      }
    } catch (error) {
      alert("Error al conectar con la base de datos");
    }
  };

  const filtrados = useMemo(() => {
    return tickets.filter(t => 
      t.mensaje?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.cliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toString().includes(searchTerm)
    );
  }, [searchTerm, tickets]);

  const colors = {
    primary: '#052659', 
    dark: '#021024',
    bg: '#f1f5f9',
    white: '#ffffff',
    textMuted: '#64748b'
  };

  return (
    <div style={{ padding: '30px', backgroundColor: colors.bg, minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      <div style={{ 
        background: colors.dark, color: colors.white, padding: '35px 45px', borderRadius: '16px', 
        marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 4px 20px rgba(2, 16, 36, 0.2)'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.9rem', fontWeight: '800' }}>Centro de Soporte</h1>
          <p style={{ margin: '5px 0 0', opacity: 0.8, fontSize: '1rem' }}>Panel de incidencias para <b>FluxPay</b></p>
        </div>
        <FaTicketAlt size={45} style={{ opacity: 0.3 }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '30px' }}>
        
        <div style={{ background: colors.white, padding: '35px', borderRadius: '16px', border: `1px solid ${colors.primary}20`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', color: colors.primary }}>
            <FaPlusCircle size={22} />
            <h3 style={{ margin: 0, fontWeight: '700' }}>Nueva Solicitud</h3>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: colors.primary, marginBottom: '8px', textTransform: 'uppercase' }}>Nombre del Cliente</label>
              <div style={{ position: 'relative' }}>
                <FaUser style={{ position: 'absolute', left: '12px', top: '14px', color: colors.primary }} />
                <input name="cliente_nombre" required placeholder="Ej: Javier López" style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '10px', border: `1.5px solid ${colors.primary}`, fontSize: '0.95rem', outline: 'none' }} />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: colors.primary, marginBottom: '8px', textTransform: 'uppercase' }}>ID Negocio</label>
              <div style={{ position: 'relative' }}>
                <FaStore style={{ position: 'absolute', left: '12px', top: '14px', color: colors.primary }} />
                <input name="negocio_id" type="number" required placeholder="Ej: 1" style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '10px', border: `1.5px solid ${colors.primary}`, fontSize: '0.95rem', outline: 'none' }} />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: colors.primary, marginBottom: '8px', textTransform: 'uppercase' }}>Mensaje del Reporte</label>
              <textarea name="asunto" required placeholder="Describe el problema a detalle..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1.5px solid ${colors.primary}`, minHeight: '110px', fontSize: '0.95rem', resize: 'none', outline: 'none' }} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: colors.primary, marginBottom: '8px' }}>CATEGORÍA</label>
                <select 
                  value={categoria} 
                  onChange={(e) => setCategoria(e.target.value)} 
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1.5px solid ${colors.primary}`, backgroundColor: 'white', fontWeight: '600', cursor: 'pointer' }}
                >
                  <option value="Pago QR">Pago QR</option>
                  <option value="App Cliente">App Cliente</option>
                  <option value="Terminal">Terminal</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: colors.primary, marginBottom: '8px' }}>PRIORIDAD</label>
                <select 
                  value={prioridad} 
                  onChange={(e) => setPrioridad(e.target.value)} 
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1.5px solid ${colors.primary}`, backgroundColor: 'white', fontWeight: '600', cursor: 'pointer' }}
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
            </div>

            <button type="submit" style={{ width: '100%', padding: '16px', background: colors.primary, color: colors.white, border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '800', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
              <FaTag size={14} /> Generar y Guardar Ticket
            </button>
          </form>
        </div>

        <div style={{ background: colors.white, padding: '35px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.dark }}>
              <FaHistory size={22} />
              <h3 style={{ margin: 0, fontWeight: '800' }}>Historial en BD</h3>
            </div>
            <div style={{ position: 'relative' }}>
              <FaSearch style={{ position: 'absolute', left: '12px', top: '12px', color: colors.primary }} />
              <input 
                placeholder="Buscar cliente o ID..." 
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px 15px 10px 40px', borderRadius: '10px', border: `1.5px solid ${colors.primary}40`, fontSize: '0.9rem', width: '220px' }}
              />
            </div>
          </div>

          <div style={{ maxHeight: '550px', overflowY: 'auto', paddingRight: '10px' }}>
            {loading ? <p style={{ color: colors.textMuted }}>Cargando...</p> : 
              filtrados.map(t => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #f1f5f9', marginBottom: '10px', backgroundColor: '#fafbfc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '800', color: colors.dark, fontSize: '1.05rem' }}>{t.cliente} <span style={{ fontWeight: '400', fontSize: '0.8rem', color: colors.textMuted }}>• Negocio: {t.negocio_id}</span></div>
                    <div style={{ color: '#334155', fontSize: '0.95rem', margin: '6px 0' }}>{t.mensaje}</div>
                    <div style={{ fontSize: '0.75rem', color: colors.textMuted }}>TK-{t.id} • {t.categoria}</div>
                  </div>
                  <div style={{ textAlign: 'right', marginLeft: '20px' }}>
                    <div style={{ 
                      fontSize: '0.7rem', padding: '5px 12px', borderRadius: '25px', fontWeight: '900', textTransform: 'uppercase',
                      backgroundColor: t.prioridad === 'Alta' ? '#fee2e2' : t.prioridad === 'Media' ? '#e0f2fe' : '#f1f5f9',
                      color: t.prioridad === 'Alta' ? '#dc2626' : t.prioridad === 'Media' ? '#0284c7' : '#475569',
                      border: `1px solid ${t.prioridad === 'Alta' ? '#fecaca' : '#bae6fd'}`
                    }}>
                      {t.prioridad}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
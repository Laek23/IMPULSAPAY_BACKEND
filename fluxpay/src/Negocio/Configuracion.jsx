import React, { useState, useRef } from 'react';
import { 
    FaBuilding, FaMapMarkerAlt, FaPhone, 
    FaCrown, FaCheckCircle, FaLink, FaChevronDown, 
    FaCreditCard, FaPencilAlt, FaUniversity 
} from 'react-icons/fa';

const Configuracion = () => {
    const [editMode, setEditMode] = useState(false);
    const [showMetodos, setShowMetodos] = useState(false);
    const fileInputRef = useRef(null);

    // Estado real (lo que se ve en la pantalla principal y Layout)
    const [negocio, setNegocio] = useState({
        nombre: "Tendejon",
        ubicacion: "Juan Pablo II",
        telefono: "+0189322392",
        correo: "joseagui@gmail.com",
        fecha: "1/9/2020",
        foto: "https://i.pravatar.cc/150?img=32" 
    });

    // Estado temporal (solo para la pantalla de edición)
    const [tempFoto, setTempFoto] = useState(null);

    const logos = {
        paypal: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
        stripe: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
       
    };

    // 1. Manejar la previsualización (No guarda todavía)
    const handlePhotoPreview = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempFoto(reader.result); // Solo actualiza la "falsa"
            };
            reader.readAsDataURL(file);
        }
    };

    // 2. Guardar definitivamente
    const handleGuardar = () => {
        if (tempFoto) {
            // Actualizar estado principal
            setNegocio({ ...negocio, foto: tempFoto });

            // ACTUALIZAR EL LAYOUT (Header)
            // Buscamos el avatar del header por su clase y cambiamos la fuente
            const headerAvatar = document.querySelector('.negocio-avatar-wrapper img');
            const headerName = document.querySelector('.negocio-user-name');
            
            if (headerAvatar) headerAvatar.src = tempFoto;
            if (headerName) headerName.textContent = "José Aguilar"; // O el nombre que edites
        }
        
        setEditMode(false);
        setTempFoto(null); // Limpiar temporal
        alert("¡Cambios guardados con éxito!");
    };

    return (
        <div className="main-content-fluid config-view">
            <div className="config-profile-header">
                <h2 className="view-title">{editMode ? "Cambiar perfil" : "Configuración"}</h2>
            </div>

            {editMode ? (
                /* VISTA EDICIÓN */
                <div className="edit-data-container glass-card shadow-sm">
                    <h4 className="card-title">Edición de datos</h4>
                    <div className="edit-grid">
                        <div className="edit-inputs">
                            <div className="form-input-group">
                                <label>Contraseña</label>
                                <input type="password" placeholder="********" className="config-input" />
                            </div>
                            <div className="form-input-group">
                                <label>Correo</label>
                                <input type="email" defaultValue={negocio.correo} className="config-input" />
                            </div>
                            <div className="form-input-group">
                                <label>Fecha</label>
                                <input type="text" defaultValue={negocio.fecha} className="config-input" />
                            </div>
                            <div className="edit-actions">
                                <button className="btn-save" onClick={handleGuardar}>Guardar Cambios</button>
                                <button className="btn-cancel" onClick={() => { setEditMode(false); setTempFoto(null); }}>Cancelar</button>
                            </div>
                        </div>

                        <div className="edit-photo-section">
                            <div className="profile-photo-wrapper large">
                                {/* Muestra tempFoto si existe, si no, la original */}
                                <img src={tempFoto || negocio.foto} alt="Perfil" className="profile-img" />
                                <div className="status-indicator online"></div>
                            </div>
                            <p className="photo-label">Foto del cliente</p>
                            <input type="file" ref={fileInputRef} onChange={handlePhotoPreview} style={{ display: 'none' }} accept="image/*" />
                            <button className="btn-save" onClick={() => fileInputRef.current.click()}>
                                <FaLink /> Adjuntar foto
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* VISTA GENERAL */
                <div className="config-grid-sections">
                    <div className="config-column-left">
                        <div className="config-section-card glass-card shadow-sm">
                            <h4 className="card-title">Información general</h4>
                            <div className="form-input-group">
                                <label><FaBuilding /> Nombre del negocio</label>
                                <input type="text" value={negocio.nombre} readOnly className="config-input readonly" />
                            </div>
                            <div className="form-input-group">
                                <label><FaMapMarkerAlt /> Ubicación</label>
                                <input type="text" value={negocio.ubicacion} readOnly className="config-input readonly" />
                            </div>
                            <div className="form-input-group">
                                <label><FaPhone /> Número de teléfono</label>
                                <input type="tel" value={negocio.telefono} readOnly className="config-input readonly" />
                            </div>
                        </div>

                        <div className="config-section-card glass-card shadow-sm">
                            <h4 className="card-title">Facturación y pagos</h4>
                            <div className="subscription-summary-row">
                                <div className="plan-badge">
                                    <FaCrown /> <span>Plan Actual: <strong>Premium</strong></span>
                                </div>
                                <div className="expiry-badge info">
                                    <FaCheckCircle style={{color: '#10b981'}} /> <span>Vence en: 3 días</span>
                                </div>
                            </div>
                            
                            <button className="btn-text-full" onClick={() => setShowMetodos(!showMetodos)}>
                                {showMetodos ? "Ocultar métodos" : "Ver métodos de pago"} <FaChevronDown />
                            </button>
                            
                            {showMetodos && (
                                <div className="metodos-container">
                                    <div className="bank-card visa-style">
                                        <div className="card-info">
                                            <FaCreditCard className="card-icon" />
                                            <div>
                                                <p className="card-name">Visa Debit</p>
                                                <p className="card-number">**** **** **** 4242</p>
                                            </div>
                                        </div>
                                        <span className="card-status highlight">Activa</span>
                                    </div>
                                    <div className="bank-card bbva-style">
                                        <div className="card-info">
                                            <FaUniversity className="card-icon" />
                                            <div>
                                                <p className="card-name">BBVA Bancomer</p>
                                                <p className="card-number">Cuenta **** 123</p>
                                            </div>
                                        </div>
                                        <span className="card-status">Ahorros</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="config-column-right">
                        <div className="config-section-card glass-card shadow-sm edit-card-clickable" onClick={() => setEditMode(true)}>
                            <h4 className="card-title">Cambiar datos</h4>
                            <div className="card-instructions">
                                <FaPencilAlt style={{color: '#3b82f6'}} />
                                <p>Actualiza tu información personal y gestiona tu foto.</p>
                            </div>
                            <button className="btn-save">Editar perfil</button>
                        </div>

                        <div className="config-section-card glass-card shadow-sm">
                            <h4 className="card-title">Integraciones</h4>
                            <div className="integrations-list">
                                <img src={logos.paypal} alt="Paypal" className="logo-integration" />
                                <img src={logos.stripe} alt="Stripe" className="logo-integration" />
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Configuracion;
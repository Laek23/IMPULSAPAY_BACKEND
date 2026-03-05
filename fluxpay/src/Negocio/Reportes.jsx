import React, { useRef, useState } from 'react';
import { 
  FaSearch, FaPaperclip, FaArrowUp, FaArrowDown, 
  FaCheckCircle, FaTrashAlt, FaChartBar 
} from 'react-icons/fa';

const Reportes = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 

  const reportesData = [
    { id: "9132102", estado: "Pendiente" },
    { id: "245533", estado: "Pendiente" },
    { id: "1232455", estado: "Pendiente" },
    { id: "1213231", estado: "Revisado" },
  ];

  
  const reportesFiltrados = reportesData.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  };

  const removeFile = (e) => {
    e.stopPropagation(); 
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section className="reportes-view">
      {/* 1. TÍTULO */}
      <div className="reportes-title-section">
        <h2 className="section-main-title">Reportes Operativos</h2>
        <p className="section-subtitle">Gestión de rendimiento y evidencias.</p>
      </div>

      {/* 2. MÉTRICAS (LO QUE HABÍA DESAPARECIDO) */}
      <div className="metrics-container">
        <div className="metrics-table">
          <div className="metrics-header">
            <span>Indicador</span>
            <span>Valor Actual</span>
            <span>Rendimiento</span>
          </div>
          
          <div className="metric-row">
            <span className="metric-name">Ingresos Totales</span>
            <span className="metric-value">$25,400.00</span>
            <span className="trend positive"><FaArrowUp /> 12.5%</span>
          </div>

          <div className="metric-row">
            <span className="metric-name">Cobros vía QR</span>
            <span className="metric-value">145 ops</span>
            <span className="trend positive"><FaArrowUp /> 5.2%</span>
          </div>

          <div className="metric-row">
            <span className="metric-name">Nuevos Clientes</span>
            <span className="metric-value">22 pax</span>
            <span className="trend negative"><FaArrowDown /> 2.1%</span>
          </div>
        </div>
      </div>

      {/* 3. GRID INFERIOR (BUSCADOR Y TABLA) */}
      <div className="reportes-grid-bottom">
        
        {/* CAJA DE BUSQUEDA Y ADJUNTAR */}
        <div className="action-card search-card">
          <h3 className="card-mini-title">Gestión de Casos</h3>
          
          {/* Buscador con estado funcional */}
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="modern-input"
            />
          </div>

          {/* Zona de Adjuntar Pro */}
          <div className="upload-container">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
            />
            <div 
              className={`upload-zone ${fileName ? 'active' : ''}`} 
              onClick={() => fileInputRef.current.click()}
            >
              {fileName ? (
                <div className="file-info-pro">
                  <FaCheckCircle className="icon-success" />
                  <span title={fileName}>{fileName}</span>
                  <FaTrashAlt className="icon-delete" onClick={removeFile} />
                </div>
              ) : (
                <>
                  <FaPaperclip className="icon-clip" />
                  <span>Adjuntar Evidencia</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* TABLA DE ESTADOS FILTRADA */}
        <div className="action-card table-card">
          <h3 className="card-mini-title">Reportes Recientes</h3>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Caso ID</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {reportesFiltrados.length > 0 ? (
                  reportesFiltrados.map((item) => (
                    <tr key={item.id}>
                      <td><strong>#{item.id}</strong></td>
                      <td>
                        <span className={`badge ${item.estado === 'Revisado' ? 'badge-success' : 'badge-pending'}`}>
                          {item.estado}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No se encontraron reportes con ese ID
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reportes;
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaUserCircle, FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import Navbar from "../Navbar";

function ClienteConfiguracion() {
  return (
    <div className="page d-flex">
      {/* Sidebar */}
      <div className="side-bar">
        <div className="logo-container">
          <img src="/fluxpay.jpg" alt="FluxPay Logo" className="logo-img" />
        </div>
      </div>

      {/* Main */}
      <div className="main-content flex-grow-1">
        <Navbar
          nombre="Alexander Castillo"
          correo="Alexander.Correo@Gmail.com"
          rol="Cliente"
        />

        <Container className="mt-4">
          <h2 className="fw-bold mb-4">Configuración</h2>

          {/* Perfil */}
          <Row className="align-items-center mb-4">
            <Col md={8}>
              <h5 className="text-muted">Información general</h5>
            </Col>
            <Col md={4} className="text-center">
              <div className="position-relative d-inline-block">
                <FaUserCircle size={90} className="text-secondary" />
                <span
                  className="position-absolute top-0 end-0 bg-success rounded-circle"
                  style={{ width: 18, height: 18 }}
                ></span>
              </div>
              <div>
                <Button size="sm" className="mt-2">
                  Editar
                </Button>
              </div>
              <small className="d-block mt-1 text-muted">
                Cambiar foto de perfil
              </small>
            </Col>
          </Row>

          {/* Card info */}
          <Card className="p-4 shadow-sm border-0 mb-4">
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control value="José Aguilar" readOnly />
                <Button size="sm" className="mt-2">
                  Editar
                </Button>
              </Col>

              <Col md={6}>
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control value="joseagui@gmail.com" readOnly />
                <Button size="sm" className="mt-2">
                  Editar
                </Button>
              </Col>

              <Col md={6}>
                <Form.Label>Número de tarjetas</Form.Label>
                <Form.Control value="Santander" readOnly />
              </Col>

              <Col md={6}>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control value="**************" readOnly />
                <Button size="sm" className="mt-2">
                  Editar
                </Button>
              </Col>

              <Col md={6}>
                <Form.Label>Número de teléfono</Form.Label>
                <Form.Control value="+0189322392" readOnly />
              </Col>
            </Row>
          </Card>

          {/* Compañías */}
          <Card className="p-4 text-center shadow-sm border-0">
            <h6 className="mb-3">Compañías de tarjetas</h6>
            <div className="d-flex justify-content-center gap-4 fs-1">
              <FaCcVisa />
              <FaCcMastercard />
              <SiMercadopago />
            </div>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default ClienteConfiguracion;

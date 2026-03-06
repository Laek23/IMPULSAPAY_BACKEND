import { Modal, Button, Form, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ChangePhotoModal = ({ show, handleClose, currentPhoto, onSave }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!show) {
      setPreview(null);
    }
  }, [show]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!preview) {
      Swal.fire({
        icon: "warning",
        title: "Selecciona una imagen",
        text: "Debes elegir una foto antes de guardar",
        confirmButtonColor: "#0d6efd"
      });
      return;
    }

    onSave(preview);

    Swal.fire({
      icon: "success",
      title: "Foto actualizada",
      text: "Tu foto de perfil se actualizó correctamente",
      confirmButtonColor: "#0d6efd"
    });

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Cambiar foto</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        <p className="fw-semibold">Foto actual</p>
        <Image
          src={currentPhoto}
          roundedCircle
          width={120}
          height={120}
          className="mb-3"
          style={{ objectFit: "cover" }}
        />

        {preview && (
          <>
            <p className="fw-semibold">Nueva foto</p>
            <Image
              src={preview}
              roundedCircle
              width={120}
              height={120}
              className="mb-3"
              style={{ objectFit: "cover" }}
            />
          </>
        )}

        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
      </Modal.Body>

      <Modal.Footer className="border-0 d-flex justify-content-end gap-3">
        <Button
          variant="outline-secondary"
          onClick={handleClose}
          className="rounded-pill"
        >
          Cancelar
        </Button>

        <Button
          variant="primary"
          onClick={handleSave}
          className="rounded-pill"
        >
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePhotoModal;
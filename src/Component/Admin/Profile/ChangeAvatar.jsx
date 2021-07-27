import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Alert, Button, Form, FormCheck, Modal } from "react-bootstrap";
import FileService from "../../../services/FileService";

export function ChangeAvatar() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [i, setI] = useState();

  const changeImage = (e) => {
    setI(e.target.files);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      var image = new FormData();
      image.append("file", i[0]);

      FileService.uploadFile(image).then(
        () => {
          setValidated(false);
          setShow(false);
          window.location.reload();
        },
        (error) => {
          setError(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          );
        }
      );
    }

    setValidated(true);
  };

  const handleClose = () => {
    setValidated(false);
    setShow(false);
  };

  const handleShow = () => {
    setError("");
    setShow(true);
  };

  return (
    <>
      <Button
        variant="violet"
        style={{ backgroundColor: "#242849", color: "#ffd98d" }}
        size="sm"
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faEdit} /> Đổi ảnh đại diện
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Đổi Ảnh Đại Diện</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.File
                type="file"
                accept="image/*"
                id="exampleFormControlFile1"
                name="file"
                label="Chọn Ảnh Đại Diện"
                onChange={changeImage}
              />
            </Form.Group>
            {error !== "" && <Alert variant="danger">{error}</Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              style={{
                backgroundColor: "#242849",
                color: "#ffd98d",
              }}
              type="submit"
            >
              Lưu Thay Đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

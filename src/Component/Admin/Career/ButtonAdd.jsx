import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import CareerService from "../../../services/CareerService";

export default function ButtonAdd() {
  let history = useHistory();
  const [career, setCareer] = useState("");

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  const changeCareerHandler = (e) => {
    setCareer(e.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() == false) {
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      let careerObj = {
        career: career,
      };
      CareerService.createCareer(careerObj).then(
        () => {
          setValidated(false);
          setShow(false);
          history.go("/nganh-nghe");
          toast("Thêm thành công", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
          });
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
    setCareer("");
    setShow(true);
  };

  return (
    <>
      <Button
        style={{
          backgroundColor: "#242849",
          color: "#ffd98d",
          fontWeight: "bold",
        }}
        variant="white"
        className="edit"
        onClick={handleShow}
      >
        Thêm Ngành Nghề
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa Ngành Nghề</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formGridCareer">
              <Form.Label>Ngành Nghề</Form.Label>
              <Form.Control
                name="career"
                onChange={changeCareerHandler}
                required
              />
            </Form.Group>
            {error !== "" && <Alert variant="danger">{error}</Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" style={{ backgroundColor: "#242849" }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

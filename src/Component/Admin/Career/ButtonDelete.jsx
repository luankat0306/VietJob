import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ApplicantService from "../../../services/ApplicantService";
import CareerService from "../../../services/CareerService";

export default function ButtonDelete(props) {
  let history = useHistory();
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onDelete = (e) => {
    e.preventDefault();
    CareerService.deleteCareer(props.id)
      .then(() => {
        setShow(false);
        history.go("/ung-vien");

        toast("Xóa thành công", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(() => setError("Không thể xóa ngành nghề này"));
  };

  useEffect(() => {
    if (show === true) {
      ApplicantService.getApplicant(props.id).then((res) =>
        setName(res.data.fullname)
      );
    }
  }, [props.id, show]);
  return (
    <>
      <Button variant="white" className="delete" onClick={handleShow}>
        <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={onDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc muốn xóa {name}</Modal.Body>
          {error !== "" && <Alert variant="danger">{error}</Alert>}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit" style={{ backgroundColor: "#242849" }}>
              Xác nhận
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

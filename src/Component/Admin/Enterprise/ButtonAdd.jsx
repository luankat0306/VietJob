import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import EnterpriseService from "../../../services/EnterpriseService";

export default function ButtonAdd(props) {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const changeUsernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const changeFullnameHandler = (e) => {
    setFullname(e.target.value);
  };

  const changePhoneHandler = (e) => {
    setPhone(e.target.value);
  };
  const changeContactHandler = (e) => {
    setContact(e.target.value);
  };

  const changeWebsiteHandler = (e) => {
    setWebsite(e.target.value);
  };

  const changeAddressHandler = (e) => {
    setAddress(e.target.value);
  };

  const changeDescriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const changeNameHandler = (e) => {
    setDescription(e.target.value);
  };

  const changePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const changeConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false || password !== confirmPassword) {
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      let enterprise = {
        user: {
          email: email,
          username: username,
          fullname: fullname,
          phone: phone,
          password: password,
        },
        contact: contact,
        website: website,
        address: address,
        description: description,
        name: name,
      };

      EnterpriseService.createEnterprise(enterprise).then(
        () => {
          setValidated(false);
          setShow(false);
          history.go("/doanh-nghiep");
          toast("Th??m th??nh c??ng", {
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
    setPhone("");
    setAddress("");
    setContact("");
    setConfirmPassword("");
    setPassword("");
    setEmail("");
    setError("");
    setFullname("");
    setWebsite("");
    setName("");
    setDescription("");
    setUsername("");
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
        Th??m Doanh Nghi???p
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>??i???n v??o th??ng tin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={changeEmailHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  onChange={changeUsernameHandler}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridFullName">
                <Form.Label>H??? v?? T??n</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="VD: Nguy???n V??n Th??nh"
                  onChange={changeFullnameHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>S??? ??i???n tho???i</Form.Label>
                <Form.Control
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="VD: 09033345859"
                  onChange={changePhoneHandler}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridContact">
                <Form.Label>Ng?????i Li??n H???</Form.Label>
                <Form.Control
                  type="text"
                  onChange={changeContactHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridWebsite">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  onChange={changeWebsiteHandler}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridAddress">
                <Form.Label>?????a Ch???</Form.Label>
                <Form.Control
                  type="text"
                  onChange={changeAddressHandler}
                  placeholder="VD: 123/2 H??a H??ng, Ph?????ng 13, Qu???n 10"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>T??n C??ng Ty</Form.Label>
                <Form.Control
                  type="text"
                  onChange={changeNameHandler}
                  className="mr-sm-2"
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridDescription">
              <Form.Label>M?? T???</Form.Label>
              <Form.Control
                as="textarea"
                onChange={changeDescriptionHandler}
                className="mr-sm-2"
                required
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>M???t kh???u</Form.Label>
                <Form.Control
                  type="password"
                  onChange={changePasswordHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCheckPassword">
                <Form.Label>Nh???p l???i m???t kh???u</Form.Label>
                <Form.Control
                  type="password"
                  onChange={changeConfirmPasswordHandler}
                  required
                  isValid={password === null && password === confirmPassword}
                  isInvalid={password !== confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  M???t kh???u kh??ng tr??ng kh???p
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
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

import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import React, { useEffect } from "react";
import { useState } from "react";
import ProvinceService from "../../../services/ProvinceService";
import ApplicantService from "../../../services/ApplicantService";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function ButtonAdd(props) {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [show, setShow] = useState(false);
  const [provinces, setProvinces] = useState([]);
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
  const changeBirthDayHandler = (e) => {
    setBirthday(e.target.value);
  };

  const changeGenderHandler = (e) => {
    setGender(e.target.value);
  };

  const changeAddressHandler = (e) => {
    setAddress(e.target.value);
  };

  const changeProvinceHandler = (e) => {
    setProvince(e.target.value);
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
      let applicant = {
        user: {
          email: email,
          username: username,
          fullname: fullname,
          phone: phone,
          password: password,
        },
        birthday: birthday,
        gender: gender,
        address: address,
        province: province,
      };

      ApplicantService.createApplicant(applicant).then(
        () => {
          setValidated(false);
          setShow(false);
          history.go("/ung-vien");
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
    setBirthday("");
    setConfirmPassword("");
    setPassword("");
    setEmail("");
    setError("");
    setFullname("");
    setGender("");
    setProvince("");
    setUsername("");
    setShow(true);
  };

  useEffect(() => {
    if (show === true) {
      ProvinceService.listProvince().then((res) => setProvinces(res.data));
    }
  }, [show]);

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
        Th??m Ng?????i T??m Vi???c
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Ch???nh s???a th??ng tin</Modal.Title>
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
              <Form.Group as={Col} controlId="formGridBirthday">
                <Form.Label>Ng??y Sinh</Form.Label>
                <Form.Control
                  type="date"
                  onChange={changeBirthDayHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridGender">
                <Form.Label>Gi???i T??nh</Form.Label>
                <Form.Row>
                  <Form.Check
                    type="radio"
                    className="my-1 mr-sm-2"
                    id="nam"
                    label="Nam"
                    name="gender"
                    value="Nam"
                    onChange={changeGenderHandler}
                    custom
                    required
                  />
                  <Form.Check
                    type="radio"
                    className="my-1 mr-sm-2"
                    id="nu"
                    label="N???"
                    name="gender"
                    value="N???"
                    onChange={changeGenderHandler}
                    custom
                    required
                  />
                </Form.Row>
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

              <Form.Group as={Col} controlId="formGridProvince">
                <Form.Label>T???nh Th??nh</Form.Label>
                <Form.Control
                  as="select"
                  onChange={changeProvinceHandler}
                  className="mr-sm-2"
                  required
                  custom
                >
                  <option value="">Ch???n T???nh Th??nh</option>
                  {provinces.map((province, index) => (
                    <option value={province.province} key={index}>
                      {province.province}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>

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

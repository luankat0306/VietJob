import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import React, { useEffect } from "react";
import { useState } from "react";
import ProvinceService from "../../../services/ProvinceService";
import ApplicantService from "../../../services/ApplicantService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function ButtonEdit(props) {
  let history = useHistory();
  const [show, setShow] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [validated, setValidated] = useState(false);

  const [idUser, setIdUser] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (show === true) {
      ApplicantService.getApplicant(props.id).then((res) => {
        let applicant = res.data;
        setIdUser(applicant.user.id);
        setEmail(applicant.user.email);
        setUsername(applicant.user.username);
        setFullname(applicant.user.fullname);
        setPhone(applicant.user.phone);
        setBirthday(applicant.birthday);
        setGender(applicant.gender);
        setAddress(applicant.address);
        setProvince(applicant.province);
      });

      ProvinceService.listProvince().then((res) => setProvinces(res.data));
    }
  }, [props.id, show]);

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

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      let applicant = {
        user: {
          id: idUser,
          email: email,
          username: username,
          fullname: fullname,
          phone: phone,
        },
        birthday: birthday,
        gender: gender,
        address: address,
        province: province,
      };

      ApplicantService.updateApplicant(props.id, applicant).then(
        () => {
          setValidated(false);
          setShow(false);
          history.go("/ung-vien");

          toast("Sửa thành công", {
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
    setEmail("");
    setError("");
    setFullname("");
    setGender("");
    setProvince("");
    setUsername("");
    setShow(true);
  };

  return (
    <>
      <Button
        variant="white"
        className="edit"
        onClick={handleShow}
        onChange={changeEmailHandler}
      >
        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="eformGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={changeEmailHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="eformGridUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={changeUsernameHandler}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="eformGridFullName">
                <Form.Label>Họ và Tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="VD: Nguyễn Văn Thành"
                  name="fullname"
                  value={fullname}
                  onChange={changeFullnameHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="eformGridPhone">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="VD: 09033345859"
                  name="phone"
                  value={phone}
                  onChange={changePhoneHandler}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="eformGridBirthday">
                <Form.Label>Ngày Sinh</Form.Label>
                <Form.Control
                  type="date"
                  name="birthday"
                  value={birthday}
                  onChange={changeBirthDayHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="eformGridGender">
                <Form.Label>Giới Tính</Form.Label>
                <Form.Row>
                  <Form.Check
                    type="radio"
                    className="my-1 mr-sm-2"
                    id="nam"
                    name="gender"
                    label="Nam"
                    value="Nam"
                    onChange={changeGenderHandler}
                    custom
                    defaultChecked
                    checked={gender === "Nam"}
                  />
                  <Form.Check
                    type="radio"
                    className="my-1 mr-sm-2"
                    id="nu"
                    name="gender"
                    label="Nữ"
                    value="Nữ"
                    onChange={changeGenderHandler}
                    custom
                    required
                    checked={gender !== "Nam"}
                  />
                </Form.Row>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="eformGridAddress">
                <Form.Label>Địa Chỉ</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={address}
                  onChange={changeAddressHandler}
                  placeholder="VD: 123/2 Hòa Hưng, Phường 13, Quận 10"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="eformGridProvince">
                <Form.Label>Tỉnh Thành</Form.Label>
                <Form.Control
                  as="select"
                  name="province"
                  className="mr-sm-2"
                  onChange={changeProvinceHandler}
                  value={province}
                  custom
                >
                  }
                  {provinces.map((province, index) => (
                    <option value={province.province} key={index}>
                      {province.province}
                    </option>
                  ))}
                </Form.Control>
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

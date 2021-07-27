import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import EnterpriseService from "../../../services/EnterpriseService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function ButtonEdit(props) {
  let history = useHistory();
  const [idUser, setIdUser] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (show === true) {
      EnterpriseService.getEnterprise(props.id).then((res) => {
        let enterprise = res.data;
        setIdUser(enterprise.user.id);
        setEmail(enterprise.user.email);
        setUsername(enterprise.user.username);
        setFullname(enterprise.user.fullname);
        setPhone(enterprise.user.phone);
        setContact(enterprise.contact);
        setDescription(enterprise.description);
        setAddress(enterprise.address);
        setName(enterprise.name);
        setWebsite(enterprise.website);
      });
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
    setName(e.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      let enterprise = {
        user: {
          id: idUser,
          email: email,
          username: username,
          fullname: fullname,
          phone: phone,
        },
        contact: contact,
        website: website,
        address: address,
        description: description,
        name: name,
      };

      EnterpriseService.updateEnterprise(props.id, enterprise).then(
        () => {
          setValidated(false);
          setShow(false);
          history.go("/doanh-nghiep");
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
    setPhone("");
    setAddress("");
    setContact("");
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
        variant="white"
        className="edit"
        onClick={handleShow}
        onChange={changeEmailHandler}
      >
        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={changeEmailHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={changeUsernameHandler}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridFullName">
                <Form.Label>Họ và Tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="VD: Nguyễn Văn Thành"
                  value={fullname}
                  onChange={changeFullnameHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="tel"
                  pattern="[0-9]{8-11}"
                  placeholder="VD: 09033345859"
                  value={phone}
                  onChange={changePhoneHandler}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridContact">
                <Form.Label>Người Liên Hệ</Form.Label>
                <Form.Control
                  type="text"
                  value={contact}
                  onChange={changeContactHandler}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridWebsite">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  value={website}
                  onChange={changeWebsiteHandler}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridAddress">
                <Form.Label>Địa Chỉ</Form.Label>
                <Form.Control
                  type="text"
                  onChange={changeAddressHandler}
                  value={address}
                  placeholder="VD: 123/2 Hòa Hưng, Phường 13, Quận 10"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Tên Công Ty</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={changeNameHandler}
                  className="mr-sm-2"
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridDescription">
              <Form.Label>Mô Tả</Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data={
                  description !== ""
                    ? description
                    : "<p>Mô tả công việc tại đây</p>"
                }
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  setDescription(editor.getData());
                  console.log({ event, editor, description });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
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

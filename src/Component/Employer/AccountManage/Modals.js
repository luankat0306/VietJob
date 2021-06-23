import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import EnterpriseService from "../../../services/EnterpriseService";
import FileService from "../../../services/FileService";
import UserService from "../../../services/UserService";

export function ChangeEmail(props) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setValidated(false);
    setShow(false);
  };
  const handleShow = () => {
    setConfirmPassword("");
    setEmail("");
    setError("");
    setSuccess("");
    setShow(true);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      let emailForm = {
        confirmPassword: confirmPassword,
        email: email,
      };

      UserService.changeEmail(props.idUser, emailForm).then(
        () => {
          setSuccess("Đổi mật khẩu thành công");
          setValidated(false);
          setShow(false);
          window.location.reload();
        },
        (error) => {
          setError(
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
          );
        }
      );
    }

    setValidated(true);
  };

  return (
    <>
      <Button variant="outline-info" size="sm" onClick={handleShow}>
        Đổi Email
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Đổi Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Email Hiện Tại</Form.Label>
              <Form.Control plaintext readOnly defaultValue="email@example.com" value={props.email} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Xác Nhận Mật Khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập Mật Khẩu Hiện Tại"
                required
                onChange={onChangeConfirmPassword}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Email Mới</Form.Label>
              <Form.Control type="email" placeholder="Nhập Email Mới" required onChange={onChangeEmail} />
            </Form.Group>
            {error !== "" && <Alert variant="danger">{error}</Alert>}

            {success !== "" && <Alert variant="success">{success}</Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Lưu Thay Đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export function ChangePassword(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setValidated(false);
    setShow(false);
  };
  const handleShow = () => {
    setPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
    setError("");
    setSuccess("");
    setShow(true);
  };

  const onChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false || password !== confirmPassword) {
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      let passwordForm = {
        currentPassword: currentPassword,
        password: password,
      };

      UserService.changePassword(props.idUser, passwordForm).then(
        () => {
          setSuccess("Đổi mật khẩu thành công");
          setValidated(false);
          setShow(false);
        },
        (error) => {
          setError(
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
          );
        }
      );
    }

    setValidated(true);
  };

  return (
    <>
      <Button variant="outline-danger" size="sm" onClick={handleShow}>
        Đổi Mật Khẩu
      </Button>

      <Modal size="sm" show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Đổi Mật Khẩu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mật Khẩu Hiện Tại</Form.Label>
              <Form.Control type="password" onChange={onChangeCurrentPassword} placeholder="Nhập Mật Khẩu Hiện Tại" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mật Khẩu Mới</Form.Label>
              <Form.Control type="password" required onChange={onChangePassword} placeholder="Nhập Mật Khẩu Mới" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Xác Nhận Mật Khẩu Mới</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={onChangeConfirmPassword}
                placeholder="Nhập Lại Mật Khẩu Mới"
                isValid={password === null && password === confirmPassword}
                isInvalid={password !== confirmPassword}
              />
              <Form.Control.Feedback type="invalid">Mật khẩu không trùng khớp</Form.Control.Feedback>
            </Form.Group>
            {error !== "" && <Alert variant="danger">{error}</Alert>}

            {success !== "" && <Alert variant="success">{success}</Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Lưu Thay Đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export function ChangePersonalInfo(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const [idUser, setIdUser] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (show === true) {
      EnterpriseService.getEnterprise(props.idEnterprise).then((res) => {
        let enterprise = res.data;

        setIdUser(enterprise.user.id);
        setEmail(enterprise.user.email);
        setUsername(enterprise.user.username);
        setFullname(enterprise.user.fullname);
        setPhone(enterprise.user.phone);
        setPassword(enterprise.user.password);

        setContact(enterprise.contact);
        setName(enterprise.name);
        setAddress(enterprise.address);
        setDescription(enterprise.description);
        setWebsite(enterprise.website);
      });
    }
  }, [props.idEnterprise, show]);

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

  const changePhoneHandler = (e) => {
    setPhone(e.target.value);
  };

  const changeAddressHandler = (e) => {
    setAddress(e.target.value);
  };

  const changeWebsiteHandler = (e) => {
    setWebsite(e.target.value);
  };

  const changeContactHandler = (e) => {
    setContact(e.target.value);
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
          password: password,
        },
        contact: contact,
        name: name,
        address: address,
        description: description,
        website: website,
      };

      EnterpriseService.updateEnterprise(props.idEnterprise, enterprise).then(
        () => {
          setValidated(false);
          setShow(false);
          window.location.reload();
        },
        (error) => {
          setError(
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
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
      <Button variant="outline-primary" size="sm" onClick={handleShow}>
        Thay Đổi Thông Tin Công Ty
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Thay Đổi Thông Tin Công Ty</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Địa Chỉ</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  type="input"
                  placeholder="Nhập Địa Chỉ"
                  value={address}
                  onChange={changeAddressHandler}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="input"
                placeholder="Số điện thoại"
                value={phone}
                onChange={changePhoneHandler}
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="input"
                placeholder="Nhập Link Website"
                value={website}
                onChange={changeWebsiteHandler}
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Người Liên Hệ</Form.Label>
              <Form.Control
                type="input"
                placeholder="Nhập Tên Người Liên Hệ"
                value={contact}
                onChange={changeContactHandler}
                required
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Tên Công Ty</Form.Label>
              <Form.Control
                type="input"
                placeholder="Nhập Tên Công Ty"
                value={name}
                onChange={changeNameHandler}
                required
              />
            </Form.Group>
            {error !== "" && <Alert variant="danger">{error}</Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Lưu Thay Đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export function ChangeDescription(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const [error, setError] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      let enterprise = {
        description: description,
      };

      EnterpriseService.changeDescription(props.idEnterprise, enterprise).then(
        () => {
          setValidated(false);
          setShow(false);
          window.location.reload();
        },
        (error) => {
          setError(
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
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

  useEffect(() => {
    if (show === true)
      EnterpriseService.getEnterprise(props.idEnterprise).then((res) => {
        let enterprise = res.data;

        setDescription(enterprise.description);
      });
  }, [props.idEnterprise, show]);

  return (
    <>
      <Button variant="outline-success" size="sm" onClick={handleShow}>
        Chỉnh Sửa Phần Giới Thiệu
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title> Chỉnh Sửa Phần Giới Thiệu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Giới Thiệu Công Ty</Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data={description !== "" ? description : "<p>Mô tả công việc tại đây</p>"}
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
            <Button variant="success" type="submit">
              Lưu Thay Đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export function ChangeAvatar(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [i, setI] = useState("");

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

      FileService.uploadFile(props.id, image).then(
        () => {
          setValidated(false);
          setShow(false);
          window.location.reload();
        },
        (error) => {
          setError(
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
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
      <Button variant="success" size="sm" onClick={handleShow}>
        Đổi Ảnh Đại Diện
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
            <Button variant="success" type="submit">
              Lưu Thay Đổi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
export function ChangeCover() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" size="sm" onClick={handleShow}>
        Đổi Ảnh Bìa
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đổi Ảnh Bìa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.File accept="image/*" id="exampleFormControlFile1" label="Chọn Ảnh Bìa" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Lưu Thay Đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import ApplicantService from "../../../services/ApplicantService";
import CareerService from "../../../services/CareerService";
import FileService from "../../../services/FileService";
import ProvinceService from "../../../services/ProvinceService";
import ResumeService from "../../../services/ResumeService";
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
  const [password, setPassword] = useState("");

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
        setPassword(applicant.user.password);

        setBirthday(applicant.birthday);
        setGender(applicant.gender);
        setAddress(applicant.address);
        setProvince(applicant.province);
      });

      ProvinceService.listProvince().then((res) => setProvinces(res.data));
    }
  }, [props.id, show]);
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
          password: password,
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
    setPhone("");
    setAddress("");
    setBirthday("");
    setFullname("");
    setGender("");
    setProvince("");

    setError("");
    setShow(true);
  };

  return (
    <>
      <Button variant="light" size="sm" onClick={handleShow}>
        <MdModeEdit />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Thay Đổi Thông Tin Cá Nhân</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Tên Đầy Đủ</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  type="input"
                  placeholder="Họ Tên"
                  value={fullname}
                  onChange={changeFullnameHandler}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Ngày Sinh</Form.Label>
              <Form.Control type="date" value={birthday} onChange={changeBirthDayHandler} required />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Giới Tính</Form.Label>
              <Form.Control as="select" onChange={changeGenderHandler} custom>
                {gender !== "" ? <option value={gender}>{gender}</option> : <option>Chọn Giới Tính</option>}

                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput3">
              <Form.Label>Số Điện Thoại</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Nhập Số Điện Thoại"
                pattern="[0-9]{10}"
                value={phone}
                onChange={changePhoneHandler}
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Tỉnh Thành</Form.Label>
              <Form.Control as="select" onChange={changeProvinceHandler} custom>
                {province !== "" ? (
                  <option value={province}>{province}</option>
                ) : (
                  <option value="">Chọn Tỉnh Thành</option>
                )}

                {provinces.map((province, index) => (
                  <option value={province.province} key={index}>
                    {province.province}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput3">
              <Form.Label>Địa Chỉ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập Địa Chỉ"
                value={address}
                onChange={changeAddressHandler}
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

export function ChangeCV(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const [desiredVacancy, setDesiredVacancy] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("");
  const [foreignLanguage, setForeignLanguage] = useState("");
  const [wage, setWage] = useState();
  const [monetaryUnit, setMonetaryUnit] = useState("");
  const [careerId, setCareerId] = useState("");
  const [resumeId, setResumeId] = useState();
  const [careers, setCareers] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    if (show === true) {
      ResumeService.getResumeByApplicant(props.id).then((res) => {
        let resume = res.data;
        setResumeId(resume.id);
        setDesiredVacancy(resume.desiredVacancy);
        setEducation(resume.education);
        setExperience(resume.experience);
        setJobType(resume.jobType);
        setForeignLanguage(resume.foreignLanguage);
        const valuesWage = resume.wage.split(" ");
        setMonetaryUnit(valuesWage[valuesWage.length - 1]);
        //
        if (valuesWage.length === 2) {
          setWage(valuesWage[0].replaceAll(".", ""));
        }
        setCareerId(resume.career.id);
      });
      CareerService.getCareers().then((res) => setCareers(res.data));
    }
  }, [props.id, show]);
  const changeDesiredVacancyHandler = (e) => {
    setDesiredVacancy(e.target.value);
  };

  const changeEducationHandler = (e) => {
    setEducation(e.target.value);
  };
  const changeExperienceHandler = (e) => {
    setExperience(e.target.value);
  };

  const changeJobTypeHandler = (e) => {
    setJobType(e.target.value);
  };

  const changeForeignLanguageHandler = (e) => {
    setForeignLanguage(e.target.value);
  };

  const changeWageHandler = (e) => {
    setWage(e.target.value);
  };

  const changeCareerHandler = (e) => {
    setCareerId(e.target.value);
  };

  const changeMonetaryUnitHandler = (e) => {
    setMonetaryUnit(e.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      let resume = {
        desiredVacancy: desiredVacancy,
        experience: experience,
        education: education,
        career: { id: careerId },
        foreignLanguage: foreignLanguage,
        wage: Intl.NumberFormat().format(wage) + " " + monetaryUnit,
        jobType: jobType,
        applicant: { id: props.id },
      };

      ResumeService.changeResume(props.id, resumeId, resume).then(
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
    setDesiredVacancy("");
    setEducation("");
    setExperience("");
    setJobType("");
    setForeignLanguage("");
    setWage("");
    setCareerId("");
    setMonetaryUnit("");
    setError("");
    setShow(true);
  };

  return (
    <>
      <Button variant="light" size="sm" onClick={handleShow}>
        <MdModeEdit />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh Sửa Hồ Sơ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Vị Trí Mong Muốn</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập Vị Trí Mong Muốn"
                value={desiredVacancy}
                onChange={changeDesiredVacancyHandler}
                required
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                <Form.Label>Kinh Nghiệm</Form.Label>
                <Form.Control as="select" onChange={changeExperienceHandler} required>
                  {experience !== "" ? (
                    <option value={experience}>{experience}</option>
                  ) : (
                    <option value="">Chọn Kinh Nghiệm</option>
                  )}

                  <option value="Chưa Có">Chưa Có</option>
                  <option value="Dưới 1 năm">Dưới 1 năm</option>
                  <option value="1 Năm">1 Năm</option>
                  <option value="2 Năm">2 Năm</option>
                  <option value="3 Năm">3 Năm</option>
                  <option value="4 Năm">4 Năm</option>
                  <option value="5 Năm">5 Năm</option>
                  <option value="Trên 5 Năm">Trên 5 Năm</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                <Form.Label>Ngành Nghề</Form.Label>
                <Form.Control as="select" onChange={changeCareerHandler} value={careerId} required>
                  <option value="">Chọn Ngành Nghề</option>

                  {careers.map((career, index) => (
                    <option value={career.id} key={index}>
                      {career.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Trình Độ</Form.Label>
              <Form.Control as="select" onChange={changeEducationHandler} required>
                {education !== "" ? (
                  <option value={education}>{education}</option>
                ) : (
                  <option value="">Chọn Trình Độ</option>
                )}

                <option value="Trung học">Trung học</option>
                <option value="Trung Cấp">Trung Cấp</option>
                <option value="Cao đẳng">Cao đẳng</option>
                <option value="Đại học">Đại học</option>
                <option value="Khác">Khác</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Hình Thức Làm Việc</Form.Label>
              <Form.Control as="select" onChange={changeJobTypeHandler} required>
                {jobType !== "" ? <option value={jobType}>{jobType}</option> : <option value="">Chọn Hình Thức</option>}

                <option value="Parttime">Parttime</option>
                <option value="Fulltime">Fulltime</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Ngoại Ngữ</Form.Label>
              <Form.Control as="select" onChange={changeForeignLanguageHandler} required>
                {foreignLanguage !== "" ? (
                  <option value={foreignLanguage}>{foreignLanguage}</option>
                ) : (
                  <option value="">Chọn Ngoại Ngữ</option>
                )}

                <option value="Tiếng Anh">Tiếng Anh</option>
                <option value="Tiếng Trung">Tiếng Trung</option>
                <option value="Tiếng Nhật">Tiếng Nhật</option>
                <option value="Tiếng Hàn">Tiếng Hàn</option>
                <option value="Khác">Khác</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Mức Lương Mong Muốn</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  pattern="(?=.*[0-9]).{1,}"
                  value={wage}
                  onChange={changeWageHandler}
                  required
                />
                <Form.Control as="select" onChange={changeMonetaryUnitHandler} value={monetaryUnit} required>
                  <option value="">Chọn Đơn Vị Tiền Tệ</option>

                  <option value="VNĐ">VNĐ</option>
                  <option value="USD">USD</option>
                </Form.Control>
              </InputGroup>
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

export function ChangeSocialNetwork(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [fb, setFb] = useState("");
  const [ig, setIg] = useState("");

  useEffect(() => {
    if (show === true) {
      ApplicantService.getApplicant(props.id).then((res) => {
        const applicant = res.data;

        setFb(applicant.fb);
        setIg(applicant.ig);
      });
    }
  }, [props.id, show]);

  const changeFbHandler = (e) => {
    setFb(e.target.value);
  };

  const changeIgHandler = (e) => {
    setIg(e.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      let socialForm = {
        fb: fb,
        ig: ig,
      };

      ApplicantService.changeSocial(props.id, socialForm).then(
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
    setFb("");
    setIg("");

    setError("");
    setShow(true);
  };

  return (
    <>
      <Button variant="warning" size="sm" onClick={handleShow}>
        Đổi Link Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title> Đổi Link Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlInput3">
              <Form.Label>Facebook</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập link profile facebook ( không bắt buộc )"
                value={fb}
                onChange={changeFbHandler}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput3">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập link profile instagram ( không bắt buộc )"
                value={ig}
                onChange={changeIgHandler}
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
      <Button variant="light" size="sm" onClick={handleShow}>
        <MdModeEdit />
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

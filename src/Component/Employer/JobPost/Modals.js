import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React, { useState } from "react";
import { useEffect } from "react";
import {
    Modal,
    Button,
    Form,
    InputGroup,
    FormControl,
    Alert,
} from "react-bootstrap";
import CareerService from "../../../services/CareerService";
import JobService from "../../../services/JobService";
import ProvinceService from "../../../services/ProvinceService";

export function JobPosting() {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [careers, setCareers] = useState([]);

    const [vacancy, setVacancy] = useState("");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [wage, setWage] = useState("");
    const [monetaryUnit, setMonetaryUnit] = useState("");
    const [career, setCareer] = useState({ id: "", name: "" });
    const [province, setProvince] = useState("");
    const [description, setDescription] = useState("");
    const [endDate, setEndDate] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (show === true) {
            CareerService.getCareers().then((res) => setCareers(res.data));

            ProvinceService.listProvince().then((res) =>
                setProvinces(res.data)
            );
        }
    }, [show]);

    const changeVacancyHandler = (e) => {
        setVacancy(e.target.value);
    };

    const changeTitleHandler = (e) => {
        setTitle(e.target.value);
    };

    const changeAmountHandler = (e) => {
        setAmount(e.target.value);
    };

    const changeWageHandler = (e) => {
        setWage(e.target.value);
    };

    const changeMonetaryUnitHandler = (e) => {
        if (e.target.value === "Thương Lượng") {
            setWage("");
        }
        setMonetaryUnit(e.target.value);
    };

    const changeCareerHandler = (e) => {
        setCareer(e.target.value);
    };

    const changeProvinceHandler = (e) => {
        setProvince(e.target.value);
    };

    const onChangeAddress = (e) => {
        setAddress(e.target.value);
    };

    const ChangeEndDateHandler = (e) => {
        setEndDate(e.target.value);
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            const id = localStorage.getItem("id");
            let wageFormat = wage;
            if (wage !== "") {
                wageFormat = Intl.NumberFormat().format(wage);
            }
            let job = {
                enterprise: {
                    id: id,
                },
                vacancy: vacancy,
                title: title,
                amount: amount,
                career: {
                    id: career,
                },
                province: province,
                wage: wageFormat + " " + monetaryUnit,
                description: description,
                endDate: endDate,
                address: address,
            };

            JobService.createJob(job).then(
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
        setVacancy("");
        setWage("");
        setCareer("");
        setMonetaryUnit("");
        setError("");
        setShow(true);
    };
    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Đăng Tin Công Việc
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title> Đăng Tin Công Việc</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Tiêu Đề</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                    type="input"
                                    placeholder=""
                                    pattern="{0-100}"
                                    value={title}
                                    onChange={changeTitleHandler}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Vị Trí Tuyển Dụng</Form.Label>
                            <Form.Control
                                type="input"
                                placeholder=""
                                value={vacancy}
                                onChange={changeVacancyHandler}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Ngành Nghề</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={changeCareerHandler}
                                required
                                custom>
                                <option value="">Chọn Ngành Nghề</option>

                                {careers.map((career, index) => (
                                    <option value={career.id} key={index}>
                                        {career.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Tỉnh Thành</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={changeProvinceHandler}
                                custom
                                required>
                                <option value="">Chọn Tỉnh Thành</option>

                                {provinces.map((province, index) => (
                                    <option
                                        value={province.province}
                                        key={index}>
                                        {province.province}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Số Lượng</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder=""
                                onChange={changeAmountHandler}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Mức Lương</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                    type="number"
                                    min="1"
                                    value={wage}
                                    disabled={monetaryUnit === "Thương Lượng"}
                                    onChange={changeWageHandler}
                                    required
                                />
                                <Form.Control
                                    as="select"
                                    onChange={changeMonetaryUnitHandler}
                                    onSelect={monetaryUnit}
                                    value={monetaryUnit}
                                    required>
                                    <option value="">
                                        Chọn Đơn Vị Tiền Tệ
                                    </option>
                                    <option value="Thương Lượng">
                                        Thương Lượng
                                    </option>
                                    <option value="VNĐ">VNĐ</option>
                                    <option value="USD">USD</option>
                                </Form.Control>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Hạn Nộp</Form.Label>
                            <Form.Control
                                type="date"
                                onChange={ChangeEndDateHandler}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Mô Tả Công Việc</Form.Label>
                            <CKEditor
                                editor={ClassicEditor}
                                data="<p>Mô tả công việc tại đây</p>"
                                onReady={(editor) => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log(
                                        "Editor is ready to use!",
                                        editor
                                    );
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
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Địa Điểm Làm Việc</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                onChange={onChangeAddress}
                                required
                            />
                        </Form.Group>
                        {error !== "" && (
                            <Alert variant="danger">{error}</Alert>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            Đăng Tin
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

import AdminLayout from "../layouts/AdminLayout"
import React, { useEffect, useState } from 'react';
import '../styles/addNewBlogManager.css'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import bcrypt from 'bcryptjs'
import { useNavigate } from "react-router-dom"

const AddNewBlogManager = () => {


    const [validated, setValidated] = useState(false);
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [repassword, setRepassword] = useState();
    const [name, setName] = useState();
    const [gender, setGender] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();

    //Get current user
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : JSON.parse(sessionStorage.getItem("user")));
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : JSON.parse(sessionStorage.getItem("user")))
    useEffect(() => {
        if (localStorage.getItem("user")) {
            setCurrentUser(user);
        } else if (sessionStorage.getItem("user")) {
            setCurrentUser(user);
        }
    }, [user])

    //Navigate
    const navigate = useNavigate();

    // //Authorization
    // if (currentUser == null || currentUser.role ==="Viewer") {
    //     setTimeout(() => {
    //         navigate("/");
    //         toast.error("Không có quyền truy cập")
    //     }, 150)
    // } else if (currentUser.role === "Manager") {
    //     setTimeout(() => {
    //         navigate("/manager/blogs");
    //         toast.error("Không có quyền truy cập")
    //     }, 150)
    // }

    let id = 0;
    let role = "Manager";
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            const bcryptEncode = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, bcryptEncode);
            const user = { id, email, password: hashedPassword, name, gender, phone, address, role };
            if (user != null) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Do you want to add this manager?',
                    text: 'This action can not revert',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: "Cancel",
                    confirmButtonText: 'Add'
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            fetch('http://localhost:9999/users', {
                                method: 'Post',
                                headers: { 'Content-Type': 'Application/Json' },
                                body: JSON.stringify(user)
                            })
                                .then(() => {
                                    toast.success('Add success');
                                    setEmail("");
                                    setPassword("");
                                    setRepassword("");
                                    setName("");
                                    setGender("");
                                    setPhone("");
                                    setAddress("");

                                    setValidated(false);
                                })
                                .catch(err => console.log(err.message))
                        }
                    })
            }
        }

        setValidated(true);
    }


    return (
        <AdminLayout>
            <div className="content add-new-manager">
                <Container fluid >
                    <Container style={{ backgroundColor: "#fff" }} >
                        <Form className="add-form" noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6} >
                                    <h3>Account information</h3>
                                    <Form.Group className="form-input ">
                                        <Form.Label>Email <span style={{ color: "red" }}>*</span></Form.Label>
                                        <Form.Control
                                            placeholder="Enter email"
                                            type="email"
                                            name="email"
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Email was exsited
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="form-input">
                                        <Form.Label>Password <span style={{ color: "red" }}>*</span></Form.Label>
                                        <Form.Control
                                            placeholder="Enter password"
                                            type="password"
                                            name="password"
                                            required
                                            pattern="^(?=.*[A-Z]).{8,}$"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Password need more than 8 characters and include at least one capital letter
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="form-input">
                                        <Form.Label>Confirm password <span style={{ color: "red" }}>*</span></Form.Label>
                                        <Form.Control
                                            placeholder="Confirm password"
                                            type="password"
                                            name="repassword"
                                            required
                                            onChange={(e) => setRepassword(e.target.value)}
                                            value={repassword}
                                        />
                                    </Form.Group>
                                    <Form.Control.Feedback type="invalid">
                                        Do not match with password
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={6}>
                                    <h3>Manager information</h3>
                                    <Form.Group className="form-input ">
                                        <Form.Label>Name <span style={{ color: "red" }}>*</span></Form.Label>
                                        <Form.Control
                                            placeholder="Enter manager name"
                                            name="name"
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Can not empty
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="form-input ">
                                        <Form.Label>Gender <span style={{ color: "red" }}>*</span></Form.Label>
                                        <Form.Check
                                            type="radio"
                                            label="Male"
                                            name="gender"
                                            value="Male"
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Female"
                                            name="gender"
                                            value="Female"
                                            onChange={(e) => setGender(e.target.value)}
                                        />

                                    </Form.Group>
                                    <Form.Group className="form-input">
                                        <Form.Label>Phone <span style={{ color: "red" }}>*</span></Form.Label>
                                        <Form.Control
                                            placeholder="Enter phone"
                                            type="text"
                                            pattern="^0\d{9}"
                                            required
                                            onChange={(e) => setPhone(e.target.value)}
                                            value={phone}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Phone number is invalid
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="form-input">
                                        <Form.Label>Address <span style={{ color: "red" }}>*</span></Form.Label>
                                        <Form.Control
                                            placeholder="Manager address"
                                            type="text"
                                            required
                                            onChange={(e) => setAddress(e.target.value)}
                                            value={address}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Can not empty
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <Button className="btn-danger btn-cancel" >Cancel</Button>
                                    <Button className="btn-success" type="submit" >Add</Button>
                                </Col>
                            </Row>

                        </Form>
                    </Container>
                </Container>
            </div>
        </AdminLayout>
    );

}

export default AddNewBlogManager;
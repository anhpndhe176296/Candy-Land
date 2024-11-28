import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'react-bootstrap';
import emailjs from '@emailjs/browser'
import { v4 as uuidv4 } from "uuid";

const ForgotPassword = ({ openSignIn, hideForm }) => {
    const [email, setEmail] = useState('');
    const [validated, setValidated] = useState(false);
    const [users, setUsers] = useState([]);
    const [forgotPasswordLink, setForgotPasswordLink] = useState("");

    function sendMail(email, userId, message) {
        const token = uuidv4();
        var params = {
            name: email,
            email: email,
            message: `http://localhost:3000/reset-password/${userId}-${token}`,
        };
        const serviceID = "service_59t7ojj";
        const templateID = "template_6e30u9m";
        const publicKey = "71YulOO_zQhIllKwe";
        emailjs.send(serviceID, templateID, params, publicKey)
            .then(res => {
                fetch(`http://localhost:9999/users/${userId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        token,
                    }),
                    headers: {
                        'Content-type':
                            'application/json; charset=UTF-8',
                    },
                }
                );
                setEmail("");
                toast.success("Bếp của Bố đã gửi email đến bạn, vui lòng kiểm tra email");
            })
            .catch(err => {
                toast.error("Đã có lỗi xảy ra");
                console.log(err);
            });

    }
    const handleOpenSignIn = () => {
        openSignIn()
    }


    useEffect(() => {
        fetch("http://localhost:9999/users")
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const handleSignUp = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            event.preventDefault();
            const u = users.find(user => user.email === email);
            if (u) {
                sendMail(email, u.id, forgotPasswordLink);
            } else {
                toast.error("Email chưa tồn tại trong hệ thống")
            }
            setValidated(false);
        }
    }


    return (
        <>
            <div className="row w-100 bg-white rounded m-0">
                <img style={{ maxHeight: "70vh" }} className='col-md-6 p-0 h-100 rounded' src="assets/images/login.png" alt="Food Blog" />

                <div className="px-6 py-8 col-md-6 h-100">

                    <p className="m-3 fs-5 fw-medium text-center text-secondary">
                        Chào mừng bạn đến với Bếp của Bố
                    </p>

                    <h3 className='mx-3 text-center'>Quên mật khẩu</h3>

                    <Form noValidate validated={validated} onSubmit={handleSignUp}>

                        <Form.Group className="mx-3 mb-3 row">
                            <Form.Label className="form-label fw-medium">Email</Form.Label>
                            <Form.Control
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                placeholder="Vui lòng nhập email"
                                type='email'
                            />
                            <Form.Control.Feedback type='invalid'>
                                Email không đúng định dạng
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="my-4 mx-3 d-flex justify-content-center">
                            <button className="btn btn-warning" type='submit'>
                                Xác nhận
                            </button>
                        </div>
                    </Form>



                    <div className="d-flex justify-content-center">
                        <p>Bạn đã có tài khoản? <strong onClick={handleOpenSignIn} className="text-warning" style={{ cursor: "pointer" }}>Đăng nhập</strong></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;
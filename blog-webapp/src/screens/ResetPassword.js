import { Button, Container, Form } from "react-bootstrap";
import DefaultLayout from "../layouts/DefaultLayout";
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import '../styles/resetPassword.css'
import { useParams, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs'

const ResetPassword = () => {
    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const separatorIndex = token.indexOf('-');
    const userId = token.slice(0, separatorIndex);
    const checkToken = token.slice(separatorIndex + 1);

    useEffect(() => {
        fetch(`http://localhost:9999/users?token=${checkToken}`)
            .then(res => res.json())
            .then((resp) => {
                if (Object.keys(resp).length === 0) {
                    toast.error('Không có quyền truy cập');
                    navigate('/');
                }
            })
    }, [])

    const handleResetPassword = (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else if (password !== rePassword) {
            event.preventDefault();
            toast.error("Mật khẩu không khớp! Vui lòng nhập lại");
            setValidated(false);
        } else {
            event.preventDefault();
            const bcryptEncode = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, bcryptEncode);

            fetch(`http://localhost:9999/users/${userId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    password: hashedPassword,
                    token: ''
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
            )
                .then(() => {
                    toast.success('Đặt lại mật khẩu thành công');
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                })
        }

    }
    return (
        <DefaultLayout>
            <Container style={{ minHeight: "60vh", padding: "40px" }}>
                <h2>Lấy lại mật khẩu</h2>
                <Container className="reset-container text-left">
                    <Form noValidate validated={validated} onSubmit={handleResetPassword} className="reset-form" >
                        <Form.Group className="reset-item">
                            <Form.Label>Mật khẩu mới</Form.Label>
                            <Form.Control
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Nhập mật khẩu..."
                                pattern="^(?=.*[A-Z]).{8,}$"
                                required
                                type='password'
                            />
                            <Form.Control.Feedback type='invalid'>
                                Mật khẩu cần chứa ít nhất 8 kí tự và có một kí tự viết hoa.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="reset-item">
                            <Form.Label>Nhập lại mật khẩu</Form.Label>
                            <Form.Control
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                className="form-control"
                                placeholder="Nhập lại mật khẩu..."
                                pattern="^(?=.*[A-Z]).{8,}$"
                                required
                                type='password'
                            />
                            <Form.Control.Feedback type='invalid'>
                                Mật khẩu cần chứa ít nhất 8 kí tự và có một kí tự viết hoa.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button type="submit" className="btn btn-success">Thay đổi</Button>
                    </Form>
                </Container>
            </Container>
        </DefaultLayout>
    );
}

export default ResetPassword;
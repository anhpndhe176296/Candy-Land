import React, { useContext, useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/adminLogin.css";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import bcrypt from "bcryptjs";

const AdminLogin = () => {
  const [validated, setValidated] = useState(false);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9999/users")
      .then((res) => res.json())
      .then((data) => {
        data = data.filter(
          (user) => user.role === "Admin" || user.role === "Manager"
        );
        setUsers(data);
      });
  }, []);

  const handleSignIn = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      const pass = bcrypt.hashSync(password);
      const u = users.find(
        (user) =>
          user.email === email && bcrypt.compareSync(password, user.password)
      );
      if (u) {
        const data = {
          email: email,
          role: u.role,
          name: u.name,
        };
        if (isRememberMe) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        sessionStorage.setItem("user", JSON.stringify(data));
        setEmail("");
        setPassword("");
        toast.success("Đăng nhập thành công");
        setTimeout(() => {
          if (u.role == "Manager") {
            navigate("/manager/admin");
          } else {
            navigate("/manager/bloglist");
          }
        }, 1000);
      } else {
        toast.error(
          "Email hoặc mật khẩu của bạn không đúng! Vui lòng nhập lại"
        );
      }
      setValidated(false);
    }
  };

  return (
    <Container fluid style={{ minHeight: "100vh" }}>
      <ToastContainer />
      <MDBContainer fluid className="m-0 p-0 gradient-form">
        <MDBRow className="h-100">
          <MDBCol col="6">
            <div
              className="d-flex flex-column ms-5"
              style={{ padding: "0 80px" }}
            >
              <div className="text-center" style={{ paddingTop: "30px" }}>
                <Link to={"/"}>
                  <img
                    src="assets/images/lg.png"
                    style={{ width: "185px" }}
                    alt="logo"
                  />
                </Link>

                <h4 className="mt-1 mb-5 pb-1">
                  Chào mừng đến với Phần quản lý Candy Land
                </h4>
              </div>

              <p>Xin hãy nhập tài khoản và mật khẩu để truy cập</p>

              <Form noValidate validated={validated} onSubmit={handleSignIn}>
                <Form.Group>
                  <Form.Label>Địa chỉ email</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4"
                    id="form1"
                    type="email"
                    placeholder="example@demo.com"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Email không đúng định dạng
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4"
                    placeholder="Nhập mật khẩu..."
                    pattern="^(?=.*[A-Z]).{8,}$"
                    required
                    type="password"
                  />
                  <Form.Control.Feedback type="invalid">
                    Mật khẩu cần chứa ít nhất 8 kí tự và có một kí tự viết hoa.
                  </Form.Control.Feedback>
                </Form.Group>
                <div
                  className="d-flex justify-content-left"
                  style={{ padding: "0 16px" }}
                >
                  <Form.Check
                    checked={isRememberMe}
                    onChange={(event) => setIsRememberMe(event.target.checked)}
                    label="Ghi nhớ đăng nhập"
                  />
                </div>
                <div className="d-flex justify-content-center w-100 mt-3">
                  <Button
                    className="btn btn-primary gradient-custom-2 w-100"
                    type="submit "
                  >
                    Đăng nhập
                  </Button>
                </div>
              </Form>
            </div>
          </MDBCol>

          <MDBCol col="6">
            <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h2 class="mb-4">
                  ONLY FOR ADMIN AND MEMBER
                </h2>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Container>
  );
};

export default AdminLogin;

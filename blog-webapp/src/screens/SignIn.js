import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form } from "react-bootstrap";
import bcrypt from "bcryptjs";

export const SignIn = ({
  openSignUp,
  openForgotPassword,
  hideForm,
  setUser,
}) => {
  const [validated, setValidated] = useState(false);
  const [users, setUsers] = useState([]);
  const [isRememberMe, setIsRememberMe] = useState(false);

  useEffect(() => {
    fetch("http://localhost:9999/users?role=Viewer")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOpenSignUp = () => {
    openSignUp();
  };
  const handleOpenForgotPassword = () => {
    openForgotPassword();
  };

  const handleSignIn = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      const u = users.find(
        (user) =>
          user.email === email && bcrypt.compareSync(password, user.password)
      );
      if (u) {
        const data = {
          email: email,
          role: u.role,
          id: u.id,
        };
        if (isRememberMe) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        sessionStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        setEmail("");
        setPassword("");
        setIsRememberMe(false);
        hideForm();
        toast.success("Đăng nhập thành công");
      } else {
        toast.error(
          "Email hoặc mật khẩu của bạn không đúng! Vui lòng nhập lại"
        );
      }
      setValidated(false);
    }
  };

  return (
    <>
      <div className="row w-100 bg-white rounded m-0">
        <img
          style={{
            maxHeight: "70vh",
            objectFit: "cover", // Ensures the image maintains its aspect ratio
            width: "100%", // Makes the image take the full width of its container
            borderRadius: "0.25rem", // Matches the Bootstrap class 'rounded'
          }}
          className="col-md-6 p-0 h-100 rounded"
          src="https://i.imgur.com/OuKdq8f.jpeg"
          alt="Food"
        />

        <div className="px-6 py-8 col-md-6 h-100">
          <p className="m-3 fs-5 fw-medium text-center text-secondary">
            Chào mừng trở lại
          </p>
          <h3 className="mx-3 text-center">Đăng nhập</h3>

          <Form noValidate validated={validated} onSubmit={handleSignIn}>
            <Form.Group className="mx-3 mb-3 row">
              <Form.Label className="fw-medium form-label">Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="example@mail.com"
                type="email"
                required
              />
              <Form.Control.Feedback type="invalid">
                Email không đúng định dạng
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mx-3 mb-3 row">
              <Form.Label className="fw-medium form-label">Mật khẩu</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
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
              className="d-flex justify-content-between"
              style={{ padding: "0 16px" }}
            >
              <Form.Check
                checked={isRememberMe}
                onChange={(event) => setIsRememberMe(event.target.checked)}
                label="Ghi nhớ đăng nhập"
              />
              <strong
                onClick={handleOpenForgotPassword}
                className="forgot-password"
                style={{ color: "pink" }}
              >
                Quên mật khẩu
              </strong>
            </div>

            <div className="my-4 mx-3 d-flex justify-content-center">
              <button
                style={{ backgroundColor: "pink" }}
                className="btn"
                type="submit"
              >
                Đăng nhập
              </button>
            </div>

            <div className="d-flex justify-content-center">
              <p>
                Bạn chưa có tài khoản?{" "}
                <strong
                  onClick={handleOpenSignUp}
                  style={{ color: "pink", cursor: "pointer" }}
                >
                  Đăng ký ngay
                </strong>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

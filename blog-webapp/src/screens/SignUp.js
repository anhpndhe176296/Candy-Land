import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form } from "react-bootstrap";
import bcrypt from "bcryptjs";

export const SignUp = ({ openSignIn, hideForm }) => {
  const handleOpenSignIn = () => {
    openSignIn();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [users, setUsers] = useState([]);
  let id = 0;
  let role = "Viewer";
  useEffect(() => {
    fetch("http://localhost:9999/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSignUp = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      const u = users.find((user) => user.email === email);
      let pass = password == confirmPassword;
      if (u) {
        toast.error("Email đã tồn tại!");
      } else if (!pass) {
        toast.error("Mật khẩu không khớp, vui lòng nhập lại");
      } else {
        const bcryptEncode = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, bcryptEncode);
        let user = { id, email, password: hashedPassword, role };
        fetch("http://localhost:9999/users", {
          method: "Post",
          headers: { "Content-Type": "Application/Json" },
          body: JSON.stringify(user),
        })
          .then(() => {
            toast.success("Tạo tài khoản thành công");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          })
          .catch((err) => console.log(err.message));
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
            Chào mừng bạn đến với Duyên Anh Cake
          </p>

          <h3 className="mx-3 text-center">Đăng ký</h3>

          <Form noValidate validated={validated} onSubmit={handleSignUp}>
            <Form.Group className="mx-3 mb-3 row">
              <Form.Label className="form-label fw-medium">Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="example@mail.com"
                type="email"
              />
              <Form.Control.Feedback type="invalid">
                Email không đúng định dạng
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mx-3 mb-3 row">
              <Form.Label className="form-label fw-medium">Mật Khẩu</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Nhập mật khẩu ..."
                pattern="^(?=.*[A-Z]).{8,}$"
                type="password"
              />
              <Form.Control.Feedback type="invalid">
                Mật khẩu cần chứa ít nhất 8 kí tự và có một kí tự viết hoa.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mx-3 mb-3 row">
              <Form.Label className="form-label fw-medium">
                Nhập Lại Mật Khẩu
              </Form.Label>
              <Form.Control
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                placeholder="Nhập lại mật khẩu ..."
                pattern="^(?=.*[A-Z]).{8,}$"
                type="password"
              />
              <Form.Control.Feedback type="invalid">
                Mật khẩu cần chứa ít nhất 8 kí tự và có một kí tự viết hoa.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="my-4 mx-3 d-flex justify-content-center">
              <button
                className="btn"
                style={{ backgroundColor: "pink" }}
                type="submit"
              >
                Đăng ký
              </button>
            </div>
          </Form>

          <div className="d-flex justify-content-center">
            <p>
              Bạn đã có tài khoản?{" "}
              <strong
                onClick={handleOpenSignIn}
                style={{ color: "pink", cursor: "pointer" }}
              >
                Đăng nhập
              </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

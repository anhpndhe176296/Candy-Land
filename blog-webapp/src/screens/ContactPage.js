import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import GoogleMapReact from "google-map-react";
import logo from "../photos/logo.png";
import DefaultLayout from "../layouts/DefaultLayout";
import { Link } from "react-router-dom";
import { FormControl } from "react-bootstrap";

// Cấu hình validation schema cho Formik
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Vui lòng nhập họ và tên"),
  email: Yup.string()
    .email("Địa chỉ email không hợp lệ")
    .required("Vui lòng nhập địa chỉ email"),
  phone: Yup.string().required("Vui lòng nhập số điện thoại"),
  message: Yup.string().required("Vui lòng nhập nội dung"),
});

// Component hiển thị marker trên bản đồ
const Marker = () => <div className="map-marker">Your Location</div>;

const ContactPage = () => {
  // Hàm xử lý gửi thông tin liên hệ
  const handleSubmit = (values, { setSubmitting }) => {
    // Gửi thông tin liên hệ tới server hoặc xử lý theo nhu cầu của bạn
    console.log(values);
    setSubmitting(false);
  };

  return (
    <DefaultLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "0px",
        }}
      >
        <img
          src="../../../assets/images/lg.png"
          alt="logo"
          className="logo"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "50px",
        }}
      >
        <div style={{ maxWidth: "800px", textAlign: "center" }}>
          <div
            style={{
              background: "#f2f2f2",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h1 style={{ marginBottom: "20px" }}>Thông tin liên hệ</h1>
            <p>
              Đại học FPT Campus Hòa Lạc, Hà Nội
              <br />
              <ion-icon name="location"></ion-icon> Địa chỉ: Đất Thổ Cư Hòa Lạc,
              Km29, ĐCT08, Thạch Hoà, Thạch Thất, Hà Nội
              <br />
              <ion-icon name="call"></ion-icon> Điện thoại: 0912345678
              <br />
              <ion-icon name="mail"></ion-icon> Email:
              Group6Assigment@fpt.edu.vn <br />
            </p>
            <Formik
              initialValues={{
                fullName: "",
                email: "",
                phone: "",
                message: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div>
                    <Field
                      type="text"
                      name="fullName"
                      placeholder="Họ và tên"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Địa chỉ email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="phone"
                      placeholder="Số điện thoại"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div>
                    <Field
                      as="textarea"
                      name="message"
                      placeholder="Nội dung"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <button type="submit" disabled={isSubmitting}>
                    Gửi
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ContactPage;

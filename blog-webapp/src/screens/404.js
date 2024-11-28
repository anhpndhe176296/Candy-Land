import { useState } from "react";
import { Container } from "react-bootstrap";
import DefaultLayout from "../layouts/DefaultLayout";

const Page404 = () => {
  return (
    <DefaultLayout>
      <Container
        className="page-404"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div
          className="error-image d-flex justify-content-center"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="../assets/images/404.png"
            alt="404 Error"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              width: "auto",
              height: "auto",
            }}
          />
        </div>
        <div className="text-center">
          <h3>Page not found</h3>
        </div>
      </Container>
    </DefaultLayout>
  );
};

export default Page404;

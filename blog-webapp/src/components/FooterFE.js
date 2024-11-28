import { Container, Col, Row } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
export default function FooterFE() {
  return (
    <Container fluid className="footer ">
      <Container>
        <Row>
          <Col md={6} sm={12}>
            <div className="footer-left">
              <Navbar.Brand href="#home" className="logo-container">
                <img src="../../assets/images/lg.png" alt="Candy Land" />
              </Navbar.Brand>
              <div>
                <p>Know - Love - Share</p>
                <p>Know: Hiểu rõ điều đang làm và luôn học hỏi mỗi ngày</p>
                <p>Love: Đặt cái tâm, cái tình vào mỗi công thức</p>
                <p>Share: Chia sẻ niềm hạnh phúc qua những chiếc bánh</p>
              </div>
            </div>
          </Col>
          <Col md={6} sm={12}>
            <div className="footer-middle">
              <div className="middle-title">Liên hệ</div>
              <div className="middle-content">
                <p>
                  <ion-icon name="location"></ion-icon>Đại học FPT Campus Hòa
                  Lạc, Hà Nội
                </p>
                <p>
                  <ion-icon name="call"></ion-icon>0912345678
                </p>
                <p>
                  <ion-icon name="mail"></ion-icon>Group4@fpt.edu.vn
                </p>
                <p>
                  <ion-icon name="rocket"></ion-icon>Made by{" "}
                  <span style={{ fontWeight: "700px" }}>Group 4 - SE1836</span>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="footer-footer">
          {" "}
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
            s
          >
            Group 4 - SE1836
          </span>
        </div>
      </Container>
    </Container>
  );
}

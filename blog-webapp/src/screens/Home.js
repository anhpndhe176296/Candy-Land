import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import "../styles/home.css";
import Paginate from "./Paginate";
import { toast } from "react-toastify";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilter = (page) => {
    var url = `http://localhost:9999/blogs/?_sort=id&_page=${page}&_limit=5`;

    fetch(url)
      .then((res) => {
        const totalCount = res.headers.get("X-Total-Count");
        setTotalPages(Math.ceil(totalCount / 10));
        return res.json();
      })
      .then((data) => setBlogs(data))
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    handleFilter(currentPage);
  }, [currentPage]);

  // useEffect(() => {
  //   fetch("http://localhost:9999/blogs")
  //     .then(res => res.json())
  //     .then(data => {
  //       let newBlogs = [];
  //       newBlogs = data.sort((a, b) => {
  //         const timeA = convertStringToDate(a.time);
  //         const timeB = convertStringToDate(b.time);
  //         return timeB - timeA;
  //       })
  //       setBlogs(newBlogs);
  //     })

  // }, [])

  useEffect(() => {
    fetch("http://localhost:9999/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <DefaultLayout>
      <Container fluid className="p-0">
        <div>
          <Carousel>
            <Carousel.Item>
              <img
                className="carousel-img"
                src="assets/images/transfercake1.jpg"
                alt="First slide"
              />
              <Carousel.Caption className="carousel-caption">
                <h3>Bánh Ngọt</h3>
                <p>Những trải nghiệm tuyệt vời nhất</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carousel-img"
                src="assets/images/transfercake3.jpg"
                alt="Second slide"
              />

              <Carousel.Caption className="carousel-caption">
                <h3>Tiramisu</h3>
                <p>Ngon</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carousel-img"
                src="assets/images/banner_3.png"
                alt="Third slide"
              />

              <Carousel.Caption className="carousel-caption">
                <h3>Cách làm bành ngọt</h3>
                <p>Làm bánh ngọt từ A đến Z - Khám phá bí quyết thành công</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <Container style={{ textAlign: "left" }}>
          <Row>
            <Col sm={8} lg={9}>
              <section className="new-blog">
                <h4 className="blog-header text-uppercase ">
                  <span>Công thức mới nhất</span>
                </h4>
              </section>
              <div className="section-body">
                {blogs.map((blog) => (
                  <div className="item-blog d-flex" key={blog.id}>
                    <a
                      href={`blogs/detail/${blog.id}`}
                      className="img-container"
                    >
                      <picture
                        dangerouslySetInnerHTML={{ __html: blog.thumbnail }}
                      >
                        {/* <img src={blog.thumbnail}></img> */}
                      </picture>
                    </a>
                    <div className="text-container h6">
                      <Link
                        to={`/${blog.categoryId}`}
                        className="text-uppercase font-weight-bold text-decoration-none list-unstyled blog-category"
                      >
                        {categories.map((category) =>
                          category.id === blog.categoryId
                            ? category.categoryName
                            : ""
                        )}
                      </Link>

                      <div className="title h4 font-weight-bold">
                        <Link
                          to={`/blogs/detail/${blog.id}`}
                          className="list-unstyled text-decoration-none blog-title"
                        >
                          {blog.title}
                        </Link>
                      </div>

                      <div className="star-container">
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                      </div>

                      <div class="blog-subtitle">{blog.introduce}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pagination mb-3 justify-content-end">
                <Paginate
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                />
              </div>
            </Col>
            <Col sm={4} lg={3} style={{ paddingBottom: "40px" }}>
              <aside id="sidebar">
                <div className="blog-menu">
                  <img src="https://i.imgur.com/Dr1VseC.jpeg" />
                  <div class="middle-menu">
                    <p class="h4">
                      <a
                        style={{ color: "#070707" }}
                        title="Cách làm bánh tét chiên đoàn viên cùng gia đình ngày Tết"
                        href="http://localhost:3000/blogs/detail/1"
                      >
                        Bông lan trứng muối
                      </a>
                    </p>
                    <p class="h4">
                      <a
                        style={{ color: "#070707" }}
                        title="Cách làm đậu hũ chiên sả ớt thơm ngon tại nhà"
                        href="http://localhost:3000/blogs/detail/26"
                      >
                        Bánh táo nướng
                      </a>
                    </p>
                    <p class="h4">
                      <a
                        style={{ color: "#070707" }}
                        title="Cách chế biến món thịt bò xào tỏi ngon ngất ngây"
                        href="http://localhost:3000/blogs/detail/26"
                      >
                        Bánh xu kem socola
                      </a>
                    </p>
                    <p class="h4">
                      <a
                        style={{ color: "#070707" }}
                        title="Cách nấu món lẩu bò đúng điệu cực kỳ hấp dẫn cho ngày mưa"
                        href="http://localhost:3000/blogs/detail/26"
                      ></a>
                    </p>
                    <p class="h4">
                      <a
                        style={{ color: "#070707" }}
                        title="Đổi khẩu vị với món nộm thịt bò hành tây thơm ngon kiểu Thái"
                        href="http://localhost:3000/blogs/detail/3"
                      >
                        Bánh bông lan dừa
                      </a>
                    </p>
                  </div>
                </div>
              </aside>
            </Col>
          </Row>
        </Container>
      </Container>
    </DefaultLayout>
  );
};

export default Home;

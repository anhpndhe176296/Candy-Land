import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Paginate from "./Paginate";
import { toast } from "react-toastify";
import "../styles/home.css";
const BlogListFE = () => {
  const { cid } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState({});

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

  const navigate = useNavigate();

  const handleFilter = (page) => {
    var url = `http://localhost:9999/blogs/?_sort=id&_page=${page}&_limit=5&categoryId=${cid}`;
    fetch(url)
      .then((res) => {
        const totalCount = res.headers.get("X-Total-Count");
        setTotalPages(Math.ceil(totalCount / 10));
        return res.json();
      })
      .then((data) => {
        if (data.length !== 0) {
          setBlogs(data);
        } else {
          navigate("/404page");
        }
      })
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    handleFilter(currentPage);
  }, [currentPage, cid]);

  useEffect(() => {
    fetch("http://localhost:9999/categories")
      .then((res) => res.json())
      .then((data) => {
        data = data.find((category) => category.id == cid);
        setCategory(data);
      });
  }, [cid]);

  // useEffect(() => {
  //     fetch("http://localhost:9999/blogs")
  //         .then(res => res.json())
  //         .then(data => {
  //             data = data.filter(blog => blog.categoryId == cid);
  //             setBlogs(data)
  //         })
  // }, [cid])

  return (
    <DefaultLayout>
      <Container fluid className="p-0">
        <div>
          <div className="category-image">
            <div className="category-background">
              <Container className="category-title text-uppercase">
                <h3>{category.categoryName}</h3>
              </Container>
            </div>
          </div>
        </div>
        <Container style={{ textAlign: "left" }}>
          <Row>
            <Col sm={8} lg={9}>
              <section className="new-blog">
                <h4 className="blog-header text-uppercase ">
                  <span> Món {category.categoryName}</span>
                </h4>
              </section>
              <div className="section-body">
                {blogs.map((blog) => (
                  <div className="item-blog d-flex" key={blog.id}>
                    <Link
                      to={`/blogs/detail/${blog.id}`}
                      className="img-container"
                    >
                      <picture
                        dangerouslySetInnerHTML={{ __html: blog.thumbnail }}
                      >
                        {/* <img src={"../" + blog.thumbnail}></img> */}
                      </picture>
                    </Link>
                    <div className="text-container h6">
                      <Link
                        to={`/filter/${category.id}`}
                        className="text-uppercase font-weight-bold text-decoration-none list-unstyled blog-category"
                      >
                        {category.categoryName}
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
                      >
                        Bánh gato dâu tây
                      </a>
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

export default BlogListFE;

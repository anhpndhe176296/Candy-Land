import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import '../styles/home.css'
const Search = () => {
    const { search } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("http://localhost:9999/blogs")
            .then(res => res.json())
            .then(data => {
                data = data.filter(blog => blog.title.includes(search))
                setBlogs(data)
            })
    }, [search])
    console.log(blogs);
    useEffect(() => {
        fetch("http://localhost:9999/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])


    return (
        <DefaultLayout>
            <Container fluid className='p-0'>
                <div >
                    <div className="category-image" >
                        <div className="category-background">
                            <Container className="category-title text-uppercase" >
                                <h3>Kết quả tìm kiếm cho: {search}</h3>
                            </Container>
                        </div>
                    </div>
                </div>
                <Container style={{ textAlign: "left" }}>
                    <Row>
                        <Col sm={8} lg={9}>
                            <section className='new-blog'>
                                <h4 className='blog-header text-uppercase '>
                                    <span>
                                        Công thức mới nhất
                                    </span>
                                </h4>
                            </section>
                            <div className='section-body'>
                                {
                                    blogs.map(blog =>
                                        <div className='item-blog d-flex' key={blog.id}>
                                            <a href={`blogs/detail/${blog.id}`} className='img-container'>
                                                <picture dangerouslySetInnerHTML={{ __html: blog.thumbnail }}>
                                                    {/* <img dangerouslySetInnerHTML={{ __html: blog.thumbnail }}></img> */}
                                                </picture>
                                            </a>
                                            <div className='text-container h6'>

                                                <Link to={`/${blog.categoryId}`} className="text-uppercase font-weight-bold text-decoration-none list-unstyled blog-category" >
                                                    {
                                                        categories.map(category => category.id === blog.categoryId ? category.categoryName : "")
                                                    }
                                                </Link>

                                                <div className='title h4 font-weight-bold'>
                                                    <Link to={`/blogs/detail/${blog.id}`} className="list-unstyled text-decoration-none blog-title">{blog.title}</Link>
                                                </div>

                                                <div className='star-container'>
                                                    <ion-icon name="star"></ion-icon>
                                                    <ion-icon name="star"></ion-icon>
                                                    <ion-icon name="star"></ion-icon>
                                                    <ion-icon name="star"></ion-icon>
                                                    <ion-icon name="star"></ion-icon>
                                                </div>

                                                <div class="blog-subtitle">
                                                    {blog.introduce}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

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
                                                href="http://localhost:3000/blogs/detail/1"
                                            >
                                                Bông lan trứng muối
                                            </a>
                                        </p>
                                        <p class="h4">
                                            <a
                                                style={{ color: "#070707" }}
                                                href="http://localhost:3000/blogs/detail/26"
                                            >
                                                Bánh táo nướng
                                            </a>
                                        </p>
                                        <p class="h4">
                                            <a
                                                style={{ color: "#070707" }}
                                                href="http://localhost:3000/blogs/detail/26"
                                            >
                                                Bánh xu kem socola
                                            </a>
                                        </p>
                                        <p class="h4">
                                            <a
                                                style={{ color: "#070707" }}
                                                href="http://localhost:3000/blogs/detail/26"
                                            ></a>
                                        </p>
                                        <p class="h4">
                                            <a
                                                style={{ color: "#070707" }}
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

}

export default Search;
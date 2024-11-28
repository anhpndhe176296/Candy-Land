import DefaultLayout from "../layouts/DefaultLayout";
import { Container, Accordion, Button, Row, Col, Table, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailBlog() {
    const { pid } = useParams();
    const [feedback, setFeedback] = useState([]);
    const [blog, setBlog] = useState(null); // Initialize blog as null initially
    const [currentUser, setCurrentUser] = useState(null); // Initialize currentUser as null initially
    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        userId: null, // userId will be set after currentUser is fetched
        blogId: parseInt(pid),
        content: "",
        rate: 1, // Default rating, change as needed
    });

    // Fetch the current user and blog data when the component mounts
    useEffect(() => {
        const userFromStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : JSON.parse(sessionStorage.getItem("user"));
        setCurrentUser(userFromStorage);
        setFormData(prevData => ({
            ...prevData,
            userId: userFromStorage?.id || null, // Update formData with current user id
        }));

        // Fetch the blog information based on pid
        fetch(`http://localhost:9999/blogs/${pid}`)
            .then((resp) => resp.json())
            .then((data) => {
                setBlog(data); // Set blog to the fetched blog data
                setFormData(prevData => ({
                    ...prevData,
                    blogId: parseInt(pid), // Ensure the blogId is updated
                }));
            })
            .catch((err) => {
                console.log(err.message);
            });

        // Fetch feedbacks for the specific blog
        fetch(`http://localhost:9999/feedbacks?blogId=${pid}`)
            .then((resp) => resp.json())
            .then((data) => {
                setFeedback(data);
            })
            .catch((err) => {
                console.log(err.message);
            });

        // Fetch users data
        fetch(`http://localhost:9999/users`)
            .then((resp) => resp.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [pid]); // Dependency array includes pid to refetch when it changes

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:9999/feedbacks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Fetch feedbacks again to update the list
                fetch(`http://localhost:9999/feedbacks?blogId=${pid}`)
                    .then((resp) => resp.json())
                    .then((data) => {
                        setFeedback(data);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
                // Clear the form after submission
                setFormData(prevData => ({
                    ...prevData,
                    content: "",
                    rate: 1,
                }));
            } else {
                console.log("Failed to submit feedback");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    // Return loading state if blog is null
    if (!blog) {
        return <p>Loading...</p>;
    }

    return (
        <DefaultLayout>
            <Container fluid style={{ padding: '2rem', backgroundColor: '#f9f9f9' }}>
                <div className="blog-detail" style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Row className="mb-4">
                        <Col md={6}>
                            <h4>Tác Giả: <span style={{ color: 'gray' }}>{blog.author}</span></h4>
                        </Col>
                        <Col md={6} className="text-md-end">
                            <h4>Time: <span style={{ color: 'gray' }}>{blog.time}</span></h4>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col sm={3}>
                            <h4>Chuẩn bị</h4>
                            <h5 style={{ color: 'red' }}>{blog.preparationTime}</h5>
                        </Col>
                        <Col sm={3}>
                            <h4>Nấu/Nướng</h4>
                            <h5 style={{ color: 'red' }}>{blog.cookingTime}</h5>
                        </Col>
                        <Col sm={3}>
                            <h4>Khẩu phần</h4>
                            <h5 style={{ color: 'red' }}>{blog.servingSize}</h5>
                        </Col>
                        <Col sm={3}>
                            <h4>Độ khó</h4>
                            <h5 style={{ color: 'red' }}>{blog.difficulty}</h5>
                        </Col>
                    </Row>

                    <div className="table-of-contents mb-4">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <Button variant="success" style={{ backgroundColor: '#28a745', border: 'none', fontWeight: 'bold' }}>Nguyên liệu</Button>
                                </Accordion.Header>
                                <Accordion.Body style={{ color: '#ad954e', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '5px' }} dangerouslySetInnerHTML={{ __html: blog.tableOfContents }} />
                            </Accordion.Item>
                        </Accordion>
                    </div>

                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Body dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </Accordion.Item>
                    </Accordion>

                    <Form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="content">
                                    <Form.Label>Bình luận</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Nhập bình luận"
                                        value={formData.content}
                                        onChange={(e) => handleChange('content', e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="rate">
                                    <Form.Label>Đánh giá bài viết (1–5)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min={1}
                                        max={5}
                                        placeholder="Nhập đánh giá từ 1 đến 5"
                                        value={formData.rate}
                                        onChange={(e) => handleChange('rate', parseInt(e.target.value))}
                                        required
                                    />
                                    {(formData.rate < 1 || formData.rate > 5) && (
                                        <Form.Text className="text-danger">Nhập từ 1 đến 5</Form.Text>
                                    )}
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Hãy bình luận tích cực"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type="submit" variant="primary" style={{ backgroundColor: '#007bff', border: 'none' }}>Gửi</Button>
                    </Form>
                </div>

                {/* Feedback Table */}
                <Row className="mt-4">
                    <Col>
                        <Table striped bordered hover style={{ backgroundColor: '#fff' }}>
                            <thead>
                                <tr>
                                    <th>Người đăng</th>
                                    <th>Nội dung bình luận</th>
                                    <th>Đánh giá trên 5 <span style={{ color: 'red' }}>&#9733;</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedback.map((fb) => (
                                    <tr key={fb.id}>
                                        <td>{users.find(u => u.id === fb.userId)?.email || 'Unknown User'}</td>
                                        <td>{fb.content}</td>
                                        <td>
                                            {Array.from({ length: fb.rate }, (_, index) => (
                                                <ion-icon key={index} name="star" style={{ color: "#f2b705" }}></ion-icon>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </DefaultLayout>
    );
}

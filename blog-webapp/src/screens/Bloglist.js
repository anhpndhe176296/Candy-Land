import MenuBar from "../components/MenuBar";
import DefaultLayout from "../layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function BlogList() {
  const styles = {
    contentDiv: {
      display: "flex",
    },
    contentMargin: {
      marginLeft: "10px",
      width: "100%",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "2rem",
      color: "#333",
    },
    createLink: {
      textAlign: "right",
      marginBottom: "20px",
    },
    createLinkText: {
      fontSize: "1rem",
      color: "#007bff",
      textDecoration: "none",
      fontWeight: "bold",
    },
    table: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    tableHeader: {
      backgroundColor: "#f1f1f1",
      color: "#333",
      fontWeight: "bold",
    },
    tableCell: {
      padding: "10px",
      textAlign: "center",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
    },
    paginationContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    },
  };

  const [category, setCategory] = useState([]);
  const [user, setUser] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [p, setBlog] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 3;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(p.length / itemsPerPage);

  useEffect(() => {
    fetch("http://localhost:9999/blogs")
      .then((resp) => resp.json())
      .then((data) => {
        setBlog(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:9999/categories")
      .then((resp) => resp.json())
      .then((data) => {
        setCategory(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:9999/users")
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:9999/feedbacks")
      .then((resp) => resp.json())
      .then((data) => {
        setFeedback(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // Delete event:
  const handleDelete = (id) => {
    if (window.confirm("Do you want to remove the blog with ID " + id + "?")) {
      fetch(`http://localhost:9999/blogs/${id}`, {
        method: "DELETE",
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const displayData = p
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((p) => (
      <tr key={p.id}>
        <td style={styles.tableCell}>{p.id}</td>
        <td style={styles.tableCell}>{p.title}</td>
        <td style={styles.tableCell}>
          <div
            style={{ width: "auto", height: "300px", overflow: "hidden" }}
            dangerouslySetInnerHTML={{ __html: p.thumbnail }}
          />
        </td>
        <td style={styles.tableCell}>
          <Link to={"/manager/bloglist/edit/" + p.id} style={styles.link}>
            Edit
          </Link>
        </td>
        <td style={styles.tableCell}>
          <Link to={""} onClick={() => handleDelete(p.id)} style={styles.link}>
            Delete
          </Link>
        </td>
      </tr>
    ));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <DefaultLayout>
      <div style={styles.contentDiv}>
        <MenuBar />
        <div style={styles.contentMargin}>
          <Row>
            <Col xs={12}>
              <Row>
                <Col>
                  <h2 style={styles.header}>List Blogs</h2>
                </Col>
              </Row>
              <Row>
                <Col style={styles.createLink}>
                  <Link
                    to="/manager/bloglist/addblog"
                    style={styles.createLinkText}
                  >
                    Create New Blog
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table style={styles.table}>
                    <thead style={styles.tableHeader}>
                      <tr>
                        <th className="col-sm-1" style={styles.tableCell}>
                          Id
                        </th>
                        <th className="col-sm-3" style={styles.tableCell}>
                          Title
                        </th>
                        <th className="col-sm-6" style={styles.tableCell}>
                          Thumbnail
                        </th>
                        <th className="col-sm-1" style={styles.tableCell}>
                          Edit
                        </th>
                        <th className="col-sm-1" style={styles.tableCell}>
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>{displayData}</tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col style={styles.paginationContainer}>
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination justify-content-center"}
                    activeClassName={"active"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default BlogList;

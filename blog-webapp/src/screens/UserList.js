import { useContext, useEffect, useRef, useState } from "react";
import { Form, Table } from 'react-bootstrap'
import AdminLayout from "../layouts/AdminLayout";
import 'datatables.net-dt/js/dataTables.dataTables.js';
import 'datatables.net-dt/css/jquery.dataTables.css';
import { toast } from 'react-toastify'
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
function UserList() {
  const styles = {
    contentDiv: {
      display: "flex",
    },
    contentMargin: {
      marginLeft: "10px",
      width: "100%",
    },
  };

  //Get current user
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : JSON.parse(sessionStorage.getItem("user")));
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : JSON.parse(sessionStorage.getItem("user")))
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setCurrentUser(user);
    } else if (sessionStorage.getItem("user")) {
      setCurrentUser(user);
    }
  }, [user])

  //Navigate
  const navigate = useNavigate();

  // //Authorization
  // if (currentUser == null || currentUser.role === "Viewer") {
  //   setTimeout(() => {
  //     navigate("/");
  //     toast.error("Không có quyền truy cập")
  //   }, 150)
  // } else if (currentUser.role === "Manager") {
  //   setTimeout(() => {
  //     navigate("/manager/blogs");
  //     toast.error("Không có quyền truy cập")
  //   }, 150)
  // }

  const [users, setUsers] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:9999/users?role=Manager")
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      $(tableRef.current).DataTable();
    }
  }, [users]);

  const handleIsActive = (event, userId) => {
    let choosed = event.target.value === "active" ? true : false;

    fetch(`http://localhost:9999/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        isActive: choosed
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(
        toast.success("Cập nhật trạng thái thành công")
      )
      .catch(err => toast.error("Đã có lỗi xảy ra, Vui lòng thử lại sau"))
  }
  return (
    <AdminLayout>
      <div className="content">
        <Table
          id="managerTable"
          ref={tableRef}
          className="display table-bordered"
          style={{ width: "100%" }}
          striped
          hover
        >
          <thead >
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Adress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user =>
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.email}
                  </td>
                  <td>
                    {
                      user.name
                    }
                  </td>
                  <td>
                    {user.gender}
                  </td>
                  <td>
                    {user.phone}
                  </td>
                  <td>
                    {user.address}
                  </td>

                  <td>
                    <Form.Select onChange={(event) => handleIsActive(event, user.id)}>
                      <option value="active" selected={user.isActive}>Active</option>
                      <option value="inactive" selected={!user.isActive}>Inactive</option>
                    </Form.Select>
                  </td>
                </tr>
              )
            }

          </tbody>
        </Table>
      </div>
    </AdminLayout>
  );
}

export default UserList;
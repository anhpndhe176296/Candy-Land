import { useEffect, useState } from "react";
import { DropdownButton } from 'react-bootstrap'
import { Avatar } from 'antd'
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const AdminHeader = () => {
    const navigate = useNavigate();
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

    //Logout
    const handleLogout = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Do you want to logout?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancel",
            confirmButtonText: 'Log Out'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("user");
                    sessionStorage.removeItem("user");
                    navigate("/manage");
                }
            })
    }

    return (
        <div className="top-bar" style={{ position: "fixed" }}>
            <div className="current-user">
                <DropdownButton size="sm" title={<><Avatar>{currentUser ? currentUser.name.charAt(0) : ""}</Avatar> <span className="name">{currentUser? currentUser.name : ""}</span></>} >
                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownButton>
            </div>

        </div>
    );
}

export default AdminHeader;
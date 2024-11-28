import { Button, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const AdminLeftBar = () => {
  return (
    <div className="left-bar">
      <div className="bar-header">
        <Link to={"/dashboard"}>
          <Image
            src="../../../assets/images/lg.png"
            thumbnail={true}
            responsive={true}
          />
        </Link>
        <div>
          <Button
            className="btn btn-light"
            size="lg"
            style={{ backgroundColor: "#fff" }}
          >
            <ion-icon name="menu-outline"></ion-icon>
          </Button>
        </div>
      </div>
      <div className="bar-body">
        <div className="bar-content">
          <div className="header-content">BLOG MANAGER</div>
          <div className="body-content">
            <ul className="p-0">
              <li className="left-content">
                <NavLink
                  to={"/manager/admin"}
                  className={({ isActive }) =>
                    isActive
                      ? "active-admin text-decoration-none w-100 h-100 d-flex align-items-center"
                      : "text-decoration-none text-dark d-flex align-items-center"
                  }
                >
                  <ion-icon name="people-outline"></ion-icon>
                  <span>Manager List</span>
                </NavLink>
              </li>
              <li className="left-content">
                <NavLink
                  to={"/manager/add-new-blog-manager"}
                  className={({ isActive }) =>
                    isActive
                      ? "active-admin text-decoration-none w-100 h-100 d-flex align-items-center"
                      : "text-decoration-none text-dark d-flex align-items-center"
                  }
                >
                  <ion-icon name="person-add-outline"></ion-icon>
                  <span>Add new manager</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="bar-content">
          <div className="header-content">FEEDBACK</div>
          <div className="body-content">
            <ul className="p-0">
              <li className="left-content">
                <NavLink
                  to={"/manager/feedback"}
                  className={({ isActive }) =>
                    isActive
                      ? "active-admin text-decoration-none w-100 h-100 d-flex align-items-center"
                      : "text-decoration-none text-dark d-flex align-items-center"
                  }
                >
                  <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                  <span>Feedback</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeftBar;

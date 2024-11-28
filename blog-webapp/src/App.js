import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/screens/Home.js";
import DetailBlog from "./screens/DetailBlog";
import UserList from "./screens/UserList";
import ContactPage from "./screens/ContactPage";
import AboutPage from "./screens/AboutPage";
import AddNewBlogManager from "./screens/AddNewBlogManager";
import FeedbackList from "./screens/FeedbackList";
import Bloglist from "./screens/Bloglist";
import AddBlog from "./screens/AddBlog";
import Edit from "./screens/Edit";
import { createContext, useState } from "react";
import BlogListFE from "./screens/BlogListFE";
import ResetPassword from "./screens/ResetPassword";
import Search from "./screens/Search";
import AdminLogin from "./screens/AdminLogin";
import Page404 from "./screens/404";

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/blogs/detail/:pid" element={<DetailBlog />}></Route>
          <Route path="/filter/:cid" element={<BlogListFE />}></Route>
          <Route path="/manager/admin" element={<UserList />}></Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/manager/add-new-blog-manager"
            element={<AddNewBlogManager />}
          />
          <Route path="/manager/feedback" element={<FeedbackList />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/search/:search" element={<Search />} />
          <Route path="/manager" element={<AdminLogin />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/manager/bloglist" element={<Bloglist />} />
          <Route path="/manager/bloglist/addblog" element={<AddBlog />} />
          <Route path="/manager/bloglist/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    introduce: "",
    categoryId: "",
    content: "",
    author: "",
    time: "",
    feedbackId: "",
    difficulty: "",
    preparationTime: "",
    cookingTime: "",
    servingSize: "",
    tableOfContents: "",
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from the API
    fetch("http://localhost:9999/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:9999/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log(responseData); // Log the response data for debugging

      navigate("/manager/bloglist");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function MyUploadAdapter(loader) {
    this.loader = loader;
  }

  MyUploadAdapter.prototype.upload = function () {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result.split(",")[1];

        fetch("http://localhost:8888/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: base64,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((res) => {
            if (res.success) {
              resolve({
                default: res.url,
              });
            } else {
              reject(new Error(res.message || 'Upload failed'));
            }
          })
          .catch((err) => {
            reject(new Error(err.message || 'Network error'));
          });
      };

      this.loader.file.then((file) => {
        reader.readAsDataURL(file);
      });
    });
  }

  MyUploadAdapter.prototype.abort = function () {};

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }

  return (
    <Container>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Blog</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <label style={{ display: "block", marginBottom: "10px" }}>
          Title:
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Thumbnail:
          <CKEditor
            editor={ClassicEditor}
            data={formData.thumbnail}
            config={{
              extraPlugins: [MyCustomUploadAdapterPlugin],
            }}
            onChange={(event, editor) => handleChange("thumbnail", editor.getData())}
            required
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Introduction:
          <textarea
            value={formData.introduce}
            onChange={(e) => handleChange("introduce", e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "100px",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Category:
          <select
            value={formData.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Content:
          <CKEditor
            editor={ClassicEditor}
            data={formData.content}
            config={{
              extraPlugins: [MyCustomUploadAdapterPlugin],
            }}
            onChange={(event, editor) => handleChange("content", editor.getData())}
            required
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Author:
          <input
            type="text"
            value={formData.author}
            onChange={(e) => handleChange("author", e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Time:
          <input
            type="text"
            value={formData.time}
            onChange={(e) => handleChange("time", e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Difficulty:
          <input
            type="text"
            value={formData.difficulty}
            onChange={(e) => handleChange("difficulty", e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Preparation Time:
          <input
            type="text"
            value={formData.preparationTime}
            onChange={(e) => handleChange("preparationTime", e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Cooking Time:
          <input
            type="text"
            value={formData.cookingTime}
            onChange={(e) => handleChange("cookingTime", e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Serving Size:
          <input
            type="text"
            value={formData.servingSize}
            onChange={(e) => handleChange("servingSize", e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Table of Contents:
          <textarea
            value={formData.tableOfContents}
            onChange={(e) => handleChange("tableOfContents", e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "100px",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Blog
        </button>
      </form>
    </Container>
  );
};

export default AddBlog;

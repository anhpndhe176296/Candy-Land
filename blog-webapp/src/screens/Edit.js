import React, { useEffect, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

// Custom Upload Adapter
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

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    // Fetch categories from the API
    fetch("http://localhost:9999/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch blog data from the API
    fetch(`http://localhost:9999/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:9999/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      navigate("/manager/bloglist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={{ maxWidth: '900px', marginTop: '30px', marginBottom: '30px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem', color: '#333' }}>Edit Blog</h1>
      <Form onSubmit={handleSubmit} style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <Form.Group controlId="formTitle" style={{ marginBottom: '15px' }}>
          <Form.Label style={{ fontWeight: 'bold' }}>Title:</Form.Label>
          <Form.Control
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
            placeholder="Enter the blog title"
            style={{ padding: '10px', borderRadius: '5px', borderColor: '#ddd' }}
          />
        </Form.Group>
        <Form.Group controlId="formThumbnail" style={{ marginBottom: '15px' }}>
          <Form.Label style={{ fontWeight: 'bold' }}>Thumbnail:</Form.Label>
          <CKEditor
            editor={ClassicEditor}
            data={formData.thumbnail}
            config={{
              extraPlugins: [MyCustomUploadAdapterPlugin],
            }}
            onChange={(event, editor) => handleChange('thumbnail', editor.getData())}
            required
          />
        </Form.Group>
        <Form.Group controlId="formIntroduce" style={{ marginBottom: '15px' }}>
          <Form.Label style={{ fontWeight: 'bold' }}>Introduction:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={formData.introduce}
            onChange={(e) => handleChange('introduce', e.target.value)}
            required
            placeholder="Enter a brief introduction for the blog"
            style={{ padding: '10px', borderRadius: '5px', borderColor: '#ddd' }}
          />
        </Form.Group>
        <Form.Group controlId="formCategoryId" style={{ marginBottom: '15px' }}>
          <Form.Label style={{ fontWeight: 'bold' }}>Category:</Form.Label>
          <Form.Control
            as="select"
            value={formData.categoryId}
            onChange={(e) => handleChange('categoryId', e.target.value)}
            required
            style={{ borderRadius: '5px', borderColor: '#ddd' }}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formContent" style={{ marginBottom: '15px' }}>
          <Form.Label style={{ fontWeight: 'bold' }}>Content:</Form.Label>
          <CKEditor
            editor={ClassicEditor}
            data={formData.content}
            config={{
              extraPlugins: [MyCustomUploadAdapterPlugin],
            }}
            onChange={(event, editor) => handleChange('content', editor.getData())}
            required
          />
        </Form.Group>
        <Form.Group controlId="formAuthor" style={{ marginBottom: '15px' }}>
          <Form.Label style={{ fontWeight: 'bold' }}>Author:</Form.Label>
          <Form.Control
            type="text"
            value={formData.author}
            onChange={(e) => handleChange('author', e.target.value)}
            required
            placeholder="Enter the author's name"
            style={{ padding: '10px', borderRadius: '5px', borderColor: '#ddd' }}
          />
        </Form.Group>
        <Form.Group controlId="formTime" style={{ marginBottom: '15px' }}>
          <Form.Label style={{ fontWeight: 'bold' }}>Time:</Form.Label>
          <Form.Control
            type="text"
            value={formData.time}
            onChange={(e) => handleChange('time', e.target.value)}
            required
            placeholder="Enter the time required for the blog"
            style={{ padding: '10px', borderRadius: '5px', borderColor: '#ddd' }}
          />
        </Form.Group>
        <Form.Group controlId="formDifficulty" style={{ marginBottom: '15px' }}>
          <Form.Label style={{ fontWeight: 'bold' }}>Difficulty:</Form.Label>
          <Form.Control
            type="text"
            value={formData.difficulty}
            onChange={(e) => handleChange('difficulty', e.target.value)}
            required
            placeholder="Enter the difficulty level"
            style={{ padding: '10px', borderRadius: '5px', borderColor: '#ddd' }}
          />
        </Form.Group>
        <Form.Group controlId="formPreparationTime" style={{ marginBottom: '15px' }}>
          <Form.Label style={{ fontWeight: 'bold' }}>Preparation Time:</Form.Label>
          <Form.Control
            type="text"
            value={formData.preparationTime}
            onChange={(e) => handleChange('preparationTime', e.target.value)}
            required
            placeholder="Enter the preparation time"
            style={{ padding: '10px', borderRadius: '5px', borderColor: '#ddd' }}
          />
        </Form.Group>
        <Form.Group controlId="formCookingTime" style={{ marginBottom: '15px' }}>
          <Form.Label style={{ fontWeight: 'bold' }}>Cooking Time:</Form.Label>
          <Form.Control
            type="text"
            value={formData.cookingTime}
            onChange={(e) => handleChange('cookingTime', e.target.value)}
            required
            placeholder="Enter the cooking time"
            style={{ padding: '10px', borderRadius: '5px', borderColor: '#ddd' }}
          />
        </Form.Group>
        <Form.Group controlId="formServingSize" style={{ marginBottom: '15px' }}>
          <Form.Label style={{ fontWeight: 'bold' }}>Serving Size:</Form.Label>
          <Form.Control
            type="text"
            value={formData.servingSize}
            onChange={(e) => handleChange('servingSize', e.target.value)}
            required
            placeholder="Enter the serving size"
            style={{ padding: '10px', borderRadius: '5px', borderColor: '#ddd' }}
          />
        </Form.Group>
        <Form.Group controlId="formTableOfContents" style={{ marginBottom: '15px' }}>
          <Form.Label style={{ fontWeight: 'bold' }}>Table of Contents:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={formData.tableOfContents}
            onChange={(e) => handleChange('tableOfContents', e.target.value)}
            required
            placeholder="Enter the table of contents"
            style={{ padding: '10px', borderRadius: '5px', borderColor: '#ddd' }}
          />
        </Form.Group>
        <Button type="submit" variant="primary" style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', borderColor: '#007bff' }}>
          Update Blog
        </Button>
      </Form>
    </Container>
  );
};

export default Edit;

import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/blog/blogcreate.style.css'
import { useAuthContext } from '../../hooks/useAuthContext';
const CreateBlog = () => {
  const { user } = useAuthContext();
  const [blogData, setBlogData] = useState({
    title: '',
    duration: 0,
    description: '',
    images: [],
    content: '',
  });
  const [selectedImages, setSelectedImages] = useState([])

  console.log(blogData);

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        const imageData = fileReader.result
        setSelectedImages([...selectedImages, imageData])
        setBlogData({
          ...blogData,
          images: [...blogData.images, imageData],
        })

      }

      fileReader.readAsDataURL(files[0])
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming your server is running on http://localhost:3001
      const response = await fetch('/api/v1/blogs/create-blog', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(blogData)
      })
      const data = await response.json();

      console.log('Blog created successfully:', data);

      // Optionally, you can redirect the user to the created blog post page or do something else.
    } catch (error) {
      console.error('Error creating blog:', error.message);
      // Handle error state or show a user-friendly message
    }
  };

  return (
    <div className='container '>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={blogData.title} onChange={handleChange} required />

        <label>Duration:</label>
        <input type="number" name="duration" value={blogData.duration} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={blogData.description} onChange={handleChange} required />

        <label>Images (comma-separated URLs):</label>
        <input type="file" onChange={handleImageChange} accept="image/*" />

        {/* Display the selected images */}
        {selectedImages.map((image, index) => (
          <img key={index} src={image} alt={`Preview ${index + 1}`} className="image-preview" />
        ))}

        <label>Content:</label>
        <textarea name="content" value={blogData.content} onChange={handleChange} required />

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;



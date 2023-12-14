import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";
import "../../css/editRecipe.css";

const EditRecipe = () => {
  const id = useParams().id;
  console.log(id);
  const imageElm = useRef(null);
  const [loading, setLoading] = useState(true);
  //const [recipe, setRecipe] = useState({});
  const [images, setImages] = useState([]);
  //const [previousImage, setPreviousImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getDetailRecipe = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/recipe/${id}`);
        const blog = data.data;
        setTitle(blog.title);
        setDescription(blog.description);
        setContent(blog.content.join("\n"));
        setImages(blog.images);
        //setPreviousImage(recipe.img);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        console.log(error);
        // navigate("/");
      }
    };
    getDetailRecipe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("content", content);
    formdata.append("images", images);
    // formdata.append("previousImage", previousImage);

    try {
      const { data } = await axios.put(`/api/recipe/${id}/edit`, formdata);

      setSuccess("Edit Story successfully ");

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      setTimeout(() => {
        setError("");
      }, 4500);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="editRecipe-page ">
      <form onSubmit={handleSubmit} className="editRecipe-form">
        {error && <div className="error_msg">{error}</div>}
        {success && (
          <div className="success_msg">
            <span>{success}</span>
            {/* <Link to="/">Go home</Link> */}
          </div>
        )}

        <input
          type="text"
          required
          id="name"
          placeholder="Name"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <input
          type="text"
          required
          id="description"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <CKEditor
          editor={ClassicEditor}
          onChange={(e, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
          data={content}
        />

        <div className="currentImage">
          <div className="absolute">Current Image</div>
          <img src={images[0] ?? "/batman.png"} alt="ingredientsrecipeImage" />
        </div>
        <div className="RecipeImageField">
          <AiOutlineUpload />
          <div className="txt">
            {imageElm.current.value === null
              ? "    Change the image in your recipe "
              : imageElm.current.value.name}
          </div>
          <input
            name="image"
            type="file"
            ref={imageElm}
            onChange={(e) => {
              setImages([...images, e.target.files[0]]);
            }}
          />
        </div>

        <button type="submit" className="editStory-btn">
          Edit Story{" "}
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;

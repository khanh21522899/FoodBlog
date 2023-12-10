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
  const [image, setImage] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [methods, setMethods] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getDetailRecipe = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/recipe/${id}`);
        const recipe = data.data;
        setName(recipe.Name);
        setDescription(recipe.Description);
        setIngredients(recipe.Ingredients.join("\n"));
        setMethods(recipe.Method);
        setImage(recipe.img);
        setPreviousImage(recipe.img);
        setLoading(false);
      } catch (error) {
        console.log(error);
        // navigate("/");
      }
    };
    getDetailRecipe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("ingredients", ingredients);
    formdata.append("methods", methods);
    formdata.append("image", image);
    formdata.append("previousImage", previousImage);

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
          onChange={(e) => setName(e.target.value)}
          value={name}
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
            setMethods(data);
          }}
          data={ingredients}
        />

        <div className="currentImage">
          <div className="absolute">Current Image</div>
          <img src={`${previousImage}`} alt="ingredientsrecipeImage" />
        </div>
        <div className="RecipeImageField">
          <AiOutlineUpload />
          <div className="txt">
            {image === previousImage
              ? "    Change the image in your recipe "
              : image.name}
          </div>
          <input
            name="image"
            type="file"
            ref={imageElm}
            onChange={(e) => {
              setImage(e.target.files[0]);
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

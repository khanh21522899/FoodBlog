import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";
import "../../css/editRecipe.css";

const EditRecipe = () => {
  const id = useParams().id;
  const { user } = useAuthContext();
  const imageElm = useRef(null);
  const [loading, setLoading] = useState(true);
  const [newImageURLs, setNewImageURLs] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
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
        // , {
        //   headers: {
        //     "Content-type": "application/json",
        //     authorization: `Bearer ${user.token}`,
        //   },
        // });
        console.log(data);
        const blog = data.data;
        setTitle(blog.title);
        setDescription(blog.description);
        setContent(blog.content);
        setOldImages(blog.images);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        console.log("runtime error: ", error);
        navigate("/");
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
    oldImages.forEach((image, _) => {
      formdata.append("oldImages", image);
    });
    newImages.forEach((image, _) => {
      formdata.append("images", image);
    });

    try {
      const { data } = await axios.put(`/api/recipe/${id}/edit`);
      // , formdata, {
      //   headers: {
      //     "Content-type": "application/json",
      //     authorization: `Bearer ${user.token}`,
      //   },
      // });

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

  const onFileSelect = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] === "image") {
        setNewImageURLs((prevImageURLs) => [
          ...prevImageURLs,
          URL.createObjectURL(files[i]),
        ]);
        setNewImages((prevImages) => [...prevImages, files[i]]);
      }
    }
    console.log(newImages);
  };

  const deleteImage = (index) => {
    setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setNewImageURLs((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const deleteOldImage = (index) => {
    setOldImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="editRecipe-page ">
      <form
        onSubmit={handleSubmit}
        className="editRecipe-form"
        encType="multipart/form-data"
      >
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
        {(oldImages.length > 0 || newImageURLs.length > 0) && (
          <div className="w-full max-w-2xl mx-auto bg-[#f0f0f0] rounded-lg p-4 border border-gray-300 h-64 overflow-auto">
            <div className="mt-4 grid grid-cols-5 gap-2">
              {oldImages.map((image, index) => {
                return (
                  <div
                    className="mx-0 min-w-full flex flex-col items-center"
                    key={index}
                  >
                    <img
                      alt="Uploaded Image"
                      className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                      height="200"
                      src={"data:image/png;base64," + image}
                      width="200"
                    />
                    <button
                      type="button"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mt-2 mb-5"
                      onClick={() => deleteOldImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
              {newImageURLs.map((image, index) => {
                return (
                  <div
                    className="mx-0 min-w-full flex flex-col items-center"
                    key={index}
                  >
                    <img
                      alt="Uploaded Image"
                      className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                      height="200"
                      src={image}
                      width="200"
                    />
                    <button
                      type="button"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mt-2 mb-5"
                      onClick={() => deleteImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* {newImageURLs.length > 0 ?? (
          <div className="w-full max-w-2xl mx-auto bg-[#f0f0f0] rounded-lg p-4 border border-gray-300 h-64 overflow-auto">
            <div className="mt-4 grid grid-cols-5 gap-2">
              {newImageURLs.map((image, index) => {
                return (
                  <div
                    className="mx-0 min-w-full flex flex-col items-center"
                    key={index}
                  >
                    <img
                      alt="Uploaded Image"
                      className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                      height="200"
                      src={image}
                      width="200"
                    />
                    <button
                      type="button"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mt-2 mb-5"
                      onClick={() => deleteImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )} */}

        <div className="RecipeImageField">
          <AiOutlineUpload />
          <div className="txt">{"Change the image in your recipe "}</div>
          <input
            className="file"
            name="image"
            type="file"
            ref={imageElm}
            multiple
            onChange={onFileSelect}
          />
        </div>

        <button type="submit" className="editStory-btn">
          Update Blog{" "}
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;

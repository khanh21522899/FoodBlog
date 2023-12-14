import React, { useEffect, useState } from "react";
import "../styles/blog/blogdetail.style.css";
import { Form, useNavigate, useParams } from "react-router-dom";
import BlogReviews from "./BlogReview";
import { useAuthContext } from "../hooks/useAuthContext";
export default function BlogDetail() {
  const { blogId } = useParams();
  const [detail, setDetail] = useState(undefined);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const toEditPage = () => {
    navigate(`/recipe/${blogId}/edit`);
  }
  // Trang detail cua blog
  // Dung useParams de lay param tu Route (duoc khai bao trong /src/index.js) o day la :id
  // Fetch lai document cho id nay
  // set data cho bien detail
  //
  //
  const changeImage = (e) => {
    let offset = e.target.dataset.direction === "next" ? 1 : -1;
    let isInRange = currentImageIndex + offset >= 0 && currentImageIndex + offset < detail?.images?.length;
    if (!isInRange)
      return;
    setCurrentImageIndex(prev => prev + offset);
  }
  useEffect(() => {
    fetch(`/api/v1/blogs/${blogId}`)
      .then((resp) => resp.json())
      .then((data) => setDetail(data));
  }, []);

  if (detail) {
    return (
      <div className="blog-detail-container">
        <div className="blog-detail-hero-img">
          {detail?.images?.map((img, index) =>
            <img
              key={index}
              src={img}
              onError={(e) => {
                e.target.src = "/noimage.jpeg";
              }}
              alt="/batman.png"
              className={index === currentImageIndex ? 'active' : ''}
            />
          )}
          <div className="switches">
            <div onClick={e => changeImage(e)} data-direction="prev">&lt;</div>
            <div onClick={e => changeImage(e)} data-direction="next">&gt;</div>
          </div>
        </div>
        <div className="blog-detail">
          <div className="blog-detail-author">
            <img src={detail.author?.avatar} alt="" />
            <div className="author-name">By {detail.author?.name}</div>
            <div>
              {new Date(detail.createdDate).toString().substring(3, 15)}
            </div>

            {user?.id === detail?.author?._id && <button onClick={toEditPage}>Edit blog</button>}
          </div>

          <h1>{detail.title}</h1>

          <p>{detail.content}</p>
        </div>
        <BlogReviews />
      </div>
    );
  } else return <div>Loading</div>;
}

import React, { useEffect, useState } from "react";
import "../styles/blog/blogdetail.style.css";
import { Form, useParams } from "react-router-dom";
import BlogReviews from "./BlogReview";
export default function BlogDetail() {
  const { blogId } = useParams();
  const [detail, setDetail] = useState(undefined);

  // Trang detail cua blog
  // Dung useParams de lay param tu Route (duoc khai bao trong /src/index.js) o day la :id
  // Fetch lai document cho id nay
  // set data cho bien detail
  useEffect(() => {
    fetch(`/api/v1/blogs/${blogId}`)
      .then((resp) => resp.json())
      .then((data) => setDetail(data));
  }, []);

  if (detail) {
    // console.log(detail);
    return (
      <div className="blog-detail-container">
        <img
          src={detail.images?.length ? detail.images[0] : "/batman.png"}
          onError={(e) => {
            e.target.src = "/noimage.jpeg";
          }}
          alt="/batman.png"
        />
        <div className="blog-detail">
          <div className="blog-detail-author">
            <img src={detail.author?.image} alt="" />
            <div className="author-name">By {detail.author?.name}</div>
            <div>
              {new Date(detail.createdDate).toString().substring(3, 15)}
            </div>
          </div>

          <h1>{detail.title}</h1>

          <p>{detail.content}</p>
        </div>
        <BlogReviews />
      </div>
    );
  } else return <div>Loading</div>;
}

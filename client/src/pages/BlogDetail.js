import React, { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import "../styles/blog/blogdetail.style.css";
import Review from "../components/blog/review/review.component";
import axios from "axios";
import Rating from "../components/blog/review/Rating";
import Message from "../components/blog/review/Message";
import { Row, Col, ListGroup } from "react-bootstrap";

export default function BlogDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(undefined);
  const [reviews, setReviews] = useState([1, 2, 3]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    console.log(e.target.content.value);
    const dataAxios = axios.post("/api/v1/reviews", {
      content: e.target.content.value,
      rating: 0,
      blogId: id,
    });
    console.log(dataAxios.ok);

    // const fromData = new FormData(e.target);
    // console.log(fromData);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // createProductReview(match.params.id, {
    //   rating,
    //   comment,
    // })
  };

  // Trang detail cua blog
  // Dung useParams de lay param tu Route (duoc khai bao trong /src/index.js) o day la :id
  // Fetch lai document cho id nay
  // set data cho bien detail
  useEffect(() => {
    fetch(`/api/v1/blogs/${id}`)
      .then((resp) => resp.json())
      .then((data) => setDetail(data));
  }, []);

  if (detail) {
    console.log(detail);
    return (
      <div className="blog-detail-container">
        <img
          src={detail.images.length ? detail.images[0] : "/batman.png"}
          onError={(e) => {
            e.target.src = "/noimage.jpeg";
          }}
          alt="/batman.png"
        />
        <div className="blog-detail">
          <div className="blog-detail-author">
            <img src={detail.author.image} alt="" />
            <div className="author-name">By {detail.author.name}</div>
            <div>
              {new Date(detail.createdDate).toString().substring(3, 15)}
            </div>
          </div>

          <h1>{detail.title}</h1>

          <p>{detail.content}</p>
        </div>

        <div className="Review">
          <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your review</label>
              <textarea name="content" className="form-control" rows="3" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className="form-group"></div>

            <h2>Reviews</h2>
            {reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant="flush">
              {reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <form className="form" onSubmit={submitHandler}>
                  <div>
                    <h2>Write a customer review</h2>
                  </div>
                  <div>
                    <label htmlFor="rating">Rating</label>
                    <select
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="1">1- Bad</option>
                      <option value="2">2- Fair</option>
                      <option value="3">3- Good</option>
                      <option value="4">4- Very good</option>
                      <option value="5">5- Excelent</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>

                  <div>
                    <label />
                    <button className="primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </ListGroup.Item>
            </ListGroup>
          </Form>
          {reviews.map((review, index) => (
            <Review key={review} />
          ))}
        </div>
      </div>
    );
  } else return <div>Loading</div>;
}

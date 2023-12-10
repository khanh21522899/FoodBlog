import React, { useEffect, useState } from "react";
import Review from "../components/blog/review/review.component";
import Message from "../components/blog/review/Message";
import { ListGroup } from "react-bootstrap";
import { Form, useParams } from "react-router-dom";
import axios from "axios";

import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useAuthContext } from "../hooks/useAuthContext";

// const review = () => {
//   //logic

//   return;
//   //view
//   <div>hello</div>;
// };
// export default review;

export default function BlogReviews() {
  const { blogId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [data, setData] = useState(null);
  const [pages, setPages] = useState(1);
  const { user } = useAuthContext();
  // console.log(user);
  //   const { user, review, date } = data;
  //   setUser(user);
  //   setReviews(review);
  //   console.log(reviews);
  const fetchReview = () => {
    fetch(`/api/v1/reviews/${blogId}?pages=${pages}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReviews(data.reviews);
      });
  };
  useEffect(() => {
    fetchReview();
  }, [pages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target.comment.value);
    const dataAxios = await axios.post(`/api/v1/reviews/`, {
      content: e.target.comment.value,
      rating: e.target.rating.value,
      blogId: blogId,
      userId: user.id,
      date: new Date(),
    });
    console.log(dataAxios);
    fetchReview();

    // const fromData = new FormData(e.target);
    // console.log(fromData);
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    const dataAxios = await axios.delete(`/api/v1/reviews/${id}`);
    console.log(dataAxios, id);
    fetchReview();
  };

  if (reviews) {
    // console.log(data);
    return (
      <div>
        <div className="Review">
          <h2>Reviews</h2>
          {/* {reviews.length === 0 && <Message>No Reviews</Message>} */}
          <ListGroup variant="flush">
            <ListGroup.Item>
              <form className="form" onSubmit={handleSubmit}>
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
                  <button
                    className="primary"
                    type="submit"
                    // onClick={fetchReview}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </ListGroup.Item>
          </ListGroup>

          {reviews.map((review, index) => (
            <Review
              key={index}
              review={review}
              handleDelete={handleDelete}
              fetchReview={fetchReview}
            />
          ))}
          <button
            className="primary"
            type="submit"
            onClick={() => {
              setPages(pages + 1);
            }}
          >
            xem them
          </button>
        </div>
      </div>
    );
  }
}

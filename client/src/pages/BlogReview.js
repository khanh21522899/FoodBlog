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
    console.log(e.target.comment.value);
    const dataAxios = await axios.post(`/api/v1/reviews/`, {
      content: e.target.comment.value,
      rating: e.target.rating.value,
      blogId: blogId,
    });
    console.log(dataAxios);
    fetchReview();

    // const fromData = new FormData(e.target);
    // console.log(fromData);
  };

  if (reviews) {
    // console.log(data);
    return (
      <div>
        <div className="Review">
          <h2>Reviews</h2>
          {/* {reviews.length === 0 && <Message>No Reviews</Message>} */}
          <ListGroup variant="flush">
            {
              /* {reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                  
                ))} */
              <section className="vh-100">
                <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
                  <MDBRow className="justify-content-center">
                    <MDBCol md="11" lg="9" xl="7">
                      <div className="d-flex flex-start mb-4">
                        <img
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                          alt="avatar"
                          width="65"
                          height="65"
                        />

                        <MDBCard className="w-100">
                          <MDBCardBody className="p-4">
                            <div>
                              <MDBTypography tag="h5">Johny Cash</MDBTypography>
                              <p className="small">3 hours ago</p>
                              {/* <p>{comment}</p> */}

                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <a href="#!" className="link-muted me-2">
                                    <MDBIcon fas icon="thumbs-up me-1" />
                                    132
                                  </a>
                                  <a href="#!" className="link-muted">
                                    <MDBIcon fas icon="thumbs-down me-1" />
                                    15
                                  </a>
                                </div>
                                <a href="#!" className="link-muted">
                                  <MDBIcon fas icon="reply me-1" /> Reply
                                </a>
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      </div>

                      <div className="d-flex flex-start mb-4">
                        <img
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp"
                          alt="avatar"
                          width="65"
                          height="65"
                        />

                        <MDBCard className="w-100">
                          <MDBCardBody className="p-4">
                            <div>
                              <MDBTypography tag="h5">
                                Mindy Campbell
                              </MDBTypography>
                              <p className="small">5 hours ago</p>
                              <p>
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Delectus cumque doloribus
                                dolorum dolor repellat nemo animi at iure autem
                                fuga cupiditate architecto ut quam provident
                                neque, inventore nisi eos quas?
                              </p>

                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <a href="#!" className="link-muted me-2">
                                    <MDBIcon fas icon="thumbs-up me-1" />
                                    158
                                  </a>
                                  <a href="#!" className="link-muted">
                                    <MDBIcon fas icon="thumbs-down me-1" />
                                    13
                                  </a>
                                </div>
                                <a href="#!" className="link-muted">
                                  <MDBIcon fas icon="reply me-1" /> Reply
                                </a>
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </section>
            }
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
            <Review key={index} review={review} />
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

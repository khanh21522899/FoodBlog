import React, { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import "../styles/blog/blogdetail.style.css";
import Review from "../components/blog/review/review.component";
import axios from "axios";
import Message from "../components/blog/review/Message";
import { ListGroup } from "react-bootstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

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
          <h2>Reviews</h2>
          {reviews.length === 0 && <Message>No Reviews</Message>}
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
                              <p>
                                Cras sit amet nibh libero, in gravida nulla.
                                Nulla vel metus scelerisque ante sollicitudin.
                                Cras purus odio, vestibulum in vulputate at,
                                tempus viverra turpis. Fusce condimentum nunc ac
                                nisi vulputate fringilla. Donec lacinia congue
                                felis in faucibus ras purus odio, vestibulum in
                                vulputate at, tempus viverra turpis.
                              </p>

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
                  <button className="primary" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </ListGroup.Item>
          </ListGroup>

          {reviews.map((review, index) => (
            <Review key={review} />
          ))}
        </div>
      </div>
    );
  } else return <div>Loading</div>;
}

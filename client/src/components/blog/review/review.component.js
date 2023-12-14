import React, { useRef, useState } from "react";
import { MDBTypography } from "mdb-react-ui-kit";
import axios from "axios";
import Rating from "./Rating";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function Review(prop) {
  // console.log(prop);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(prop.review?.content);
  const [rating, setRating] = useState(prop.review?.rating);
  const { user } = useAuthContext();

  const editor = async (e) => {
    e.preventDefault();
    // console.log(e.target.comment.value);
    const dataAxios = await axios.put(`/api/v1/reviews/${prop.review?._id}`, {
      content: comment,
      date: new Date(),
      rating: rating,
    }, { headers: { "Content-Type": "application/json", "authorization": `Bearer ${user.token}` } });
    console.log(dataAxios);
    prop.fetchReview();
    setEditing(false);
  };
  return (
    <div>
      <img
        className="rounded-circle shadow-1-strong me-3"
        src={prop.review?.userId?.avatar}
        alt="avatar"
        width="65"
        height="65"
      />
      <MDBTypography tag="h5">{prop.review?.userId?.name}</MDBTypography>
      <p className="small">
        Date: {prop.review?.date?.toString().substr(0, 10)}
      </p>
      {!editing ? (
        <p>Review: {prop.review?.content}</p>
      ) : (
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      )}
      {editing && (
        <>
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
        </>
      )}
      <Rating value={prop.review?.rating} />

      {user?.id === prop.review?.userId?._id && (
        <div>
          {editing ? (
            <button
              className="primary"
              type="submit"
              style={{
                backgroundColor: "Orange",
              }}
              onClick={editor}
            >
              Accept
            </button>
          ) : (
            <button
              className="primary"
              type="submit"
              style={{
                backgroundColor: "purple",
              }}
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          )}

          <button
            className="primary"
            type="submit"
            style={{
              backgroundColor: "red",
            }}
            onClick={(e) => {
              console.log(prop.review);
              prop.handleDelete(e, prop.review?._id);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

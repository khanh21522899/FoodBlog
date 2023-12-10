import React from "react";
import { MDBTypography } from "mdb-react-ui-kit";
export default function Review(prop) {
  // console.log(prop);
  return (
    <div>
      <MDBTypography tag="h5">Johny Cash</MDBTypography>
      <p className="small">3 hours ago</p>
      <p>{prop.review?.content}</p>
      <p>{prop.review?.rating}</p>
    </div>
  );
}

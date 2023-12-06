import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../styles/blog/blogdetail.style.css"

export default function BlogDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(undefined);

  // Trang detail cua blog 
  // Dung useParams de lay param tu Route (duoc khai bao trong /src/index.js) o day la :id
  // Fetch lai document cho id nay 
  // set data cho bien detail
  useEffect(() => {
    fetch(`/api/v1/blogs/${id}`).then(resp => resp.json()).then(data => setDetail(data));
  }, [])

  console.log(detail)

  if (detail)
    return <div className="blog-detail-container">

      <img src={detail.images.length ? detail.images[0] : '/batman.png'} onError={e => {
        e.target.src = '/noimage.jpeg'
      }} alt="/batman.png" />
      <div className="blog-detail">

        <div className="blog-detail-author">
          <img src={detail.author?.image} alt="" />
          <div className="author-name">By {detail.author?.name}</div>
          <div>{(new Date(detail.createdDate)).toString().substring(3, 15)}</div>
        </div>

        <h1>{detail.title}</h1>

        <p>{detail.content}</p>
      </div>

    </div >
  else
    return <div>Loading</div>
}

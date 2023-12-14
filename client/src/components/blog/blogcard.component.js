import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/blog/blogcard.style.css"
import { useNavigate, Link } from 'react-router-dom'

const BlogCard = ({ data }) => {
  const { user } = useAuthContext();
  const { title, createdDate, duration, description, content, _id, images, author } = data;
  // Em dung useNavigate o day thay cho useHistory o ban cu~ - Co the sua lai de su dung useHistory
  const navigate = useNavigate();

  const moveToPost = () => {
    navigate(`/blogs/${_id}`)
  }
  const handleEdit = () => {
    navigate(`/recipe/${_id}/edit`)
  }

  if (!data.length)
    return (
      <div>
        <div className="blogcard">
          <div className="blogcard-img" onClick={moveToPost}>
            <img src={images[0] ?? "/batman.png"} alt="/batman.png" onError={e => {
              e.target.src = '/noimage.jpeg'
            }} />
          </div>
          <div className="blogcard-content">
            <div className="blogcard-content-title" onClick={moveToPost}>{title}</div>
            <div className="blogcard-content-time">{(new Date(createdDate)).toString().substring(3, 15)} * {duration} mins read</div>
            <p className="blogcard-content-desc">{description.length <= 380 ? description : description.slice(0, 230) + '...'} <Link to={`/blogs/${_id}`} style={{ pointerEvents: "auto", cursor: "pointer" }} >See more</Link></p>
          </div>

          <div className="blogcard-author">
            <img className="blogcard-author-img" src={author?.avatar} alt="" />
            <div className="blogcard-author-info">
              <div style={{ color: "gray", fontSize: "0.9rem", fontStyle: "italic", fontWeight: "bold" }}>Author</div>
              <div>{author?.name}</div>

            </div>
          </div>

        </div>
        <div className="mngBtn">
          {author?._id === user?.id && <button onClick={handleEdit}>Edit</button>}
          {author?._id === user?.id && <button>Delete</button>}
        </div>
      </div>
    )
  else
    return <div>Loading</div>
}

export default BlogCard;

import { useEffect, useState } from "react";
import BlogCard from "./blogcard.component";
import "../../styles/blog/blog.style.css"
import Pagination from "./pagination.component";

const Blog = () => {
  const [{ blogs, totalCount }, setBlogs] = useState({
    blogs: undefined,
    totalCount: 0
  });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);



  useEffect(() => {
    /* Fetch blog data here */
    async function fetchBlogs() {
      let resp = await fetch(`api/v1/blogs?page=${page}`);
      let data = await resp.json();
      setBlogs({
        blogs: data.blogs,
        totalCount: data.totalDocCount
      });
      setPages([...Array(Math.floor(totalCount / 12) + 1 + (totalCount % 12 !== 0 ? 1 : 0)).keys()].slice(1))
    }

    fetchBlogs();

  }, [page, totalCount])

  return (
    <div className="blogs-layout">
      {/* Cac blog */}
      <div className="blogs">
        {
          blogs ? blogs.map((blog, index) => <BlogCard key={index} data={blog} />) : "Loading"
        }
      </div>

      {/* Component phan trang */}
      <Pagination currentPage={{ page, setPage }} pages={pages} />


      {/* Cac blog lien quan */}
      <div className="blogs-related">
        <div className="blogs-related-content">
          <div className="featured-blogs">
            <h2>Featured blogs</h2>
            <div>
              <h3>Blog 1</h3>
              <p>This is blog 1</p>
            </div>
            <div>
              <h3>Blog 2</h3>
              <p>This is blog 2</p>
            </div>
            <div>
              <h3>Blog 3</h3>
              <p>This is blog 3</p>
            </div>
          </div>


          <div className="similar-blogs">
            <h2>Similar blogs</h2>
            <div>
              <h3>Blog 1</h3>
              <p>This is blog 1</p>
            </div>
            <div>
              <h3>Blog 2</h3>
              <p>This is blog 2</p>
            </div>
            <div>
              <h3>Blog 3</h3>
              <p>This is blog 3</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Blog;

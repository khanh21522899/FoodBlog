import { useEffect, useState } from "react";
import BlogCard from "./blogcard.component";
import "../../styles/blog/blog.style.css"
import Pagination from "./pagination.component";

const pagesShown = 5;

const Blog = () => {
  const [{ blogs, totalCount }, setBlogs] = useState({
    blogs: undefined,
    totalCount: 0
  });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );


  useEffect(() => {
    /* Fetch blog data here */
    async function fetchBlogs() {
      let resp = await fetch(`api/v1/blogs?page=${page}`);
      let data = await resp.json();
      setBlogs({
        blogs: data.blogs,
        totalCount: data.totalDocCount
      });

      //Tong so trang || Moi trang 12 documents || Co the fix 12 thanh so khac chia het cho 2 de show document deu` || Co the them query cho url la limit = 12 v.v
      const totalPages = Math.floor(totalCount / 12) + (totalCount % 12 !== 0 ? 1 : 0);


      // So trang nhieu hon so can show. Vi du 6 trang nhung can show 5 trang mot lan
      if (totalPages > pagesShown) {
        // Khoang giua cua pagesShown = 5 la 3, 3 cach trang cuoi 2 trang, cach trang dau 2 trang =>  Math.floor(5 / 2) == 2 == offset
        let offset = Math.floor(pagesShown / 2);

        // Trang hien tai (page) van co' offset hop le
        if (page - offset > 0 && page + offset <= totalPages) {
          setPages([page - 2, page - 1, page, page + 1, page + 2]);
        } else {
          // Trang hien tai nam o gan` cuoi'
          if (page + offset >= totalPages)
            setPages(arrayRange(totalPages - pagesShown + 1, totalPages, 1))
          else if (page - offset < 0) // Trang hien tai nam` o~ dau`
            setPages(arrayRange(1, pagesShown, 1))
        }
      }
      else { //So trang it hon so trang minh can show. Vi du can show 5 trang mot lan`, nhung documents chi du~ cho 2 trang
        setPages(arrayRange(1, totalPages, 1))

      }
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

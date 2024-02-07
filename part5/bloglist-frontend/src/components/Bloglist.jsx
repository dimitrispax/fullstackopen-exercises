import Blog from '../components/Blog'

const Bloglist = ({Blogs, UpdateBlog, RemoveBlog}) => {
  return (
    <div>
      {Blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={UpdateBlog}
          removeBlog={RemoveBlog}
        />
      ))}
    </div>
  )
}

export default Bloglist

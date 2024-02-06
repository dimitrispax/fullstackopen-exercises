import Blog from '../components/Blog'

const Bloglist = ({ Blogs, UpdateBlog }) => {

    return (
        <div>
            {
                Blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} updateBlog={UpdateBlog} />
                )
            }
        </div >
    )
}

export default Bloglist
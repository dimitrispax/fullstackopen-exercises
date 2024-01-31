import Blog from '../components/Blog'

const Bloglist = ({ Blogs }) => {

    return (
        <div>
            <h2>Blogs</h2>
            {Blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default Bloglist
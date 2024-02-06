import Blog from '../components/Blog'

const Bloglist = ({ Blogs, User }) => {


    return (
        <div>
            {
                Blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} user={User} />
                )
            }
        </div >
    )
}

export default Bloglist
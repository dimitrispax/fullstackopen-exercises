import Blog from '../components/Blog'

const Bloglist = ({ Blogs}) => {


    return (
        <div>
            {
                Blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )
            }
        </div >
    )
}

export default Bloglist
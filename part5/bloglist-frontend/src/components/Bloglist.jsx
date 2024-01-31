import Blog from '../components/Blog'

const Bloglist = ({ Blogs, User, LogoutUser }) => {


    return (
        <div>
            <h2>Blogs</h2>
            <div style={{ display: 'inline-flex', height: 30, alignItems: 'center' }}>
                <p style={{ marginRight: 5 }}>{User.name} is logged in</p>
                <button onClick={LogoutUser}>Log out</button>
            </div>
            {
                Blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )
            }
        </div >
    )
}

export default Bloglist
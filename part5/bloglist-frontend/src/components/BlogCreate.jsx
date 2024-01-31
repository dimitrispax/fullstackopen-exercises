const BlogCreate = ({ CreateBlog, Title, Author, Url, HandleTitleChange, HandleAuthorChange, HandleUrlChange }) => {

    return (
        <div>
            <h2>Create a Blog</h2>
            <form onSubmit={CreateBlog}>
                <div>
                    title: <input value={Title} onChange={HandleTitleChange} />
                </div>
                <div>
                    author: <input value={Author} onChange={HandleAuthorChange} />
                </div>
                <div>
                    url: <input value={Url} onChange={HandleUrlChange} />
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default BlogCreate
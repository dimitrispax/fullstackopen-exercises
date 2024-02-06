import { useState } from 'react'


const BlogCreationForm = ({ CreateBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = (event) => {
        event.preventDefault()
        CreateBlog({
            title,
            author,
            url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create a Blog</h2>
            <form onSubmit={createBlog}>
                <div>
                    title: <input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    author: <input value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    url: <input value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default BlogCreationForm
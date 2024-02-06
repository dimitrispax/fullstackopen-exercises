import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {

  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center'
  }
  const inlineButtonStyle = {
    height: 25,
    display: 'flex',
    alignItems: 'center'
  }
  const buttonStyle = {
    marginLeft: 5
  }

  const updateLike = (event) => {
    event.preventDefault()

    updateBlog({
      user: blog.user[0].id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)
  }

  return (
    (!visible) ?
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button style={buttonStyle} onClick={() => setVisible(!visible)}>Show Details</button>
      </div >
      :
      <div style={blogStyle}>
        <div style={inlineButtonStyle}>
          <p>{blog.title} {blog.author}</p>
          <button style={buttonStyle} onClick={() => setVisible(!visible)}>Hide Details</button>
        </div>
        <a href={blog.url}>{blog.url}</a>
        <div style={inlineButtonStyle}>
          <p>likes: {blog.likes}</p>
          <button style={buttonStyle} onClick={updateLike}>Like Blog</button>
        </div>
        <p>{blog.user[0] !== null && blog.user[0].name}</p>
      </div >

  )
}

export default Blog
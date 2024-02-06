import { useState } from 'react'

const Blog = ({ blog, user }) => {

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
        <p>{blog.url}</p>
        <div style={inlineButtonStyle}>
          <p>likes: {blog.likes}</p>
          <button style={buttonStyle} onClick={() => console.log("You liked the post: ", blog.title)}>Like Blog</button>
        </div>
        <p>{user.name}</p>
      </div >

  )
}

export default Blog
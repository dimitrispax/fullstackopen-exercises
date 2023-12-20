const dummy = (blogs) => {
    const test = blogs;
    return 1;   
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((totalLikes, blog) => totalLikes += blog.likes, 0)
  }

  const favouriteBlog = (blogs) => {
    if (blogs.length > 0) {
        const maxObject = blogs.reduce((max, blog) => {
            return max.likes > blog.likes ? max : blog  
        })
        return {
            title : maxObject.title, 
            author: maxObject.author, 
            likes: maxObject.likes
        }
    }
    else {
        return null;
    }
    
  }

  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }
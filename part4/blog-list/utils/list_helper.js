const dummy = (blogs) => {
    const test = blogs;
    return 1;   
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((totalLikes, blog) => totalLikes += blog.likes, 0)
  }

  
  module.exports = {
    dummy,
    totalLikes
  }
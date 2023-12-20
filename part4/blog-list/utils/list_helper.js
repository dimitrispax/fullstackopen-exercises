const _ = require('lodash');

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

  const mostBlogs = (blogs) => {
    if (blogs.length > 0) {
      /* Reform the list, to show every blog of each author */
      const blogsGroupedByAuthor = _.groupBy(blogs, 'author'); 
      /* Calculating the author that has the most blogs */
      const topAuthor =  Object.keys(blogsGroupedByAuthor).reduce( (maxAuthor, author) => {
        return blogsGroupedByAuthor[maxAuthor].length > blogsGroupedByAuthor[author].length ? maxAuthor : author
      }) 
      return {
        author: topAuthor,
        blogs: blogsGroupedByAuthor[topAuthor].length,
      }
    } else {
      return null;
    }
  } 
  const mostLikes = (blogs) => {
    if (blogs.length > 0) {
      /* Reform the list, to show every blog of each author */
      const blogsGroupedByAuthor = _.groupBy(blogs, 'author'); 
      /* Calculating the object that has the most total likes */
        const mostLikesObject = Object.keys(blogsGroupedByAuthor).reduce((max, author) => {
          const likesPerAuthor = blogsGroupedByAuthor[author].reduce((likes, blog) =>  likes + blog.likes, 0)
          return max.likes > likesPerAuthor ? max : {author, likes: likesPerAuthor}
        }, {author: '', likes: -1})
      return {author: mostLikesObject.author, likes: mostLikesObject.likes}
    } else {
      return null;
    }
  } 

  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
  }
const Blog = require('../models/blog')

const initialBlogs = [{ // Initialized a blog list with 2 blogs.
        "title": "DevBlog",
        "author": "Dimitrios Paximadakis",
        "url": "https://devblog.gr",
        "likes": 33,
        "id": "6582c5d046a932b60f1d6467"
    },
    {
        "title": "MechBlog",
        "author": "Alexandros Paximadakis",
        "url": "https://mechblog.gr",
        "likes": 22,
        "id": "6582c874a9daf339544603a3"
    }
]

module.exports = {
    initialNotes
}
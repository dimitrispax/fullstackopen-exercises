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
},
{
    "title": "TestBlog",
    "author": "Vlakas Vlakeiou",
    "url": "https://testblog.gr",
    "likes": 1,
    "id": "65abd6aab205440f800f81bb"
}
]

const initialUsers = [
    {
        "username": "dimpax",
        "name": "Dimitrios Paximadakis",
        "blogs": [],
        "id": "65afc3460fcd76412da38067"
    },
    {
        "username": "alexpax",
        "name": "Alexandros Paximadakis",
        "blogs": [],
        "id": "65afdb398751d1fa75695c8a"
    },
    {
        "username": "koutras69",
        "name": "Nikolaos Koutrakis",
        "blogs": [],
        "id": "65afdb688751d1fa75695c8e"
    }
]

module.exports = {
    initialBlogs,
    initialUsers
}
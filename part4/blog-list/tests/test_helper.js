const initialBlogs = [
    {
        "title": "Dev Blog",
        "author": "Dim Pax",
        "url": "https://devblog.gr",
        "likes": 13,
        "user": [
            "65b3d3aaf2dd40669e196248"
        ],
        "id": "65b3d5963f3dc8d272abfc3b"
    },
    {
        "title": "Mech Blog",
        "author": "Alex Pax",
        "url": "https://mechblog.gr",
        "likes": 14,
        "user": [
            "65b3d3bdf2dd40669e19624c"
        ],
        "id": "65b3d6203f3dc8d272abfc4f"
    },
    {
        "title": "HMMY Blog",
        "author": "Peter Pax",
        "url": "https://hmmyblog.gr",
        "likes": 15,
        "user": [
            "65b3d40ff2dd40669e196250"
        ],
        "id": "65b3d6b13f3dc8d272abfc56"
    }
]

const initialUsers = [
    {
        "username": "dimpax",
        "name": "Dim Pax",
        "id": "65b3d3aaf2dd40669e196248"
    },
    {
        "username": "alexpax",
        "name": "AlexPax",
        "id": "65b3d3bdf2dd40669e19624c"
    },
    {
        "username": "petrolikos",
        "name": "Peter Pax",
        "id": "65b3d40ff2dd40669e196250"
    }
]

const tokenOfAuthorizedUser = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBldHJvbGlrb3MiLCJpZCI6IjY1YjNkNDBmZjJkZDQwNjY5ZTE5NjI1MCIsImlhdCI6MTcwNjI4NDY4OX0.d01X6SG8EdY3YvEbiqDggmGoQlxGEnYLdGY90_UPQiY'
const tokenOfUnauthorizedUser = 'Bearer eychbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXhwYXgiLCJpZCI6IjY1YjNkM2JkZjJkZDQwNjY5ZTE5NjI0YyIsImlhdCI6MTcwNjI4NzA2OH0.r_ekAAgyP7gWGP4onvM0D37FQJ1q4TKYIIWlsQDeKz4'

module.exports = {
    initialBlogs,
    initialUsers,
    tokenOfAuthorizedUser,
    tokenOfUnauthorizedUser
}
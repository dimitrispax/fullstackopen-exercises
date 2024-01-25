const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

//////////////////////
////////READ/////////
////////////////////
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(user)
})

//////////////////////
///////CREATE////////
////////////////////
usersRouter.post('/', async (request, response) => {

    const { username, password, name } = request.body

    /* Validation Check */
    if (!username || !password)
        response.status(400).json({ error: "username or password must be defined undefined." })
    else if (username.length < 3 || password.length < 3)
        response.status(400).json({ error: "username or password must have more than 3 characters length." })
    else {
        const saltRounds = 10
        const encryptedPassword = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            'password': encryptedPassword,
            name
        })

        const result = await user.save()
        response.status(201).json(result)

    }
})

module.exports = usersRouter
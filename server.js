const express = require('express')
const postsRouter = require('./routes/posts')
const {authRouter} = require('./authUser')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use('/', postsRouter)
app.use('/auth', authRouter)

app.listen(process.env.PORT || 3000)


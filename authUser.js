const jwt = require('jsonwebtoken')
const express = require('express')
const authRouter = express.Router()
require('dotenv').config()

authRouter.post('/', (req, res) =>{
    try{
        const usernamme = req.body.name
        const user = {name : usernamme}
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({accessToken : accessToken})
    }
    catch(ex){
        res.status(400).json({error : ex})
    }
})
   
function userCheck(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader &&  authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if (err) return res.status(401).send('Unauthorized')

        req.user = user
        next()
    })
}

function userRoleAuth(role){
    return(req, res, next) => {
        if(!role.includes(req.user.role)){
            res.status(401)
            return res.send('Not authorized')
        }
        next()
    }
}

module.exports = {
    userCheck,
    userRoleAuth,
    authRouter
}
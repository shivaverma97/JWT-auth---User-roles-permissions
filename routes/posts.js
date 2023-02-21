const express = require('express')
const router = express.Router()
let {Posts, ROLE, Users} = require('../models/data')
const {userCheck, userRoleAuth} = require('../authUser')

router.get('/home', userCheck, setUser, (req, res) => {
    try{    
        res.status(200).json({Message : "Welcome to home page"})
    }
    catch(ex){
        res.status(400).json({error : ex})
    }
})

router.get('/Post/:id', userCheck, setUser, (req, res) => {
    try{
        const post = Posts.find(post => post.id == req.params.id)
        res.status(200).json({ post : post})
    }
    catch(ex){
        res.status(400).json({error : ex})
    }
})

router.get('/Posts', userCheck, setUser, (req, res) => {
    try{
        let posts

        if(req.user.role == ROLE.ADMIN){
            posts = Posts
        }
        else{
            posts = Posts.filter(post => post.user == req.user.user)
        }

        if(!posts){
            return res.status(404).send('No posts exists for this user!!')
        }
        return res.status(200).json({ posts : posts})
    }
    catch(ex){
        res.status(400).json({error : ex})
    }
})

router.get('/admin', userCheck, setUser, userRoleAuth([ROLE.ADMIN]), (req, res) => {
    res.send('welcome to admin page')
})

router.delete('/post/:id', userCheck, setUser, (req, res) => {
    try{
        const post = Posts.find(post => post.id == req.params.id)
        if(post == null){
            return res.status(404).json({Message : "Post does not exist"})
        }

        if(req.user.role == ROLE.ADMIN || req.user.user == post.user){
            post_id = parseInt(req.params.id)
            Posts = Posts.filter(post => post.id !== post_id)
            return res.status(200).json({ updatedArray : Posts})
        }

        return res.status(401).json({Message : "Unauthorized"})
    }
    catch(ex){
        res.status(400).json({error : ex})
    }
})

function setUser(req, res, next){
    const user = Users.find(user => user.user == req.body.user)
    if(!user){
        return res.status(401).send('Account does not exist. Please sign up!!')
    }
    req.user = user
    next()
}

module.exports = router
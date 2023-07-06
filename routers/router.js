const express = require('express')
const router = express()
const Controller = require('../controllers/controller')
const UserController = require('../controllers/UserController')

router.get('/register', UserController.registerForm)
router.post('/register', UserController.registerFormPost)
router.get('/login', UserController.loginForm)
router.post('/login', UserController.loginFormPost)
router.get('/logout', UserController.logoutGet)

router.use(function (req, res, next) {
    if(!req.session.userId) {
        const error = 'You must login first!'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})

router.get('/home', (req, res) => {
    res.render('home')
})

module.exports = router
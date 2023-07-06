const express = require('express')
const router = express()
const Controller = require('../controllers/controller')
const UserController = require('../controllers/UserController')

router.get('/', (req, res) => {
   res.render('landingPage') 
})

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


router.get('/home', Controller.showHome)
router.get('/homeadmin', Controller.showHomeAdmin)
router.get('/cart', Controller.showCart)
router.get('/stock', Controller.showStock)

module.exports = router
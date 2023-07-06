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
router.get('/cart', Controller.showCart)
router.get('/stock', Controller.showStock)


router.use(function (req, res, next) {
    if(req.session.role !== "admin") {
        const error = 'You must be an Admin to view this page!'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})

router.get('/homeadmin', Controller.showHomeAdmin)
router.get('/homeadmin/viewuser', Controller.showHomeDummy)
router.get('/edit/:id', Controller.editProduct)
router.post('/edit/:id', Controller.editProductPost)
router.get('/delete/:id', Controller.deleteProduct)


module.exports = router
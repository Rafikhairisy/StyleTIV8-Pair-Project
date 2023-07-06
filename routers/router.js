const express = require('express')
const router = express()
const Controller = require('../controllers/controller')
const UserController = require('../controllers/UserController')

router.get('/register', UserController.registerForm)
router.post('/register', UserController.registerFormPost)
router.get('/login', UserController.loginForm)
router.get('/home', UserController.showHome)


module.exports = router
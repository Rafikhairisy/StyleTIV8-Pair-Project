const { User } = require('../models')
const bcrypt = require('bcryptjs')

class UserController {

    static registerForm(req, res) {
        res.render('register')
    }

    static registerFormPost(req, res) {
        const { username, password, role } = req.body
        console.log(req.body);

        User.create({ username, password: password, role })
            .then(newUser => {
                res.redirect('./login')
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static loginForm(req, res) {
        const { error } = req.query
        res.render('login', { error })
    }

    static loginFormPost(req, res) {
        const { username, password } = req.body

        User.findOne({ where: { username } })
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)
                    
                    if (isValidPassword) {
                        req.session.userId = user.id
                        req.session.role = user.role
                        if(req.session.role === "admin") {
                            return res.redirect('/homeadmin')
                        } else {
                            return res.redirect('/home')
                        }
                    } else {
                        const error = "Invalid password or username"
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = "Invalid username"
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch(err => {
                res.send(err)
                console.log(err);
            })
    }

    static logoutGet(req, res) {
        req.session.destroy((err) => {
            if(err) res.send(err);
            else{
                res.redirect('/login')
            }
        })
    }
}

module.exports = UserController
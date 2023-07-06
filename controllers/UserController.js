const { User } = require('../models')

class UserController {

    static registerForm(req, res ) {
        res.render('register')
    }
    
    static registerFormPost(req, res) {
        const { username, password, role } = req.body
        console.log(req.body);

        User.create({username, password: password, role})
        .then(newUser => {
            res.redirect('./login')
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }

    static loginForm(req, res) {
        res.render('login')
    }

}

module.exports = UserController
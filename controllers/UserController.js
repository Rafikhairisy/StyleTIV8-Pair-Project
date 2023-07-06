const { User, Product, Category } = require('../models')
const formatRupiah = require('../helpers/formatRupiah')

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

    static showHome(req, res){
        Product.findAll({
            include: Category
        })
        .then((dataProduct)=>{
            console.log(dataProduct);
            res.render('home', {dataProduct})
        })
        .catch((err)=>{
            res.send(err)
        })
    }

}

module.exports = UserController
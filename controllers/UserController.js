const { User, Product, Category } = require('../models')
const formatRupiah = require('../helpers/formatRupiah')

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
        res.render('login')
    }

    static showHome(req, res) {
        const result = {}

        Product.findAll()
            .then((dataProduct) => {
                // res.send(dataProduct)
                dataProduct.forEach((el) => {
                    result.price = formatRupiah(el.price)
                })
                return dataProduct
            })
            .then((dataProduct) => {
                result.dataProduct = dataProduct
                res.render('homeuser', result)
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static showHomeAdmin(req, res) {
        const result = {}

        Product.findAll()
            .then((dataProduct) => {
                // res.send(dataProduct)
                dataProduct.forEach((el) => {
                    result.price = formatRupiah(el.price)
                })
                return dataProduct
            })
            .then((dataProduct) => {
                result.dataProduct = dataProduct
                res.render('homeadmin', result)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static showCart(req, res){
        res.render('cart')
    }
    static showStock(req, res){
        Product.findAll()
        .then((dataProduct)=>{
            res.render('stock', {dataProduct})
        })
        .catch((err)=>{
            res.send(err)
        })
    }

}

module.exports = UserController
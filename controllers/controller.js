const { User, Product, Category } = require('../models')
const formatRupiah = require('../helpers/helper')

class Controller {
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

module.exports = Controller
const { User, Product, Category, UserProfile } = require('../models')
const Helper = require('../helpers/helper')
const { Op } = require('sequelize')

class Controller {
    static showHome(req, res) {
        const { searchProduct } = req.query;
        const id = req.session.userId
        let option = {};
    
        if (searchProduct) {
            option = {
                productName: { [Op.iLike]: `%${searchProduct}%` },
            }
        }
    
        Product.findAll({where: option})
            .then((dataProduct) => {
                res.render('homeuser', { dataProduct, Helper, id })
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static showHomeDummy(req, res) {
        const { searchProduct } = req.query;
        let option = {};
    
        if (searchProduct) {
            option = {
                productName: { [Op.iLike]: `%${searchProduct}%` },
            }
        }
    
        Product.findAll({where: option})
            .then((dataProduct) => {
                res.render('viewAsUser', { dataProduct, Helper })
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static showHomeAdmin(req, res) {
        const { searchProduct } = req.query;
        let option = {};
    
        if (searchProduct) {
            option = {
                productName: { [Op.iLike]: `%${searchProduct}%` },
            }
        }

        Product.findAll({where: option})
            .then((dataProduct) => {
                res.render('homeadmin', { dataProduct, Helper })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static showCart(req, res) {
        res.render('cart')
    }

    static showStock(req, res) {
        Product.findAll()
            .then((dataProduct) => {
                res.render('stock', { dataProduct })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static addProduct (req, res) {
        res.render('addItems')
    }

    static addProductPost(req, res) {
        const { productName, image, description, price, stock, CategoryId } = req.body;
      
        Product.create({
          productName,
          image,
          description,
          price,
          stock,
          CategoryId
        })
          .then(() => {
            res.redirect('/homeadmin');
          })
          .catch(error => {
            console.log(error);
            res.send(error);
          });
      }

      static addProfile(req, res) {
        const { id } = req.params;
        User.findByPk(id, {
          include: UserProfile
        })
          .then((user) => {
            const profile = user ? user.UserProfile : null
            res.render('profile', { profile, user })
          })
          .catch((err) => {
            res.send(err);
          });
      }
      

      static addProfilePost(req, res) {
        const { id } = req.params;
        const { firstName, lastName, phoneNumber, address, email, paymentMethod } = req.body;
      
        UserProfile.create({
          firstName,
          lastName,
          phoneNumber,
          address,
          email,
          paymentMethod,
          UserId: id
        })
          .then(() => {
            res.redirect('/home');
          })
          .catch((error) => {
            console.log(error);
            res.send(error);
          });
      }
      
      
      
    static editProduct(req, res) {
        const { id } = req.params
        Product.findByPk(id, {
            include: {
                model: Category,
                foreignKey: 'CategoryId'
            }
        })
            .then((item) => {
                res.render('editItems', { item })
            })
            .catch(err => res.send(err))
    }

    static editProductPost(req, res) {
        const { id } = req.params
        const { productName, image, description, price, stock, CategoryId } = req.body;
        Product.update(
            {
                productName,
                image,
                description,
                price,
                stock,
                CategoryId
            },
            {
                where: {
                    id
                }
            }
        )
            .then(() => {
                res.redirect('/homeadmin');
            })
            .catch(error => {
                console.log(error);
                res.send(error)
            })
    }


    static deleteProduct(req, res) {
        const { id } = req.params
        Product.destroy({
            where: {
                id
            }
        })
            .then(() => {
                res.redirect('/homeadmin')
            })
            .catch(error => {
                console.log(error);
                res.send(error)
            });
    }
}

module.exports = Controller
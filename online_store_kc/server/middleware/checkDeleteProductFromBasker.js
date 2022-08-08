const {Basket, BasketProducts} = require('./../models/models');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const {id} = req.params;
        const user = req.user;
        const userBasket = await Basket.findOne({where: {userId: user.id}});
        const productItem = await BasketProducts.findOne({where: {basketId: userBasket.id, productId: id}});

        if(productItem) {
            return next();
        }
        return res.json("Товар не найден в корзине пользователя");
    } catch (e) {
        res.json(e);
    }
};
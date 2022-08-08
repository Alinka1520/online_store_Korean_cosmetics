const {ProductRating, Product} = require('./../models/models');

const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const {productId} = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const checkRating = await ProductRating.findOne({where: {productId, userId: user.id}});
        const checkProducts =  await Product.findOne({where: {id: productId}});

        if (!checkProducts) {
            return res.json("Товара не существует в БД");
        } else if(checkRating && checkProducts) {
            return res.json("Вы оставили оценку для данного продукта");
        }
        return next();
    } catch (e) {
        return res.status(401).json("Ошибка in checkAddRatingMiddleware.js");
    }
};
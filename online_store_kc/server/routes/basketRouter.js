const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authorizationMiddleware = require("../middleware/authorizationMiddleware")
const checkDeleteProductFromBasket = require("../middleware/checkDeleteProductFromBasker");

router
    .post('/', authorizationMiddleware, basketController.addProduct)
    .get('/', authorizationMiddleware, basketController.getProducts)
    .delete('/:id', authorizationMiddleware, checkDeleteProductFromBasket, basketController.deleteProduct);

module.exports = router;
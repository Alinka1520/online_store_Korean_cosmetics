const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')
const authorizationMiddleware = require("../middleware/authorizationMiddleware")
const checkAddRatingMiddleware = require("../middleware/checkAddRatingMiddleware");

router
    .post('/', authorizationMiddleware, checkAddRatingMiddleware, ratingController.addRating)
    .post('/check-rating', authorizationMiddleware, ratingController.checkRating);

module.exports = router;
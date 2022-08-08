const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authorizationMiddleware = require('../middleware/authorizationMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/authorization', authorizationMiddleware, userController.check)


module.exports = router
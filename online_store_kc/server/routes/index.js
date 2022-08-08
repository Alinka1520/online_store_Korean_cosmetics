const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const basketRouter = require('./basketRouter');
const ratingRouter = require('./ratingRouter');
const ordersRouter = require('./ordersRouter');
const mainRouter = require('./mainRouter');
const deliveryRouter = require('./deliveryRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/product', productRouter)
router.use('/basket', basketRouter)
router.use('/rating', ratingRouter)
router.use('/orders', ordersRouter)
//router.use('/main', mainRouter)
//router.use('/delivery', deliveryRouter);

module.exports = router
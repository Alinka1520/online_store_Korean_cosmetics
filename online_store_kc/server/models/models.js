const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue:"USER"},
})

const UserInfo = sequelize.define('user_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    surname: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    middle_name: {type: DataTypes.STRING, allowNull: false},
    birth_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketProducts = sequelize.define('basket_products', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const ProductType = sequelize.define('product_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const ProductBrand = sequelize.define('product_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const ProductRating = sequelize.define('product_rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    complete: {type: DataTypes.BOOLEAN, defaultValue: false},
    mobile: {type: DataTypes.STRING(25), allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: true},
})

const OrderProduct = sequelize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productId: {type: DataTypes.INTEGER, allowNull: false},
    orderId: {type: DataTypes.INTEGER, allowNull: false},
    count: {type: DataTypes.INTEGER, allowNull: false},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(UserInfo, {as: 'user_info'});
UserInfo.belongsTo(User)

User.hasMany(ProductRating)
ProductRating.belongsTo(User)

User.hasMany(Orders)
Orders.belongsTo(User,
    {
        foreignKey: { name: 'userId' },
        onDelete: 'CASCADE',
    }
)

Orders.hasMany(OrderProduct)
OrderProduct.belongsTo(Orders,
    {
        foreignKey: { name: 'orderId' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
)

Basket.hasMany(BasketProducts)
BasketProducts.belongsTo(Basket)

ProductType.hasMany(Product)
Product.belongsTo(ProductType)

ProductBrand.hasMany(Product)
Product.belongsTo(ProductBrand)

Product.hasMany(ProductRating)
ProductRating.belongsTo(Product)

Product.hasMany(BasketProducts)
BasketProducts.belongsTo(Product)

Product.hasMany(ProductInfo, {as: 'product_info'});
ProductInfo.belongsTo(Product)

ProductType.belongsToMany(ProductBrand, {through: TypeBrand })
ProductBrand.belongsToMany(ProductType, {through: TypeBrand })

module.exports = {
    User,
    UserInfo,
    Basket,
    BasketProducts,
    Product,
    ProductType,
    ProductBrand,
    ProductRating,
    TypeBrand,
    ProductInfo,
    Orders,
    OrderProduct
}
const { Op } = require("sequelize");
const uuid = require('uuid')
const path = require('path');
const {Product, ProductInfo, ProductBrand, ProductType, BasketProducts, OrderProduct} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductController {
    async create(req, res, next) {
        try{
            let {name, price, productBrandId, productTypeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({name, price, productBrandId, productTypeId, img: fileName})
            if(info){
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }

            return res.json(product)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res, next) {
        try {
            let {productBrandId, productTypeId, limit, page} = req.query
            page = page || 1
            limit = limit || 6
            let offset = page * limit - limit
            let products;
            if (!productBrandId && !productTypeId) {
                products = await Product.findAndCountAll({
                    include: [{model: ProductBrand}, {model: ProductType},],
                    limit, offset
                })
            }
            if (productBrandId && !productTypeId) {
                products = await Product.findAndCountAll({
                    where: {productBrandId},
                    include: [{model: ProductBrand}, {model: ProductType},],
                    limit, offset
                })
            }
            if (!productBrandId && productTypeId) {
                products = await Product.findAndCountAll({
                    where: {productTypeId},
                    include: [{model: ProductBrand}, {model: ProductType},],
                    limit, offset
                })
            }
            if (productBrandId && productTypeId) {
                products = await Product.findAndCountAll({
                    where: {productTypeId, productBrandId},
                    include: [{model: ProductBrand}, {model: ProductType},],
                    limit, offset
                })
            }
            return res.json(products)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    //Получение товара по имени
    async getSearchAllDeviceByName(req, res, next) {
        try {
            let {limit, page, name, filter} = req.query;

            page = page || 1;
            limit = limit || 6;
            let offset = page * limit - limit
            if(filter === "All") {
                const devices =  await Product.findAndCountAll({
                    attributes: ["name", "price", "img", "id"],
                    where: {name: {[Op.like]: `%${name}%`}},
                    include: [{attributes: ["name"], model: ProductBrand}, {attributes: ["name"], model: ProductType},],
                    limit,
                    offset,
                })

                return res.json(devices);
            } else {
                const devices =  await Product.findAndCountAll({
                    attributes: ["name", "price", "img", "id", "productBrandId", "productTypeId"],
                    where: {name: {[Op.like]: `%${name}%`}, [Op.or]: [
                                {
                                    productBrandId: null,
                                },
                                {
                                    productTypeId: null,
                                },
                            ],
                        },
                    include: [{attributes: ["name"], model: ProductBrand}, {attributes: ["name"], model: ProductType},],
                    limit,
                    offset,
                })

                return res.json(devices);
            }
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    //получение id определенного товара
    async getOne(req, res, next) {
        try {
            const {id} = req.params
            let product = await Product.findOne({where:{id}, include:[{model: ProductInfo, as: 'product_info'}, {model: ProductType}, {model: ProductBrand},]})
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Product.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Product.destroy({where:{id}}).then(() => {
                            return res.json("Товар удален");
                        })
                    } else {
                        return res.json("Этот товар отсутствует в БД");
                    }

                    await OrderProduct.destroy({where:{productId: id}})
                    await BasketProducts.destroy({where:{productId: id}})
                })
        } catch (e) {
            return res.json(e);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {productBrandId, productTypeId, name, price, product_info} = req.body;

            await Product.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        let newVal = {};
                        productBrandId ? newVal.brandId = productBrandId : false;
                        productTypeId ? newVal.typeId = productTypeId : false;
                        name ? newVal.name = name : false;
                        price ? newVal.price = price : false;

                        if(req.files) {
                            const {img} = req.files;
                            const type = img.mimetype.split('/')[1];
                            let fileName = uuid.v4() + `.${type}`;
                            img.mv(path.resolve(__dirname, '..', 'static', fileName));
                            newVal.img = fileName;
                        }

                        if(product_info) {
                            const parseInfo = JSON.parse(product_info);
                            for (const item of parseInfo) {
                                await ProductInfo.findOne({where:{id: item.id}}).then( async data => {
                                    if(data) {
                                        await ProductInfo.update({
                                            title: item.title,
                                            description: item.description
                                        }, {where:{id: item.id}})
                                    } else {
                                        await ProductInfo.create({
                                            title: item.title,
                                            description: item.description,
                                            productId: id
                                        })
                                    }
                                })
                            }
                        }

                        await Product.update({
                            ...newVal
                        }, {where:{id}} ).then(() => {
                            return res.json("Товар обновлен");
                        })
                    } else {
                        return res.json("Этот товар отсутствует в БД");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
    
}
module.exports = new ProductController()
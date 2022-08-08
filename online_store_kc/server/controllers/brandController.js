const {ProductBrand} = require('../models/models')

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await ProductBrand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await ProductBrand.findAll()
        return res.json(brands)
    }

    async delete(req, res) {
        try {
            const {id} = req.params;

            await ProductBrand.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await ProductBrand.destroy({where:{id}}).then(() => {
                            return res.json("Брэнд удален");
                        })
                    } else {
                        return res.json("Этот брэнд отсутствует в БД");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}
module.exports = new BrandController()
const {ProductType} = require('../models/models')
//const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await ProductType.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await ProductType.findAll()
        return res.json(types)
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await ProductType.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await ProductType.destroy({where:{id}}).then(() => {
                            return res.json("Тип удален");
                        })
                    } else {
                        return res.json("Этот тип отсутствует в БД");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}
module.exports = new TypeController()
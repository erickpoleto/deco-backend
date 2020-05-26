
const Category = require('../models/Category')

module.exports = {
    async create(req, res){
        const {type ,name} = req.body
        try{
            const category = await Category.create({type, name});
            return res.status(200).send(category);
        }catch(e){
            return res.json(e);
        }
    },

    async index(req, res){
        try{
            const category = await Category.find({});
            return res.json(category)
        }catch(e){
            return res.json(e);
        }
    },
    async deleteCategory(req, res) {
        const category = await Category.deleteMany();
        return res.json(structCategory, category);
    }
}
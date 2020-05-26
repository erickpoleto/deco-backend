const mongoose = require('mongoose')

const Product = require('../models/Product')
const Image = require('../models/Image')

module.exports = {

    async create(req, res) {

        const {name, category, largura, altura, preco, desc, imageId} = req.body

        try{    
            const product = await Product.create({name:name, category:category, largura:largura,
            altura:altura, preco:preco, desc:desc,
            imageId: imageId});
            return res.json(product)

        }catch(e){
            return res.send({error: e})
        }
    },
    
    async productUpdate(req,res) {
        const {id} = req.params
        const {imageId} = req.body;
       try{
            const product = await Product.findByIdAndUpdate(id, {$set:{imageId: imageId}});
            return res.send(product);
        }catch(e){
            return res.status(400).send(e)
        }
    },

    async indexSearch(req, res){
        const {category, search, page} = req.query
        const {sortOrd} = req.body
        const regex = new RegExp(search, "i", "^\d$")
        const catreg = new RegExp(category, "i")
        try{
            const product = await Product.paginate({$or:[{category:catreg, name:regex}]}, {sort: {preco: sortOrd}, populate:['imageId'], page:page, limit: 12});
            return res.json(product)
        }catch(e){
            return res.json({error: e})
        }
           
    },

    async indexProduct(req, res){
        const {id} = req.params
        try{
            const product = await Product.findById(id).populate(['imageId', "commentsId"]);
            return res.json(product)    
        }catch(e){
            return res.json({error: e})
        }
    },

    async indexRecent(req, res){
        try{
            const product = await Product.find({})
                                         .sort({createdAt: 1})
                                         .populate(["imageId"])
                                         .limit(10)
            return res.json(product);

        }catch(e){
            return res.json(e)
        }
    },
    async deleteById(req, res){
        const {id} = req.params
        try{
            const product = await Product.findByIdAndRemove({id});
            product.save();
            return res.send()
        }catch(e){
            return res.json(e);
        }
    },
    async delete(req, res) {
        try{
            const product = await Product.deleteMany({})
            return res.json(product)
        }catch(e){
            return res.json(e)
        }
    }
}
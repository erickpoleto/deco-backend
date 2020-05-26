
const Comments = require('../models/Comments')
const Product = require('../models/Product')

module.exports = {
    async create(req, res){
        const {username, email, comment, picture, productId} = req.body;
        try{
            if((await Comments.find({email:email, productId:productId})).length > 10){
                return res.status(405).send({error: "limite de 10 comentarios"})
            }
            const comments = await Comments.create({username, email, comment, picture, productId});
            const products = await Product.findById(productId);
            products.commentsId.push(comments._id)
            await products.save()
            return res.status(200).send({done:"everything up to date"})
        }catch(e){
            return res.json(e)
        }
    },
    async index(req, res){
        const {id} = req.params
        const {page} = req.query
        try{
            const comment = await Comments.paginate({productId: id},{sort:{createAt:-1},page:page, limit:12})
            return res.json(comment)
        }catch(e){
            return res.json(e)
        }
    },
    async delete(req, res){
        const {id} = req.params;
        try{
            const comment = await Comments.findById(id);
            await comment.remove()
            return res.status(200).send('deleted')

        }catch(e){
            return res.status(400).send({error: e})
        }
    }
}
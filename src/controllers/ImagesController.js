const Image = require('../models/Image')

module.exports = {
    async create(req, res) {
        const {id} = req.body
        const {originalname: imgName, size, key, location: url = ""} = req.file;
        try{    
            const image = await Image.create({imgName, size, key, url});
            return res.send({image})
        }catch(e){
            return res.send({error: e})
        }
    },
    async index(req, res) {
        const image = await Image.find({})
        return res.send(image)
    },
    async deleteById(req, res) {
        
        const {id} = req.body
        try{
            const image = await Image.findByIdAndRemove(id)
            await image.save()
            return res.send(image)
        }catch(e){
            return res.send(e)
        }
    },
    async delete(req, res) {
        const image = await Image.deleteMany({})
        return res.send(image)
    }
}
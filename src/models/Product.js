const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },

    category: {
        type: String,
        required: true,
    },

    largura: {
        type: Number,
    },
    altura: {
        type: Number,
    },
    preco: {
        type: Number,
    },
    desc: {
        type: String
    },
    imageId:[
        {   
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
            require: true
        }
    ],
    commentsId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

ProductSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Product', ProductSchema);
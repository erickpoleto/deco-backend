const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const CommentsSchema = new mongoose.Schema({
    
    username: {
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    picture:{
        type: String
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }

})

CommentsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Comments', CommentsSchema);
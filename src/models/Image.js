const mongoose = require('mongoose')
const aws = require('aws-sdk')
const s3 = new aws.S3();
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const ImageSchema = new mongoose.Schema({
    
    name:{
        type:String,
    },
    size: {
       type: Number,
    },
    key: {
        type: String,
    },
    url:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

ImageSchema.pre('save', async function(){
    if(!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`
    }
})

ImageSchema.pre('remove', function() {
    if (process.env.STORAGE_TYPE === 's3'){
        return s3.deleteObject({
            Bucket: 'imageerick',
            Key: this.key,
        }).promise()
    }else {
        return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key))
    }
})

module.exports = mongoose.model('Image', ImageSchema); 
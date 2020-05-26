const mongoose = require("mongoose");

const User = require("../models/User");
const Token = require("../modules/token")
const crypto = require('crypto');

module.exports = {
    async create(req, res) {
        const { email } = req.body
        try{
            if(await User.findOne({"email":email})){
                return res.status(400).send({error: "email already in use"})
            }
            const user = await User.create(req.body);
            user.password = undefined
            
            const token = crypto.randomBytes(20).toString('hex');
            await User.findByIdAndUpdate(user.id, {$set: {
                confirmToken: token,
            }})
            
            return res.send({user, token: Token.token({id: user.id})});
        }catch(e){
            console.info(e)
            return res.status(400).send({error: "registration failed"});
        }
    },
    async index(req, res) {
        const user = await User.find();
        return res.json(user)
    },
    async delete(req, res) {
        const user = await User.deleteMany();
        return res.json(user)
    }
}
const mailer = require("../modules/mailer")

module.exports = {
    async create(req, res){
        const {type, email, products, name, cpf, ddd, number, cep, msg} = req.body
        try{
            if(type === 'consult'){
                await mailer.sendMail({
                    to: "erick-poleto@hotmail.com",
                    from: email,
                    subject: type,
                    template: '/content',
                    context: {name, cpf, ddd, 
                        prod: products.map(prod=>{ 
                            return (
                                " { "+
                                "id: " + prod.product._id + ", " +
                                "nome: " +prod.product.name + ", " +
                                "link: localhost:3000/product/"+ prod.product._id + "," +
                                "quantidade" + prod.quant + 
                                " } "  
                                )
                        }), 
                        number, cep, msg, email}
                }, err =>{
                    if(err){
                        console.info(err)
                        return res.json({error: "cannot send email"})
                    }
                    return res.json();
                })
            }else{
                await mailer.sendMail({
                    to: "erick-poleto@hotmail.com",
                    from: email,
                    subject: type,
                    template: '/contact',
                    context: {name, ddd, number, msg, email}
                }, err =>{
                    if(err){
                        console.info(err)
                        return res.json({error: "cannot send email"})
                    }
                    return res.json();
                })
            }
        }catch(e){
            console.info(e)
            res.json({error: "error, try again"})
        }
    }
}
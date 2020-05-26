const express = require('express');

const userController = require('./controllers/UserController');
const sessionController = require('./controllers/SessionController');
const productController = require('./controllers/productController');
const imagesController = require('./controllers/ImagesController');
const mailController = require('./controllers/MailController')
const categoryController = require('./controllers/CategoryController');
const commentsController = require('./controllers/CommentsController');


const routes = express.Router()
const multer = require('multer');
const multerConfig = require('./config/multer')

const authMiddleware = require("./middlewares/auth")
//user
routes.post('/register', userController.create);
routes.get('/index', userController.index);
routes.delete('/delete', userController.delete);
//session
routes.post('/session', sessionController.create);

//product
routes.post('/newproduct', authMiddleware, productController.create)
routes.put('/productupdate/:id', authMiddleware, productController.productUpdate)
routes.get('/products', productController.indexSearch)
routes.get('/recentproducts', productController.indexRecent)
routes.get('/product/:id', productController.indexProduct)
routes.delete('/deleteproduct', authMiddleware, productController.delete)
routes.delete('/deleteproductbyid/:id', authMiddleware, productController.deleteById)

//createImages
routes.post('/createimages',multer(multerConfig).single('file'), authMiddleware, imagesController.create);
routes.get('/indeximages', imagesController.index);
routes.delete('/deleteimages', imagesController.deleteById);
routes.delete('/deleteAll', imagesController.delete);

//category
routes.post('/newcategory', authMiddleware, categoryController.create)
routes.get('/indexcategory', categoryController.index)
routes.delete('/deletecategory', categoryController.deleteCategory)

//comments

routes.post('/newcomment', commentsController.create)
routes.get('/indexcomment/:id', commentsController.index)
routes.delete('/deletecomment/:id', commentsController.delete)

//mails

routes.post('/mails', mailController.create)

module.exports = (routes);
const Product= require('../models/data')

module.exports = (app) =>{
    app.get('/api/products/:id' , (req , res,next) =>{
       
        
        const product = req.params.id;
        Product.findById({_id :product})
       .then(product => res.status(200).send(product))
        .catch(next)
 
    });
    app.get('/api/getproducts/:id' , (req , res,next) =>{
       
        
        const product = req.params.id;
        Product.find({_id :product})
       .then(product => res.status(200).send(product))
        .catch(next)
 
    });
    app.get('/api/products' , (req , res,next) =>{
        const limit =parseInt(req.query.limit) || ''
        Product.find({}).limit(limit)
        .then(products => res.status(200).send(products))
        .catch(next)
 
    });
// sort by rate 
    app.get('/api/productsrate' , (req , res,next) =>{
        Product.find({}).sort({rating: -1}).limit(6)
      .then(products => res.status(200).send(products))
      .catch(next)
       
    });

    // sort by discount
    app.get('/api/productsdiscount' , (req , res,next) =>{
        Product.find({}).sort({discount: -1}).limit(6)
        .then(products => res.status(200).send(products))
        .catch(next)
       
    });
    
      



}
const Model = require('../models/jumiaItem_model');
const GETmodel = require('../models/GET_model');
const Product = require('../models/data');



//contain all business logic
module.exports = {
 
  GetPageProducts(req, res, next){
    const PageLimit = 16;

///GET///http://localhost:443/search/category?filter=20-5000&sort=a&page=0
    const page = parseInt(req.query.page) || 0
    const sort = req.query.sort || 'c'
    const filter = req.query.filter || false
    const category = req.query.category || false

    var key = {price:-1};

    var fMax;
    var fMin;


    if (sort == 'a') {
      key = {price:-1}
    }else if (sort == 'd') {
      key = {price:1}
    }else if (sort == 'c') {
      key = {rating:-1}
    }else{
      key = {rating:-1}
    }

    if (category) 
    {
      if (filter) {
        var filArr = filter.split('-');
        fMin = filArr[0];
        fMax = filArr[1];
  
  
        Model.find({$and: [{price: {$gte:fMin}}, {price:{$lte:fMax}}, {category:category}]}).sort(key).limit(PageLimit).skip(PageLimit * page)
        .then(prods => {
          //console.log(clients.length);


          //custom output////////////////
          var output = [];
          for (let i = 0; i < prods.length; i++) {
            output.push({name:prods[i].name, FinalPrice:prods[i].price - prods[i].discount})
          }
          ////////////////////////////////

            
            
            res.status(200).send(prods)
          })
          .catch(next)
      }
      else
      {
        
  
        
      Model.find({category:category}).sort(key).limit(PageLimit).skip(PageLimit * page)
      .then(clients => {



        console.log(clients.length);
        var output = [];
        for (let i = 0; i < clients.length; i++) {
          output.push({name:clients[i].name, FinalPrice:clients[i].price - clients[i].discount})
        }
        //  while (page == 999) {
          //    var x = 5;
          //  }
          //console.log(clients);
          
          
          res.status(200).send(clients)
        })
        .catch(next)
        
      }
      
    } 
    else
    {
      if (filter) {
        var filArr = filter.split('-');
        fMin = filArr[0];
        fMax = filArr[1];
  
  
        Model.find({$and: [{price: {$gte:fMin}}, {price:{$lte:fMax}}]}).sort(key).limit(PageLimit).skip(PageLimit * page)
        .then(clients => {
          console.log(clients.length);
          var output = [];
          for (let i = 0; i < clients.length; i++) {
            output.push({name:clients[i].name, FinalPrice:clients[i].price - clients[i].discount})
          }
          //  while (page == 999) {
            //    var x = 5;
            //  }
            //console.log(clients);
            
            
            res.status(200).send(clients)
          })
          .catch(next)
      }
      else
      {
        
  
        
      Model.find({}).sort(key).limit(PageLimit).skip(PageLimit * page)
      .then(clients => {

    

        var output = [];
        for (let i = 0; i < clients.length; i++) {
          output.push({name:clients[i].name, FinalPrice:clients[i].price - clients[i].discount})
        }
        //  while (page == 999) {
          //    var x = 5;
          //  }
          //console.log(clients);


          res.status(200).send(clients)
          
          
        })
        .catch(next)
        
      }

    }



  },

  GetAllProducts(req, res, next){

    Model.find({}).sort({rating:-1})
    .then(clients => {res.status(200).send(clients)})
    .catch(next)
  },

  GetProductsCount(req, res, next){
    Model.countDocuments({})
    .then(c => res.status(201).send({count:c}))
    .catch(next)
  },

  GetAllOrders(req, res, next){

    GETmodel.O.find({})
    .then(clients => {res.status(200).send(clients)})
    .catch(next)
  },
  GetOrdersCount(req, res, next){
    GETmodel.O.countDocuments({})
    .then(c => res.status(201).send({count:c}))
    .catch(next)
  },

  GetAllUsers(req, res, next){

    GETmodel.U.find({})
    .then(clients => {res.status(200).send(clients)})
    .catch(next)
  },
  GetUsersCount(req, res, next){
    GETmodel.U.countDocuments({})
    .then(c => res.status(201).send({count:c}))
    .catch(next)
  },

  create(req, res, next){
    
    const productData = req.body;
    // sample:-
    // {
    //   "name":"testcreate 2",
    //   "description":"Modern Home presents this 'desk with quality menamineleised board prod...",
    //   "max_qty":300,
    //   "img":["img1"],
    //   "url_item":"link",
    //   "price":2200,
    //   "discount":63,
    //   "seller_name":"zzzz",
    //   "category":"Home & Office",
    //   "brand":"Modern Home | Similar products from Modern Home",
    //   "rating":4.5,
    //   "numReviews":918,
    //   "countInStock":10
    //   }
    
    Model.create(productData)
      .then(product =>
        res.status(201).send(product)) // 201 to user
      .catch(next) // if error send to next middle ware


  },
  //6038fde26b27a82fb056f9ae
  edit(req, res, next){
    const ProductId = req.query.id;
    const productData = req.body;
    console.log(req.body)
    console.log(req.query.id)
    // get user and update
    Model.findByIdAndUpdate({_id: ProductId}, productData)
    // if success get user after updated
    .then(() => Model.findById({_id: ProductId}))
    // //if you get user send it
    .then(product => 
      {
        if (product) {
          res.status(200).send({Process:"done",product})
          
        } else {
          res.status(404).send('Product not found')
        }
      }
        )
    // //else send to middle
    .catch(next);
  },


UpdateProduct(req,res){
Product.updateOne({_id:req.query.id},{...req.body}).then((data)=>{
res.json(data);
}).catch((err)=>{
console.log(err)
res.status(404).json({message:' no update'})

})
},


  delete(req, res, next){
    const ProductId = req.query.id;
    Model.findByIdAndRemove({_id: ProductId})
    // in case is removed return 204 abject?
      .then(() => res.status(204).send('done'))
      .catch(next);
  }








};

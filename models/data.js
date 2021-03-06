const mongoose = require('mongoose');



const Schema = mongoose.Schema;
const ProductSchema = new Schema({

    
        
         name:{
             type:String,
            // required:true
         },
         description:{
            type:String,
           // required:true
        },
        max_qty:{
            type:String,
        },
        image:{
            type:String,
           //required:true
        },
        url_item:{
            type:String,
        },
        price:{
            type:Number,
           // required:true
        },
        discount:{
            type:Number,
            //required:true
        },
        seller_name:{
            type:String,
        },
        category:{
            type:String,
            //required:true
        },
       
        brand:{
            type:String,
          //  required:true
        },
        rating:{
            type:Number,
           // required:true
        },
        numReviews:{
            type:Number,
            //required:true
        },
        countInStock:{
            type:Number,
           // required:true

        }
        
        
    
    
  });
  

  const Product= mongoose.model('item' , ProductSchema ,'item')
  module.exports = Product ; 
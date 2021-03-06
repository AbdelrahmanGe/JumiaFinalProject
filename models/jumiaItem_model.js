const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nameAR: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  descriptionAR: {
    type: String,
    required: true
  },
  max_qty: {
    type: Number,
   default:1,
  },
  img: {
    type: Array,
    required: true
  },
  url_item: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  seller_name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    default: ""
  },
  sold: {
    type: Number,
    default: 0
  }
  ,
  rating: {
    type: Number,
    default: 0
  }
  ,
  numReviews: {
    type: Number,
    default: 0
  }
});


const C = mongoose.model('client', itemSchema,'item');


module.exports = C;

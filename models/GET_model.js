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
    required: true
  },
  img: {
    type: Array,
    required: true
  },
  url_item: {
    type: String,
    required: true
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
});


const P = mongoose.model('products', itemSchema,'item');
const O = mongoose.model('orders', itemSchema,'orders');
const U = mongoose.model('users', itemSchema,'users');



module.exports = {P,O,U};

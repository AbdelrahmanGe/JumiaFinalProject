const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const reviewSchema = new Schema({
   
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true
    },
    rate: {
        type: Number,
        default: 1
    },
    textReview: {
        type: String,
        required: true
    },
});

const review = mongoose.model('feedback', reviewSchema, 'feedback')
module.exports = review; 
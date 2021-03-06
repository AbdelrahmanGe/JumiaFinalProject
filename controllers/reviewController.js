const review = require('../models/review');
const Prod = require('../models/data');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
//contain all business logic
module.exports = {
    all(req, res, next) {
        const productId = req.params.id;
        review.find({ itemId: productId })
            .then(reviews => res.status(200).send(reviews))
            .catch(next)
    },
    firstthree(req, res, next) {
      const productId = req.params.id;
      review.find({ itemId: productId }).limit(3)
          .then(reviews => res.status(200).send(reviews))
          .catch(next)
  },
    create (req, res, next) {
        const ReviewProps = req.body;
         review.create(ReviewProps)
        .then(review =>
            res.status(201).send(review))
        .catch(next); // if error send to next middle ware

        // const obj= 
        review.aggregate(
            [
                { $match: { itemId:ObjectId(req.body.itemId)} },
                { $group: { _id: "$itemId", num: { $sum: 1 } } }
            ],
        function(error, totalCountt) { if(error) throw error;
          else {
              var www=totalCountt[0];
// res.send(www.num+"      "+www._id);
// res.send("xxxxxx")
              Prod.findByIdAndUpdate({_id: www._id},{ numReviews: www.num+1 }, function(err, res) {
                     if (err) throw err;
                     console.log('1 document inserted');         
              });
          }
      }); 

      review.aggregate(
        [
            { $match: { itemId:ObjectId(req.body.itemId)} },
            { $group: { _id: "$itemId", averageRate: { $avg: "$rate" } } }
        ],
    function(error, avera) { if(error) throw error;
      else {
          var av=avera[0];
          // res.send(av)
// res.send(av.averageRate+"      "+av._id);
// res.send("xxxxxx")
          Prod.findByIdAndUpdate({_id: av._id},{ rating: av.averageRate }, function(err, res) {
                 if (err) throw err;
                 console.log('1 document inserted');         
          });
      }
  }); 
        
        
        // .then(product => {
        //      Product.update({_id: 'req.body.itemId'}, { $set: { numReviews: 'totalCount'} })
        //     .then(result => {
        //       console.log("success");
        //     });
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
        // Prod.findByIdAndUpdate({_id: req.body.itemId}, {
        //     numReviews: obj.totalCount
        //   }).then(() => Prod.findById({_id: req.body.itemId}))
        //   // //if you get user send it
        //   .then(product => res.status(200).send(product))
        //   // //else send to middle
        //   .catch(next);
       
    },
    // //
    //   edit(req, res, next){
    //     const productId = req.params.id;
    //     const productProps = req.body;
    //     // get user and update
    //     Product.findByIdAndUpdate({_id: productId}, productProps)
    //     // if success get user after updated
    //     .then(() => Product.findById({_id: productId}))
    //     // //if you get user send it
    //     .then(product => res.status(200).send(product))
    //     // //else send to middle
    //     .catch(next);
    //   },
    // //
    //   delete(req, res, next){
    //     const productId = req.params.id;
    //     Product.findByIdAndRemove({_id: productId})
    //     // in case is removed return 204 abject?
    //       .then(product => res.status(204).send(product))
    //       .catch(next);
    //   }
};

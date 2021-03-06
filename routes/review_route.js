const reviewController  = require('../controllers/reviewController');
// const middleware= require('./middleware');
module.exports = (app) =>{
  app.get('/api/reviews/:id',
  reviewController.all);

  app.get('/api/threereviews/:id',
  reviewController.firstthree);
  
  // //
  app.post('/api/reviews',
  reviewController.create);
  // //
//   app.put('/api/products/:id',
//   PrductController.edit);
  // // //
//   app.delete('/api/products/:id',
//   PrductController.delete,PrductController.all)




}

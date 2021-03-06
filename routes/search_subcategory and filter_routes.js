const ClientsController  = require('../controllers/search_subcategoryFilter_controller');
  // post => create in database
const { verify } = require('./middlewareadmin.js');
module.exports = (app) =>{
  app.get('/search/category',
  ClientsController.GetPageProducts);

  app.get('/AllProducts',verify,
  ClientsController.GetAllProducts);
  app.get('/ProductsCount',
  ClientsController.GetProductsCount);

  app.get('/AllOrders',verify,
  ClientsController.GetAllOrders);
  app.get('/OrdersCount',verify,
  ClientsController.GetOrdersCount);

  app.get('/AllUsers',verify,
  ClientsController.GetAllUsers);
  app.get('/UsersCount',verify,
  ClientsController.GetUsersCount);
  //
  app.post('/add/product',verify,
  ClientsController.create);
  // //
  app.patch('/update/product',verify,
  ClientsController.UpdateProduct);
  // // //
  app.delete('/delete/product',verify,
  ClientsController.delete)
}

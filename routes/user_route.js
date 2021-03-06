const UsersController  = require('../controllers/users_controller');
const middleware= require('./middleware');

module.exports= (app) =>{
    app.post('/user/login', UsersController.login);
    app.get('/api/user/register', UsersController.all);

    app.post('/api/user/register', UsersController.create);

    app.delete('/api/user/register/:id', UsersController.delete);
    
    app.put('/api/user/register/:id', UsersController.update);
    app.get('/api/user/:id', UsersController.userbyid);
   
  

}
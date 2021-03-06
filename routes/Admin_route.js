const AdminController  = require('../controllers/Admin_controller');

module.exports= (app) =>{
    app.post('/admin/login', AdminController.login);
    app.get('/api/admin/register', AdminController.all);

    app.post('/api/admin/register', AdminController.create);

    app.delete('/api/admin/register/:id', AdminController.delete);
    
    app.put('/api/admin/register/:id', AdminController.update);
    app.get('/api/admin/:id', AdminController.userbyid);
   
  

}
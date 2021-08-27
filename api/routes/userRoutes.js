const userController = require('../controllers/userController');

module.exports = app => {

  app
    .route('/users')
    .get(userController.list_all_users)
    .post(userController.create_a_user);

  app
    .route('/users/check')
    .post(userController.checkUser);  
    
  app
    .route('/users/register')
    .post(userController.register);

  app
    .route('/users/auth')
    .post(userController.login);   
  
  app
    .route('/users/checktkn')
    .post(userController.checkToken); 

  app
    .route('/users/:userId')
    .get(userController.read_a_user)
    .put(userController.update_a_user)
    .delete(userController.delete_a_user);

  app
    .route('/authenticate')
    .post(userController.checkOnLogin);
};
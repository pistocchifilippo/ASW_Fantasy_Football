const userBuilder = require('../controllers/userController');

module.exports = app => {

  app
    .route('/login')
    .post(userBuilder.getToken);  
    
  app
    .route('/check')
    .post(userBuilder.checkToken);

};
const authBuilder = require('../controllers/authController');

module.exports = app => {

  app
    .route('/login')
    .post(authBuilder.getToken);  
    
  app
    .route('/check')
    .post(authBuilder.checkToken);

};
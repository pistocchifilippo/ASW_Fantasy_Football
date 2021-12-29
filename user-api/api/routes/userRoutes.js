const userController = require('../controllers/userController');

module.exports = app => {

  app
    .route('/users')
    .get(userController.list_all_users)
    .post(userController.create_a_user);

  app
    .route('/config')
    .get(userController.getConfig);

  app
    .route('/users/check')
    .post(userController.checkUser);

  app
    .route('/users/username/:profileID')
    .get(userController.getUsername);

  app
    .route('/users/profile/:id')
    .get(userController.getProfile)
    .put(userController.editProfile);

  app
    .route('/users/edit/:userId')
    .put(userController.editUser);

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
    .route('/leagues')
    .get(userController.getAllLeagues)
    .post(userController.postNewLeague);

  app
    .route('/leagues/join')
    .post(userController.joinLeague);

  app
    .route('/search/:key')
    .get(userController.getSearchResult);

  app
    .route('/participant/:profileID')
    .get(userController.getTableUser);

  app
    .route('/leagues/:profileID')
    .get(userController.getLeaguesByUser);

  app
    .route('/authenticate')
    .post(userController.checkOnLogin);

};
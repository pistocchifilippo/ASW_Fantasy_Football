const userController = require('../controllers/userController');

module.exports = app => {

  app
    .route('/users')
    .get(userController.list_all_users)
    .post(userController.register);

    app
    .route('/users/:userId')
    .get(userController.read_a_user)
    .put(userController.editUser)
    .delete(userController.delete_a_user);

  app
    .route('/user/auth')
    .post(userController.login);

  app
    .route('/user/checktkn')
    .post(userController.checkToken);

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
    .route('/search/:key')
    .get(userController.getSearchResult);

  app
    .route('/members/:profileID')
    .get(userController.getTableUser);

  app
    .route('/leagues/:profileID')
    .get(userController.getLeaguesByUser);

  app
    .route('/leagues')
    .get(userController.getAllLeagues)
    .post(userController.postNewLeague);

  app
    .route('/leagues/join')
    .post(userController.joinLeague);

  app
    .route('/authenticate')
    .post(userController.checkOnLogin);

  app
    .route('/private/authenticate')
    .post(userController.checkOnAdminLogin);

  app
    .route('/private/auth')
    .post(userController.adminLogin);

  app
    .route('/config')
    .get(userController.getConfig);

  app
    .route('/config/day')
    .get(userController.getCurrentDay);

  app
    .route('/config/advance')
    .get(userController.canAdvanceDay)
    .post(userController.advanceDay);


};
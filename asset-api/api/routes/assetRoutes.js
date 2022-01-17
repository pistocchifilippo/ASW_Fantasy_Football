const assetController = require('../controllers/assetController');

module.exports = app => {

  app
    .route('/players')
    .get(assetController.getAllPlayers);

  app
    .route('/teams')
    .get(assetController.getAllTeams);

  app
    .route('/teams/:teamId')
    .get(assetController.getTeam);

  app
    .route('/players/:playerId')
    .get(assetController.getPlayer);

  app
    .route('/votes')
    .get(assetController.getVotes);

};
const assetController = require('../controllers/assetController');

module.exports = app => {

  app
    .route('/players')
    .get(assetController.getAllPlayers)

  app
    .route('/teams')
    .get(assetController.getAllTeams)

  app
    .route('/players/:playerId')
    .get(assetController.getPlayer)


};
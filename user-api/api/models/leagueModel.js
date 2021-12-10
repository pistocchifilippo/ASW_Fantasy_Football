module.exports = function (mongoose) {
  var Schema = mongoose.Schema;
  var LeagueSchema = new Schema({
    name: String,
    max_players: Number,
    players: Array,
    admin: String,
    _id: String,
  });
  return mongoose.model('leaguemodel', LeagueSchema, 'Leagues');
};
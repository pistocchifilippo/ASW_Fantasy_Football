module.exports = function (mongoose) {
  var Schema = mongoose.Schema;
  var ProfileSchema = new Schema({
    userID: String,
    budget: Number,
    score : Number,
    team: Array,
    lineups: Array,
  });
  return mongoose.model('profilemodel', ProfileSchema, 'Profiles');
};
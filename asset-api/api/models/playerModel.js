module.exports = function (mongoose) {
  var Schema = mongoose.Schema;
  var PlayerSchema = new Schema({
    name: String,
    position: String,
    dateOfBirth: String,
    countryOfBirth: String,
    nationality: String,
    shirtNumber: Object,
    role: String,
    _id: Number,
    team_id: Number,
    value: Number,
    score: Array
  });
  return mongoose.model('playermode', PlayerSchema, 'Players');
};
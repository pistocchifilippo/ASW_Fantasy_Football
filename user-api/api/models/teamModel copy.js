module.exports = function (mongoose) {
  var Schema = mongoose.Schema;
  var TeamSchema = new Schema({
    area: Array,
    shortName: String,
        tla: String,
        crestUrl: String,
        address: String, 
        phone: String,
        website: String, 
        email: String,
        founded: Number,
        clubColors: String,
        venue: String,
        lastUpdated: String,
        _id: Number
  });
  return mongoose.model('teammode', TeamSchema, 'Teams');
};
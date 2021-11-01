module.exports = function (mongoose) {
  var Schema = mongoose.Schema;
  var ConfigSchema = new Schema({
    initialBudget: Number,
    initialScore: Number,
    matchDay: Number,
    modules: Array,
  });
  return mongoose.model('configmodel', ConfigSchema, 'Config');
};
module.exports = function (mongoose) {
  var Schema = mongoose.Schema;
  var UserSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
  });
  return mongoose.model('usermodel', UserSchema, 'Users');
};
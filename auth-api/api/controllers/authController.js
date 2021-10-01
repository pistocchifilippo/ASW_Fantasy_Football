const jwt = require("jsonwebtoken");

function Return(value, error)  {
  this.value = value;
  this.error = error;
}

exports.getToken = (req, res) => { 
  var ret = new Return('', '');
  const token = jwt.sign(req.body, process.env.KEY);
  if(token) ret.value = token;
  else ret.error = "INVALID"
  res.json(ret); 
};

exports.checkToken = (req, res) => { 
  var ret = new Return('', '');
  var token = req.body.value;
  jwt.verify(token, process.env.KEY, function(err, result) {
    if (err) {
      ret.error = err;
      ret.value = '';
    } else {
      ret.value = result;
      ret.error = '';
    }
  }); 
  res.json(ret);
};



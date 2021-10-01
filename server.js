const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

global.User = require('./api/model/userModel');
const routes = require('./api/routes/userRoutes');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/FantasyFootball', { useNewUrlParser: true, useUnifiedTopology: true });

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);
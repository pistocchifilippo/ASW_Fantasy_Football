const express = require("express");
const cors = require("cors");
const app = express();
const routes = require('./api/routes/userRoutes');
const bodyParser = require('body-parser');

require("dotenv").config();

let port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);
app.listen(port);

app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});
  
console.log(`Server started on port ${port}`);
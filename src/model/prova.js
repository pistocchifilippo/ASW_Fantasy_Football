const mongo = require("./mongo/mongo_functions.js")

// mongo.find_one({name:"Cristiano Ronaldo"},"Players").then(console.log)
mongo.update({name:"The best"},{"player_limit":1},"Leagues")
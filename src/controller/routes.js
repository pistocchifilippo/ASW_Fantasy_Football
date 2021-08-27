const express = require("express")
const app = express()
const routes = require("./routes.json")

const collections = require("./collections.json")
const mongo_query = require("../model/mongo/mongo_functions.js")

app.use(express.json());

app.get(routes.teams_route, async (req,res) => {
    const query = req.body
    const x = await mongo_query.find_one(query,collections.teams_collection)
    res.json(x)
})
app.get(routes.players_route, async (req,res) => {
    const query = req.body
    const x = await mongo_query.find_one(query,collections.players_collection)
    res.json(x)
})
app.post(routes.leagues, async (req,res) => {
    // The body should contain: {name,admin_id,player_limit}
    const league = req.body
    if (league.hasOwnProperty("name") && league.hasOwnProperty("admin_id") && league.hasOwnProperty("player_limit")) 
    {
        league.members=[league.admin_id]
        await mongo_query.insert_one(league,collections.leagues_collection)
        res.sendStatus(200)
    }
    else 
    {    
        res.sendStatus(500)
    }
})
app.get(routes.leagues, async (req,res) => {
    const query = req.body
    const x = await mongo_query.find_one(query,collections.leagues_collection)
    res.json(x)
})

app.use((req,res,next) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(404).send("Page not found...");
})

app.listen(8080)







const express = require("express")
const app = express()
const routes = require("./routes.json")

const collections = require("./collections.json")
const mongo_query = require("../model/mongo/mongo_functions.js")
const { ObjectId } = require("mongodb")

app.use(express.json());

// Queries on teams
app.get(routes.teams_route, async (req,res) => {
    const query = req.body
    const x = await mongo_query.find_one(query,collections.teams_collection)
    res.json(x)
})
// Queries on players
app.get(routes.players_route, async (req,res) => {
    const query = req.body
    const x = await mongo_query.find_one(query,collections.players_collection)
    res.json(x)
})
// Create a league
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
// Queries a league
app.get(routes.leagues, async (req,res) => {
    const query = req.body
    // Transform the ID syntax
    if(query.hasOwnProperty("_id")){
        query._id = ObjectId(query._id)
    }
    const x = await mongo_query.find_one(query,collections.leagues_collection)
    res.json(x)
})

/** Put players into a league
 
{
    "_id":"",
    "player": "p_id"
}

 *  */
app.put(routes.leagues, async (req,res) => {
    const body = req.body
    const query = {"_id":ObjectId(body.league_id)}
    const x = await mongo_query.find_one(query,collections.leagues_collection)
    const members = x.members//.push(body.new)
    members.push(body.new_member)
    console.log(members)
    await mongo_query.update(query,{"members":members},collections.leagues_collection)
    res.sendStatus(200)
})

app.get(routes.day_advancement, async (req,res) => {
    const days = await mongo_query.find_one({},collections.days_collection)
    res.json(days)
})

/**
 * Makes a day advancement
 */
app.post(routes.day_advancement, async (req,res) => {
    const document = await mongo_query.find_one({},collections.days_collection)
    const current_day = document.current_day
    const new_day = current_day + 1
    const day_limit = document.limit
    // await mongo_query.update({},{"current_day":new_day},collections.days_collection)


    if(current_day >= day_limit){
        res.sendStatus(500)
    } else {
        all_line_up = await mongo_query.find_multiple({},collections.line_up_collection)
        for (let i = 0; i < all_line_up.length; i++) {
            line_up = all_line_up[i]
            playing_players = line_up.playing
            score = 0
            for (let j = 0; j < playing_players.length; j++) {
                player = await mongo_query.find_one({"_id":playing_players[j]},collections.players_collection)//.score[current_day-1]
                score = score + player.score[current_day-1]
            }
            console.log(score)
            await mongo_query.update({"_id":line_up._id},{"score":score},collections.line_up_collection)
        }
        res.sendStatus(200)
    }
})

app.use((req,res,next) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(404).send("Page not found...");
})

app.listen(8080)







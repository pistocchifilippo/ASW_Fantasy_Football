const express = require("express")
const app = express()
const routes = require("./routes.js")

const get_team = async (id,db) => {
}

app.get(routes.teams_route, (req,res) => {

})


app.use((req,res,next) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(404).send("Page not found...");
})


app.listen(8080)



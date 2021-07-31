const express = require("express")
const app = express()
const DAY_LIMIT = 7

app.get("/stats/evaluation/:day", (req,res) => {
    const day = req.params.day
    if (day <= DAY_LIMIT && day >= 1) {
        json = require("./days/day_" + day + ".json")
        res.json(json)
    } else {
        res.status(404).send("Day out of bound; Accepted just values between 1 and 7.");
    }
})
app.get("/stats/day_evaluation/:day/:player_id", (req,res) => {

})

app.use((req,res,next) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(404).send("Page not found...");
})


app.listen(8080)


const mongoose = require('mongoose');
const DB = 'FantasyFootball'
const profile_collection = 'profiles'
const day_collection = 'days'
const players_collection = 'players'
const line_up_collection = 'lineups'
const mongo = 'mongodb://localhost:27017/'
const mongo_route = mongo + DB

const daySchema = new mongoose.Schema({
    current_day: Number,
    limit: Number,
});
const Days = mongoose.model(day_collection, daySchema);
const line_up_schema = new mongoose.Schema({
    score: Number,
    playing: Array
})
const Line_up = mongoose.model(line_up_collection, line_up_schema);
const player_schema = new mongoose.Schema({
    _id: Number,
    score: Array
})
const Players = mongoose.model(players_collection, player_schema);
const profile_schema = new mongoose.Schema({
    score: Number,
    lineup: Array
})
const Profiles = mongoose.model(profile_collection, profile_schema);


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(mongo_route);
    // generation of a day instance (just once!)
    // await generate_day()

    await day_advancement()
}

const generate_day = async () => {
    const day = new Days({
        current_day: 0,
        limit: 7
    })
    await day.save()
}

const get_current_day = async () => {
    return await Days.findOne({})
}

// true if can advance to the next day
const can_advance_day = async () => {
    const day = await get_current_day()
    const day_limit = day.limit
    const current_day = day.current_day
    return (current_day < day_limit)
}

// Perform a day advancement
const day_advancement = async () => {
    const day = await get_current_day()
    const day_limit = day.limit
    const current_day = day.current_day
    console.log(day)
    console.log(day_limit)
    console.log(current_day)
    if (await can_advance_day()) {
        const profiles = await Profiles.find({})
        // for each profile
        for (let i = 0; i < profiles.length; i++) {
            console.log(profiles[i].lineup)
            points = profiles[i].score
            console.log("Points: " + points)

            // the daily line up
            console.log(profiles[i].lineup[current_day])
            const l = await Line_up.findOne({_id: new mongoose.Types.ObjectId(profiles[i].lineup[current_day])})
            console.log(l)
            console.log(l.playing)

            // for each player
            for (let k = 0; k < l.playing.length; k++) {
                console.log(l.playing[k])
                const p = await Players.findOne({'_id': l.playing[k]})
                console.log(p.score[current_day])
                points = points + p.score[current_day]
            }
            console.log("new points: " + points)
        
            // update points
            await Profiles.updateOne({_id: profiles[i]._id}, { $set: { score: points } })
        }
        // update day
        await Days.updateOne({}, { $set: { current_day: current_day + 1 } })
    } else {
        // Error
    }
}

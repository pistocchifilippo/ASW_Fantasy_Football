const fs = require("fs")

const data = fs.readFileSync('./src/model/assets/football_data_api/materialized_assets/players.json', 'utf8')
const json = JSON.parse(data)
const N_DAYS = 7
const PATH = "./src/services/stats/days"

const MongoClient = require('mongodb').MongoClient
const mongo_address = "mongodb://localhost:27017/"
const mongo_db = "FantasyFootball"
const mongo_collection = "Stats"

const build_path = (path,day) => {
    return path + "/day_" + day + ".json"
}

const create_stats = () => {
    for (let i = 1; i <= N_DAYS; i++) {
        const path = build_path(PATH,i)
        k = json.map(e => {
            return e.map(x => {
                x.score = Math.floor(Math.random() * 10);
                return x
            })
        })
        fs.writeFileSync(path,JSON.stringify(k))
    }
}

const load_day = async (day,db) => {
    for (let i = 0; i < day.length; i++) {
        await db.collection(mongo_collection).insertMany(day[i])
    }
} 

const load_stats = async () => {
    MongoClient.connect(mongo_address + mongo_db, async (err, client) => {
        if(err) throw err

        // Connect to the db
        var db = client.db(mongo_db);

        for (let i = 1; i <= N_DAYS; i++) {
            const path = build_path(PATH,i)
            const day = JSON.parse(fs.readFileSync(path, 'utf8'))
            console.log(day[0])
            // await load_day(day,db)
        }

        client.close()
    });
}

load_stats()










const fs = require("fs")

const data = fs.readFileSync('./src/model/assets/football_data_api/materialized_assets/players.json', 'utf8')
const json = JSON.parse(data)
const N_DAYS = 7
const PATH = "./src/services/stats/days"

const build_path = (path,day) => {
    return path + "/day_" + day + ".json"
}

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






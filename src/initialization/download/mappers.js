const random_interval = (min, max) => {
    return Math.random() * (max - min) + min
}

const replace_id = (d) => {
    d._id = d.id
    delete d.id
}

const map_player = (document,id) => {
    delete document.id
    document.team_id = id
    document.value = random_interval(4,13).toFixed(1)
    score = []
    for (let i = 0; i < 7; i++) {
        score.push(Math.floor(random_interval(0,10)))        
    }
    document.score = score
    return document
}

const map_team = (document) => {
    replace_id(document)
    // console.log(document)
    // console.log("___")
    return document
}

module.exports.map_player = map_player
module.exports.map_team = map_team
const replace_id = (d) => {
    d._id = d.id
    delete d.id
}

const map_player = (document,id) => {
    replace_id(document)
    document.team_id = id
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
class Player {
    constructor(_id,name,position,nationality,role,team_id,value,score) {
        this._id = _id
        this.name = name
        this.position = position
        this.nationality = nationality
        this.role = role
        this.team_id = team_id
        this.value = value
        this.score = score
    }
    static marshalling = (player) => {
        return JSON.stringify(player)
    }
    static un_marshalling = (json) => {
        return new Player(json._id,json.name,json.position,json.nationality,json.role,json.team_id,json.value,json.score)
    }
}
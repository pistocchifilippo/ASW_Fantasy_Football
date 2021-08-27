class League {
    constructor(_id,name,admin,player_limit) {
        this._id = _id
        this.name = name
        this.admin = admin
        this.player_limit = player_limit
        this.participants = [admin]
    }
    static marshalling = (league) => {
        return JSON.stringify(league)
    }
    static un_marshalling = (json) => {
        return new League(json.name,json.admin,json.player_limit)
    }
}
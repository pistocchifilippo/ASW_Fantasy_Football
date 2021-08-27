class Team {
    constructor(_id,name) {
        this._id = _id
        this.name = name
    }
    static marshalling = (team) => {
        return JSON.stringify(team)
    }
    static un_marshalling = (json) => {
        return new League(json._id,json.name)
    }
}
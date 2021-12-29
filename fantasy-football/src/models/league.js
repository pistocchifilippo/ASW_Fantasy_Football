export default class League {
    constructor(id, name, players, admin, max_players) {
        this.id = id;
        this.players = players;
        this.name = name;
        this.admin = admin;
        this.max_players = max_players;
    }
}

export default class League {
    constructor(id, name, participants, admin, max_players) {
        this.id = id;
        this.participants = participants;
        this.name = name;
        this.admin = admin;
        this.max_players = max_players;
    }
}

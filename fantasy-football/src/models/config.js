export default class Config {
    constructor(id, initialBudget, initialScore, matchDay, adminUser, adminPWD, maxDay, modules){
        this.id = id;
        this.initialBudget = initialBudget;
        this.initialScore = initialScore;
        this.matchDay = matchDay;
        this.maxDay = maxDay;
        this.adminUser = adminUser;
        this.adminPWD = adminPWD;
        this.modules = modules;
    }
}

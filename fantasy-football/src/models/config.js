export default class Config {
    constructor(id, initialBudget, initialScore, matchDay, modules){
        this.id = id;
        this.initialBudget = initialBudget;
        this.initialScore = initialScore;
        this.matchDay = matchDay;
        this.modules = modules;
    }
}

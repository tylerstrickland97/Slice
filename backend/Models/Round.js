module.exports = class {
    constructor(data) {
        this.id = data.id;
        this.course = data.course;
        this.date = data.date;
        this.player = data.player;
        this.total_score = data.total_score;
        this.per_hole_score = data.per_hole_score;
    }

    toJSON() {
        return {
            id: this.id,
            course: this.course,
            data: this.date,
            player: this.player,
            total_score: this.total_score,
            per_hole_score: this.per_hole_score
        }
    }
}
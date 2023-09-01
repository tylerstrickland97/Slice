module.exports = class {
    constructor(data) {
        validateData(data);
        this.id = data.id;
        this.course = data.course;
        this.date = data.date;
        this.player = data.player;
        this.total_score = data.total_score;
        this.per_hole_score = data.per_hole_score;
    }

    validateData(data) {
        let requiredKeys = ['id', 'course', 'date', 'player', 'total_score', 'per_hole_score'];
        requiredKeys.forEach(key => {
            if (!(key in requiredKeys)) {
                throw new Error("Invalid data object");
            }
        });

        if (typeof data.id !== 'number' || typeof data.course !== 'string' || typeof data.date !== 'string' || typeof data.player != 'string'
            || typeof data.total_score !== 'number' || !Array.isArray(data.per_hole_score)) {
                throw new Error("Invalid data object");
        }

        if (data.id < 0 || data.course == '' || data.date == '' || data.player == '' || data.total_score < 0 || data.per_hole_score.length < 18) {
            throw new Error("Invalid data object");
        }
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
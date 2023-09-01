module.exports = class {
    constructor(data) {
        validateData(data);
        this.id = data.id,
        this.name = data.name;
        this.rating = data.rating;
        this.slope = data.slope;
        this.par = data.par;
        this.hole_handicaps = data.hole_handicaps;
        this.hole_pars = data.hole_pars;

    }

    validateData(data) {
        let requiredKeys = ['id', 'name', 'rating', 'slope', 'par', 'hole_handicaps', 'hole_pars'];
        requiredKeys.forEach(key => {
            if (!(key in data)) {
                throw new Error("Invalid data object");
            }
        });

        if (typeof data.id !== 'number' || typeof data.name !== 'string' || typeof data.rating !== 'number' || typeof data.slope !== 'number' 
            || typeof data.par !== 'number' || !Array.isArray(data.hole_handicaps) || !Array.isArray(data.hole_pars)) {
            throw new Error("Invalid data object");
        }

        if (data.id < 0 || data.rating < 0 || data.slope < 0 || data.par < 50 || data.hole_handicaps.length < 18 || data.hole_pars.length < 18) {
            throw new Error("Invalid data object");
        }
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            rating: this.rating,
            slope: this.slope,
            par: this.par,
            hole_handicaps: this.hole_handicaps,
            hole_pars: this.hole_pars
        }
    }
}
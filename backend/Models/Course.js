module.exports = class {
    constructor(data) {
        this.name = data.name;
        this.rating = data.rating;
        this.slope = data.slope;
        this.par = data.par;
        this.hole_handicaps = data.hole_handicaps;
        this.hole_pars = data.hole_pars;

    }

    toJSON() {
        return {
            name: this.name,
            rating: this.rating,
            slope: this.slope,
            par: this.par,
            hole_handicaps: this.hole_handicaps,
            hole_pars: this.hole_pars
        }
    }
}
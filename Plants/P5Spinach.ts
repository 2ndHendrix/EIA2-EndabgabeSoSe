namespace Garden {

    export class Spinach extends Plant {

        constructor(_position: Vector) {
            super(_position);
            this.growthrate = 10;
            this.growthratenow = 10;
            this.minWater = 5;
            this.minFertilizer = 7;
            this.minPesticides = 8;
            this.image.src = "icons/spinach.png";

        }
    }
}
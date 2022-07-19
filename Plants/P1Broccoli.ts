namespace Garden {

    export class Broccoli extends Plant {

        constructor(_position: Vector) {

            super(_position);
            this.growthrate = 10;
            this.growthratenow = 10;
            this.minWater = 10;
            this.minFertilizer = 5;
            this.minPesticides = 3;
            this.image.src = "icons/broccoli.png";

        }

    }
}
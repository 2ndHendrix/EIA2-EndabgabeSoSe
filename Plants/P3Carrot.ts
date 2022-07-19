namespace Garden {

    export class Carrot extends Plant {

        constructor(_position: Vector) {
            super(_position);
            this.growthrate = 10;
            this.growthratenow = 10;            this.minWater = 3;
            this.minFertilizer = 16;
            this.minPesticides = 4;
            this.image.src = "icons/carrot.png";

        }
    }
}
namespace Garden {

    export class Cabbage extends Plant {

        constructor(_position: Vector) {
            super(_position);
            this.growthrate = 10;
            this.growthratenow = 10;
            this.minWater = 13;
            this.minFertilizer = 7;
            this.minPesticides = 15;
            this.image.src = "icons/cabbage.png";
        }
    }
}
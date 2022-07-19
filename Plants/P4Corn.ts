namespace Garden {

    export class Corn extends Plant {

        constructor(_position: Vector) {
            super(_position);
            this.growthrate = 10;
            this.growthratenow = 10;            
            this.minWater = 15;
            this.minFertilizer = 10;
            this.minPesticides = 15;
            this.image.src = "icons/corn.png";

            
        }
    }
}
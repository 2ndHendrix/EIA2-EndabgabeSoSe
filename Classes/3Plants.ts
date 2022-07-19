namespace Garden {

    export class Plant {

        name: string;
        worth: number;

        growthrate: number;
        growthratenow: number;

        minWater: number;
        nowWater: number;
        maxWater: number;

        minFertilizer: number;
        nowFertilizer: number;
        maxFertilizer: number;

        minPesticides: number;
        nowPesticides: number;
        maxPesticides: number;

        growlevel: number = 0;
        image: HTMLImageElement = new Image();
        die: Boolean = false;
        position: Vector = new Vector(0, 0);

        waterlevel: HTMLDivElement = <HTMLDivElement>document.querySelector("div#waterlevel");
        pestlevel: HTMLDivElement = <HTMLDivElement>document.querySelector("div#pestlevel");
        fertilizerlevel: HTMLDivElement = <HTMLDivElement>document.querySelector("div#fertilizelevel");

        constructor(_position: Vector) {

            this.position = _position;

            this.minFertilizer = 0;
            this.nowFertilizer = 100;
            this.maxFertilizer = 15000;

            this.minWater = 0;
            this.nowWater = 10000;
            this.maxWater = 15000;

            this.minPesticides = 0;
            this.nowPesticides = 0;
            this.maxPesticides = 3;

        }

        update(): void {
            this.growthratenow--;
            //console.log(this.growthratenow);
            if (this.growthratenow >= 0) {
                this.growthratenow = this.growthrate;
                this.growlevel++;
            }


            this.updateWaterfertilizer();
            // context.transform(0.25, 0, 0, 0.25, this.position.x + 50, this.position.y + 13);
            if (this.growlevel >= 1) {
                context.drawImage(this.image, this.position.x + 50, this.position.y + 100);
                if (this.growlevel >= 200) {
                    context.drawImage(this.image, this.position.x + 80, this.position.y + 50);
                    if (this.growlevel >= 300) {
                        context.drawImage(this.image, this.position.x + 110, this.position.y + 100);
                    }
                }
            }
            //console.log("fertilizer" + this.nowFertilizer + "water" + this.nowWater + this.die);
            //console.log();



        }
        grownready(): void {
            context.drawImage(this.image, this.position.x + 50, this.position.y + 100);
            context.drawImage(this.image, this.position.x + 80, this.position.y + 50);
            context.drawImage(this.image, this.position.x + 110, this.position.y + 100);
        } 

        updateUI(): void {
            //console.log("test");

            this.waterlevel.innerHTML = (this.nowWater / 50).toString();
            //this.pestlevel.innerHTML = this.nowPesticides.toString();
            this.fertilizerlevel.innerHTML = (this.nowFertilizer / 50).toString();
        }


        updateWaterfertilizer(): void {
            this.nowWater--;
            this.nowFertilizer--;
            this.nowPesticides--;


            if ((this.nowWater < this.minWater) || (this.nowWater > this.maxWater)) {
                this.die = true;
            }
            if ((this.nowFertilizer < this.minFertilizer) || (this.nowFertilizer > this.maxFertilizer)) {
                this.die = true;
            }
            if (this.nowPesticides >= 500) {
                this.die = true;
            }
            //context.font = "30px Arial";
            //context.fillText(this.nowWater.toString(), this.positiontext.x, this.positiontext.y);
        }

        // updatePlant(): void {

        // }



    }
}
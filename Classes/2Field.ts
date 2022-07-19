namespace Garden {
    export enum STATUS {
        EMPTY,
        GROW,
        FULL
    }
    export class Field {

        public fieldpath: Path2D = new Path2D();
        public hoverpath: Path2D = new Path2D();



        position: Vector;
        public status: STATUS;
        public fieldbug: Fieldbug [] = [];
        plant: Plant;
        public fieldnumber: number;
        public readysell: boolean = false;
        private hover: boolean;
        



        constructor(_field: Vector, _filednumber: number) {


            this.position = _field;
            this.status = STATUS.EMPTY;

            this.fieldnumber = _filednumber;

            this.drawPath();
            //this.setcolor();
        }
        sethover(): void {
            this.hover = true;
        }
        clearhover(): void {
            this.hover = false;
        }
        nothingplanted(): void {
            //console.log("test");
            let waterlevel: HTMLDivElement = <HTMLDivElement>document.querySelector("div#waterlevel");
            let pestlevel: HTMLDivElement = <HTMLDivElement>document.querySelector("div#pestlevel");
            let fertilizerlevel: HTMLDivElement = <HTMLDivElement>document.querySelector("div#fertilizelevel");

            waterlevel.innerHTML = "nichts angepflanzt";
            pestlevel.innerHTML = "nichts angepflanzt";
            fertilizerlevel.innerHTML = "nichts angepflanzt";
        }

        updatehover(): void {
            if (this.hover == true) {
                context.fillStyle = "#ff000020";
                context.fill(this.hoverpath);
            }
            if (this.hover == false) {
                context.fillStyle = "#ff000000";
                context.fill(this.hoverpath);
            }
        }

        update(): void {

            context.fillStyle = "#00ff00";
            context.fill(this.fieldpath);

            this.updatehover();
            context.fill(this.hoverpath);
            //console.log(this.status);
            switch (this.status) {
                case STATUS.EMPTY:
                    //console.log("leer");
                    break;

                case STATUS.GROW:
                    this.plant.update();
                    //console.log("wachsen");
                    if (this.plant.growlevel == 300) {
                        this.status = STATUS.FULL;
                    }
                    break;
                case STATUS.FULL:
                this.plant.grownready();
                break;
            }


        }
        selected(): void {
            context.lineWidth = 10;
            context.strokeStyle = "#FF0000";
            context.stroke(this.hoverpath);
        }
        unselected(): void {
            context.lineWidth = 10;
            context.strokeStyle = "#FF000000";
            context.stroke(this.hoverpath);
        }


        drawPath(): void {
            this.fieldpath.moveTo(50 + this.position.x, 50 + this.position.y);
            this.fieldpath.lineTo(50 + this.position.x, 175 + this.position.y);
            this.fieldpath.lineTo(175 + this.position.x, 175 + this.position.y);
            this.fieldpath.lineTo(175 + this.position.x, 50 + this.position.y);

            this.fieldpath.closePath();
            context.fill();

            this.hoverpath.moveTo(50 + this.position.x, 50 + this.position.y);
            this.hoverpath.lineTo(50 + this.position.x, 175 + this.position.y);
            this.hoverpath.lineTo(175 + this.position.x, 175 + this.position.y);
            this.hoverpath.lineTo(175 + this.position.x, 50 + this.position.y);

            this.hoverpath.closePath();
            context.fill();

        }
        Interact(_tool: TOOL): void {

            switch (this.status) {
                case STATUS.EMPTY:
                    if (_tool == TOOL.BROCOLI) {
                        console.log("brokolie");
                        this.status = STATUS.GROW;
                        this.plant = new Broccoli(this.position);

                        console.log(this.status);
                    }
                    if (_tool == TOOL.CABBAGE) {
                        this.plant = new Cabbage(this.position);
                        this.status = STATUS.GROW;
                    }
                    if (_tool == TOOL.CARROT) {
                        this.plant = new Carrot(this.position);
                        this.status = STATUS.GROW;
                    }
                    if (_tool == TOOL.CORN) {
                        this.plant = new Corn(this.position);
                        this.status = STATUS.GROW;
                    }
                    if (_tool == TOOL.SPINACH) {
                        this.plant = new Spinach(this.position);
                        this.status = STATUS.GROW;
                    }
                    //console.log(this.status);
                    break;
                case STATUS.GROW:
                    if (_tool == TOOL.WATER) {
                        this.plant.nowWater += 250;
                    }
                    if (_tool == TOOL.FERTILIZER) {
                        this.plant.nowFertilizer += 250;
                    }
                case STATUS.FULL:
                    if (_tool == TOOL.HARVEST) {
                        this.readysell = true;

                    }
                //click(_tool)
            }
        }

    }
}
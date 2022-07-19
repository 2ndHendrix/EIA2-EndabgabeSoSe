namespace Garden {


    export class Fieldbug {




        position: Vector = new Vector(0, 0);
        image: HTMLImageElement = new Image();


        constructor(min: number, max: number) {
            this.image.src =  "icons/bug.png";

        }
        update(): void {
            
        }



        
    }

}
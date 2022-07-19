namespace Garden {


    export class Fieldbug {




        position: Vector = new Vector(0, 0);
        image: HTMLImageElement = new Image();
        number: number;


        constructor(_number: number) {
            this.number = _number;
            this.image.src =  "icons/smallbug.png";

        }
        update(): void {
            if (this.number >= 1) {
                context.drawImage(this.image, this.position.x + 50, this.position.y + 100);
                if (this.number >= 2) {
                    context.drawImage(this.image, this.position.x + 80, this.position.y + 50);
                    if (this.number >= 3) {
                        context.drawImage(this.image, this.position.x + 110, this.position.y + 100);
                    }
                }
            }
        }



        
    }

}
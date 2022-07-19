namespace Garden {


    export class Farmbug {

        public size: number;
        position: Vector;
        image: HTMLImageElement = new Image();
        number: number;

        public constructor() {
            this.image.src = "icons/bug.png";
            this.position = new Vector(Math.random() * 1080, Math.random() * 1080);
        }


        public update(): void {

            this.position.x += 9;  

            context.drawImage(this.image, this.position.x, this.position.y) ;                                 
                    
            if (this.position.x >= 1650) {                    
                this.position.x = -50;  
                this.position.y = Math.random() * 960;
            }

    }

}
}
namespace Garden {


    export class Farmbug extends Moveable {

        public size: number;


        public constructor(_bugposition: Vector) {
            super();

        }


        public update(): void {


            this.position.x += 3;                                    
                     

            if (this.position.x >= 1650) {                    
                this.position.x = -10;  
                this.position.y = Math.random() * 1080;
            }
    }

}
}
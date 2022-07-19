namespace Garden {

   export class Farm {
      public lastfield: number;
      public target: Vector;
      public condition: string;
      public tool: TOOL;
      public bug: Farmbug[] = [];
      public field: Field[] = [];
      public path: Path2D = new Path2D();
      private i: number = 0;


      //private hover: boolean;


      constructor() {
         this.build();
         for (let i: number = 0; i < 1; i++) {
            this.bug.push(new Farmbug());
         }

         //console.log(this.field.length);
      }

      plant(_tool: TOOL): void {
         this.field[this.lastfield].Interact(_tool);
      }

      build(): void {

         let position: Vector = new Vector(0, 0);
         console.log("Farm erstellt");

         for (let index: number = 0; index <= 4; index++) {

            position.y += 150;
            for (let index: number = 0; index < 8; index++) {
               console.log(this.i);
               this.field[this.i] = new Field(new Vector(position.x, position.y), this.i);

               this.i++;

               position.x += 150;
               if (position.x > 1050) {
                  position.x = 0;
               }
            }
         }
         this.lastfield = 0;
      }


      water(): void {
         // console.log("1Farm water");
      }
      update(_fundsvalue: number, _sellprice: number): void {



         for (let i: number = 0; i < this.field.length; i++) {

            if (this.field[i].readysell == true) {          //sell item
               _fundsvalue += _sellprice;
               document.querySelector("#funds").innerHTML = _fundsvalue.toString() + "";

               this.field[i] = new Field(this.field[i].position, this.field[i].fieldnumber);

            }
            if ((this.field[i].status == STATUS.GROW) || (this.field[i].status == STATUS.FULL)) {
               if (this.field[i].plant.die == true) {
                  this.field[i] = new Field(this.field[i].position, this.field[i].fieldnumber);  // Wenn field = die, neues Feld wird gezeichnet und altes überschrieben
               }
            }


            if (this.field[i].fieldnumber == this.lastfield) {
               this.field[i].selected();
            }
            else {
               this.field[i].unselected();
            }

            this.field[i].update();

         }
         if (this.field[this.lastfield].status == STATUS.GROW) {
            this.field[this.lastfield].plant.updateUI();


         }
         else {
            this.field[this.lastfield].nothingplanted();
         }


         //console.log(this.lastfield);

         this.bug[0].update();
         this.checkbug();
         //console.log(this.bug[0].position);
      }
      checkbug(): void {
         for (let i: number = 0; i < this.field.length; i++) {
            if (context.isPointInPath(this.field[i].hoverpath, this.bug[0].position.x, this.bug[0].position.y)) {
               if ((this.field[i].status == STATUS.GROW) || (this.field[i].status == STATUS.FULL)) {
                  this.bug[0].position.x = 0;
                  this.field[i].fieldbug.push(new Fieldbug(2));
               }
               //this.bug[0] = new Farmbug();

            }
         }
      }



      fertilize(): void {
         // console.log("1Farm fertilize");
      }

      pesticide(): void {
         // console.log("1Farm pesticide");
      }
      getpath(_number: number): Path2D {
         return this.field[_number].fieldpath;
      }
   }
}
namespace Garden {
    window.addEventListener("load", hndload);

    export enum TOOL {
        BROCOLI,
        CABBAGE,
        CORN,
        CARROT,
        SPINACH,
        PESTICIDES,
        WATER,
        FERTILIZER,
        HARVEST
    }

    export let context: CanvasRenderingContext2D;
    let rect: DOMRect;
    let main: HTMLDivElement;
    let mousepositon: Vector;
    let farm: Farm;
    export let tool: TOOL;
    let priceNew: number;
    let fundsValue: number;
    let inputHarvest: number;


    function hndload(_event: Event): void {

        mousepositon = new Vector(0, 0);
        // // Buttons for Planting veggies
        let broccoliButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#broccoli");
        let cabbageButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#cabbage");
        let cornButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#corn");
        let carrotButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#carrot");
        let spinachButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#spinach");
        let pesticidesButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#buttonPesticides");
        let waterButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#buttonWater");
        let fertilizerButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#buttonFertilizer");
        let harvestButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#harvest");

        broccoliButton.addEventListener("click", useTool);
        cabbageButton.addEventListener("click", useTool);
        cornButton.addEventListener("click", useTool);
        carrotButton.addEventListener("click", useTool);
        spinachButton.addEventListener("click", useTool);
        pesticidesButton.addEventListener("click", useTool);
        waterButton.addEventListener("click", useTool);
        fertilizerButton.addEventListener("click", useTool);
        harvestButton.addEventListener("click", useTool);


        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");
        context = canvas.getContext("2d")!;
        context.lineWidth = innerWidth;

        main = <HTMLDivElement>document.querySelector("#main");
        main.style.display = "none";

        let startSimulationButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#startSimulationButton");
        startSimulationButton.addEventListener("click", startGame);

        let startGameForm: HTMLFormElement = <HTMLFormElement>document.querySelector("#startGameForm");
        startGameForm.addEventListener("submit", hndchange);

        let consumablesForm: HTMLFormElement = <HTMLFormElement>document.querySelector("#toolsMenuForm");
        consumablesForm.addEventListener("submit", hndchange);


        farm = new Farm();
        canvas.addEventListener("click", pathclicklisterner);

        canvas.addEventListener("mousemove", setmouseposition);
        createPaths();

        // canvas.addEventListener("mousedown", clickField);
        updatePrices();

    }


    function startGame(_event: Event): void {

        let startGameMenu: HTMLDivElement = <HTMLDivElement>document.querySelector("#startGameMenu");
        startGameMenu.style.display = "none";
        console.log("Game starts");
        main.style.display = "";

        updateFarm();
        getFunds();
        setInterval(updatePrices, 10000);
        setInterval(update, 40);
    }

    function hndchange(_event: Event): void {
        _event.preventDefault();
        // let formData: FormData = new FormData(document.forms[0]);

    }
    function update(): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");
        context.clearRect(0, 0, canvas.width, canvas.height);
        farm.update(fundsValue, inputHarvest);
    }

    function updateFarm(): void {
        // for (let farms of farm) {
        //     farms.build();
        //     farms.water();
        //     farms.fertilize();
        //     farms.pesticide();

        // }
        // for (let moveable of moveables) {
        //     moveable.draw();
        // }

        //buildBugs(10);

    }

    function buy(): void {


        fundsValue -= priceNew;
        document.querySelector("#funds").innerHTML = fundsValue.toString();
    }

    function useTool(_event: Event): void {
        if ((_event.target as Element).id == "broccoli") {
            tool = TOOL.BROCOLI;
            if (0 < fundsValue - priceNew) {
                farm.plant(tool);
                buy();
            }


        }
        if ((_event.target as Element).id == "carrot") {
            tool = TOOL.CARROT;
            if (0 < fundsValue - priceNew) {
                farm.plant(tool);
                buy();
            }
        }
        if ((_event.target as Element).id == "cabbage") {
            tool = TOOL.CABBAGE;
            if (0 < fundsValue - priceNew) {
                farm.plant(tool);
                buy();
            }
        }
        if ((_event.target as Element).id == "corn") {
            tool = TOOL.CORN;
            if (0 < fundsValue - priceNew) {
                farm.plant(tool);
                buy();
            }
        }
        if ((_event.target as Element).id == "spinach") {
            tool = TOOL.SPINACH;
            if (0 < fundsValue - priceNew) {
                farm.plant(tool);
                buy();
            }
        }
        if ((_event.target as Element).id == "buttonPesticides") {
            tool = TOOL.PESTICIDES;
            if (0 < fundsValue - priceNew) {        //other price
                farm.plant(tool);
                buy();
            }
        }
        if ((_event.target as Element).id == "buttonWater") {
            tool = TOOL.WATER;
            farm.plant(tool);
        }
        if ((_event.target as Element).id == "buttonFertilizer") {
            tool = TOOL.FERTILIZER;
            if (0 < fundsValue - priceNew) {        //other price
                farm.plant(tool);
                buy();
            }
        }
        if ((_event.target as Element).id == "harvest") {
            tool = TOOL.HARVEST;
            farm.plant(tool);
        }
        console.log(tool);


    }


    function updatePrices(): void {
        setWorthHarvest();
        pricePlant();
        setPriceConsumalbles();
    }

    function getFunds(): void {

        let fundsAtStart: HTMLInputElement = <HTMLInputElement>document.getElementById("fundsAtStart");
        fundsValue = parseInt(fundsAtStart.value);
        document.querySelector("#funds").innerHTML = fundsValue + "";
        console.log(fundsValue);

    }

    function setWorthHarvest(): void {
        inputHarvest = Math.round(Math.random() * 25);
        document.querySelector("#harvestWorth").innerHTML = inputHarvest + "";

    }

    function pricePlant(): void {
        let inputPlant: number = Math.round(Math.random() * 25.34);
        document.querySelector("#pricePlant").innerHTML = inputPlant + "";

    }

    function setPriceConsumalbles(): void {

        let priceRangeLow: HTMLInputElement = <HTMLInputElement>document.getElementById("priceRangeLow");
        let inputLow: number = parseInt(priceRangeLow.value);
        let priceRangeHigh: HTMLInputElement = <HTMLInputElement>document.getElementById("priceRangeHigh");
        let inputHigh: number = parseInt(priceRangeHigh.value);



        priceNew = Math.floor(Math.random() * (inputHigh - inputLow + 1)) + inputLow;

        document.querySelector("#pricePesticides").innerHTML = priceNew + "";
        document.querySelector("#priceFertilizer").innerHTML = priceNew + "";

    }






    // function buildBugs(_numberBugs: number): void {
    //     for (let i: number = 0; i < _numberBugs; i++) {
    //         let bug: Bugs = new Bugs(1.0);
    //         moveables.push(bug);
    //         //console.log(_numberBugs);

    //     }
    //}
    function pathclicklisterner(_event: MouseEvent): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");
        for (let index: number = 0; index < farm.field.length; index++) {

            rect = canvas.getBoundingClientRect();

            if (context.isPointInPath(farm.field[index].fieldpath, _event.clientX - rect.left, _event.clientY - rect.top)) { //wenn innerhalb eines Pfades gedrückt wurde
                farm.lastfield = farm.field[index].fieldnumber;
            }

        }

    }
    function setmouseposition(_event: MouseEvent): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        rect = canvas.getBoundingClientRect();

        mousepositon.x = (_event.clientX - rect.left);
        mousepositon.y = (_event.clientY - rect.top);

        for (let index: number = 0; index < farm.field.length; index++) {
            if (context.isPointInPath(farm.field[index].hoverpath, _event.clientX - rect.left, _event.clientY - rect.top)) {
                farm.field[index].sethover();                                   //zeige Hover Position auf Feldern an
            }
            else {
                farm.field[index].clearhover();
            }
        }
        //console.log(mousepositon);                 

        //console.log(mousepositon);

    }
}
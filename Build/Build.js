"use strict";
var Garden;
(function (Garden) {
    window.addEventListener("load", hndload);
    let TOOL;
    (function (TOOL) {
        TOOL[TOOL["BROCOLI"] = 0] = "BROCOLI";
        TOOL[TOOL["CABBAGE"] = 1] = "CABBAGE";
        TOOL[TOOL["CORN"] = 2] = "CORN";
        TOOL[TOOL["CARROT"] = 3] = "CARROT";
        TOOL[TOOL["SPINACH"] = 4] = "SPINACH";
        TOOL[TOOL["PESTICIDES"] = 5] = "PESTICIDES";
        TOOL[TOOL["WATER"] = 6] = "WATER";
        TOOL[TOOL["FERTILIZER"] = 7] = "FERTILIZER";
        TOOL[TOOL["HARVEST"] = 8] = "HARVEST";
    })(TOOL = Garden.TOOL || (Garden.TOOL = {}));
    let rect;
    let main;
    let mousepositon;
    let farm;
    let priceNew;
    let fundsValue;
    let inputHarvest;
    function hndload(_event) {
        mousepositon = new Garden.Vector(0, 0);
        // // Buttons for Planting veggies
        let broccoliButton = document.querySelector("button#broccoli");
        let cabbageButton = document.querySelector("button#cabbage");
        let cornButton = document.querySelector("button#corn");
        let carrotButton = document.querySelector("button#carrot");
        let spinachButton = document.querySelector("button#spinach");
        let pesticidesButton = document.querySelector("button#buttonPesticides");
        let waterButton = document.querySelector("button#buttonWater");
        let fertilizerButton = document.querySelector("button#buttonFertilizer");
        let harvestButton = document.querySelector("button#harvest");
        broccoliButton.addEventListener("click", useTool);
        cabbageButton.addEventListener("click", useTool);
        cornButton.addEventListener("click", useTool);
        carrotButton.addEventListener("click", useTool);
        spinachButton.addEventListener("click", useTool);
        pesticidesButton.addEventListener("click", useTool);
        waterButton.addEventListener("click", useTool);
        fertilizerButton.addEventListener("click", useTool);
        harvestButton.addEventListener("click", useTool);
        let canvas = document.querySelector("#canvas");
        Garden.context = canvas.getContext("2d");
        Garden.context.lineWidth = innerWidth;
        main = document.querySelector("#main");
        main.style.display = "none";
        let startSimulationButton = document.querySelector("#startSimulationButton");
        startSimulationButton.addEventListener("click", startGame);
        let startGameForm = document.querySelector("#startGameForm");
        startGameForm.addEventListener("submit", hndchange);
        let consumablesForm = document.querySelector("#toolsMenuForm");
        consumablesForm.addEventListener("submit", hndchange);
        farm = new Garden.Farm();
        canvas.addEventListener("click", pathclicklisterner);
        canvas.addEventListener("mousemove", setmouseposition);
        Garden.createPaths();
        // canvas.addEventListener("mousedown", clickField);
        updatePrices();
    }
    function startGame(_event) {
        let startGameMenu = document.querySelector("#startGameMenu");
        startGameMenu.style.display = "none";
        console.log("Game starts");
        main.style.display = "";
        updateFarm();
        getFunds();
        setInterval(updatePrices, 10000);
        setInterval(update, 40);
    }
    function hndchange(_event) {
        _event.preventDefault();
        // let formData: FormData = new FormData(document.forms[0]);
    }
    function update() {
        let canvas = document.querySelector("#canvas");
        Garden.context.clearRect(0, 0, canvas.width, canvas.height);
        farm.update(fundsValue, inputHarvest);
    }
    function updateFarm() {
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
    function buy() {
        fundsValue -= priceNew;
        document.querySelector("#funds").innerHTML = fundsValue.toString();
    }
    function useTool(_event) {
        if (_event.target.id == "broccoli") {
            Garden.tool = TOOL.BROCOLI;
            if (0 < fundsValue - priceNew) {
                farm.plant(Garden.tool);
                buy();
            }
        }
        if (_event.target.id == "carrot") {
            Garden.tool = TOOL.CARROT;
            if (0 < fundsValue - priceNew) {
                farm.plant(Garden.tool);
                buy();
            }
        }
        if (_event.target.id == "cabbage") {
            Garden.tool = TOOL.CABBAGE;
            if (0 < fundsValue - priceNew) {
                farm.plant(Garden.tool);
                buy();
            }
        }
        if (_event.target.id == "corn") {
            Garden.tool = TOOL.CORN;
            if (0 < fundsValue - priceNew) {
                farm.plant(Garden.tool);
                buy();
            }
        }
        if (_event.target.id == "spinach") {
            Garden.tool = TOOL.SPINACH;
            if (0 < fundsValue - priceNew) {
                farm.plant(Garden.tool);
                buy();
            }
        }
        if (_event.target.id == "buttonPesticides") {
            Garden.tool = TOOL.PESTICIDES;
            if (0 < fundsValue - priceNew) { //other price
                farm.plant(Garden.tool);
                buy();
            }
        }
        if (_event.target.id == "buttonWater") {
            Garden.tool = TOOL.WATER;
            farm.plant(Garden.tool);
        }
        if (_event.target.id == "buttonFertilizer") {
            Garden.tool = TOOL.FERTILIZER;
            if (0 < fundsValue - priceNew) { //other price
                farm.plant(Garden.tool);
                buy();
            }
        }
        if (_event.target.id == "harvest") {
            Garden.tool = TOOL.HARVEST;
            farm.plant(Garden.tool);
        }
        console.log(Garden.tool);
    }
    function updatePrices() {
        setWorthHarvest();
        pricePlant();
        setPriceConsumalbles();
    }
    function getFunds() {
        let fundsAtStart = document.getElementById("fundsAtStart");
        fundsValue = parseInt(fundsAtStart.value);
        document.querySelector("#funds").innerHTML = fundsValue + "";
        console.log(fundsValue);
    }
    function setWorthHarvest() {
        inputHarvest = Math.round(Math.random() * 25);
        document.querySelector("#harvestWorth").innerHTML = inputHarvest + "";
    }
    function pricePlant() {
        let inputPlant = Math.round(Math.random() * 25.34);
        document.querySelector("#pricePlant").innerHTML = inputPlant + "";
    }
    function setPriceConsumalbles() {
        let priceRangeLow = document.getElementById("priceRangeLow");
        let inputLow = parseInt(priceRangeLow.value);
        let priceRangeHigh = document.getElementById("priceRangeHigh");
        let inputHigh = parseInt(priceRangeHigh.value);
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
    function pathclicklisterner(_event) {
        let canvas = document.querySelector("#canvas");
        for (let index = 0; index < farm.field.length; index++) {
            rect = canvas.getBoundingClientRect();
            if (Garden.context.isPointInPath(farm.field[index].fieldpath, _event.clientX - rect.left, _event.clientY - rect.top)) { //wenn innerhalb eines Pfades gedrückt wurde
                farm.lastfield = farm.field[index].fieldnumber;
            }
        }
    }
    function setmouseposition(_event) {
        let canvas = document.querySelector("#canvas");
        rect = canvas.getBoundingClientRect();
        mousepositon.x = (_event.clientX - rect.left);
        mousepositon.y = (_event.clientY - rect.top);
        for (let index = 0; index < farm.field.length; index++) {
            if (Garden.context.isPointInPath(farm.field[index].hoverpath, _event.clientX - rect.left, _event.clientY - rect.top)) {
                farm.field[index].sethover(); //zeige Hover Position auf Feldern an
            }
            else {
                farm.field[index].clearhover();
            }
        }
        //console.log(mousepositon);                 
        //console.log(mousepositon);
    }
})(Garden || (Garden = {}));
var Garden;
(function (Garden) {
    class Farm {
        lastfield;
        target;
        condition;
        tool;
        field = [];
        path = new Path2D();
        i = 0;
        //private hover: boolean;
        constructor() {
            this.build();
            //console.log(this.field.length);
        }
        plant(_tool) {
            this.field[this.lastfield].Interact(_tool);
        }
        build() {
            let position = new Garden.Vector(0, 0);
            console.log("Farm erstellt");
            for (let index = 0; index <= 4; index++) {
                position.y += 150;
                for (let index = 0; index < 8; index++) {
                    console.log(this.i);
                    this.field[this.i] = new Garden.Field(new Garden.Vector(position.x, position.y), this.i);
                    this.i++;
                    position.x += 150;
                    if (position.x > 1050) {
                        position.x = 0;
                    }
                }
            }
            this.lastfield = 0;
        }
        water() {
            // console.log("1Farm water");
        }
        update(_fundsvalue, _sellprice) {
            for (let i = 0; i < this.field.length; i++) {
                if (this.field[i].readysell == true) { //sell item
                    console.log(_sellprice);
                    _fundsvalue += _sellprice;
                    document.querySelector("#funds").innerHTML = _fundsvalue.toString() + "";
                    this.field[i] = new Garden.Field(this.field[i].position, this.field[i].fieldnumber);
                }
                if ((this.field[i].status == Garden.STATUS.GROW) || (this.field[i].status == Garden.STATUS.FULL)) {
                    if (this.field[i].plant.die == true) {
                        this.field[i] = new Garden.Field(this.field[i].position, this.field[i].fieldnumber); // Wenn field = die, neues Feld wird gezeichnet und altes überschrieben
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
            if (this.field[this.lastfield].status == Garden.STATUS.GROW) {
                this.field[this.lastfield].plant.updateUI();
            }
            else {
                this.field[this.lastfield].nothingplanted();
            }
            //console.log(this.lastfield);
        }
        fertilize() {
            // console.log("1Farm fertilize");
        }
        pesticide() {
            // console.log("1Farm pesticide");
        }
        getpath(_number) {
            return this.field[_number].fieldpath;
        }
    }
    Garden.Farm = Farm;
})(Garden || (Garden = {}));
var Garden;
(function (Garden) {
    let STATUS;
    (function (STATUS) {
        STATUS[STATUS["EMPTY"] = 0] = "EMPTY";
        STATUS[STATUS["GROW"] = 1] = "GROW";
        STATUS[STATUS["FULL"] = 2] = "FULL";
    })(STATUS = Garden.STATUS || (Garden.STATUS = {}));
    class Field {
        fieldpath = new Path2D();
        hoverpath = new Path2D();
        position;
        status;
        plant;
        fieldnumber;
        readysell = false;
        hover;
        constructor(_field, _filednumber) {
            this.position = _field;
            this.status = STATUS.EMPTY;
            this.fieldnumber = _filednumber;
            this.drawPath();
            //this.setcolor();
        }
        sethover() {
            this.hover = true;
        }
        clearhover() {
            this.hover = false;
        }
        nothingplanted() {
            //console.log("test");
            let waterlevel = document.querySelector("div#waterlevel");
            let pestlevel = document.querySelector("div#pestlevel");
            let fertilizerlevel = document.querySelector("div#fertilizelevel");
            waterlevel.innerHTML = "nichts angepflanzt";
            pestlevel.innerHTML = "nichts angepflanzt";
            fertilizerlevel.innerHTML = "nichts angepflanzt";
        }
        updatehover() {
            if (this.hover == true) {
                Garden.context.fillStyle = "#ff000020";
                Garden.context.fill(this.hoverpath);
            }
            if (this.hover == false) {
                Garden.context.fillStyle = "#ff000000";
                Garden.context.fill(this.hoverpath);
            }
        }
        update() {
            Garden.context.fillStyle = "#00ff00";
            Garden.context.fill(this.fieldpath);
            this.updatehover();
            Garden.context.fill(this.hoverpath);
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
        selected() {
            Garden.context.lineWidth = 10;
            Garden.context.strokeStyle = "#FF0000";
            Garden.context.stroke(this.hoverpath);
        }
        unselected() {
            Garden.context.lineWidth = 10;
            Garden.context.strokeStyle = "#FF000000";
            Garden.context.stroke(this.hoverpath);
        }
        drawPath() {
            this.fieldpath.moveTo(50 + this.position.x, 50 + this.position.y);
            this.fieldpath.lineTo(50 + this.position.x, 175 + this.position.y);
            this.fieldpath.lineTo(175 + this.position.x, 175 + this.position.y);
            this.fieldpath.lineTo(175 + this.position.x, 50 + this.position.y);
            this.fieldpath.closePath();
            Garden.context.fill();
            this.hoverpath.moveTo(50 + this.position.x, 50 + this.position.y);
            this.hoverpath.lineTo(50 + this.position.x, 175 + this.position.y);
            this.hoverpath.lineTo(175 + this.position.x, 175 + this.position.y);
            this.hoverpath.lineTo(175 + this.position.x, 50 + this.position.y);
            this.hoverpath.closePath();
            Garden.context.fill();
        }
        Interact(_tool) {
            switch (this.status) {
                case STATUS.EMPTY:
                    if (_tool == Garden.TOOL.BROCOLI) {
                        console.log("brokolie");
                        this.status = STATUS.GROW;
                        this.plant = new Garden.Broccoli(this.position);
                        console.log(this.status);
                    }
                    if (_tool == Garden.TOOL.CABBAGE) {
                        this.plant = new Garden.Cabbage(this.position);
                        this.status = STATUS.GROW;
                    }
                    if (_tool == Garden.TOOL.CARROT) {
                        this.plant = new Garden.Carrot(this.position);
                        this.status = STATUS.GROW;
                    }
                    if (_tool == Garden.TOOL.CORN) {
                        this.plant = new Garden.Corn(this.position);
                        this.status = STATUS.GROW;
                    }
                    if (_tool == Garden.TOOL.SPINACH) {
                        this.plant = new Garden.Spinach(this.position);
                        this.status = STATUS.GROW;
                    }
                    //console.log(this.status);
                    break;
                case STATUS.GROW:
                    if (_tool == Garden.TOOL.WATER) {
                        this.plant.nowWater += 250;
                    }
                    if (_tool == Garden.TOOL.FERTILIZER) {
                        this.plant.nowFertilizer += 250;
                    }
                case STATUS.FULL:
                    if (_tool == Garden.TOOL.HARVEST) {
                        this.readysell = true;
                    }
                //click(_tool)
            }
        }
    }
    Garden.Field = Field;
})(Garden || (Garden = {}));
var Garden;
(function (Garden) {
    class Plant {
        name;
        worth;
        growthrate;
        growthratenow;
        minWater;
        nowWater;
        maxWater;
        minFertilizer;
        nowFertilizer;
        maxFertilizer;
        minPesticides;
        nowPesticides;
        maxPesticides;
        growlevel = 0;
        image = new Image();
        die = false;
        position = new Garden.Vector(0, 0);
        waterlevel = document.querySelector("div#waterlevel");
        pestlevel = document.querySelector("div#pestlevel");
        fertilizerlevel = document.querySelector("div#fertilizelevel");
        constructor(_position) {
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
        update() {
            this.growthratenow--;
            console.log(this.growthratenow);
            if (this.growthratenow >= 0) {
                this.growthratenow = this.growthrate;
                this.growlevel++;
            }
            this.updateWaterfertilizer();
            // context.transform(0.25, 0, 0, 0.25, this.position.x + 50, this.position.y + 13);
            if (this.growlevel >= 1) {
                Garden.context.drawImage(this.image, this.position.x + 50, this.position.y + 100);
                if (this.growlevel >= 200) {
                    Garden.context.drawImage(this.image, this.position.x + 80, this.position.y + 50);
                    if (this.growlevel >= 300) {
                        Garden.context.drawImage(this.image, this.position.x + 110, this.position.y + 100);
                    }
                }
            }
            //console.log("fertilizer" + this.nowFertilizer + "water" + this.nowWater + this.die);
            //console.log();
        }
        grownready() {
            Garden.context.drawImage(this.image, this.position.x + 50, this.position.y + 100);
            Garden.context.drawImage(this.image, this.position.x + 80, this.position.y + 50);
            Garden.context.drawImage(this.image, this.position.x + 110, this.position.y + 100);
        }
        updateUI() {
            //console.log("test");
            this.waterlevel.innerHTML = (this.nowWater / 50).toString();
            //this.pestlevel.innerHTML = this.nowPesticides.toString();
            this.fertilizerlevel.innerHTML = (this.nowFertilizer / 50).toString();
        }
        updateWaterfertilizer() {
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
    }
    Garden.Plant = Plant;
})(Garden || (Garden = {}));
var Garden;
(function (Garden) {
    class Bugs extends Garden.Moveable {
        size;
        type;
        constructor(_size, _bugposition) {
            super(_bugposition);
            this.velocity = Garden.Vector.getRandom(100, 200);
            this.type = Math.floor(Math.random() * 4);
            this.size = _size;
        }
        draw() {
            Garden.context.save();
            Garden.context.translate(this.position.x, this.position.y);
            Garden.context.scale(this.size, this.size);
            Garden.context.translate(-50, -50);
            Garden.context.lineWidth = innerWidth / this.size;
            Garden.context.stroke(Garden.bugPaths[this.type]);
            Garden.context.restore();
            // context.beginPath();
            // context.fillStyle = "ffffff";
            // context.arc(10, 30, 25, 0, 2 * Math.PI);
            // context.closePath();
            // context.fill();
        }
    }
    Garden.Bugs = Bugs;
})(Garden || (Garden = {}));
var Garden;
(function (Garden) {
    class Bugs extends Garden.Moveable {
        size;
        type;
        constructor(_size, _bugposition) {
            super(_bugposition);
            this.velocity = Garden.Vector.getRandom(100, 200);
            this.type = Math.floor(Math.random() * 4);
            this.size = _size;
        }
        draw() {
            Garden.context.save();
            Garden.context.translate(this.position.x, this.position.y);
            Garden.context.scale(this.size, this.size);
            Garden.context.translate(-50, -50);
            Garden.context.lineWidth = innerWidth / this.size;
            Garden.context.stroke(Garden.bugPaths[this.type]);
            Garden.context.restore();
            // context.beginPath();
            // context.fillStyle = "ffffff";
            // context.arc(10, 30, 25, 0, 2 * Math.PI);
            // context.closePath();
            // context.fill();
        }
    }
    Garden.Bugs = Bugs;
})(Garden || (Garden = {}));
var Garden;
(function (Garden) {
    class Moveable {
        position;
        velocity;
        //   public expendable: boolean = false;
        //   protected hitRadius: number = 0;
        constructor(_position) {
            if (_position)
                this.position = _position.copy();
            else
                this.position = new Garden.Vector();
            this.velocity = new Garden.Vector();
        }
        //   public isHitBy(_partner: Moveable): boolean {
        //     let difference: Vector = Vector.getDifference(this.position, _partner.position);
        //     if (this.hitRadius + _partner.hitRadius < difference.length)
        //       return false;
        //     return true;
        //   }
        //   public hit(): void {
        //     this.expendable = true;
        //   }
        move(_timeslice) {
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += Garden.context.canvas.width;
            if (this.position.y < 0)
                this.position.y += Garden.context.canvas.height;
            if (this.position.x > Garden.context.canvas.width)
                this.position.x -= Garden.context.canvas.width;
            if (this.position.y > Garden.context.canvas.height)
                this.position.y -= Garden.context.canvas.height;
        }
    }
    Garden.Moveable = Moveable;
})(Garden || (Garden = {}));
var Garden;
(function (Garden) {
    Garden.shapeBugs = [
        [
            [30, 1], [50, 15], [71, 1], [88, 31], [67, 40], [84, 63], [59, 93], [30, 79], [19, 87], [2, 63], [15, 43], [8, 20]
        ],
        [
            [39, 1], [53, 28], [78, 15], [91, 41], [76, 59], [78, 82], [44, 94], [15, 83], [1, 55], [14, 14]
        ],
        [
            [39, 0], [57, 26], [68, 7], [86, 31], [88, 70], [53, 58], [54, 96], [26, 91], [28, 76], [2, 56], [15, 19]
        ],
        [
            [37, 3], [70, 14], [62, 34], [83, 31], [78, 76], [55, 96], [20, 84], [7, 67], [5, 27], [20, 15], [39, 39]
        ]
    ];
    function createPaths() {
        Garden.bugPaths = createBugBaths(Garden.shapeBugs);
        //ufoPath = createUfoPath();
    }
    Garden.createPaths = createPaths;
    function createBugBaths(_shapes) {
        let paths = [];
        for (let type of _shapes) {
            let path = new Path2D();
            let first = true;
            // console.group(type);
            for (let coordinates of type) {
                //console.log(coordinates);
                if (first)
                    path.moveTo(coordinates[0], coordinates[1]);
                else
                    path.lineTo(coordinates[0], coordinates[1]);
                first = false;
            }
            // console.groupEnd();
            path.closePath();
            paths.push(path);
        }
        return paths;
    }
    // function createUfoPath(): Path2D {
    //     let path: Path2D = new Path2D();
    //     path.moveTo(20, 13);
    //     path.lineTo(27, 3);
    //     path.lineTo(38, 3);
    //     path.lineTo(43, 13);
    //     path.lineTo(59, 25);
    //     path.lineTo(45, 35);
    //     path.lineTo(18, 35);
    //     path.lineTo(4, 25);
    //     path.lineTo(20, 13);
    //     path.lineTo(43, 13);
    //     path.closePath();
    //     path.moveTo(4, 25);
    //     path.lineTo(59, 25);
    //     path.closePath();
    //     return path;
    // }
})(Garden || (Garden = {}));
var Garden;
(function (Garden) {
    class Vector {
        x;
        y;
        constructor(_x = 0, _y = 0) {
            this.set(_x, _y);
        }
        static getDifference(_v0, _v1) {
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        }
        static getRandom(_minLength, _maxLength) {
            let length = _minLength + Math.random() * (_maxLength - _minLength);
            let direction = Math.random() * 2 * Math.PI;
            return Vector.getPolar(direction, length);
        }
        static getPolar(_angle, _length) {
            let vector = new Vector();
            vector.set(Math.cos(_angle), Math.sin(_angle));
            vector.scale(_length);
            return vector;
        }
        get length() {
            return Math.hypot(this.x, this.y);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        copy() {
            return new Vector(this.x, this.y);
        }
    }
    Garden.Vector = Vector;
})(Garden || (Garden = {}));
var Garden;
(function (Garden) {
    class Broccoli extends Garden.Plant {
        constructor(_position) {
            super(_position);
            this.growthrate = 10;
            this.growthratenow = 10;
            this.minWater = 10;
            this.minFertilizer = 5;
            this.minPesticides = 3;
            this.image.src = "icons/broccoli.png";
        }
    }
    Garden.Broccoli = Broccoli;
})(Garden || (Garden = {}));
var Garden;
(function (Garden) {
    class Cabbage extends Garden.Plant {
        constructor(_position) {
            super(_position);
            this.growthrate = 10;
            this.growthratenow = 10;
            this.minWater = 13;
            this.minFertilizer = 7;
            this.minPesticides = 15;
            this.image.src = "icons/cabbage.png";
        }
    }
    Garden.Cabbage = Cabbage;
})(Garden || (Garden = {}));
var Garden;
(function (Garden) {
    class Carrot extends Garden.Plant {
        constructor(_position) {
            super(_position);
            this.growthrate = 10;
            this.growthratenow = 10;
            this.minWater = 3;
            this.minFertilizer = 16;
            this.minPesticides = 4;
            this.image.src = "icons/carrot.png";
        }
    }
    Garden.Carrot = Carrot;
})(Garden || (Garden = {}));
var Garden;
(function (Garden) {
    class Corn extends Garden.Plant {
        constructor(_position) {
            super(_position);
            this.growthrate = 10;
            this.growthratenow = 10;
            this.minWater = 15;
            this.minFertilizer = 10;
            this.minPesticides = 15;
            this.image.src = "icons/corn.png";
        }
    }
    Garden.Corn = Corn;
})(Garden || (Garden = {}));
var Garden;
(function (Garden) {
    class Spinach extends Garden.Plant {
        constructor(_position) {
            super(_position);
            this.growthrate = 10;
            this.growthratenow = 10;
            this.minWater = 5;
            this.minFertilizer = 7;
            this.minPesticides = 8;
            this.image.src = "icons/spinach.png";
        }
    }
    Garden.Spinach = Spinach;
})(Garden || (Garden = {}));
//# sourceMappingURL=Build.js.map
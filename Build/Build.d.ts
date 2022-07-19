declare namespace Garden {
    enum TOOL {
        BROCOLI = 0,
        CABBAGE = 1,
        CORN = 2,
        CARROT = 3,
        SPINACH = 4,
        PESTICIDES = 5,
        WATER = 6,
        FERTILIZER = 7,
        HARVEST = 8
    }
    let context: CanvasRenderingContext2D;
    let tool: TOOL;
}
declare namespace Garden {
    class Farm {
        lastfield: number;
        target: Vector;
        condition: string;
        tool: TOOL;
        bug: Farmbug[];
        field: Field[];
        path: Path2D;
        private i;
        constructor();
        plant(_tool: TOOL): void;
        build(): void;
        water(): void;
        update(_fundsvalue: number, _sellprice: number): void;
        checkbug(): void;
        fertilize(): void;
        pesticide(): void;
        getpath(_number: number): Path2D;
    }
}
declare namespace Garden {
    enum STATUS {
        EMPTY = 0,
        GROW = 1,
        FULL = 2
    }
    class Field {
        fieldpath: Path2D;
        hoverpath: Path2D;
        position: Vector;
        status: STATUS;
        fieldbug: Fieldbug[];
        plant: Plant;
        fieldnumber: number;
        readysell: boolean;
        private hover;
        constructor(_field: Vector, _filednumber: number);
        sethover(): void;
        clearhover(): void;
        nothingplanted(): void;
        updatehover(): void;
        update(): void;
        selected(): void;
        unselected(): void;
        drawPath(): void;
        Interact(_tool: TOOL): void;
    }
}
declare namespace Garden {
    class Plant {
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
        growlevel: number;
        image: HTMLImageElement;
        die: Boolean;
        position: Vector;
        waterlevel: HTMLDivElement;
        pestlevel: HTMLDivElement;
        fertilizerlevel: HTMLDivElement;
        constructor(_position: Vector);
        update(): void;
        grownready(): void;
        updateUI(): void;
        updateWaterfertilizer(): void;
    }
}
declare namespace Garden {
    class Farmbug {
        size: number;
        position: Vector;
        image: HTMLImageElement;
        number: number;
        constructor();
        update(): void;
    }
}
declare namespace Garden {
    class Fieldbug {
        position: Vector;
        image: HTMLImageElement;
        number: number;
        constructor(_number: number);
        update(): void;
    }
}
declare namespace Garden {
    let bugPaths: Path2D[];
    let ufoPath: Path2D;
    let shapeBugs: number[][][];
    function createPaths(): void;
}
declare namespace Garden {
    class Vector {
        x: number;
        y: number;
        constructor(_x?: number, _y?: number);
        static getDifference(_v0: Vector, _v1: Vector): Vector;
        static getRandom(_minLength: number, _maxLength: number): Vector;
        static getPolar(_angle: number, _length: number): Vector;
        get length(): number;
        set(_x: number, _y: number): void;
        scale(_factor: number): void;
        add(_addend: Vector): void;
        copy(): Vector;
    }
}
declare namespace Garden {
    class Broccoli extends Plant {
        constructor(_position: Vector);
    }
}
declare namespace Garden {
    class Cabbage extends Plant {
        constructor(_position: Vector);
    }
}
declare namespace Garden {
    class Carrot extends Plant {
        constructor(_position: Vector);
    }
}
declare namespace Garden {
    class Corn extends Plant {
        constructor(_position: Vector);
    }
}
declare namespace Garden {
    class Spinach extends Plant {
        constructor(_position: Vector);
    }
}

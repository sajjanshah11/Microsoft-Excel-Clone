let rowNumberSection = document.querySelector(".row-number-section");
let selectedSingleDiv = document.querySelector(".selected-cell-div");
let cellDivison1 = document.querySelector(".cell-division");
let columnNumberSection = document.querySelector(".column-number-section");
let formulaInputSection = document.querySelector(".formula-input-section")


formulaInputSection.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {

        let formulaInputValue = e.currentTarget.value;

        if (prevCell == undefined) {
            return;
        }

        let currCellAdress = prevCell.getAttribute("cellAdress");

        let cellObj = dataObj[currCellAdress];

        cellObj.formula = formulaInputValue;

        console.log(cellObj)

        let currentUpStream = cellObj.upstream;

        for (let k = 0; k < currentUpStream.length; k++) {
            removeFromDownStream(currentUpStream[k], currentCellAdress);
        }

        cellObj.upstream = [];

        let formulaArr = formulaInputValue.split(" ");

        
        let cellsInFormula = [];

        for (let i = 0; i < formulaArr.length; i++) {
            if (formulaArr[i] != "+" && formulaArr[i] != "-" && formulaArr[i] != "*" && formulaArr[i] != "/" && isNaN(formulaArr[i])) {
                cellsInFormula.push(formulaArr[i])
            }
        }

       

        for (let i = 0; i < cellsInFormula.length; i++) {
            addToDownStream(cellsInFormula[i], currCellAdress)
        }

        cellObj.upstream = cellsInFormula

        

        let valObj = {}

        for (let i = 0; i < cellsInFormula.length; i++) {
            let currValue = dataObj[cellsInFormula[i]].value
            valObj[cellsInFormula[i]] = currValue;
            
        }
        // console.log(valObj);
        for (let key in valObj) {
            formulaInputValue = formulaInputValue.replace(key, valObj[key])
        }

        let updatedValue = eval(formulaInputValue);

        console.log(updatedValue);

        prevCell.innerText = updatedValue;
        
        cellObj.value  = updatedValue;


        let downStream = cellObj.downstream

        for(let i = 0; i < downStream.length; i++){
            updateCell(downStream[i]);
        }

        dataObj[currCellAdress] = cellObj

    }
})


cellDivison1.addEventListener("scroll", function (e) {
    // console.log(e.currentTarget.scrollLeft);
    columnNumberSection.style.transform = `translateX(-${e.currentTarget.scrollLeft}px)`
    rowNumberSection.style.transform = `translateY(-${e.currentTarget.scrollTop}px)`
})



for (let i = 1; i <= 100; i++) {
    let div = document.createElement("div");
    div.innerText = i;
    div.classList.add("row-number")
    rowNumberSection.append(div)
}



for (let i = 0; i < 26; i++) {
    let ascii = i + 65;
    let requiredAlphbet = String.fromCharCode(ascii);
    let div = document.createElement("div");
    div.innerText = requiredAlphbet;
    div.classList.add("column-tag");
    columnNumberSection.append(div);
}

let prevCell = undefined;

let dataObj = {};

for (let i = 1; i <= 100; i++) {
    let rowCell = document.createElement("div");
    rowCell.classList.add("row-cell")
    for (let j = 0; j < 26; j++) {
        let ascii = j + 65;
        let alphabet = String.fromCharCode(ascii);
        let cellValue = alphabet + i;
        dataObj[cellValue] = {
            value: undefined,
            formula: undefined,
            upstream: [],
            downstream: []
        }
        let cellDiv = document.createElement("div");

        cellDiv.addEventListener("input", function (e) {
            let currentCellAdress = e.currentTarget.getAttribute("cellAdress");
            let currentCellObject = dataObj[currentCellAdress]
            currentCellObject.value = e.currentTarget.innerText;
            // console.log(currentCellObject)
            currentCellObject.formula = undefined;
            let currentUpStream = currentCellObject.upstream;
            for (let k = 0; k < currentUpStream.length; k++) {
                removeFromDownStream(currentUpStream[k], currentCellAdress);
            }
            currentCellObject.upstream = [];

            let currentCellDownstream = currentCellObject.downstream;

            for (let m = 0; m < currentCellDownstream.length; m++) {
                updateCell(currentCellDownstream[m]);
            }

            dataObj[currentCellAdress] = currentCellObject;

            console.log(dataObj);
            console.log(2);
        })
        cellDiv.contentEditable = true;

        cellDiv.classList.add("cell");
        cellDiv.setAttribute("cellAdress", cellValue);
        cellDiv.addEventListener("click", function (e) {
            if (prevCell != undefined) {
                prevCell.classList.remove("cell-selected");
            }
            e.currentTarget.classList.add("cell-selected");
            prevCell = e.currentTarget;

            let cellAttribute = e.currentTarget.getAttribute("cellAdress");

            selectedSingleDiv.innerText = cellAttribute

        })
        rowCell.append(cellDiv);
    }

    cellDivison1.append(rowCell);
}

// dataObj["A1"].value = 20;
// dataObj["A1"].downstream = ["B1"];

// dataObj["B1"].value = 40;
// dataObj["B1"].formula = "2 * A1";
// dataObj["B1"].upstream = ["A1"]

// let a1cell = document.querySelector("[cellAdress = 'A1']")
// let a2cell = document.querySelector("[cellAdress = 'B1']")

// a1cell.innerText = 20
// a2cell.innerText = 40


function removeFromDownStream(parentcell, childcell) {

    let parentDownstream = dataObj[parentcell].downstream;

    let filteredDownStream = [];

    for (let k = 0; k < parentDownstream.length; k++) {

        if (parentDownstream[k] != childcell) {
            filteredDownStream.push(parentDownstream[k]);
        }
    }

    dataObj[parentcell].downstream = filteredDownStream
}

function updateCell(cell) {

    let cellObj = dataObj[cell];
    let formula = cellObj.formula;
    let CurrentUpstream = cellObj.upstream;

    let valObj = {}

    for (let i = 0; i < CurrentUpstream.length; i++) {
        let currValue = dataObj[CurrentUpstream[i]].value
        valObj[CurrentUpstream[i]] = currValue;
    }

    for (let key in valObj) {
        formula = formula.replace(key, valObj[key])
    }

    let updatedValue = eval(formula);

    let cellOnUi = document.querySelector(`[cellAdress = '${cell}']`);
    cellOnUi.innerText = updatedValue

    cellObj.value = updatedValue;
    dataObj[cell].value = updatedValue;

    let downstream = cellObj.downstream;

    for (let i = 0; i < downstream.length; i++) {
        updateCell(downstream[i]);
    }
}


function addToDownStream(parent, child) {

    dataObj[parent].downstream.push(child)
}

let rowNumberSection = document.querySelector(".row-number-section");
let selectedSingleDiv = document.querySelector(".selected-cell-div");
let cellDivison1 = document.querySelector(".cell-division");
let columnNumberSection = document.querySelector(".column-number-section");



cellDivison1.addEventListener("scroll",function(e){
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

let dataObj = {

}

for (let i = 1; i <= 100; i++) {
    let rowCell = document.createElement("div");
    rowCell.classList.add("row-cell")
    for (let j = 0; j < 26; j++) {
        let ascii = j + 65;
        let alphabet = String.fromCharCode(ascii);
        let cellValue = alphabet + i;
        dataObj[cellValue] = {
            value:undefined,
            formula:undefined,
            upstream:[],
            downstream:[]
        }
        let cellDiv = document.createElement("div");

        cellDiv.addEventListener("input",function(e){
            let currentCellAdress = e.currentTarget.getAttribute("cellAdress");
            let currCellObject = dataObj[currentCellAdress]
            console.log(currCellObject)
            console.log(e.currentTarget.innerText)
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


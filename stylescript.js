let alignItems = document.querySelectorAll(".option-3 i");
// console.log(alignItems)

alignItems[0].addEventListener("click", function () {

    if (prevCell != undefined) {
        prevCell.style.textAlign = "left"
        let address = prevCell.getAttribute("cellAdress")
        dataObj[address].align = "left"
    }

})

alignItems[1].addEventListener("click", function () {

    if (prevCell != undefined) {
        prevCell.style.textAlign = "center";
        let address = prevCell.getAttribute("cellAdress");
        dataObj[address].align = "center";

    }
})

alignItems[2].addEventListener("click", function () {

    if (prevCell != undefined) {
        prevCell.style.textAlign = "right"
        let address = prevCell.getAttribute("cellAdress")
        dataObj[address].align = "right"
    }
})


let boldItalUnder = document.querySelectorAll(".option-1 i");

// console.log(boldItalUnder)

boldItalUnder[0].addEventListener("click", function () {
    if (prevCell) {
        prevCell.style.fontWeight = "bold"
    }
})

boldItalUnder[1].addEventListener("click", function () {
    if (prevCell) {
        prevCell.style.fontStyle = "italic";
    }
})

boldItalUnder[2].addEventListener("click", function () {
    if (prevCell) {
        prevCell.style.textDecoration = "underline";
    }
})

let cellBackgroundColor = document.querySelectorAll(".option-4 i")
let body = document.createElement("body");

cellBackgroundColor[0].addEventListener("click", function () {
    let colorPickerElement = document.createElement("input");
    colorPickerElement.type = "color";
    body.append(colorPickerElement);
    colorPickerElement.click();

    colorPickerElement.addEventListener("input", function (e) {
        let colorValue = e.currentTarget.value;
        if (prevCell) {
            prevCell.style.backgroundColor = colorValue;
            let adress = prevCell.getAttribute("cellAdress");
            dataObj[adress].backgroundColor = colorValue
        }
    })
})

cellBackgroundColor[1].addEventListener("click", function () {
    let colorPickerElement = document.createElement("input");
    colorPickerElement.type = "color";
    body.append(colorPickerElement);
    colorPickerElement.click();

    colorPickerElement.addEventListener("input", function (e) {
        let colorValue = e.currentTarget.value;
        if (prevCell) {
            prevCell.style.color = colorValue;
            let adress = prevCell.getAttribute("cellAdress");
            dataObj[adress].color = colorValue
        }
    })
})


let fileDiv = document.querySelector(".file");

fileDiv.addEventListener("click", function (e) {
    let fileOpenAttr = fileDiv.getAttribute("file-open")
    if (fileOpenAttr == "false") {
        let fileDropdown = document.createElement("div");
        fileDropdown.innerHTML = `
        <p>Save</p>
        <p>Clear</p>
        `
        fileDropdown.classList.add("filesDropdown")
        fileDiv.append(fileDropdown)
        fileDiv.setAttribute("file-open","true")
        let saveAndClearTag = document.querySelectorAll(".filesDropdown p");
        saveAndClearTag[0].addEventListener("click",function(){
            localStorage.setItem("sheet",JSON.stringify(dataObj));
        })

        saveAndClearTag[1].addEventListener("click",function(){
            localStorage.setItem("sheet"," ")
        })
    } else {
        document.querySelector(".filesDropdown").remove()
        fileDiv.setAttribute("file-open","false")
    }

})

let helpDiv = document.querySelector(".help")

helpDiv.addEventListener("click", function (e) {
    let modalDiv = document.createElement("div");

    modalDiv.classList.add("modal")
    helpDiv.append(modalDiv)
})

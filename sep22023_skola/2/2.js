const body = document.body;
const container = document.createElement('div');
container.style.display = "flex";
body.appendChild(container);

let colors = ["green", "red", "blue", "yellow"];

function renderRectangles(colors){
    container.innerHTML = ""; //cisti prethodne pravougaonike
    //zeleni pravougaonik
    const greenRect = document.createElement('div');
    greenRect.style.backgroundColor=colors[0];
    greenRect.style.width = "100px";
    greenRect.style.height = "300px";
    greenRect.style.border = "solid 2px black";
    greenRect.style.borderRight = "none";
    container.appendChild(greenRect);

    //div sa 3 kvadrata
    const squares = document.createElement('div');
    squares.style.display = "flex";
    squares.style.flexDirection = "column"; //vertikalni raspored

    for(let i=1; i<colors.length; i++){
        const sqr = document.createElement('div');
        sqr.style.backgroundColor = colors[i];
        //zbog bordera nam nisu zaokruzene vr
        sqr.style.width = "98px";
        sqr.style.height = "97.5px";
        sqr.style.border = "2px solid black";
        squares.appendChild(sqr);
    }
    container.appendChild(squares);
}

function rotateColors(){
    colors.unshift(colors.pop());
    renderRectangles(colors);
}

container.addEventListener("click",rotateColors);
renderRectangles(colors);
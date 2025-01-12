document.body.style.margin = '0';

function hover(event) {
  if(event.target.style.backgroundColor!='grey')
    event.target.style.backgroundColor = 'lightgrey';
  if(mouseDown){
    event.target.style.backgroundColor = 'grey';
  }
}

function unhover(event) {
  if(event.target.style.backgroundColor!='grey')
    event.target.style.backgroundColor = '#f0f0f0';
}

function clicked(event) {
  event.target.style.backgroundColor = 'grey';
  mouseDown = true;
}

function unclicked(event){
  mouseDown = false;
}

let XGrids = 32;
let YGrids = 32;
let mouseDown = false;


const buttonContainer = document.createElement('div');
buttonContainer.setAttribute('style', `
    display: flex;
    width: 100%;
    height: 4vh;
    justify-content: space-evenly;
    align-items: center;
`);

const button1 = document.createElement('button');
button1.setAttribute('style', `
    display: flex;
    width: 30vh;
    height: 4vh;
    justify-content: center;
    align-items: center;
    color: black;
    padding: 0;
    border: 1px solid black;
    border-radius: 20px;
`);
button1.textContent = 'Change number of grids in X axis:';
buttonContainer.appendChild(button1);


button1.style.textAlign = 'center';
button1.addEventListener('mouseover', hover);
button1.addEventListener('mouseout', unhover);
button1.addEventListener('click', () => {
  XGrids = prompt('Enter number of grids for X axis:');
  drawGrid();
});

const button2 = document.createElement('button');
button2.setAttribute('style', `
    display: flex;
    width: 30vh;
    height: 4vh;
    justify-content: center;
    align-items: center;
    color: black;
    padding: 0;
    border: 1px solid black;
    border-radius: 20px;
`);
button2.textContent = 'Change number of grids in Y axis:';
buttonContainer.appendChild(button2);


button2.style.textAlign = 'center';
button2.addEventListener('mouseover', hover);
button2.addEventListener('mouseout', unhover);
button2.addEventListener('click', () => {
  YGrids = prompt('Enter number of grids for Y axis:');
  drawGrid();
});

document.body.appendChild(buttonContainer);


const content = document.createElement('div');
content.setAttribute('style', `
    width: 100%;
    height: 96vh;
    display: flex;
    margin: 0;
`);
content.style.flexWrap = 'wrap';

function drawGrid(){
    content.innerHTML = '';
    for(let i=0; i<XGrids*YGrids; i++){
        const div = document.createElement('div');
        div.style.boxSizing = 'border-box';
        div.style.width = `${100/XGrids}%`;
        div.style.height = `${100/YGrids}%`;
        if(mouseDown){
          div.style.backgroundColor = 'grey';
        } else {
          div.style.backgroundColor = '#f0f0f0';
        }
        div.style.border = '0.5px solid gray';
        div.addEventListener('mouseover', hover);
        div.addEventListener('mouseout', unhover);
        div.addEventListener('mousedown', clicked);
        content.appendChild(div);
    }
}

content.addEventListener('mouseup', unclicked);

drawGrid();
document.body.appendChild(content);

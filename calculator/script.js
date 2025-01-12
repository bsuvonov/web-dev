
document.body.style.margin = 0;
document.body.style.padding = 0;
document.body.style.backgroundColor = 'grey';
document.body.style.height='100vh';
document.body.style.display='flex';
document.body.style.justifyContent='center';
document.body.style.alignItems='center';


/* CALC BLOCK SETTINGS */
const calc = document.createElement('div');
calc.style.display='flex';
calc.style.flexGrow=0;
calc.style.flexShrink=1;
calc.style.width='500px';
calc.style.height='95vh';
calc.style.borderRadius='50px';
calc.style.backgroundColor='#28282B';
calc.style.flexDirection='column';
calc.style.justifyContent='space-evenly';
calc.style.alignItems='center';
calc.style.border='5px solid silver'

document.body.appendChild(calc);



/* SCREEN SETTINGS */

const screen = document.createElement('div');
screen.style.display='flex';
screen.style.flexGrow=0;
screen.style.flexShrink=1;
screen.style.flexBasis='100px';
screen.style.borderRadius='20px';
screen.style.width='84%';
screen.style.flexWrap='wrap';
screen.style.backgroundColor='white';
screen.style.alignItems='center';
screen.style.marginTop='5%';
screen.style.marginBottom='4%';
screen.textContent='';
screen.style.fontWeight='bold';
screen.style.fontSize='70px';
screen.style.justifyContent='right';
screen.style.border='5px solid silver';
screen.style.fontFamily='Digital7';
screen.style.paddingRight='2%';
calc.appendChild(screen);


/* BUTTONS SETTINGS */

/* top buttons */

const topOperators = document.createElement('div');
topOperators.style.display='flex';
topOperators.style.flexGrow=0;
topOperators.style.flexShrink=1;
topOperators.style.flexBasis='100px';
topOperators.style.width='95%';
topOperators.style.justifyContent='space-evenly';
topOperators.style.alignItems='center';
calc.appendChild(topOperators);

const opAc = document.createElement('button');
opAc.textContent='AC';
opAc.style.flexBasis='20%';
opAc.style.height='70%';
topOperators.append(opAc);

const opDel = document.createElement('button');
opDel.textContent='DEL';
opDel.style.flexBasis='20%';
opDel.style.height='70%';
topOperators.append(opDel);

const opMod = document.createElement('button');
opMod.textContent='%';
opMod.style.flexBasis='20%';
opMod.style.height='70%';
topOperators.append(opMod);

const opPlus = document.createElement('button');
opPlus.textContent='+';
opPlus.style.flexBasis='20%';
opPlus.style.height='70%';
topOperators.append(opPlus);


/* middle buttons */
const mid = document.createElement('div');
mid.style.display='flex';
mid.style.flexGrow=0;
mid.style.flexShrink=1;
mid.style.flexBasis='300px';
mid.style.width='95%';
mid.style.alignItems='center';
mid.style.justifyContent='space-between';
calc.appendChild(mid);

const digits = document.createElement('div');
digits.style.display='flex';
digits.style.flexGrow=0;
digits.style.flexShrink=1;
digits.style.flexBasis='410px';
digits.style.height='300px';
digits.style.flexWrap='wrap';
digits.style.justifyContent='space-evenly';
digits.style.alignItems='center';
mid.appendChild(digits);

for(let i=9; i>0; i--){
    const digit = document.createElement('button');
    digit.textContent=String(i);
    digit.style.flexBasis='26%';
    digit.style.height='25%';
    digits.appendChild(digit);
}

const rightOps = document.createElement('div');
rightOps.style.display='flex';
rightOps.style.flexGrow=0;
rightOps.style.flexShrink=1;
rightOps.style.flexBasis='130px';
rightOps.style.height='300px';
rightOps.style.flexWrap='wrap';
rightOps.style.justifyContent='left';
rightOps.style.alignItems='center';
mid.appendChild(rightOps);

const opMinus = document.createElement('button');
opMinus.textContent='-';
opMinus.style.fontSize='40px';
opMinus.style.flexBasis='83%';
opMinus.style.height='25%';
rightOps.appendChild(opMinus);

const opMult = document.createElement('button');
opMult.textContent='*';
opMult.style.flexBasis='83%';
opMult.style.height='25%';
rightOps.appendChild(opMult);

const opDiv = document.createElement('button');
opDiv.textContent='/';
opDiv.style.flexBasis='83%';
opDiv.style.height='25%';
rightOps.appendChild(opDiv);


/* operators downwards */

const downOperators = document.createElement('div');
downOperators.style.display='flex';
downOperators.style.flexGrow=0;
downOperators.style.flexShrink=1;
downOperators.style.flexBasis='100px';
downOperators.style.width='95%';
downOperators.style.flexWrap='wrap';
downOperators.style.justifyContent='space-evenly';
downOperators.style.alignItems='center';
calc.appendChild(downOperators);

const digitZero = document.createElement('button');
digitZero.textContent='0';
digitZero.style.flexBasis='20%';
digitZero.style.height='70%';
downOperators.append(digitZero);

const opDot = document.createElement('button');
opDot.textContent='.';
opDot.style.flexBasis='20%';
opDot.style.height='70%';
downOperators.append(opDot);

const opEqual = document.createElement('button');
opEqual.textContent='=';
opEqual.style.flexBasis='44%';
opEqual.style.height='70%';
downOperators.append(opEqual);


/* FUNCTIONALITY */

let content = '';

/* event handling */

function mouseOnTop(e){
    e.target.style.backgroundColor='#E8E8E8';
    e.target.style.cursor='pointer';
}

function mouseNotOnTop(e){
    e.target.style.backgroundColor='white';
}

function mousePressed(e){
    e.target.style.boxShadow='0 5px #666';
    e.target.style.boxShadow='0 0 0 white';
    if(e.target.textContent==='AC'){
        content='';
    }
    else if(e.target.textContent==='DEL'){
        content = content.slice(0, -1);
    }
    else if(e.target.textContent==='='){
        try {
            calculate();
        }
        catch (err){
            printError(err);
            return;
        }
    }
    else{
        content += e.target.textContent;
    }
    screen.textContent = String(content).slice(-12);
}

function mousePressReleased(e){
    e.target.style.boxShadow='2px 1px 2px lightgray';
}


/* further logic */


// Shunting Yard algorithm for calculation

function precedence(op) {
    if (op === '+' || op === '-')
        return 1;
    if (op === '*' || op === '/' || op === '%')
        return 2;
    return 0;
}

function infixToPostfix(expression) {
    const stack = [];
    const postfix = [];

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (/[0-9]/.test(char) || (i-1!==0 && '+-*/%'.includes(char) && (i-1===-1 || '+-*/%'.includes(expression[i-1])))) {
            let number = char;
            while(i < expression.length && /[0-9.]/.test(expression[++i]))
                number = number + expression[i];
            postfix.push(number);
            i--;
        }
        else if ('+-*/%'.includes(char)) {
            while (stack.length > 0 && precedence(stack[stack.length-1]) >= precedence(char) ) {
                postfix.push(stack.pop());
            }
            stack.push(char);
        }
    }

    while (stack.length > 0) {
        postfix.push(stack.pop());
    }

    return postfix;
}

function evaluatePostfix(a){
    let operands = [];

    for(let elem of a){
        if(!isNaN(Number(elem))){
            operands.push(Number(elem));
        } else {
            if(operands.length < 2) throw 'error';
            let b = operands.pop();
            let a = operands.pop();

            switch (elem) {
                case '+':
                    operands.push(a+b);
                    break;
                case '-':
                    operands.push(a-b);
                    break;
                case '*':
                    operands.push(a*b);
                    break;
                case '/':
                    operands.push(a/b);
                    break;
                case '%':
                    operands.push(a%b);
                    break;
                default:
                    throw 'error';
            }
        }
    }
    if(operands.length!==1) throw 'error';
    return operands[0];
}

function calculate(){
    a = infixToPostfix(content);
    console.log(a);
    let result = evaluatePostfix(a);
    screen.textContent = content = result;
}
  

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function printError(err){
    screen.textContent=err;
    content='';
    sleep(3000).then(() => { screen.textContent = content; });
}


/* common button settings applied here */

buttons = document.querySelectorAll('button');

for (let button of buttons){
    button.addEventListener('mouseover', mouseOnTop);
    button.addEventListener('mouseout', mouseNotOnTop);
    button.addEventListener('mousedown', mousePressed);
    button.addEventListener('mouseup', mousePressReleased);
    button.style.boxShadow='2px 1px 2px lightgray';
    button.style.fontWeight='bold';
    button.style.fontSize='40px';
    button.style.backgroundColor='white';
    button.style.borderRadius='20px';
}


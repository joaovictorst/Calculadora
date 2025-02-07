let display = document.getElementById('display')
let history = document.getElementById('history')

let histo = [];

let opPonto = ['+','-','*','/'];
let oper = ["+", "-", "*", "/"];

function historyInsert(num) {
    histo.unshift(num)
    console.log(histo)
}

function type(object){
    if(display.innerText == `escreva um calculo`){
        display.innerText = object.innerText
    }else {

        display.innerText += object.innerText
    }
}


function result() {
    let expression = display.innerText
    let regex = /(\d+|mod|[÷x\-\+\%\(\)√π])/g;
    expression = expression.match(regex)
    if(expression == null){
        display.innerText = `escreva um calculo`
    }else{
        verifySymbol(expression)
    }
    
}

function verifySymbol(expression) {
    let op = expression.indexOf('x');
    if(expression.indexOf('x') > -1){
        let som = Number(expression[--op]) * Number(expression[op + 2])
        historyInsert(som)
        // display.innerText = expression[--op] * expression[++op]
    }
}

function deleteDisplay() {
    if(display.innerText == "escreva um calculo"){
        display.innerText = "";
    }else{
        display.innerText = display.innerText.slice(0, -1)
    }
}
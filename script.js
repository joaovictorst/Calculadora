let display = document.getElementById('display')
let history = document.getElementById('history')

let opPonto = ['+', '-', '*', '/'];
let oper = ["+", "-", "*", "/"];

function historyInsert(num) {
    history.innerHtml = `<p>${num}</p>`
}

function type(object) {
    if (display.innerText == `escreva um calculo`) {
        display.innerText = object.innerText
    } else {

        display.innerText += object.innerText
    }
}


function result() {
    let expression = display.innerText
    let regex = /(\d+|mod|x²|[÷x\-\+\%\(\)√π])/g;
    expression = expression.match(regex)
    if (expression == null) {
        display.innerText = `escreva um calculo`
    } else {
        display.innerText = verifySymbol(expression);
    }

}

function verifySymbol(expression) {
    parentheses(expression)
}

function parentheses(expression) {
    for(let i = 0; i < expression.length; i++){
        if(expression[i] == "("){
            let closeParen = expression.indexOf(')')
            let array = expression.slice(i + 1,closeParen)
            resolve(array)
        }
        return
    }
}

function expAndRad(array){
    for(let i = 0; i < array.length; i++){
        if(array[i] == 'x²'){
            let calc = array[i-1] * array[i-1];
            array.splice(i - 1, i, calc)

        }else if (array[i] == '√'){
            let calc =  Math.sqrt(array[i+1]);
            array.splice(i, i + 1, calc)
        }
    }
    console.log(array)
}

function multAndDiv(){

}

function resolve(array){
    array = numberfy(array);
    expAndRad(array)
     
}

function numberfy(array){
    // essa função transforma os numeros dentro da string em tipo number
    // e os operadores continuam em string
    for(let i = 0; i < array.length; i++){
        if(array[i].match(/\d+/g)){
            array[i] = Number(array[i])
        }
    }

    return array
}

function deleteDisplay() {
    if (display.innerText == "escreva um calculo") {
        display.innerText = "";
    } else {
        display.innerText = display.innerText.slice(0, -1)
    }
}
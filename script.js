let display = document.getElementById('display')
let history = document.getElementById('history')



function type(object) {
    if (display.innerText == `escreva um calculo`) {
        display.innerText = object.innerText
    } else {

        display.innerText += object.innerText
    }
}

function createDisplayElement(text = null,calc){
    const result = document.createElement('p');
    const expression = document.createElement('p')
    const calculator = document.createElement('p')
    const element = document.createElement('div')
    if(text) {
        result.innerText = text;
        expression.innerText = '=';
        calculator.innerText = calc;
        element.prepend(result);
        element.prepend(expression);
        element.prepend(calculator);
    }
    
    return element
}


function result() {
    let expression = display.innerText;
    let calc = expression;
    let regex = /(\d+|mod|x²|[÷x\-\+\%\(\)√π])/g;
    expression = expression.match(regex)
    if (expression == null) {
        display.innerText = `escreva um calculo`
    } else {
        //display.innerText = verifySymbol(expression);
        let result = precedenceOrder(numberfy(expression))
        if(result[0] == '-'){
            result = result.join('')
        }else {
            for (let i = 0; result.length > 1; i++) {
                console.log(result)
                result = precedenceOrder(result)
            }

            result = result.join('')
        }

       history.prepend(createDisplayElement(result,calc))
    }

}

function precedenceOrder(array) {
    if (array.includes('(') && array.includes(')')) {
        let calc = parenteses(array)
        let init = array.indexOf('(')
        let close = array.indexOf(')')
        array.splice(init, close - init + 1, calc)
        return array
    } else if (array.includes('x²') || array.includes('√')) {
        let init = 0;
        if (array.includes('x²')) {
            init = array.indexOf('x²')
        } else {
            init = array.indexOf('√')
        }
        if(array.includes('x²') && array.includes('√')){
            if(array.indexOf('x²') < array.indexOf('√')){
                init = array.indexOf('x²')
            }else {
                init = array.indexOf('√')
            }
        }
        let calc = expAndRad(array)
        if(array[init] == '√'){
            array.splice(init, 2, calc)
        }else{
            array.splice(init - 1, 2, calc)
        }
        return array
    } else if (array.includes('x') || array.includes('÷')) {
        let init = 0;
        if (array.includes('x')) {
            init = array.indexOf('x')
        } else {
            init = array.indexOf('÷')
        }
        if(array.includes('x') && array.includes('÷')){
            if(array.indexOf('x') < array.indexOf('÷')){
                init = array.indexOf('x')
            }else {
                init = array.indexOf('÷')
            }
        }
        let calc = multAndDiv(array)
        array.splice(init - 1, 3, calc)
        return array
    } else if (array.includes('+') || array.includes('-')) {
        let init = 0;
        if (array.includes('+')) {
            init = array.indexOf('+')
        } else {
            init = array.indexOf('-')
        }
        if(array.includes('+') && array.includes('-')){
            if(array.indexOf('+') < array.indexOf('-')){
                init = array.indexOf('+')
            }else {
                init = array.indexOf('-')
            }
        }
        let calc = addAndSub(array)
        array.splice(init - 1, init + 2, calc)
        return array

    }
}

function parenteses(array) {
    if (array.includes('(') && array.includes(')')) {
        let init = array.indexOf('(') + 1
        let close = array.indexOf(')')
        let express = array.slice(init, close)
        let calc = precedenceOrder(express)

        for (let i = 0; calc.length > 1; i++) {
            calc = precedenceOrder(calc)
        }

        return calc[0]
    }
}

function expAndRad(array) {
    if (array.includes('x²') && array.includes('√')) {
        if (array.indexOf('x²') < array.indexOf('√')) {
            let init = array.indexOf('x²')
            let calc = array[init - 1] * array[init - 1]
            return calc
        } else {
            let init = array.indexOf('√')
            let calc = Math.sqrt(array[init+1])
            return calc
        }
    }
    if (array.includes('x²')) {
        let init = array.indexOf('x²')

        let calc = array[init - 1] * array[init - 1]
        return calc
    } else {
        let init = array.indexOf('√')

        let calc = Math.sqrt(array[init+1])
        return calc
    }

}

function multAndDiv(array) {
    if (array.includes('x') && array.includes('÷')) {
        if (array.indexOf('x') < array.indexOf('÷')) {
            let init = array.indexOf('x')
            let calc = array[init - 1] * array[init + 1]
            return calc
        } else {
            let init = array.indexOf('÷')
            let calc = array[init - 1] / array[init + 1]
            return calc
        }
    }
    if (array.includes('x')) {
        let init = array.indexOf('x')

        let calc = array[init - 1] * array[init + 1]
        return calc
    } else {
        let init = array.indexOf('÷')

        let calc = array[init - 1] / array[init + 1]
        return calc
    }
}

function addAndSub(array) {
    if (array.includes('+') && array.includes('-')) {
        if (array.indexOf('+') < array.indexOf('-')) {
            let init = array.indexOf('+')
            let calc = array[init - 1] + array[init + 1]
            return calc
        } else {
            let init = array.indexOf('-')
            let calc = array[init - 1] - array[init + 1]
            return calc
        }
    }
    if (array.includes('+')) {
        let init = array.indexOf('+')
        let calc = array[init - 1] + array[init + 1]
        return calc
    } else {
        let init = array.indexOf('-')
        for(let i = 0; i < array.length; i++){
            if(array[i] == '-'){
                if(array[i].indexOf('-') > init){
                    init = array[i].indexOf('-')
                }
            }
        }
        let calc = array[init - 1] - array[init + 1]
        return calc

    }
}

function numberfy(array) {
    // essa função transforma os numeros dentro da string em tipo number
    // e os operadores continuam em string
    for (let i = 0; i < array.length; i++) {
        if (array[i].match(/\d+/g)) {
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

result()
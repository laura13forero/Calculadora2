let valorAnterior = '';
let valorActual = '';
let operador = '';

function clearDisplay() {
    valorAnterior = '';
    valorActual = '';
    operador = '';
    updateDisplay();
}

function deleteDigit() {
    valorActual = valorActual.slice(0, -1);
    updateDisplay();
}

function appendCharacter(character) {
    if (isOperator(character)) {
        handleOperator(character);
    } else {
        valorActual += character;
    }
    updateDisplay();
}

function isOperator(character) {
    return ['+', '-', '*', '/', '%'].includes(character);
}

function handleOperator(character) {
    if (valorActual === '' && valorAnterior !== '') {
        operador = character;
    } else if (valorActual !== '' && valorAnterior === '') {
        operador = character;
        valorAnterior = valorActual;
        valorActual = '';
    } else if (valorActual !== '' && valorAnterior !== '') {
        calculateResult();
        operador = character;
        valorAnterior = valorActual;
        valorActual = '';
    }
}

function calculateResult() {
    if (valorAnterior !== '' && valorActual !== '') {
        const anterior = parseFloat(valorAnterior);
        const actual = parseFloat(valorActual);
        switch (operador) {
            case '+':
                valorActual = (anterior + actual).toString();
                break;
            case '-':
                valorActual = (anterior - actual).toString();
                break;
            case '*':
                valorActual = (anterior * actual).toString();
                break;
            case '/':
                if (actual === 0) {
                    valorActual = 'Error';  
                } else {
                    valorActual = (anterior / actual).toString();
                }
                break;
            case '%':
                valorActual = (anterior / actual).toString();
                break;
        }
        valorAnterior = '';
        operador = '';
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById('valor-anterior').textContent = valorAnterior ? valorAnterior + ' ' + operador : '';
    document.getElementById('valor-actual').textContent = valorActual;
}

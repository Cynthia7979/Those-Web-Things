var a, b;  // First & Second entries
var cache = "";
var flashing = 0;

function calculate(a,b,operation){
    switch(operation) {
        case "+": return a+b;
        case "-": return a-b;
        case "*": return a*b;
        case "/": return a/b;
    };
};

function switchOperator(current){
    var operatorButton = document.getElementById('operator');
    var currentOperator = operatorButton.innerHTML;
    function changeResultFieldOperator(operation) {
        operatorButton.innerHTML = operation;
        var resultField = document.getElementById('result');
        if (a && b) {
            // Switching operators after a calculation
            resultField.innerHTML = a + operation + b;
        } else if (a) {
            // Switching operators before entering the second entry
            resultField.innerHTML = a + operation;
        };
    };
    switch(currentOperator) {
        case "+": changeResultFieldOperator('-'); break;
        case "-": changeResultFieldOperator('*'); break;
        case "*": changeResultFieldOperator('/'); break;
        case "/": changeResultFieldOperator('+'); break;
    };
};

function onEnter(){
    console.log(a,b,cache, a && b && cache);
    var resultElement = document.getElementById('result');
    var operation = document.getElementById('operator').innerHTML;
    if (a && b && cache) {
        // Entering new first entry after previous calculation
        a = cache;
        b = "";
        cache = "";
        resultElement.innerHTML = a + operation;
    } else if (a && cache) {
        // Entering the second entry
        b = cache;
        resultElement.innerHTML = a + operation + b + '=' + calculate(parseInt(a),parseInt(b),operation);
        cache = "";
    } else if (cache) {
        // Entering the first entry
        a = cache;
        resultElement.innerHTML = a + operation;
        cache = "";
    } else if (a && b && !cache) {
        // Switching operators after a calculation
        resultElement.innerHTML = a + operation + b + '=' + calculate(parseInt(a),parseInt(b),operation);
    };
};

function onNumber(number){
    console.log(a,b,cache);
    if (cache.length >= 10) {
        // Too long: Refuse entering and flash red
        if (!flashing){flashing = 1;}
        return;
    };
    if (cache) {
        // Unfinished entry typing (a or b)
        var newResult = cache + number;
        document.getElementById('result').innerHTML = newResult;
        cache = cache + number;
    } else if (b) {
        // New entry typing after previous calculation
        a = "";
        b = "";
        document.getElementById('result').innerHTML = number;
        cache = "" + number;
    } else {
        // New entry typing for the first time
        document.getElementById('result').innerHTML = number;
        cache = "" + number;
    };
};

function onBackspace() {
    if (cache) {
        cache = cache.slice(0,-1);
        document.getElementById('result').innerHTML = cache;
    };
};

function loaded(){
    document.getElementById('operator').onclick = switchOperator;
    document.getElementById('enter').onclick = onEnter;
    document.getElementById('backspace').onclick = onBackspace;
    var numberElements = document.getElementsByClassName('number');
    for (i=0;i<numberElements.length;i++) {
        numberElements[i].onclick = function () {
            onNumber(parseInt(this.innerHTML));
        };
    };
    setInterval(flash,200);
};

function flash() {
    if (flashing) {  // Not 0
        switch (flashing % 2) {
            case 1: document.getElementById("result").style.color = "#f00"; break;
            case 0: document.getElementById("result").style.color = "#000"; break;
        };
        flashing++;
    } if (flashing==5) {  // After flashing 2 times
        flashing = 0;  // Turn it off
    };
};

window.onload = loaded;
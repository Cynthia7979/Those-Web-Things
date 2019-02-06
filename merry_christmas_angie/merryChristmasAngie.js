var currentId = 0

function toggleEle(ele) {
    var classList = ele.classList;
    if (classList.toggle('show')) {
        ele.classList.remove('hide');
    } else {
        ele.classList.add('hide');
    }
}

function showNextSentById(id) {
    var currentEle = document.getElementById(id)
    toggleEle(currentEle);
    var nextNum = Number(id.charAt(id.length-1)) + 1;
    var nextEle = document.getElementById('sent'+nextNum);
    toggleEle(nextEle);
    currentId = nextNum;
}

window.onload = function() {
    startButton = document.getElementById('startButton0');
    startButton.onclick = function() {
        showNextSentById('startButton0');
    }
    var allButtons = document.getElementsByTagName('button');
    for (i=1; i<allButtons.length; i++){
        allButtons[i].onclick = function() {
            showNextSentById('sent'+currentId);
        };
    }
}
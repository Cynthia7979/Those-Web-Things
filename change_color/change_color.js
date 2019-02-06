function change() {
    var allElements = document.getElementsByClassName("cb");
    allElements.forEach(function(element){
        element.style = 'color: red;';
    });
}
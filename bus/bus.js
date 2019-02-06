var currentPage = home;

var home = "";

function switchPage(page) {
    if (page == "home") {
        currentPage = home;
    } else if (page == "about") {
        currentPage = about;
    } else if (page == "me") {
        currentPage = me;
    }
    document.getElementById('content').innerHTML = currentPage;
}
import NavBar from "/blocks/navBar/navBar.js";

window.addEventListener('DOMContentLoaded', (event) => {
    test1NavBar();
});

function test1NavBar() {
    let navBar = new NavBar();
    navBar.id = 'idofsomethingreallystupid';
    document.body.appendChild(navBar);
}
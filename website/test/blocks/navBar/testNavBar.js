import NavBar from "/blocks/navBar/navBar.js";

window.addEventListener('DOMContentLoaded', (event) => {
    test1NavBar();
});

function test1NavBar() {
    document.body.style.backgroundColor = '#FFE8BD';
    let navBar = new NavBar();
    navBar.id = 'idofsomethingreallystupid';
    document.body.appendChild(navBar);
}
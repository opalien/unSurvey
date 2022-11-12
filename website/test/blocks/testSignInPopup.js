import SignInPopup from "/main/blocks/signInPopup.js";

window.addEventListener('DOMContentLoaded', (event) => {
    test1SignInPopup();
});

function test1SignInPopup() {
    let signInPopup = new SignInPopup();
    signInPopup.id = 'idofsomethingreallystupid';
    document.body.appendChild(signInPopup);
}
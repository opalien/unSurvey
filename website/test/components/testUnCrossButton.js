import UnCrossButton from "/main/components/unCrossButton.js";

window.addEventListener('DOMContentLoaded', (event) => {
    test1UnCrossButton();
});


function test1UnCrossButton() {
    let button = new UnCrossButton();
    button.id = 'idofsomethingreallystupid';
    document.body.appendChild(button);
}
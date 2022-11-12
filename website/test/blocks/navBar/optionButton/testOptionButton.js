import OptionButton from "/main/blocks/navBar/optionButton/optionButton.js";

window.addEventListener('DOMContentLoaded', (event) => {
    test1OptionButton();
});


function test1OptionButton() {
    let optionButton = new OptionButton();
    optionButton.id = 'idofsomethingreallystupid';
    document.body.appendChild(optionButton);
}
import OptionButton from "/main/blocks/navBar/optionButton/optionButton.js";

window.addEventListener('DOMContentLoaded', (event) => {
    test1OptionButton();
});


function test1OptionButton() {
    document.body.style.backgroundColor = '#63502C';

    let optionButton = new OptionButton();
    optionButton.id = 'idofsomethingreallystupid';
    document.body.appendChild(optionButton);
}
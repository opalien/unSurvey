import UnButton from '/components/unButton.js';
import { RedColors, BlueColors, GreenColors } from '/utils/utils.js';

window.addEventListener('DOMContentLoaded', (event) => {
    test1UnButton();
});


function test1UnButton() {
    let button = new UnButton('test', 'black', GreenColors);
    button.setFunction(function() { console.log("salut"); });
    button.id = 'idofsomethingreallystupid';
    document.body.appendChild(button);
    //button.setActive(true);
}
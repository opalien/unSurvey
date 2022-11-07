import UnButton from '/main/components/unButton.js';

window.addEventListener('DOMContentLoaded', (event) => {
    

    test1UnButton();



});


function test1UnButton() {
    let button = new UnButton('test', 'black', 'red','blue','green');
    document.body.appendChild(button);
}
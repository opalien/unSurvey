import SignInPopup from "/blocks/signInPopup.js";

window.addEventListener('DOMContentLoaded', (event) => {
    test1SignInPopup();
});

function test1SignInPopup() {
    let signInPopup = new SignInPopup();
    signInPopup.setFunction(testSignInButton.bind());
    
    document.body.appendChild(signInPopup);

}

function testSignInButton(name, password) {
    console.log("name : " + name + " password : " + password);
}
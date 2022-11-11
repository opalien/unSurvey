import ErrorPopup from "/main/blocks/errorPopup.js";

window.addEventListener('DOMContentLoaded', (event) => {
    test1ErrorPopup();
});

function test1ErrorPopup() {
    let errorPopup = new ErrorPopup();
    errorPopup.id = 'idofsomethingreallystupid';
    document.body.appendChild(errorPopup);

    errorPopup.showError("This is an error");
}
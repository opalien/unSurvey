import AddFolderPopup from "/blocks/addFolderPopup.js";

window.addEventListener('DOMContentLoaded', (event) => {
    test1AddFolderPopup();
});

function test1AddFolderPopup() {
    let addFolderPopup = new AddFolderPopup();
    document.body.appendChild(addFolderPopup);
    addFolderPopup.setFunction((name) => {console.log("le nom est : " + name);})
}
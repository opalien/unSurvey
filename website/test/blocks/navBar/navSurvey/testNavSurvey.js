import NavSurvey from "/blocks/navBar/navSurvey/navSurvey.js";

window.addEventListener('DOMContentLoaded', (event) => {

    document.body.style.backgroundColor = '#63502C';
    //test1NavBar();
    testSetFolder();
});

function test1NavBar() {

    let navBar = new NavSurvey();
    document.body.appendChild(navBar);
}

function testSetFolder() {
    let navBar = new NavSurvey();


    let folders = [
        {
            name: 'folder1',
            id: 0,
            surveys: [
                { name: 'survey1', id: 5 },
                { name: 'survey2', id: 6 }
            ]
        },

        {
            name: 'folder2',
            id: 1,
            surveys: [
                { name: 'survey3', id: 7 },
                { name: 'survey4', id: 8 }
            ]
        }
    ]

    navBar.setFolder(folders);
    document.body.appendChild(navBar);
    navBar.setFolder(folders);
    navBar.setFolderFunction(function(id){console.log("La joi de pouvoir afficher l'ID : " + id)})
    navBar.setSurveyFunction((id) => {console.log("blup blup :" + id)})
    navBar.setAddFunction(function(){console.log("bouton pressé !")})

}
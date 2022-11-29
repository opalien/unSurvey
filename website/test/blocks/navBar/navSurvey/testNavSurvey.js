import NavBar from "/blocks/navBar/navSurvey/navSurvey.js";

window.addEventListener('DOMContentLoaded', (event) => {

    document.body.style.backgroundColor = '#63502C';
    //test1NavBar();
    testSetFolder();
});

function test1NavBar() {

    let navBar = new NavBar();
    document.body.appendChild(navBar);
}

function testSetFolder() {
    let navBar = new NavBar();


    let folders = [
        {
            name: 'folder1',
            surveys: [
                { name: 'survey1',  },
                { name: 'survey2',  }
            ]
        },

        {
            name: 'folder2',
            surveys: [
                { name: 'survey3', },
                { name: 'survey4', }
            ]
        }
    ]

    navBar.setFolder(folders);
    document.body.appendChild(navBar);


}
import setCSS from './utils/utils.js';
import is_in from './utils/jsonCommunication.js';

import ErrorPopup from './blocks/errorPopup.js'
import SignInPopup from './blocks/signInPopup.js';
import NavBar from './blocks/navBar/navBar.js';
import AddFolderPopup from './blocks/addFolderPopup.js';

export default class Page {
    constructor(host) {

        this.tree = {};

        this.websocket = new WebSocket(host);
        this.websocket.addEventListener('message', this.receive.bind(this));
        this.websocket.addEventListener('error', (event) => {
            console.log('WebSocket error: ', event);
            this.processError({error: 'Unable to connect to the server'});
        });

        this.navBar = new NavBar();
        this.navBar.display(false);
        document.body.appendChild(this.navBar);

        this.addFolderPopup = new AddFolderPopup();
        this.addFolderPopup.display(false);
        document.body.appendChild(this.addFolderPopup);
        this.addFolderPopup.setFunction(this.addFolder.bind(this))
        //
        this.navBar.navSurvey.setAddFunction(this.addFolderPopup.display.bind(this.addFolderPopup, true));


        this.SignInPopup = new SignInPopup();
        this.SignInPopup.setFunction(this.signIn.bind(this));
        document.body.appendChild(this.SignInPopup);


        this.errorPopup = new ErrorPopup();
        document.body.appendChild(this.errorPopup);       
    }

    setConnectedblocks(enable) {

    }

    signIn(name, password) {
        let to_send = {
            command: 'sign_in',
            name: name,
            password: password
        };
        this.send(to_send);
    }

    send(message) {
        this.websocket.send(JSON.stringify(message));
    }

    receive(event) {
        
        let message = JSON.parse(event.data);
        console.log(message);

        if(is_in(message, 'status', 'string')) {
            this.processStatus(message);
        } else if(is_in(message, 'error', 'string')) {            
            this.processError(message);
        } else if(is_in(message, 'user', 'object')) {
            this.refreshTree(message);
        }
    }

    processStatus(message) {
        if(message.code == 2001) {
            this.SignInPopup.display(false);
            this.getServerTree();
            this.navBar.display(true);
        } else if(message.code == 2008) {
            this.getServerTree();
        }
    }

    processError(message) {
        this.errorPopup.showError(message.error);
    }

    refreshTree(message) {
        this.tree = message.user;
        this.navBar.setFolders(this.tree.folders)
    }

    getServerTree() {
        var to_send = { "command" : "get_tree" };
        this.send(to_send);
    }

    addFolder(name) {
        var to_send = {
            command: "add_folder",
            folder: {
                name: name,
            },
        };

        this.send(to_send);
    }
}
import setCSS from './utils/utils.js';
import is_in from './utils/jsonCommunication.js';

import ErrorPopup from './blocks/errorPopup.js'
import SignInPopup from './blocks/signInPopup.js';

export default class Page {
    constructor(host) {

        this.websocket = new WebSocket(host);
        this.websocket.addEventListener('message', this.receive.bind(this));
        this.websocket.addEventListener('error', (event) => {
            console.log('WebSocket error: ', event);
            this.processError({error: 'Unable to connect to the server'});
        });

        this.SignInPopup = new SignInPopup();
        this.SignInPopup.setFunction(this.signIn.bind(this));
        document.body.appendChild(this.SignInPopup);


        this.errorPopup = new ErrorPopup();
        document.body.appendChild(this.errorPopup);
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
        }
    }

    processStatus(message) {
        if(message.code == 2001) {
            this.SignInPopup.display(false);
        }
    }

    processError(message) {
        this.errorPopup.showError(message.error);
    }
}
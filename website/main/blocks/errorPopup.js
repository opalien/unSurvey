import setCSS from "../utils/utils.js";

import UnCrossButton from "../components/unCrossButton.js";


export default class ErrorPopup extends HTMLElement {
    constructor() {
        super();

        this.closeButton = new UnCrossButton();
        this.closeButton.setFunction(this.hide.bind(this));

        let csscrossbutton = {position: 'absolute',
                                top: '15px',
                                right: '50px',};

        setCSS(this.closeButton, csscrossbutton);

        this.appendChild(this.closeButton);

        this.errorTitle = document.createElement('h2');
        this.errorTitle.innerText = 'Error :';
        let csserrorTitle = {position: 'absolute',
                                bottom: '0px',
                                left: '50px',
                                color: 'white'};
        setCSS(this.errorTitle, csserrorTitle);
        this.appendChild(this.errorTitle);

        this.errorText = document.createElement('h2');
        this.errorText.innerText = 'This is an error';
        let csserrorText = {position: 'absolute',
                                bottom: '0px',
                                left: '200px',
                                color: 'white'};
        setCSS(this.errorText, csserrorText);
        this.appendChild(this.errorText);

        let css = {position: 'fixed',
                    bottom: '0px',
                    left: '100px',
                    right: '100px',
                    height: '75px',
                    backgroundColor: '#BD4E41',
                    border: '3px solid black',
                    borderBottom: 'none',
                    transition: '.5s',};      

        setCSS(this, css);

        this.hide();
    }

    hide() {
        setCSS(this, {bottom: '-103px'});
    }

    showError(error) {
        this.errorText.innerText = error;
        setCSS(this, {bottom: '0px'});
    }
}

customElements.define('error-popup', ErrorPopup);
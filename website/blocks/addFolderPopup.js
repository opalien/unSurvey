import setCSS, {GreenColors} from "/utils/utils.js";

import UnButton from "/components/unButton.js";
import UnCrossButton from "/components/unCrossButton.js";

export default class AddFolderPopup extends HTMLElement {
    constructor() {
        super();

        this.function = function(value){};

        


        this.nameInput = document.createElement('input');
        this.nameInput.addEventListener('input', this.updateButton.bind(this));
        this.nameInput.type = 'text';
        this.nameInput.placeholder = 'Folder Name';
        this.nameInput.setAttribute('class', 'clearInput');
        this.nameInput.style.width = '100%';

        this.addFolderButton = new UnButton('Add folder', 'white', GreenColors);
        this.addFolderButton.setFunction(this.process.bind(this));
        this.addFolderButton.setActive(false);
        this.addFolderButton.style.marginTop = '50px';
        this.addFolderButton.style.marginBottom = '10px';
        this.addFolderButton.style.width = '93%';

        this.form = document.createElement('form');
        let nametext = document.createElement('h3');
        nametext.innerText = 'Folder Name';
        this.form.appendChild(nametext);
        this.form.appendChild(this.nameInput);
        this.form.appendChild(this.addFolderButton);

        let cssform = { 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '50px',
            marginRight: '50px',
        };  
        setCSS(this.form, cssform);

        this.closeButton = new UnCrossButton();
        this.closeButton.setFunction(this.display.bind(this, false));
        let csscrossbutton = {
            position: 'absolute',
            top: '15px',
            right: '50px',
        };

        setCSS(this.closeButton, csscrossbutton);

        

        // POPUP
        this.popup = document.createElement('div');
        this.popup.innerHTML += '<h2>New Folder</h2>';
        this.popup.appendChild(this.form);
        this.popup.setAttribute('class', 'centerPopup');
        this.popup.appendChild(this.closeButton);


        // THIS
        this.appendChild(this.popup);
        this.setAttribute('class', 'centerPopupContainer');
        let css = {
            position: 'fixed',
            bottom: '0px',
            left: '0px',
            right: '0px',
            top: '0px',
            backgroundColor: 'rgba(0,0,0,0.5)',
        };
        setCSS(this, css);
    }

    process() {
        this.function(this.nameInput.value);
        this.display(false);
    }

    updateButton() {
        if(this.nameInput.value == '') {
            this.addFolderButton.setActive(false);
        } else {
            this.addFolderButton.setActive(true);
        }
    }

    display(isDisplayed) {
        if(isDisplayed) {
            setCSS(this, {display: 'flex'});
        } else {
            setCSS(this, {display: 'none'});
        }
    }

    setFunction(f) {
        this.function = f;
    }

    
}

customElements.define('add-folder-popup', AddFolderPopup);
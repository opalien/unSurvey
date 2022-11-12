import setCSS, {GreenColors} from "../utils/utils.js";
import UnButton from "../components/unButton.js";

export default class SignInPopup extends HTMLElement {
    constructor() {
        super();

        this.function = function() {};


        // FORM
        this.nameInput = document.createElement('input');
        this.nameInput.addEventListener('input', this.updateButton.bind(this));
        this.nameInput.type = 'text';
        this.nameInput.placeholder = 'Name';
        this.nameInput.setAttribute('class', 'clearInput');
        this.nameInput.style.width = '100%';

        this.passwordInput = document.createElement('input');
        this.passwordInput.addEventListener('input', this.updateButton.bind(this));
        this.passwordInput.type = 'password';
        this.passwordInput.placeholder = 'Password';
        this.passwordInput.setAttribute('class', 'clearInput');
        this.passwordInput.style.width = '100%';

        this.signInButton = new UnButton('Sign In', 'white', GreenColors);
        this.signInButton.setFunction(this.process.bind(this));
        this.signInButton.setActive(false);
        this.signInButton.style.marginTop = '50px';
        this.signInButton.style.marginBottom = '10px';
        this.signInButton.style.width = '93%';

        this.form = document.createElement('form');
        let nametext = document.createElement('h3');
        nametext.innerText = 'Name';
        this.form.appendChild(nametext);
        this.form.appendChild(this.nameInput);
        let passwordtext = document.createElement('h3');
        passwordtext.innerText = 'Password';
        this.form.appendChild(passwordtext);
        this.form.appendChild(this.passwordInput);
        this.form.appendChild(this.signInButton);

        let cssform = { 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '50px',
            marginRight: '50px',
        };  
        setCSS(this.form, cssform);


        // POPUP
        this.popup = document.createElement('div');
        this.popup.innerHTML += '<h2>Please Sign In</h2>';
        this.popup.appendChild(this.form);
        this.popup.setAttribute('class', 'centerPopup');


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

    updateButton() {
        if(this.nameInput.value == '' || this.passwordInput.value == '') {
            this.signInButton.setActive(false);
        } else {
            this.signInButton.setActive(true);
        }
    }

    setFunction(f) {
        this.function = f;
    }

    process() {
        this.function(this.nameInput.value, this.passwordInput.value);
    }

    display(isDisplayed) {
        if(isDisplayed) {
            setCSS(this, {display: 'flex'});
        } else {
            setCSS(this, {display: 'none'});
        }
    }
    
}

customElements.define('sign-in-popup', SignInPopup);
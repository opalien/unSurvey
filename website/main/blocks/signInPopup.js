import setCSS, {centerPopup} from "../utils/utils.js";
import UnButton from "../components/unButton.js";

export default class SignInPopup extends HTMLElement {
    constructor() {
        super();

        this.nameInput = document.createElement('input');
        this.nameInput.type = 'text';
        this.nameInput.placeholder = 'Name';

        this.passwordInput = document.createElement('input');
        this.passwordInput.type = 'password';
        this.passwordInput.placeholder = 'Password';

        this.signInButton = new UnButton('Sign In', 'white', {color1: 'green', color2: 'lightgreen', color3: 'darkgreen'});

        this.form = document.createElement('form');

        this.form.appendChild(this.nameInput);
        this.form.appendChild(this.passwordInput);
        this.form.appendChild(this.signInButton);

        let cssform = { display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',}

        setCSS(this.form, cssform);

        this.popup = document.createElement('div');
        this.popup.appendChild(this.form);

        this.appendChild(this.popup);


        setCSS(this.popup, centerPopup);

        let css = {position: 'fixed',
                    bottom: '0px',
                    left: '0px',
                    right: '0px',
                    top: '0px',
                    backgroundColor: 'rgba(0,0,0,0.5)',};
        
        setCSS(this, css);

    }
}

customElements.define('sign-in-popup', SignInPopup);
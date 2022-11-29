import setCSS from '/utils/utils.js';

import OptionButton from './optionButton/optionButton.js';



export default class NavBar extends HTMLElement {
    constructor() {
        super();


        let title = document.createElement('h1');
        title.innerHTML = 'unSurvey';
        let csstitle = {
            position: 'absolute',
            top: '30px',
            right: '30px',
            color: '#FFE8BD',
        };

        setCSS(title, csstitle);

        this.appendChild(title);



        this.OptionButton = new OptionButton();

        let cssoptionbutton = {
            position: 'absolute',
            bottom: '30px',
            left: '30px',
        }

        setCSS(this.OptionButton, cssoptionbutton);

        this.appendChild(this.OptionButton);


        let css = {
            position: 'absolute',
            top: '0px',
            left: '0px',
            bottom: '0px',
            width: '300px',
            borderRight: '3px solid black',

            backgroundColor: '#63502C',
        };

        setCSS(this, css);
    }


}

customElements.define('nav-bar', NavBar);
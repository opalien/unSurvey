import setCSS from '/utils/utils.js';

import OptionButton from './optionButton/optionButton.js';
import NavSurvey from './navSurvey/navSurvey.js';



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



        this.optionButton = new OptionButton();

        let cssoptionbutton = {
            position: 'absolute',
            bottom: '30px',
            left: '30px',
        };

        setCSS(this.optionButton, cssoptionbutton);
        this.appendChild(this.optionButton);


        this.navSurvey = new NavSurvey();

        let cssnavsurvey = {
            position: 'absolute',
            left:'30px',
            top:'30%'
        };

        setCSS(this.navSurvey, cssnavsurvey);
        this.appendChild(this.navSurvey);

        


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
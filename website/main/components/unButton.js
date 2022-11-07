
import setCSS, * as utils from './utils.js';

export default class UnButton extends HTMLElement {
    constructor(text, textColor, color, hoverColor, inactiveColor) {
        super();
        this.text = text;
        this.color = color;
        this.hoverColor = hoverColor;
        this.inactiveColor = inactiveColor;
        this.function = function(){};

        this.HPadding = '20px';
        this.VPadding = '10px';

        this.css = {//position: 'relative',
                    paddingLeft: this.HPadding,
                    paddingRight: this.HPadding,
                    paddingTop: this.VPadding,
                    paddingBottom: this.VPadding,
                    backgroundColor: color,
                    color: textColor,
                    transition: '1s'}

        this.innerText = this.text;

        setCSS(this,this.css)
                        

    }
} 



customElements.define('un-button', UnButton);

import setCSS, * as utils from './utils.js';

export default class UnButton extends HTMLElement {
    constructor(text, textColor, colors) {
        super();
        this.color = colors.color1;
        this.hoverColor = colors.color2;
        this.inactiveColor = colors.color3;

        this.function = function(){};

        this.mouseover = function() {
            this.style.backgroundColor = this.hoverColor;
        }

        this.mouseout = function() {
            this.style.backgroundColor = this.color;
        }

        this.addEventListener('mouseover', this.mouseover);
        this.addEventListener('mouseout', this.mouseout);
        this.addEventListener('click', this.function);

        this.HPadding = '20px';
        this.VPadding = '10px';

        this.innerText = text;

        let css = {//position: 'relative',
                    paddingLeft: this.HPadding,
                    paddingRight: this.HPadding,
                    paddingTop: this.VPadding,
                    paddingBottom: this.VPadding,
                    backgroundColor: this.color,
                    color: textColor,

                    transition: '1s', 
                    cursor: 'pointer',}           

        setCSS(this, css);
    }

    setFunction(f) {
        this.removeEventListener('click', this.function);
        this.function = f;
        this.addEventListener('click', this.function);
    }


    setActive(active) {
        if(active) {
            this.addEventListener('click', this.function);
            this.addEventListener('mouseover', this.mouseover);
            this.addEventListener('mouseout', this.mouseout);
            setCSS(this, {backgroundColor: this.color, cursor: 'pointer'});
        } else {
            this.removeEventListener('click', this.function);
            this.removeEventListener('mouseover', this.mouseover);
            this.removeEventListener('mouseout', this.mouseout);
            setCSS(this, {backgroundColor: this.inactiveColor, cursor: 'auto'});
        }
    }
}

customElements.define('un-button', UnButton);

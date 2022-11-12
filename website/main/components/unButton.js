import setCSS from '../utils/utils.js';

export default class UnButton extends HTMLElement {

    constructor(text, textColor, colors) {
        super();
        // setting the colors
        this.color = colors.color1;
        this.hoverColor = colors.color2;
        this.inactiveColor = colors.color3;


        this.innerText = text;
        this.HPadding = '20px';
        this.VPadding = '10px';


        // setting functions
        this.function = function(){};

        this.mouseover = function() {
            this.style.backgroundColor = this.hoverColor;
        }

        this.mouseout = function() {
            this.style.backgroundColor = this.color;
        }


        let css = {//position: 'relative',
                    paddingLeft: this.HPadding,
                    paddingRight: this.HPadding,
                    paddingTop: this.VPadding,
                    paddingBottom: this.VPadding,
                    backgroundColor: this.color,
                    color: textColor,

                    transition: '.5s',
                    cursor: 'pointer',};

        setCSS(this, css);
        this.setActive(true);
    }

    setFunction(f) {
        this.removeEventListener('click', this.function);
        this.function = f;
        this.addEventListener('click', this.function);
    }

    setActive(isActive) {
        if(isActive) {
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

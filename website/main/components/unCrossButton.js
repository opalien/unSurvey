import setCSS from '../utils/utils.js';

export default class UnCrossButton extends HTMLElement {

    constructor() {
        super();

        this.function = function(){};

        let rightLine = document.createElement('div');
        let leftLine = document.createElement('div');

        let cssrightLine = {
            position: 'absolute',
            top: '22px',
            left: '-1px',
            width: '50px',
            height: '5px',
            backgroundColor: 'black',
            transform: 'rotate(45deg)',
            borderRadius: '10px', 
        };
        
        let cssleftLine = {
            position: 'absolute',
            top: '22px',
            left: '-1px',
            width: '50px',
            height: '5px',
            backgroundColor: 'black',
            transform: 'rotate(-45deg)',
            borderRadius: '10px', 
        };
        
        setCSS(rightLine, cssrightLine);
        setCSS(leftLine, cssleftLine);

        this.appendChild(rightLine);
        this.appendChild(leftLine);


        let css = {
            position: 'absolute',
            width: '48px',
            height: '49px',
            backgroundColor: 'rgba(255,255,255,.5)',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: '.5s',
        };


        
        
        setCSS(this, css);


        this.mouseover = function() {
            this.style.backgroundColor = 'rgba(255,255,255,.8)';
        }

        this.mouseout = function() {
            this.style.backgroundColor = 'rgba(255,255,255,.5)';
        }

        this.addEventListener('mouseover', this.mouseover);
        this.addEventListener('mouseout', this.mouseout);

    }

    setFunction(f) {
        this.removeEventListener('click', this.function);
        this.function = f;
        this.addEventListener('click', this.function);
    }

}   

customElements.define('un-cross-button', UnCrossButton);


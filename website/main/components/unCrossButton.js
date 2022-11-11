import setCSS from './utils.js';

export default class UnCrossButton extends HTMLElement {

    constructor() {
        super();

        let rightLine = document.createElement('div');
        let leftLine = document.createElement('div');

        let cssrightLine = {position: 'absolute',
                            top: '22px',
                            left: '-1px',
                            width: '50px',
                            height: '5px',
                            backgroundColor: 'black',
                            transform: 'rotate(45deg)',
                            borderRadius: '10px', }
        
        let cssleftLine = {position: 'absolute',
                            top: '22px',
                            left: '-1px',
                            width: '50px',
                            height: '5px',
                            backgroundColor: 'black',
                            transform: 'rotate(-45deg)',
                            borderRadius: '10px', }
        
        setCSS(rightLine, cssrightLine);
        setCSS(leftLine, cssleftLine);

        this.appendChild(rightLine);
        this.appendChild(leftLine);


        let css = {position: 'absolute',
                    width: '48px',
                    height: '49px',
                    backgroundColor: 'rgba(0,0,0,.2)',
                    borderRadius: '10px',
                    cursor: 'pointer',}

        setCSS(this, css);

    }

}   

customElements.define('un-cross-button', UnCrossButton);

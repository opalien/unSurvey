import setCSS from "../../../utils/utils.js";

export default class OptionButton extends HTMLElement {
    constructor() {
        super();

        let image = document.createElement('img');
        image.src = 'main/blocks/navbar/optionButton/settings.png';

        this.appendChild(image);

        let css = {
            position: 'absolute',
            width: '50px',
            height: '50px',
            backgroundColor: 'red',
            border: '3px solid black',
        }

        setCSS(this, css);
    }
}

customElements.define('option-button', OptionButton);
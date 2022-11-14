import setCSS from "../../../utils/utils.js";

export default class OptionButton extends HTMLElement {
    constructor() {
        super();

        this.function = function(){};

        let image = document.createElement('img');
        image.src = '/main/assets/settingsButton.png';
        //image.src = '/assets/settingsButton.png';
        //image.src = '/main/blocks/navBar/optionButton/settings.png';

        let cssimage = {
            width: '50px',
            height: '50px',
            backgroundColor: 'none',
            transition: '1s',
        }


        setCSS(image, cssimage);

        this.appendChild(image);

        let css = {
            position: 'absolute',
            width: '50px',
            height: '50px',
            backgroundColor: 'white',
            border: '3px solid black',
            borderRadius: '0%',
            cursor: 'pointer',
        }

        setCSS(this, css);


        this.addEventListener('mouseover', function() { image.style.rotate = '360deg';});
        this.addEventListener('mouseout', function() { image.style.rotate = '0deg';});

    }

    setFunction(f) {
        this.removeEventListener('click', this.function);
        this.function = f;
        this.addEventListener('click', this.function);
    }


}

customElements.define('option-button', OptionButton);
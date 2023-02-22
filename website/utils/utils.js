import is_in from "./jsonCommunication.js";

export const Colors = {

    brown: '#a52a2a',

    green1: '#5C8C46',
    green2: '#314A25',
    green3: '#1B2914',

    red1: '#BD4E41',
    red2: '#6B2B24',
    red3: '#381713',

};

export const RedColors = {
    color1: '#BD4E41',
    color2: '#6B2B24',
    color3: '#381713',
};

export const GreenColors = {
    color1: '#5C8C46',
    color2: '#314A25',
    color3: '#1B2914',
};

export const BlueColors = {
    color1: '#4E6CBD',
    color2: '#2B396B',
    color3: '#172138',
};

export const BrownColors = {
    color1: '#ffe8bd',
    color2: '#ffe8bd',
    color3: '#ffe8bd',
}

export default function setCSS(e, styles) {
    for (const property in styles)
        e.style[property] = styles[property];
}
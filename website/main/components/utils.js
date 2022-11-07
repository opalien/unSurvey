export const Colors = {

    brown: '#a52a2a',

    green1: '#5C8C46',
    green2: '#314A25',
    green3: '#1B2914',

    red1: '#BD4E41',
    red2: '#6B2B24',
    red3: '#381713',

};

export default function setCSS(e, styles) {
    for (const property in styles)
        e.style[property] = styles[property];
}
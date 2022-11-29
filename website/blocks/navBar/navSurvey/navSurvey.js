import setCSS  from "/utils/utils.js";

export default class NavSurvey extends HTMLElement {
    constructor() {
        super();

        /*this.innerHTML = 
        '<ul>' +                      
        '<li>' +
            '<span class="arrow"></span><span class="head">ukraine folder</span>' +            
            '<span class="body">' +
                '<ul>' +
                    '<li>la dépeche</li>' +
                    '<li>le monde</li>' +
                '</ul>' +
            '</span>' +
        '</li>' +
        '<li>' +
            '<span class="arrow"></span><span class="head">ukraine folder</span>' +            
            '<span class="body">' +
                '<ul>' +
                    '<li>la dépeche</li>' +
                    '<li>le monde</li>' +
                '</ul>' +
            '</span>' +
        '</li>' +
        '</ul>';*/

        

        let css = {
            position: 'absolute',
            //minWidth: '300px',
            //height: '100px',
            backgroundColor: '#FFE8BD',
            border: '3px solid black',
        }



        setCSS(this, css);
    }

    setFolder(folders) {

        delete(this.folders)
        this.deleteChildren();
        

        this.folders = folders;

        let main_ul = document.createElement('ul');
        main_ul.style.listStyleType = 'none';

        for (let fi in this.folders) {
            let li = document.createElement('li');
            let span_arrow = document.createElement('span');
            span_arrow.innerText = '>';
            li.appendChild(span_arrow);
            li.appendChild(document.createTextNode(this.folders[fi].name));
            //li.innerText = this.folders[fi].name;



            let ul = document.createElement('ul');
            

            for(let si in this.folders[fi].surveys) {
                let li = document.createElement('li');
                li.innerText = this.folders[fi].surveys[si].name;

                ul.appendChild(li);
            }

            span_arrow.style.cursor = 'pointer';
            span_arrow.style.transition = '.5s';
            span_arrow.style.display = 'inline-block';

            ul.style.transition = '.5s';

            let size = ul.children.length;
            ul.style.overflow = 'hidden';

            span_arrow.addEventListener('click', () => {
                if (ul.style.height == '0px') {
                    ul.style.height = (size*25).toString() + 'px';
                    span_arrow.style.transform = 'rotate(90deg)';
                } else {
                    ul.style.height = '0px';
                    span_arrow.style.transform = 'rotate(0deg)';
                }
            });




            li.appendChild(ul);


            main_ul.appendChild(li);
        
        }

        this.appendChild(main_ul);








        this.folder = folders;
    }


    deleteChildren() {
        while (this.lastChild) {
            delete(this.removeChild(this.lastChild));
        }
    }

    
}

customElements.define('nav-survey', NavSurvey);
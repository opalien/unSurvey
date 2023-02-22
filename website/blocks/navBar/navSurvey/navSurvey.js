import setCSS, {BrownColors} from "/utils/utils.js";

import UnButton from "/components/unButton.js";

export default class NavSurvey extends HTMLElement {
    constructor() {
        super();

        this.folderFunction = function(id){};
        this.surveyFunction = function(id){};

        this.addFunction = function(){};

        this.folder_div = document.createElement('div');
        this.appendChild(this.folder_div);

        this.add_button = new UnButton('add new', '#63502c', BrownColors);
        this.appendChild(this.add_button);
        this.add_button.setFunction(this.buttonClicked.bind(this));

        let buttoncss = {
            position: 'relative',
            marginLeft: '20px',
            //marginTop:'50px',
            //top:'20px'
        };

        setCSS(this.add_button, buttoncss);

        

        let css = {
            position: 'absolute',
            minWidth: '200px',
            //height: '100px',
            backgroundColor: '#FFE8BD',
            border: '3px solid black',
            fontWeight: 'bold',
            paddingBottom: '20px',
            paddingTop: '20px',
        };

        setCSS(this, css);
    }



    setFolder(folders) {
        console.log(folders);

        delete(this.folders)
        this.deleteChildren();
        

        this.folders = folders;

        let main_ul = document.createElement('ul');
        main_ul.style.listStyleType = 'none';

        for (let fi in this.folders) {
            let li = document.createElement('li');
            let span_arrow = document.createElement('span');
            span_arrow.innerHTML = '&#x25BA';
            li.appendChild(span_arrow);
            
            let span_name = document.createElement('span');
            span_name.innerText = this.folders[fi].name;
            span_name.setAttribute('id', this.folders[fi].id);
            span_name.style.cursor = 'pointer';

            span_name.addEventListener('click', () => {
                this.folderClicked(span_name.getAttribute('id'));
            });

            li.appendChild(span_name);



            let ul = document.createElement('ul');
            
            

            for(let si in this.folders[fi].surveys) {
                let li = document.createElement('li');
                let span_name_si = document.createElement('span');
                span_name_si.innerText = this.folders[fi].surveys[si].name;
                span_name_si.setAttribute('id', this.folders[fi].surveys[si].id);
                span_name_si.style.cursor = 'pointer';

                span_name_si.addEventListener('click', () => {
                    this.surveyClicked(span_name_si.getAttribute('id'))
                })


                li.appendChild(span_name_si);
                ul.appendChild(li);
            }

            span_arrow.style.cursor = 'pointer';
            span_arrow.style.transition = '.5s';
            span_arrow.style.display = 'inline-block';

            ul.style.transition = '.5s';
            ul.style.listStyle='none';

            let size = ul.children.length;
            ul.style.overflow = 'hidden';

            ul.style.height = '0px';

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

        this.folder_div.appendChild(main_ul);
    }


    deleteChildren() {
        while (this.folder_div.lastChild) {
            delete(this.folder_div.removeChild(this.folder_div.lastChild));
        }
    }


    folderClicked(id) {
        this.folderFunction(id);
    }

    surveyClicked(id) {
        this.surveyFunction(id);
    }

    setFolderFunction(f) {
        this.folderFunction = f;
    }

    setSurveyFunction(f) {
        this.surveyFunction = f;
    }


    buttonClicked() {
        this.addFunction();
    }

    setAddFunction(f) {
        this.addFunction = f;
    }

    
}

customElements.define('nav-survey', NavSurvey);
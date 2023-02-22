import setCSS  from "/utils/utils.js";

export default class NavSurvey extends HTMLElement {
    constructor() {
        super();

        this.folderFunction = function(id){};
        this.surveyFunction = function(id){};

        this.folder_div = document.createElement('div');
        

        

        let css = {
            position: 'absolute',
            minWidth: '200px',
            //height: '100px',
            backgroundColor: '#FFE8BD',
            border: '3px solid black',
            fontWeight: 'bold',
        }



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

        this.appendChild(main_ul);
    }


    deleteChildren() {
        while (this.lastChild) {
            delete(this.removeChild(this.lastChild));
        }
    }


    folderClicked(id) {
        console.log(id);
        this.folderFunction(id);
    }

    surveyClicked(id) {
        console.log(id);
        this.surveyFunction(id);
    }

    setFolderFunction(f) {
        this.folderFunction = f;
    }

    setSurveyFunction(f) {
        this.surveyFunction = f;
    }

    
}

customElements.define('nav-survey', NavSurvey);
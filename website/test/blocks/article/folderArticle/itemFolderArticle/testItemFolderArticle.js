import ItemFolderArticle from "/blocks/article/folderArticle/itemFolderArticle/itemFolderArticle.js";

window.addEventListener('DOMContentLoaded', (event) => {
    test1ItemFolderArticle();
});

function test1ItemFolderArticle() {
    let itemFolderArticle = new ItemFolderArticle();
    document.body.appendChild(itemFolderArticle);

}
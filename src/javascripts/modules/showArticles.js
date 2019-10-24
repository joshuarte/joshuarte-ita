export default class showPortfolio {
    constructor(el) {
 
        this.el = el
        /* console.log('Show Portfolio module loaded'); */

        var blogBlock = document.querySelectorAll('.right-blog')[0];

        this.el.addEventListener('click', function(event){
            blogBlock.classList.toggle("slideInRight");
        })
    }
}

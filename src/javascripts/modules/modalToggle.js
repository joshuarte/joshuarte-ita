export default class modalToggle {
    constructor(el) {
        this.el = el

        var modal = document.querySelectorAll('.popup')[0];
        /* console.log(modal); */
        

        this.el.addEventListener('click', function(event){
            modal.classList.toggle("fadeInDown");
        })
    }
}

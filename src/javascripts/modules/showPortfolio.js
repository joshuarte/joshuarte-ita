export default class showPortfolio {
    constructor(el) {

        // console.log(document.getElementsByClassName("right"));

        // // First we detect the click event
        // document.getElementsByClassName("right").addEventListener('click', function () {
        //     /* if (this.classList.contains('slideInRight')) {
        //         this.classList.remove('slideInRight');
        //         this.classList.add('slideOutRight');
        //     } else {
        //         this.classList.remove('slideOutRight');
        //         this.classList.add('slideInRight');
        //     } */
        //     this.classList.toggle('slideOutRight');
        // });




        /* var sideNav = document.getElementsById("right") */
        this.el = el
        /* console.log('Show Portfolio module loaded'); */

        var sideNav = document.querySelectorAll('.right')[0];

        this.el.addEventListener('click', function(event){
            sideNav.classList.toggle("slideOutRight");
        })
    }
}

import jump from 'jump.js'

export default class scrollTop {
    constructor(el) {
        
        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2
            if (t < 1) return c / 2 * t * t + b
            t--
            return -c / 2 * (t * (t - 2) - 1) + b
        }

        this.el = el
        /* console.log('scrollTop module loaded'); */

        this.el.addEventListener('click', function (event) {
            jump('#page-top', {
                duration: 1000,
                offset: 0,
                callback: undefined,
                easing: easeInOutQuad,
                a11y: false
            })
        });

    }
}

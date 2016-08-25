var Vue = require('vue')
var App = require('./components/app.vue')


// Vue.transition('stagger', {
//     stagger: function(index) {
//         return Math.min(300, index * 50)
//     }
// })

window.onload = function() {
    var mv = new Vue({
        el: 'body',
        components: {
            app: App
        }
    });

}

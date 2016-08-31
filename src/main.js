var Vue = require('vue')
var vueValidator = require('vue-validator')
var TransDemo = require('./components/transDemo.vue')
var ComponentDemo = require('./components/componentDemo.vue')
var lightBox = require('./components/lightBox.vue')
var VueRouter = require('vue-router')

Vue.use(vueValidator)
Vue.use(VueRouter)

Vue.transition('bounce', {
    enterClass: 'bounceInLeft',
    leaveClass: 'bounceOutRight'
});

Vue.transition('fade', {
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut'
});

Vue.transition('gsap', {
    beforeEnter: function(el,done) {
        console.log('beforeEnter');
    },
    enter: function(el,done) {
    	var wrap;
        console.log('enter');

        var h = $(el).outerHeight();
        
        if (!$(el).parent().is(".l-trans__wrap")) {
            $(el).wrap("<div class='l-trans__wrap' style='height:"+h+"px'></div>");
        }
        wrap = $(el).parent('.l-trans__wrap');

        if (wrap) {
        	TweenMax.to(wrap, 0.6, {
        	    height: h,
        	    delay:0,
        	    onComplete: function() {
        	        // $(el).unwrap('.l-trans__wrap');
        	    }
        	});
        }

        TweenMax.fromTo(el, 0.6, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1 , ease: Back.easeOut.config(2),onComplete:done});
    },
    afterEnter: function(el,done) {
        console.log('afterEnter');
    },
    enterCancelled: function(el,done) {

    },

    beforeLeave: function(el,done) {
        console.log('beforeLeave');
    	
    	var wrap;
        var h = $(el).outerHeight();

        if (!$(el).parent().is(".l-trans__wrap")) {
            $(el).wrap("<div class='l-trans__wrap' style='height:"+0+"px'></div>");
        }
        wrap = $(el).parent('.l-trans__wrap');

        if (wrap) {
        	TweenMax.to(wrap, 0.6, {
        	    height: 0,
        	    delay:0,
        	    onComplete: function() {
        	        // $(el).unwrap('.l-trans__wrap');
        	    }
        	});

        }
        TweenMax.fromTo(el, 0.6, { xPercent: 0, opacity: 1 }, { xPercent: 100, opacity: 0 ,ease: Back.easeOut.config(2),onComplete:done});
    },
    leave: function(el,done) {
        console.log('leave');
    },
    afterLeave: function(el,done) {
        console.log('afterLeave');

    },
    leaveCancelled: function(el) {
        // handle cancellation
    }
});


Vue.component('light-box',lightBox);

window.onload = function() {
	Vue.config.debug = true;


    var vm = Vue.extend({
    });


	var router = new VueRouter();

	router.map({
	    '/component': {
	        component: Vue.extend(ComponentDemo)
	    },
	    '/transition': {
	        component: Vue.extend(TransDemo)
	    }
	});


	router.start(vm,'#app');
}

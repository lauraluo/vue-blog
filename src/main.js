var Vue = require('vue')
var App = require('./components/app.vue')


Vue.transition('bounce', {
    enterClass: 'bounceInLeft',
    leaveClass: 'bounceOutRight'
});


Vue.transition('gsap', {
    beforeEnter: function(el,done) {
        console.log('beforeEnter');
        el.textContent = 'beforeEnter';



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
        el.textContent = 'enter';
    },
    afterEnter: function(el,done) {
        console.log('afterEnter');
        el.textContent = 'afterEnter'
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
        el.textContent = 'beforeLeave'
    },
    leave: function(el,done) {
        console.log('leave');
        el.textContent = 'leave'
    },
    afterLeave: function(el,done) {
        console.log('afterLeave');

        el.textContent = 'afterLeave'
    },
    leaveCancelled: function(el) {
        // handle cancellation
    }
});



window.onload = function() {
	Vue.config.debug = true;
    var mv = new Vue({
        el: 'body',
        components: {
            app: App
        }
    });
}

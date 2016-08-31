<style lang="stylus">
ul {
    padding-left: 0;
    font-family: Helvetica, Arial, sans-serif;
}



.transDemo {
	dt {
		font-size:2.8rem;
		font-weight: normal; 
	}
	dd {
		//padding-bottom:40px;
	}
	&__content {
		//box-sizing:border-box;
		color:red;
		padding:20px;
		background:#d6d6d6;
		//font-size:2.4rem;
	}
	&__btn {
		box-sizing:border-box;
		//font-size:1.6rem;
		//margin:20px 0;
	}
}
</style>


<template lang="jade">
	div.transDemo
		div.row
			h1 Transition Demo
			dl.small-12
				dt: h3 Vue with GSAP
				dd
					button.button.transDemo__btn( v-on:click="tween('gsapDemo1')") toggle tween: v-show= {{gsapDemo1}}
					div.transDemo__content(v-show="gsapDemo1" transition="gsap") TWEEN ME 
			dl
				dt: h3 Vue with animate.css
				dd
					button.button.transDemo__btn( v-on:click="tween('animateDemo1')") toggle tween: v-show= {{animateDemo1}}
					div.animated.transDemo__content(v-show="animateDemo1" transition="bounce") TWEEN ME
</template>

<script>

export default {
	methods: {
		tween: function(toggle){
			this[toggle] = !this[toggle]
		}
	},
    data() {
        return {
            animateDemo1: true,
            gsapDemo1:true	
        }
    }
}
</script>

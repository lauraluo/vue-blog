<style lang="stylus">
    .lightbox {
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        &--default {
            .lightbox__mask {
                position:absolute;
                top:0;
                left:0;
                right:0;
                bottom:0;
                background:rgba(0,0,0,0.5);
            }
            .lightbox__wrap {
                position:absolute;
                top:0;
                left:0;
                right:0;
                bottom:0;
                height:100vh;
                overflow-y:auto;
            }
            .lightbox__content {
                width:640px;
                margin:0 auto;
                border-radius:16px;
                background:#fff;
                padding:30px;

            }

        }   
    }

</style>


<template lang="jade">
    div.lightbox.lightbox--default.animated(v-show="isShow",transition="fade")
        div.lightbox__mask
        div.lightbox__wrap.l-vm
            div.l-vm__content
                div.lightbox__content.animated(v-show="isShow",transition="bounce")
                    div.text-right
                        button.button.lightbox__clostBtn(@click="close") X
                    slot(name="content")
</template>

<script>

export default {
    props: {
        isShow: {
            type:Boolean,
            required: true,
            default: function () {
                return false; //初始值是關
            }
        },
        onClose:{type:Function},
        onOpen:{type:Function}
    },
    watch: {
        //on change
        'isShow':function(val, oldVal){
            if(val){
                $('body').css('overflow','hidden');
            }else {
                $('body').css('overflow','auto');

            }
        }
    },
    methods: {
        open: function () {
            this.onOpen();
        },
        close: function () {
            this.onOpen();
        },    
    },
    created:function(){

    },
    data() {
        return {
        }
    }   
};

</script>

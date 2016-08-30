<style lang="stylus">
    .newsPost {
        &__item {
            font-size: 2.4em;
            h4 {
                line-height:42px;
                vertical-align:middle;
                padding-bottom:10px;
            }
        }
        &__edit {
            position:absolute;
            right:20px;
            top:20px;
        }
    }   

</style>


<template lang="jade">
    div.newsPost
        .row
            h1 Component Demo
            div.newsPost__ctrl
                div.small-12.text-right
                    a.button(v-on:click="openEditor")
                        i.fi-x 
                        |New Post
            div.newsPost__list.callout
                div.newsPost__item.small-12.media-object(v-for="item in list" track-by="$key")
                    section.media-object-section
                        h2 {{$index}}--{{$key}}--{{item.title}}
                        div(v-html="item.content | marked") 
                        button.newsPost__edit.button(@click="openEditor($key)") 編輯
            

            light-box(:is-show.sync="isEditorShow", :on-close.sync="openEditor", :on-open.sync="closeEditor")
                // v-bind:is-show 動態prop 父層改了會傳到子層
                // v-bind:is-show.sync 雙向綁定
                div(slot="content")
                    form
                        div.row
                            div.small-3.columns
                                label.text-right.middle(for="title") 文章標題
                            div.small-9.columns
                                input(type="text",placeholder="請輸入文章標題", value="{{list[activePost].title}}")
                        div.row
                            div.small-3.columns
                                label.text-right.middle(for="title") 文章內容
                            div.small-9.columns
                                textarea(placeholder="請輸入文章文章內容", rows="8", v-html="list[activePost].content") 
                        hr
                        div.news-editor__ctrl.text-center 
                            a.button.secondary(href="#") 取消
                            |&nbsp;
                            a.button(href="#") 送出


</template>

<script>


export default {
    methods: {
        openEditor:function(postid){
            this.isEditorShow = true;
            if(postid) {
                this.activePost = postid;
            }
        },
        closeEditor:function(){
            this.isEditorShow = false;
            this.activePost = null;
        }
    },
    data() {
        return {
            isEditorShow:false,
            animateDemo1: true,
            gsapDemo1:true,
            activePost: null,
            list:{
                '1': {
                    title:'title1',
                    content:'####adfafd aadfadf'
                }
            }
        }
    },
    filters: {
        marked: marked
    },
    ready: function () {

    }
}
</script>

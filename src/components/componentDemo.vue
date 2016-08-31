<style lang="stylus">
    .newsPost {
        &__item {
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
            div.newsPost__list.callout(v-for="item in list" track-by="$index")
                div.newsPost__item.small-12.media-object
                    section.media-object-section
                        h2 {{$index}}--{{$key}}--{{item.title}}
                        div(v-html="item.content | marked") 
                        button.newsPost__edit.button(@click="openEditor($key)") 編輯
            

            light-box(:is-show.sync="isEditorShow", :on-close.sync="openEditor", :on-open.sync="closeEditor")
                // v-bind:is-show 動態prop 父層改了會傳到子層
                // v-bind:is-show.sync 雙向綁定
                div(slot="content")
                    validator(name="validationPost" )
                        form(novalidate)
                            div.row
                                div.small-3.columns
                                    label.text-right.middle(for="title") 文章標題
                                div.small-9.columns
                                    input#input-title(type="text",placeholder="請輸入文章標題", v-model="editorItem.title",v-validate:input-title="{ required:{rule: true, message: 'required 文章標題 !!'}}")

                            div.row
                                div.small-3.columns
                                    label.text-right.middle(for="title") 文章內容
                                div.small-9.columns
                                    textarea#input-content(placeholder="請輸入文章文章內容", rows="8", v-model="editorItem.content",v-validate:input-content="{required:{rule: true, message: 'required 文章內容 !!'}}") 
                            hr
                            div.small-9
                                p(v-if="$validationPost.invalid")
                                    span.alert.label(v-for="error in $validationPost.errors" v-show="$validationPost[error.field].touched" ) {{error.message}} 

                            div.news-editor__ctrl.text-center 
                                a.button.secondary(href="#") 取消
                                |&nbsp;
                                a.button(href="#" @click="submitItem($event)") 送出


</template>

<script>
var Vue = require('vue');


export default {
    count: 0,
    created: function(){
        // this.count = Object.keys(this.list).length; 
    },
    methods: {
        openEditor:function(postid){
            var _this = this;
            if(postid && this.list[postid]) {
                this.editorItem.postid = postid;
                this.editorItem.title = this.list[postid].title || "";
                this.editorItem.content = this.list[postid].content || "";
            }
            Vue.nextTick(function(){
                _this.isEditorShow = true;
            });
        },
        restEditor:function(){
            var itme = this.editorItem;
            Object.keys(itme).map(function(key, index) {
               itme[key] = "";
            });       
        },
        closeEditor:function(){
            var _this = this;
            _this.isEditorShow = false;
            _this.$resetValidation();

            Vue.nextTick(function(){
                _this.restEditor();
            });
        },
        submitItem:function(e) {
            var _this = this;
            e.preventDefault();
            _this.$validate(true,function(){
                if(_this.$validationPost.invalid){
                    console.log('error');
                    return;
                }else {
                    _this.saveItem();
                }
            });
            
        },
        saveItem:function(){
            var _this = this;
            var item = _this.editorItem;
        
            if(item.postid && item.postid.length != "" ){
                //儲存
                var saveItem = _this.list[item.postid];

                Object.keys(item).map(function(key, index) {
                    Vue.set( saveItem, key, item[key] );
                }); 
            }
            else {
                //新增
                // _this.list.push({ Math.random().toString():
                //     title: item.title,
                //     content:item.content
                // });

                console.log('add');

                Vue.set( _this.list, Math.random().toString(), {
                     title: item.title,
                     content:item.content 
                });

            }
            _this.closeEditor();

        }
    },
    data() {
        return {
            isEditorShow:false,
            animateDemo1: true,
            gsapDemo1:true,
            editorItem: {
                postid: '',
                title:'',
                content:'' 
            },
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

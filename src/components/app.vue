<style lang="stylus">
ul {
    padding-left: 0;
    font-family: Helvetica, Arial, sans-serif;
}

.staggered-transition {
    transition: all .5s ease;
    overflow: hidden;
    margin: 0;
    height: 20px;
}

.staggered-enter,
.staggered-leave {
    opacity: 0;
    height: 0;
}
</style>

<template lang="jade">
    input(v-model="query" type="text")
    ul
        li(v-repeat="list | filterBy query" ) {{msg}}
</template>

<script>
export default {
    data() {
        return {
            query: '',
            list: [{
                msg: 'Bruce Lee'
            }, {
                msg: 'Jackie Chan'
            }, {
                msg: 'Chuck Norris'
            }, {
                msg: 'Jet Li'
            }, {
                msg: 'Kung Fury'
            }]
        }
    }
}
</script>

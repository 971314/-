<template>
    <div class="filter">
        <div v-for="f in $parent.filter">
            <span>{{f.name}}：</span>
            <a :class="{'bg-blue': $route.query[f.type]==0 || !$route.query[f.type]}" v-on:click="change(f.type, 0)">全部</a>
            <a v-for="(k,v) in f.data" :class="{'bg-blue': $route.query[f.type]==k}" v-on:click="change(f.type, k)">{{v}}</a>
        </div>
    </div>
</template>
<script>
     module.exports = {
         props:[],
         methods: {
             change (t, k) {
                 var query = this.$route.query;
                 if(k == 0 && (query[t] == undefined || query[t] == ""))
                     return;
                 if(query[t] != k) {
                     query[t] = k;
                     query.currentindex = 1;
                     this.$router.go({query});
                 }
             }
         }
     }
</script>
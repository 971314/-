<template>
    <div class="page" v-show="totalPage>0">
            <a :class="{'fc-gray':page==1,'fc-blue':page>1}" v-on:click="change(-1)">上一页</a>
            <span>{{page}}/{{totalPage}}</span>
            <a :class="{'fc-gray':page>=totalPage,'fc-blue':page<totalPage}" v-on:click="change(1)">下一页</a>
    </div>
</template>
<script>
    var pageReg = /^\d+$/;
    function initPage(query){
        if(!pageReg.test(query.currentindex))
            query.currentindex = 1;
        query.currentindex -= 0;
        !query.currentindex && (query.currentindex = 1);
        return query.currentindex;
    }
     module.exports = {
         data(){
             return {
                 page: initPage(this.$route.query),
                 totalPage: 0
             };
         },
         methods: {
             change (p) {
                 p += this.page;
                 if(p > 0 && p <= this.totalPage) {
                     this.$route.query.currentindex = p;
                     this.$router.go({query:this.$route.query});
                 }
             },
             totalCount (count) {
                 this.totalPage = Math.ceil(count/utils.pageCount);
                 if(this.page > this.totalPage)
                     this.page = this.totalPage+1;
             }
         },
         ready() {
             this.$parent.loadData(this);
         },
         watch: {
             $route({query}) {
                 this.page = initPage(query);
                 this.$parent.loadData(this);
             }
         }
     }
</script>
<template>
    <div class="page" v-show="totalPage>0">
        <a :class="{disabled:page<2}" @click="go(1)">首页</a>
        <a :class="{disabled:page<2}" @click="go(page-1)">上一页</a>
        <span><input type="text" :value="page" @keyup.enter="go2($event)"/>/ {{totalPage}}</span>
        <a :class="{disabled:page>=totalPage}" @click="go(page+1)">下一页</a>
        <a :class="{disabled:page>=totalPage}" @click="go(totalPage)">尾页</a>
    </div>
</template>
<script>
     module.exports = {
         data(){
             this.pageSize = 10;
             return {
                 totalPage:0,
                 page:1
             }
         },
         methods:{
             go(p){
                 if(p == this.page)
                     return;
                 if(p < 1 || p > this.totalPage)
                     return;
                 this.page = p;
                 this.$parent.loadData();
             },
             go2(e){
                 var p = e.target.value;
                 if(utils.intReg.test(p) && p <= this.totalPage && p > 0) {
                     this.page = p-0;
                     this.$parent.loadData();
                 }
             },
             totalCount(c){
                 this.totalPage = Math.ceil(c/this.pageSize);    
             }
         }
     }
</script>
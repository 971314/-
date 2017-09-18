<template>
    <div class="page" v-show="totalPage>0">
        <a class="prev" v-show="page>1" @click="go(page-1)"><i></i>上一页</a>
        <span v-show="(mode&&page>3)||(!mode&&page>4)">...</span>
        <a v-show="!mode&&page-3>0" @click="go(page-3)">{{page-3}}</a>
        <a v-show="page-2>0" @click="go(page-2)">{{page-2}}</a>
        <a v-show="page-1>0" @click="go(page-1)">{{page-1}}</a>
        <a class="current">{{page}}</a>
        <a v-show="page+1<=totalPage" @click="go(page+1)">{{page+1}}</a>   
        <a v-show="page+2<=totalPage" @click="go(page+2)">{{page+2}}</a>    
        <a v-show="!mode&&page+3<=totalPage" @click="go(page+3)">{{page+3}}</a> 
        <span v-show="(mode&&page+2<totalPage)||(!mode&&page+3<totalPage)">...</span>
        <a class="next" v-show="page<totalPage" @click="go(page+1)">下一页<i></i></a>
        <span class="fc-gray" v-if="!mode">
            共{{totalPage}}页 &nbsp;
            到第<input type="text" @keyup.enter="go2()" ref="input"/>页
            <input type="button" class="btn1 btn2" @click="go2()" value="确定" />
        </span>
    </div>
</template>
<script>
     module.exports = {
         props:["mode", "size"],
         data(){
             this.pageSize = (this.size||15)-0;
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
                 this.go3(p);
             },
             go2(){
                 var p = this.$refs.input.value.trim();
                 if(utils.intReg.test(p) && p <= this.totalPage && p > 0) {
                     this.go3(p-0);
                 }
             },
             go3(p){
                this.page = p;
                this.$parent.loadData();
             },
             totalCount(c){
                 this.totalPage = Math.ceil(c/this.pageSize);    
             }
         }
     }
</script>
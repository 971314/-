<template>
    <div class="text-align">
        <ul class="pagination">
            <li v-if="cur!=1"><a v-on:click="cur--">上一页</a></li>
            <li v-for="pageNum in indexOfs" v-bind:class="{ activeStyle: cur == pageNum}">
                <template v-if='pageNum == 0 '></template>
                <template v-if='pageNum !=0'>
                    <a v-on:click="btnClick(pageNum)">
                        {{ pageNum }}
                    </a>
                </template>
            </li>
            <li  v-if="cur!=count"><a  v-on:click="cur++">下一页</a></li>
            <li><a>共<i>{{count}}</i>页</a></li>
        </ul>
    </div>
</template>
<script>
    export default{
        props:['cur','count'],
        data:function(){
            return{
            }
        },
        computed: {
            indexOfs: function () {
                var left =1;
                var right = this.count;
                var pageNum=[];//显示分页按钮
                if(this.count >= 11){
                    if(this.cur > 5 && this.cur <= this.count -4){
                         left = this.cur - 5;
                         right = this.cur + 4
                    }else{
                        if(this.cur <= 5){
                            left = 1;
                            right = 10
                        }else{
                            right = this.count;
                            left = this.count -9;
                        }
                    }
                }
                    //显示第几页
                        while( left <= right){
                            pageNum.push(left)
                            left ++
                        }
//                console.log(pageNum)
                return pageNum;
            },
        },
        methods:{
            btnClick: function(pageNum){
                if(pageNum != this.cur){
                    this.cur = pageNum;
                    this.$dispatch('btn-click',pageNum)
                }
            }
        },
        //watch 针对表达式或者计算函数 cur数据当它改变的时候，可以获取前后值。然后通知其他组件。
        watch:{//当点击上一页和下一页的时候触发
            cur: function(oldValue , newValue){
                this.$dispatch('btn-click',oldValue)
            }
        },
        ready:function(){
//          alert("子页面的num:"+this.count+"==="+this.cur)
        }
    }
</script>
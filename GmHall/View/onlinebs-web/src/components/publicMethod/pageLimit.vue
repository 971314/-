<template>
    <div class="text-align">
        <ul class="pagination">
            <li v-if="cur!=1"><a v-on:click="cur--">上一页</a></li>
            <li v-for="pageNum in indexOfs" v-bind:class="{ activeStyle: cur == pageNum}">
                <a v-on:click="btnClick(pageNum)">{{ pageNum }}</a>
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
                pageNum:[],//显示分页按钮
            }
        },
        computed: {
            indexOfs: function () {
                //显示第几页
                for(var i=1; i<= this.count; i++){
                    this.pageNum.push(i)
                }
                return this.pageNum;
            },
        },
        methods:{
            btnClick: function(pageNum){
                this.$dispatch('btn-click',pageNum)
            }
        },
        //watch 针对表达式或者计算函数 cur数据当它改变的时候，可以获取前后值。然后通知其他组件。
        watch:{//当点击上一页和下一页的时候触发
            cur: function(oldValue , newValue){
                this.$dispatch('btn-click',oldValue)
                //console.log(arguments)
            }
        },
        ready:function(){
         //  alert("子页面的num:"+this.count)
        }
    }
</script>
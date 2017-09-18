<template>
    <div class="">
        <search></search>
        <filter></filter>
        <table class="list">
            <tr>
                <th style="width:165px">客户姓名</th>
                <th style="width:165px">风险等级</th>
                <th style="width:190px">购买日期</th>
                <th style="width:200px">联系方式</th>
                <th>身份证号</th>
                <th style="width:185px"><sort name="预约日期" type="bookdate" init="de"></sort></th>
                <th style="width:185px">状态</th>
            </tr>
            <tr v-for="d in list">
                <td>{{d.name}}</td>
                <td>{{d.riskevaluation}}</td>
                <td>{{d.buydate}}</td>
                <td>{{d.phone}}</td>
                <td>{{d.idnum}}</td>
                <td>{{d.bookdate}}</td>
                <td :class="{'fc-blue':d.status=='预约','fc-orange':d.status=='已购买'}">{{d.status}}</td>
            </tr>
        </table>
        <div class="nodata" v-show="totalCount===0">没有相关数据</div>
        <page></page>
    </div>
</template>

<script>
    var filter = [
        {name:"状态", 
         type:"statusid",
         data:{
            '2':'预约',
            '1':'已购买'
         }}];
    module.exports = {
        data(){
                app.current = 10;
                app.title = this.$route.params.name;
                return {
                    filter,
                    list:[],
                    totalCount:null
                }
        },
        methods: {
            loadData (page) {
                utils.post(
                    "product/customer", 
                    $.extend({pagecount: utils.pageCount, productid: this.$route.params.id}, this.$route.query),
                    res=>{
                        this.list = res[0].customers;
                        page.totalCount(this.totalCount=res[0].totalCount);
                }) 
            }
        }
    }
</script>
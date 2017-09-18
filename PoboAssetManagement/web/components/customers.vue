<template>
    <div class="cutomersView">
        <search></search>
        <filter></filter>
        <table class="list">
            <tr>
                <th style="width:143px">客户姓名</th>
                <th style="width:143px">风险等级</th>
                <th style="width:143px"><sort name="注册日期" type="rtime" init="de"></sort></th>
                <th style="width:143px">联系方式</th>
                <th>身份证号</th>
                <th style="width:143px">已购产品</th>
                <th style="width:143px">预约中的产品</th>
                <th style="width:143px">处理中的产品</th>
                <th style="width:143px;">更多操作</th>
            </tr>
            <tr v-for="d in list">
                <td>{{d.name}}</td>
                <td>{{d.riskevaluation}}</td>
                <td>{{d.rtime}}</td>
                <td>{{d.phone}}</td>
                <td>{{d.idnum}}</td>
                <td>
                    <a class="fc-blue" v-on:click="view(d, 3)" v-if="d.bought>0">{{d.bought}}（查看）</a>
                    <span v-if="d.bought==0">0</span>
                </td>
                <td>
                    <a class="fc-blue" v-on:click="view(d, 1)" v-if="d.unhandled>0">{{d.unhandled}}（查看）</a>
                    <span v-if="d.unhandled==0">0</span>
                </td>
                <td>
                    <a class="fc-blue" v-on:click="view(d, 2)" v-if="d.handling>0">{{d.handling}}（查看）</a>
                    <span v-if="d.handling==0">0</span>
                </td>
                <td>
                    <div class="actions">
                        <a class="icon more" v-on:click="showAction=$index"></a>
                        <div v-show="showAction==$index">
                            <a href="#!/customer/{{d.id}}">修改资料</a>
                            <a @click="showLog(d.id)">操作日志</a>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        <div class="nodata" v-show="totalCount===0">没有相关数据</div>
        <page></page>
        <logs v-ref:logs></logs>
    </div>
</template>
<script>
    var filter = [
        {name:"风险等级", 
         type:"riskevaluation",
         data:{
            '1':'保守型',
            '2':'稳健型',
            '3':'积极型'
         }}
    ];
     module.exports = {
         data(){
             app.current = 3;
             $(document).on("click.action", e => {
                 if(e.target.className != "icon more") {
                     this.showAction = -1;
                 }
             });
             return {
                 showAction:-1,
                 filter,
                 list:[],
                 totalCount:null
             }
         },
         methods: {
             loadData (page) {
                 utils.post("customer/list", $.extend({pagecount:utils.pageCount}, this.$route.query), 
                     res=>{
                         this.list = res[0].customers;
                         page.totalCount(this.totalCount=res[0].totalCount);
                 })     
             },
             showLog (id) {
                 this.$refs.logs.load("customer/records", id);
             },
             view (d, status) {
                 this.$router.go({path:"/appoints", query:{status, name:d.name}});
             }
         },
         beforeDestroy(){
             $(document).off("click.action");
        }
     }
</script>
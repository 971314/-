<template>
    <div class="prefersView">
        <search></search>
        <div class="tabs"><a :class="{'bg-blue':!$route.query.type||$route.query.type==1}" @click="changeType(1)">定制产品</a><a :class="{'bg-blue':$route.query.type==2}" @click="changeType(2)">投顾招募</a></div>
        <table class="list" v-show="$route.query.type!=2">
            <tr>
                <th style="width:122px"><sort name="提交日期" type="btime" init="de"></sort></th>
                <th style="width:122px">客户姓名</th>
                <th style="width:142px">联系方式</th>
                <th style="width:160px">公司名称</th>
                <th style="width:160px">职业</th>
                <th style="width:160px">感兴趣产品类型</th>
                <th style="width:160px">产品规模</th>
                <th style="width:160px">收益预期</th>
                <th style="width:160px">风险偏好</th>
                <th>备注</th>
            </tr>
            <tr v-for="d in list">
                <td>{{d.cdate}}</td>
                <td>{{d.name}}</td>
                <td>{{d.phone}}</td>
                <td>{{d.company}}</td>
                <td>{{d.job}}</td>
                <td>{{d.interested}}</td>
                <td>{{d.size}}</td>
                <td>{{d.profit}}</td>
                <td>{{d.risk}}</td>
                <td>{{d.remark}}</td>
            </tr>
        </table>
        <table class="list" v-show="$route.query.type==2">
            <tr>
                <th style="width:122px"><sort name="提交日期" type="btime" init="de"></sort></th>
                <th style="width:122px">客户姓名</th>
                <th style="width:142px">联系方式</th>
                <th style="width:160px">公司名称</th>
                <th style="width:122px">资管管理规模</th>
                <th style="width:122px">拟发时间</th>
                <th style="width:160px">是否具备基金从业资格</th>
                <th style="width:122px">私募运行阶段</th>
                <th style="width:160px">是否在基金业协会备案</th>
                <th style="width:122px">是否已发行产品</th>
                <th>备注</th>
            </tr>
            <tr v-for="d in list2">
                <td>{{d.cdate}}</td>
                <td>{{d.name}}</td>
                <td>{{d.phone}}</td>
                <td>{{d.company}}</td>
                <td>{{d.size}}</td>
                <td>{{d.issuetime}}</td>
                <td>{{d.fundqualification}}</td>
                <td>{{d.stage}}</td>
                <td>{{d.beian}}</td>
                <td>{{d.issueproduct}}</td>
                <td>{{d.remark}}</td>
            </tr>
        </table>
        <div class="nodata" v-show="totalCount===0">没有相关数据</div>
        <page></page>
    </div>
</template>
<script>
    module.exports = {
         data(){
             app.current = 4;
             return {
                 list:[],
                 list2:[],
                 totalCount:null
             }
         },
         methods: {
             loadData(page) {
                 var type = this.$route.query.type;
                 utils.post("information/" + (type==2?"investmentadviser":"customizedproduct"), $.extend({pagecount:utils.pageCount}, this.$route.query), res=>{
                     this[type==2?"list2":"list"] = res[0].list;
                     this[type==2?"list":"list2"] = [];
                     page.totalCount(this.totalCount = res[0].totalCount);
                 }) 
             },
             changeType(type){
                 var q = this.$route.query;
                 if(type==q.type || (type==1 && !q.type))
                     return;
                 this.$router.go({query:{name:q.name||"", phone:q.phone||"", type}});
             }
         }
     }
</script>
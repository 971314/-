<template>
    <div class="appointView">
        <search></search>
        <filter></filter>
        <table class="list">
            <tr>
                <th style="width:122px">客户名称</th>
                <th style="width:173px">产品名称</th>
                <th style="width:142px">风险等级</th>
                <th style="width:142px"><sort name="预约时间" type="btime" init="de"></sort></th>
                <th style="width:142px">联系方式</th>
                <th style="width:215px">身份证号</th>
                <th style="width:142px">状态</th>
                <th style="width:158px">预计预约金额</th>
                <th>更多操作</th>
            </tr>
            <tr v-for="d in list">
                <td>{{d.cname}}</td>
                <td><div class="ellipsis">{{d.pname}}</div></td>
                <td>{{d.risklevel}}</td>
                <td>{{d.btime}}</td>
                <td>{{d.phone}}</td>
                <td>{{d.idnum}}</td>
                <td :class="{'fc-red':d.status=='未处理', 'fc-blue':d.status=='处理中', 'fc-gray':d.status=='已取消', 'fc-orange':d.status=='已购买'}">{{d.status}}</td>
                <td>{{d.amount}}</td>
                <td>
                    <div class="actions">
                        <a class="icon more" v-on:click="showAction=$index"></a>
                        <div v-show="showAction==$index">
                            <a v-if="d.status=='未处理'" @click="change(d, 2)">处理中</a>
                            <a v-if="d.status=='处理中'" @click="change(d, 4)">已取消</a>
                            <a v-if="d.status=='处理中'" @click="change(d, 3)">已购买</a>
                            <a v-on:click="showLog(d.id)">操作日志</a>
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
        {name:"预约分类", 
         type:"status",
         data:{
            '1':'未处理',
            '2':'处理中',
            '3':'已购买',
            '4':'已取消'
         }},
        {name:"风险等级", 
         type:"risklevel",
         data:{
            '3':'高风险',
            '2':'中风险',
            '1':'低风险'
         }}
    ];
    var listView = utils.listView(1, filter, "booking");
    listView.methods.change = (d, status) => {
        utils.post("booking/status", {id:d.id, status}, ()=>{
            d.status = filter[0].data[status];
        }) 
    };
    module.exports = listView;
</script>
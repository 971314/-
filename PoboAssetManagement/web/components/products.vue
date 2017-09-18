<template>
    <div class="productsView">
        <filter></filter>
        <div class="add"><a class="fc-blue btn-white" @click="edit(0)">+新增产品</a></div>
        <table class="list">
            <tr>
                <th style="width:261px">产品名称</th>
                <th style="width:143px">状态</th>
                <th style="width:143px"><sort name="成立时间" type="time"></sort></th>
                <th style="width:143px">产品形式</th>
                <th style="width:143px"><sort name="已购客户" type="bought"></sort></th>
                <th style="width:143px"><sort name="预约客户" type="booked"></sort></th>
                <th style="padding-left:240px;">更多操作</th>
            </tr>
            <tr v-for="d in list">
                <td class="name">
                    <span :class="{'bg-blue':d.status=='上线','bg-orange':d.status=='下架'}">{{d.status}}</span>
                    {{d.name}}
                </td>
                <td>{{d.period}}</td>
                <td>{{d.time}}</td>
                <td>{{d.channel}}</td>
                <td>
                   <a class="fc-blue" @click="view(d, 1)" v-if="d.bought>0">{{d.bought}}（查看）</a>
                   <span v-if="d.bought==0">0</span>
                </td>
                <td>
                    <a class="fc-blue" @click="view(d, 2)" v-if="d.booked>0">{{d.booked}}（查看）</a>
                    <span v-if="d.booked==0">0</span>
                </td>
                <td class="edit">
                    <a class="fc-gray" @click="edit(d.id)">产品编辑</a>
                    <div class="actions">
                        <a class="icon more" v-on:click="showAction=$index"></a>
                        <div v-show="showAction==$index">
                            <a @click="change(d)">{{d.status=='上线'?"下架":"上线"}}</a>
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
        {name:"分类", 
         type:"typeid",
         data:{
            '1':'自营',
            '2':'代销'
         }},
        {name:"状态", 
         type:"periodid",
         data:{
            '1':'认购期',
            '2':'封闭期',
            '3':'正常开放'
         }},
        {name:"产品形式", 
         type:"channelid",
         data:{
            '1':'管理型',
            '2':'通道型'
         }}
    ];
    var listView = utils.listView(2, filter, "product");
    listView.methods.change = d => {
        utils.post("product/status", {id:d.id, status:d.status=='上线'?2:1}, ()=>{
            d.status = d.status=='上线'?"下架":"上线";
        })
    }
    listView.methods.view = function(d, statusid) {
        app.prev = this.$route.path;
        this.$router.go({path:"/product/appoints/" + d.id + "/" + d.name, query:{statusid}});
    }
    listView.methods.edit = function(id) {
        app.prev = this.$route.path;
        this.$router.go("/product/" + id);
    }
    module.exports = listView;
</script>
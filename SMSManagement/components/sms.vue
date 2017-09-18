<template>
    <div>
        <div class="search">
            手机号 <input type="text" v-model.trim="data.mobile" />
            机构 <CustomSelect name="orgID" all="1" type="org"></CustomSelect>
            开始日期 <input type="text" ref="beginDate" style="width:120px"/>
            结束日期 <input type="text" ref="endDate" style="width:120px"/>
            <a class="btn1" @click="submit()">搜索</a>
        </div>
        <div style="overflow-x:auto;">
        <table class="list" :style="{width:list.length>0?'1850px':'1400px'}">
            <tr>
                <th>手机号</th>
                <th style="width:300px;">内容</th>
                <th>机构</th>
                <th>机构id</th>
                <th>短信类型</th>
                <th>类型id</th>
                <th>短信渠道</th>
                <th>渠道id</th>
                <th>来源地址</th>
                <th>发送状态</th>
                <th>返回码</th>
                <th>错误码</th>
                <th>短信后台编号</th>
                <th>渠道状态</th>
                <th>接收时间</th>
                <th>发送时间</th>
            </tr>
            <tr v-for="d in list">
                <td>{{d.mobile}}</td>
                <td><div class="ellipsis" style="max-width:300px;" :title="d.content">{{d.content}}</div></td>
                <td>{{d.orgName}}</td>
                <td>{{d.orgID}}</td>
                <td>{{d.typeName}}</td>
                <td>{{d.typeID}}</td>
                <td>{{d.channelName}}</td>
                <td>{{d.channelID}}</td>
                <td>{{d.ip}}</td>
                <td :class="{'fc-red':d.state==0, 'fc-green':d.state==1}">{{d.state==1?"成功":(d.state==0?"失败":"未知")}}</td>
                <td>{{d.backCode}}</td>
                <td>{{d.errorCode}}</td>
                <td>{{d.taskID}}</td>
                <td>{{d.stateOrig}}</td>
                <td>{{d.msgReceTime|time}}</td>
                <td>{{d.msgSendTime|time}}</td>
            </tr>
        </table>
        </div>
        <Page ref="page"></Page>
    </div>
</template>
<script>
     module.exports = {
         mixins: [utils.listView],
         data(){
             this.func = 551;
             var date = new Date();
             this.today = utils.date(date);
             var beginTime = this.today.replace(/\-/g, "");
             date.setTime(date.getTime() + 86400000);
             var endTime = utils.date(date,"");
             return {
                 data:{
                     orgID:0,
                     beginTime,
                     endTime
                 }
             }
         },
         mounted(){
             $(this.$refs.beginDate).val(this.today).datepicker({format: "yyyy-mm-dd",autoclose:true,endDate:"0d"});
             $(this.$refs.endDate).val(this.today).datepicker({format: "yyyy-mm-dd",autoclose:true,endDate:"0d"});
         },
         methods:{
             submit(){
                 this.data.orgID -= 0;
                 this.data.beginTime = this.$refs.beginDate.value.replace(/\-/g, "");
                 this.data.endTime = "";
                 if(this.$refs.endDate.value){
                     var date = utils.parseDate(this.$refs.endDate.value);
                     date.setTime(date.getTime() + 86400000);
                     this.data.endTime = utils.date(date, "");
                 }
                 this.search();
             }
         }
     }
</script>
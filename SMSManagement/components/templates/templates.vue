<template>
    <div>
        <div class="search">
<!--
            渠道 <CustomSelect name="channelID" all="1" type="channel"></CustomSelect>
            类型 <CustomSelect name="typeID" all="1" type="type"></CustomSelect>
            <a class="btn1" @click="search()">搜索</a>
-->
            <a class="btn1" href="#/main/template/0">新增短信模板</a>
        </div>
        <table class="list">
            <tr>
                <th>编号</th>
                <th>短信渠道</th>
                <th>短信类型</th>
                <th style="width:600px;">内容</th>
                <th style="width:150px;">操作</th>
            </tr>
            <tr v-for="d in list">
                <td>{{d.id}}</td>
                <td>{{d.channelName}}</td>
                <td>{{d.typeName}}</td>
                <td><div class="ellipsis" style="max-width:600px;" :title="d.content">{{d.content}}</div></td>
                <td>
                    <a class="btn1" :href="'#/main/template/'+d.id">修改</a>
                    <a class="btn1" @click="del(d)">删除</a>
                </td>
            </tr>
        </table>
<!--        <Page></Page>-->
    </div>
</template>
<script>
     module.exports = {
         mixins: [utils.listView2],
         data(){
             this.func = 543;
             this.delFunc = 544;
             return {
                 data:{
//                     channelID:"",
//                     typeID:""
                 }
             }
         }
     }
</script>
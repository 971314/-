<template>
    <div>
        <div class="search">
<!--
            机构 <CustomSelect name="orgid" all="1" public="1" type="org"></CustomSelect>
            <a class="btn1" @click="search()">搜索</a>
-->
            <a class="btn1" href="#/main/channel/0">新增短信渠道</a>
<!--            <a class="btn1" href="#/main/channel/upload">上传jar包</a>-->
        </div>
        <table class="list">
            <tr>
                <th>编号</th>
                <th>机构</th>
                <th>短信渠道名称</th>
                <th style="width:150px;">地址</th>
                <th>用户名</th>
                <th>密码</th>
                <th>优先级</th>
                <th style="width:100px;">包名</th>
                <th>是否支持状态响应</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            <tr v-for="d in list">
                <td>{{d.id}}</td>
                <td>{{d.orgName}}</td>
                <td>{{d.name}}</td>
                <td><div class="ellipsis" style="max-width:150px;" :title="d.url">{{d.url}}</div></td>
                <td>{{d.username}}</td>
                <td>{{d.password}}</td>
                <td>{{d.priority}}</td>
                <td><div class="ellipsis" style="max-width:100px;" :title="d.packageName">{{d.packageName}}</div></td>
                <td>{{d.report==1?"是":"否"}}</td>
                <td :class="{'fc-green':d.valid,'fc-red':!d.valid}">{{d.valid?"有效":"禁用"}}</td>
                <td>
                    <a class="btn1" :href="'#/main/channel/'+d.id">修改</a>
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
             this.func = 533;
             this.delFunc = 535;
             return {
                 data:{
//                     orgid:"所有"
                 }
             }
         }
     }
</script>
<template>
    <div class="usersView">
        <div class="search">
            <a class="btn1" href="#/main/org/0">新增机构</a>
        </div>
        <table class="list">
            <tr>
                <th>机构编号</th>
                <th>机构名称</th>
                <th>短信前缀</th>
                <th>渠道选择</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            <tr v-for="d in list">
                <td>{{d.id}}</td>
                <td>{{d.name}}</td>
                <td>{{d.prefix}}</td>
                <td :class="{'fc-green':d.channelSelect==0, 'fc-blue':d.channelSelect==1}">{{d.channelSelect==0?"公共":(d.channelSelect==1?"专有":"所有")}}</td>
                <td :class="{'fc-green':d.valid,'fc-red':!d.valid}">{{d.valid?"有效":"禁用"}}</td>
                <td>
                    <a class="btn1" :href="'#/main/org/'+d.id">修改</a>
                    <a class="btn1" @click="del(d)">删除</a>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
     module.exports = {
         mixins:[utils.listView2],
         created(){
             this.func = 523;
             this.delFunc = 525;
         }
     }
</script>
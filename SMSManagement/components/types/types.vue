<template>
    <div>
        <div class="search">
            <a class="btn1" href="#/main/type/0">新增短信类型</a>
        </div>
        <table class="list">
            <tr>
                <th>编号</th>
                <th>短信类型名称</th>
                <th>默认前缀</th>
                <th style="width:540px;">默认模板</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            <tr v-for="d in list">
                <td>{{d.id}}</td>
                <td>{{d.name}}</td>
                <td>{{d.prefix}}</td>
                <td>{{d.content}}</td>
                <td :class="{'fc-green':d.valid,'fc-red':!d.valid}">{{d.valid?"有效":"禁用"}}</td>
                <td>
                    <a class="btn1" :href="'#/main/type/'+d.id">修改</a>
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
             this.func = 513;
             this.delFunc = 515;
         }
     }
</script>
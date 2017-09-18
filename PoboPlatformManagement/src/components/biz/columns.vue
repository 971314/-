<template>
    <div class="bizColumns">
        <div class="title">栏目管理</div>
        <div class="main">
            <table class="list">
                <tr>
                    <th style="width:350px">栏目名称</th>
                    <th style="width:170px">栏目ID</th>
                    <th style="width:170px">最近修改时间</th>
                    <th>操作</th>
                </tr>
            </table>
            <div class="list2">
                <ColumnTree :data="list" :perms="perms"></ColumnTree>
            </div>
        </div>
    </div>
</template>
<script>
     module.exports = {
         mixins:[utils.listView],
         data(){
             this.func = 640;
             this.post = utils.post2;
             return {
                 data:{
                     code:"0"
                 },
                 perms:{
                     add:true,edit:true,show:true,del:true
                 }
             }
         },
         methods:{
             loaded(data){
                 var list2 = [];
                 utils.genTree(data, list2);
                 this.list = list2;
             }
         }
     }
</script>
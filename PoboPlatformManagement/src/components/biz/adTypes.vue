<template>
    <div class="adTypesView">
        <div class="title">广告管理</div>
        <div class="main">
            <table class="list">
                <tr>
                <th>广告位置</th>
                <th>广告描述</th>
                <th>图片数量</th>
                <th>轮播速度</th>
                <th>更新时间</th>
                <th>操作</th>
                </tr>
                <tr v-for="d in list">
                <td>{{d.name}}</td>
                <td>{{d.description}}</td>
                <td>{{d.advtips}}</td>
                <td>{{d.advstep}}秒</td>
                <td>{{d.updatetime.split(" ")[0]}}</td>
                <td>
                    <input type="button" class="btn1" value="管理" :disabled="!perms.detail" @click="detail(d)"/>
                </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
     module.exports = {
         mixins:[utils.listView],
         data(){
             this.func = 634;
             this.post = utils.post2;
             return {
                 perms:{detail:true}
             }
         },
         methods:{
             detail(d){
                 this.$router.push("/main/gggl/"+d.code+"/"+d.name);
             }
         }
     }
</script>
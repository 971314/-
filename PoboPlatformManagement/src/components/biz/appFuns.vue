<template>
    <div class="bizAppFunc">
        <div class="title">搜索功能管理</div>
        <div class="main">
            <div class="search">
                <File uploadName="导入" func="632" @upload="loadData" reg="xls" v-if="perms.import"></File>
                <a class="btn1" target="test" :href="download" v-if="perms.export">导出</a>
            </div>
            <div>最近更新时间：{{time}}</div>
            <table class="list" style="margin-top:20px;">
                <tr>
                    <th style="width:450px;">功能路径</th>
                    <th>跳转配置</th>
                </tr>
            </table>
            <div class="scrolly">
                <table class="list">
                    <tr v-for="d in list">
                        <td style="width:450px;">{{d.functrace}}</td>
                        <td>{{d.func}}</td>
                    </tr>
                </table>
            </div>    
        </div>
        <iframe name="test" style="display:none;"/>
    </div>
</template>
<script>
     module.exports = {
         data(){
              this.download = config.funcDownloadApi + "?func=633";
              return {
                  time:"",
                  list:[],
                  perms:{import:true, export:true}
              }
         },
         methods:{
             loadData(){
                utils.post2(631, {funckey:""}, (data, res)=>{
                    this.list = data;
                    this.time = res.updateTime;
                }, null, null, config.funcApi);
             }
         },
         mounted(){
             this.loadData();
         }
     }
</script>
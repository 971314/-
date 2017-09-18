<template>
    <div class="mask" :class="{show:show}">
      <div class="popup">
        <div class="main">
          <div class="search">
            <input type="text" v-model.trim="data.title" placeholder="输入资讯关键字" style="width:370px;"/>
                    <a class="btn1" style="margin:0 0 0 5px;" @click="search">搜索</a>
          </div>
          <table class="list">
            <tr>
              <th>标题</th>
              <th style="width:90px;">操作</th>
            </tr>
            <tr v-for="d in list">
              <td>{{d.infotitle}}</td>
              <td>
                <input type="button" class="btn1" disabled v-if="(infoTypes.indexOf(d.typecode)!=-1||ids.indexOf(d.id)!=-1)&&!ids2[d.id]" value="已添加"/>
                <input type="button" class="btn1" @click="add(d)" v-else value="添加"/>
              </td>
            </tr>
          </table>
        </div>
        <Page ref="page" mode="1" size="10"></Page>
        <a class="x" @click="showSelf(false)">确认</a>
      </div>
    </div>
</template>
<script>
    var added = false;
     module.exports = {
         data(){
             this.defer = 1;
             return {
                 data: {
                     title:""    
                 },
                 list:[],
                 infoTypes:[],
                 ids:[],
                 ids2:{},
                 show:false
             }
         },
         methods:{
             showSelf(f){
                 if(f) {
                     added = false;
                     if(this.defer) {
                         --this.defer;
                         this.query = {title:""};
                         this.loadData();
                     }else
                         this.loadInfoID();
                 }else if(added){
//                     this.$parent.$refs.page.page = 1;
                     this.$parent.loadData();
                 }
                 this.show = f;
             },
             loadData(){
                 this.loadInfoID();
                 utils.infoPost(705, 
                                 {needCount:1,
                                  searchKey:this.query.title,
                                  audit:"1"}, 
                                 res=>{
                         this.list = res[0].results;
                     },this.$refs.page);
             },
             loadInfoID(){
                 utils.post2(650, {code:this.$parent.query.columnId}, res=>{
                     res = res[0];
                     this.infoTypes = (res.infotype&&res.infotype.split(","))||[];
                     res = res.infolist;
                     var ids = [], ids2 = {};
                     for(var i=0;i<res.length;i++){
                         if(res[i].flag == 0) 
                             ids2[res[i].infoid] = res[i].id;
                         else
                             ids.push(res[i].infoid);
                     }
                     this.ids = ids;
                     this.ids2 = ids2;
                 })
             },
             add(d){
                 utils.post2(646, {id:(this.ids2[d.id]||"")+"", isspecal:this.infoTypes.indexOf(d.typecode)==-1?"1":"0", infoid:d.id+"", code:this.$parent.query.columnId,isshow:"0"}, ()=>{
                     this.ids2[d.id] && (this.ids2[d.id]=null);
                     this.ids.indexOf(d.id)==-1 && this.ids.push(d.id);
                     added = true;
                 })
             },
             search(){
                 this.query.title = this.data.title;
                 this.$refs.page.page = 1;
                 this.loadData();
             }
         }
     }
</script>
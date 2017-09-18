<template>
    <div class="bizColumnInfo">
        <div class="title">栏目内容管理</div>
        <div class="main">
           <div class="search rel">
               选择栏目
               <select v-model="data.columnId" ref="select" style="min-width:190px;">
                   <option v-for="d in columns" :value="d.code" v-html="d.name"></option>
               </select>
               <input type="text" v-model.trim="data.title" placeholder="请输入资讯关键字" style="width:220px"/>
               <a class="btn1" @click="search">查询</a>
               <a class="btn1 abs" @click="showPop">添加</a>
           </div>
            <table class="list" style="width:830px;">
                <tr>
                    <th>标题</th>
                    <th style="width:180px">资讯类别</th>
                    <th style="width:190px">操作</th>
                </tr>
                <tr v-for="d in list">
                    <td>{{d.infotitle}}</td>
                    <td>{{types[d.typecode]}}</td>
                    <td>
                       <input type="button" class="btn1" :value="topIds.indexOf(d.id)==-1?'置顶':'取消置顶'" @click="top(d)"/>
                       <input type="button" class="btn1" value="删除" @click="del(d)"/>
                    </td>
                </tr>
            </table>
            <Page ref="page"></Page>
        </div>
        <InfoPop ref="pop" size="10"></InfoPop>
    </div>
</template>
<script>
    function initColumn(src, des, level){
        var s = "";
        for(var i=0;i<level;i++) {
            s += "&nbsp;&nbsp;&nbsp;";
        }
        for(var i=0;i<src.length;i++){
            des.push(src[i]);
            src[i].name = s + src[i].name;
            src[i].infotype = (src[i].infotype ? src[i].infotype.split(",") : []);
            src[i].subs && initColumn(src[i].subs, des, level+1);
        }
    }
    
    var addMaps, infoTypes;
    
     module.exports = {
         data(){
              return {
                  data:{
                      columnId:"",
                      title:""
                  },
                  list:[],
                  columns:[],
                  topIds:[],
                  types:{}
              }  
         },
         mounted(){
             utils.post2(640, {code:"0"}, res=>{
                 var list = [], list2 = [];
                 utils.genTree(res, list);
                 initColumn(list, list2, 0);
                 this.columns = list2;
                 this.data.columnId = list2[0].code;
                 this.query = $.extend({}, this.data);
                 this.loadData();
             });
             utils.infoPost(703, {}, res=>{
                 var types = {};
                 for(var i=0;i<res.length;i++){
                     types[res[i].code] = res[i].name;
                 }
                 this.types = types;
             });
         },
         components:{
             InfoPop: require("./columnInfoPop.vue")
         },
         methods:{
             loadData(){
                 utils.post2(650, {code:this.query.columnId}, res=>{
                     res = res[0];
                     infoTypes = (res.infotype&&res.infotype.split(","))||[];
                     res = res.infolist;
                     var tops = [], adds = {}, dels = [], adds2 = [], infoid;
                     for(var i=0;i<res.length;i++){
                         infoid = res[i].infoid;
                         if(!infoid)
                             continue;
                         if(res[i].flag == 0) {
                             dels.push(infoid);
                             continue;
                         }
                         adds[infoid] = res[i].id;
                         adds2.push(infoid);
                         res[i].level == 1 && tops.push(infoid);
                     }
                     this.topIds = tops;
                     addMaps = adds;
                     if(infoTypes.length == 0 && adds2.length == 0) {
                         this.list = [];
                         this.$refs.page.page = 1;
                         this.$refs.page.totalPage = 0;
                         return;
                     }
                     this.loadData2(tops, dels, adds2);
                 })
             },
             loadData2(tops, dels, adds2){
                 utils.infoPost(705, 
                                 {needCount:1,
                                  topIds:tops.length>0?tops:undefined,
                                  ignoreIds:dels.length>0?dels:undefined,
                                  inIds:adds2.length>0?adds2:undefined,
                                  searchKey:this.query.title,
                                  codes:infoTypes.length>0?infoTypes:undefined,
                                  audit:"1"}, 
                                 res=>{
                         res = res[0];
                         this.list = res.results;
                         if(res.count>0 && res.results.length==0) {
                             this.$refs.page.page = this.$refs.page.totalPage;
                             this.loadData2(tops, dels, adds2);
                         }
                 }, this.$refs.page);
             },
             showPop(){
                 this.$refs.pop.showSelf(true);
             },
             top(d){
                 utils.post2(645, {code:this.query.columnId, infoid:d.id, level:this.topIds.indexOf(d.id)==-1?"1":"0"}, ()=>{
                     this.loadData();
                 })
             },
             del(d){
                 if(confirm("确定删除这条资讯吗？")) {
                     utils.post2(646, {id:(addMaps[d.id]||"")+"", isspecal:infoTypes.indexOf(d.typecode)==-1?"1":"0", infoid:d.id+"", code:this.query.columnId,isshow:"1"}, ()=>{
                         this.loadData();
                     })
                 }
             },
             search(){
                 this.query = $.extend({}, this.data);
                 this.$refs.page.page = 1;
                 this.loadData();
             }
         }
     }
</script>
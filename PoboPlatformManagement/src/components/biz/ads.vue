<template>
    <div class="bizAds">
        <div class="title">广告管理-{{$route.params.name}}</div>
        <div class="main">
            <div class="search rel">
            轮播速度
            <select v-model="data.advstep" :disabled="!perms.edit" style="width:95px;">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>秒
                <a class="btn1" @click="showAd" v-show="perms.add">添加</a>
            </div>    
            <table class="list">
                <tr>
                <th style="width:171px;">图片</th>
                <th style="width:390px;">地址</th>
                <th style="width:230px;">描述</th>
                <th>操作</th>
                </tr>
            </table>
            <div class="scrolly">
              <table class="list">
                <tr v-for="(d,i) in list">
                <td style="width:171px;"><a :href="d.img" target="_blank"><img :src="d.img"/></a></td>
                <td style="width:390px;">{{d.url}}</td>
                <td style="width:230px;">{{d.desc}}</td>
                <td>
                    <input type="button" class="btn1" @click="up(i)" :disabled="!perms.edit||i==0" value="上移" />
                    <input type="button" class="btn1" @click="down(i)" :disabled="!perms.edit||i==list.length-1" value="下移" />
                    <input type="button" class="btn1" @click="del(i)" :disabled="!perms.del" value="删除" />
                </td>
                </tr>
              </table>
            </div>
        </div>
        <Ad ref="ad" @select="select" :checks="checks"></Ad>
    </div>
</template>
<script>
     module.exports = {
         data(){
             return {
                 data:{
                     advstep: "1",
                     advid: "",
                     advtips: 0
                 },
                 list:[],
                 checks:[],
                 infoTypes:[],
                 perms:{edit:true,add:true,del:true}
             }
         },
         mounted(){
             var t = this;
             utils.post2(635,{advtype:t.$route.params.id},res=>{
                 res = res[0];
                 t.data = res;
                 t.infoTypes = (res.infotype&&res.infotype.split(","))||[];
                 var ids = (res.advid&&res.advid.split(","))||[];
                 for(var i=0;i<ids.length;i++) {
                    ids[i] -= 0;
                 }
                 this.checks = ids;
                 utils.infoPost(705, {pageNo:1, pageSize:100, needCount:0, inIds:ids}, res=>{
                     res = res[0].results;
                     var list = [];
                     for(var i=0;i<ids.length;i++) {
                         list[i] = {id:ids[i]};
                         for(var j=0;j<res.length;j++){
                             if(ids[i] == res[j].id) {
                                 list[i].desc = res[j].infotitle;
                                 list[i].img = config.img + res[j].imageid + ".png";
                                 list[i].url = res[j].url||res[j].detailId;
                                 break;
                             }
                         }
                     }
                     t.list = list;
                     t.$watch("data.advstep", ()=>{
                         t.save();
                     })
                 })
             });  
         },
         methods:{
             up(i){
                 if(i==0) return;
                 this.list.splice(i-1, 0, this.list.splice(i, 1)[0]);
                 this.checks.splice(i-1, 0, this.checks.splice(i, 1)[0]);
                 this.save();
             },
             down(i){
                 if(i == this.list.length-1) return;
                 this.list.splice(i+1, 0, this.list.splice(i, 1)[0]);
                 this.checks.splice(i+1, 0, this.checks.splice(i, 1)[0]);
                 this.save();
             },
             showAd(){
                 this.$refs.ad.showSelf(true);
             },
             select(d){
                 if(d.length == 0)
                     return;
                 for(var i=0;i<d.length;i++) {
                     this.list.push(d[i]);
                     this.checks.push(d[i].id);
                 }
                 this.save();
             },
             del(i){
                 if(confirm("确定删除该图片吗？")) {
                     this.list.splice(i, 1);
                     this.checks.splice(i, 1);
                     this.save();
                 }
             },
             save(){
                 this.data.advtips = this.checks.length + "";
                 this.data.advid = this.checks.join(",");
                 utils.post2(636, this.data, ()=>{
                     
                 });
             }
         },
         components:{
             Ad: require("./adPop.vue")
         }
     }
</script>
<template>
    <div class="userView">
        <div class="title">栏目管理-{{$route.params.id==0?"添加":"修改"}}子栏目</div>
        <div class="edit">
            <div v-if="$route.params.id!=0">
                <label style="padding-right:14px">栏目ID</label>
                <input type="text" :value="data.code" disabled />
            </div>
            <div>
                <label>栏目名称</label>
                <CustomInput name="name"></CustomInput>
            </div>
            <div>
                <label>资讯类别</label>
                <textarea readonly :value="infoTypes" style="height:34px;"></textarea>
                <a class="btn1" @click="showInfo">选择</a>
            </div>
            <div class="btns">
                <a class="btn1" @click="submit()">保 存</a>
                <a class="btn1" onclick="history.go(-1)">取 消</a>
            </div>
        </div>
        <InfoType ref="infoType" @select="select" :checks="checks" @load="get"></InfoType>
    </div>
</template>
<script>
     module.exports = {
         mixins: [utils.editView],
         data(){
             this.defer = 1;
             this.func = {add:641, edit:643};
             this.post = utils.post2;
             return {
                 data:{
                     parentcode: this.$route.params.pid||"0"
                 },
                 checks:[],
                 infoTypes:""
             }
         },
         methods:{
             submit(){
                 if(this.check()) {
                     this.data.infotype = this.checks.join(",");
                     this.save();
                 }
             },
             showInfo(){
                 this.$refs.infoType.show = true;
             },
             select(d){
                 var checks = [], infoTypes = [];
                 for(var i=0;i<d.length;i++){
                     checks.push(d[i].code);
                     infoTypes.push(d[i].name);
                 }
                 this.checks = checks;
                 this.infoTypes = infoTypes.join(",");
             },
             get(){
                 if(this.$route.params.id != 0) {
                     utils.post2(650, {code:this.$route.params.id}, res=>{
                         res = res[0];
                         this.data = {
                             name: sessionStorage.columnName,
                             code: res.code
                         };
                         this.checks = (res.infotype&&res.infotype.split(","))||[];
                         var infoTypes = [], types = this.$refs.infoType.list;
                         for(var i=0;i<this.checks.length;i++){
                             for(var j=0;j<types.length;j++){
                                 if(types[j].code == this.checks[i]) {
                                     infoTypes.push(types[j].name);
                                     break;
                                 }
                             }
                         }
                         this.infoTypes = infoTypes.join(",");
                     })                  
                 }
             }
         },
         components:{
             InfoType: require("./columnInfoTypePop.vue")
         }
     }
</script>
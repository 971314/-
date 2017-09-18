<template>
    <div class="mask" :class="{show:show}">
        <div class="popup">
            <div class="clearfix">
                <div v-for="d in list" v-show="checks.indexOf(d.id)==-1"><a :href="d.img" target="_blank"><img :title="d.desc" :src="d.img"/></a><input type="checkbox" ref="checkbox" :checked="false"/></div>
            </div>
            <div class="center">
                <a class="btn1" @click="select">添加</a>
                <a class="btn1" @click="showSelf(false)">取消</a>
            </div>
        </div>
    </div>
</template>
<script>
     module.exports = {
         props:["checks"],
         data(){
             this.defer = 1;
             return {
                 list: [],
                 show:false
             }
         },
         methods:{
             select(){
                 var d = [];
                 if(this.$refs.checkbox)
                   for(var i=0;i<this.$refs.checkbox.length;i++){
                     if(this.$refs.checkbox[i].checked)
                       d.push(this.list[i]);
                   }
                 this.$emit("select", d);
                 this.showSelf(false);
             },
             loadData(){
                 utils.infoPost(705, {pageNo:1, pageSize:100, needCount:0, codes:this.$parent.infoTypes}, res=>{
                     res = res[0].results;
                     var list = [];
                     for(var i=0;i<res.length;i++){
                         list[i] = {id:res[i].id, desc:res[i].infotitle, img:config.img+res[i].imageid+".png", url:res[i].url||res[i].detailId};
                     }
                     this.list = list;
                 })
             },
             showSelf(f){
                 this.defer && (--this.defer, this.loadData());
                 this.show = f;
             }
         }
     }
</script>
<template>
    <div>
        <template v-for="(d,i) in data">
        <div class="rel">
            <span class="l" :title="d.name"><a class="icon" @click="open(d)" :style="{'margin-left':level*20+'px'}" :class="{open:d.subs&&d.subs.length>0&&d.open,collapse:d.subs&&d.subs.length>0&&!d.open}"></a>{{d.name}}</span><span style="width:170px;">{{d.code}}</span><span style="width:170px;">{{d.updatetime}}</span>
                <span class="abs">
                    <input type="button" class="btn1" @click="edit(d)" :disabled="!d.propert || d.propert.charAt(0)=='0' || !perms.edit" value="修改" />
                    <input type="button" class="btn1" @click="show(d)" :disabled="!d.propert || d.propert.charAt(1)=='0' || !perms.show" :value="d.isshow==1?'隐藏':'显示'" />
                    <input type="button" class="btn1" @click="del(d, i)" :disabled="!d.propert || d.propert.charAt(2)=='0' || !perms.del" value="删除" />
                    <input type="button" class="btn1" @click="add(d)" :disabled="!d.propert || d.propert.charAt(3)=='0' || !perms.add" value="添加子栏目" />
                </span>
        </div>
        <ColumnTree v-if="d.subs&&d.subs.length>0" v-show="d.open" :data="d.subs" :perms="perms"></ColumnTree>
        </template>
    </div>
</template>
<script>
   module.exports = {
       props: ["data", "perms"],
       created(){
           if(this.$parent.level == undefined)
               this.level = 0;
           else
               this.level = this.$parent.level + 1;
       },
       methods:{
           open(d){
               if(d.subs && d.subs.length>0)
                   sessionStorage.setItem(d.code, d.open = !d.open);
           },
           del(d, i){
               if(confirm("确定删除栏目“" + d.name + "”吗？")) {
                     utils.post2(649, {code: d.code}, ()=>{
                         this.data.splice(i, 1);
                     })
                 }
           },
           add(d){
               this.$router.push("/main/column/0/" + d.code);
           },
           edit(d){
               sessionStorage.columnName = d.name;
               this.$router.push("/main/column/" + d.code);
           },
           show(d){
                 var isshow = (d.isshow == 1 ? "0" : "1");
                 utils.post2(642, {code: d.code, isshow}, ()=>{
                     d.isshow = isshow; 
                 }) 
           }
       }
   }
</script>
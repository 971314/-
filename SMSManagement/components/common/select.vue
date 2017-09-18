<template>
   <span>
        <select v-model="$parent.data[name]" ref="select" @change="change">
            <option v-for="o in list" :value="o.id">{{type=="org"&&o.id!=0?o.name+"("+o.id+")":o.name}}</option>
        </select>
        <i class="fc-red">{{err}}</i>
    </span>
</template>
<script>
    var func = {
        org:523,
        channel:533,
        type:513
    }
     module.exports = {
         props:["name", "all", "public", "chk", "type"],
         data(){
             var list = [];
             this.all && list.push({id:0, name:"所有"});
             this.type=="org" && this.public && list.push({id:0, name:"公共"});
             if(this.chk){
                 var ref = this.$parent.$refs;
                 !ref.chks && (ref.chks = []);
                 ref.chks.push(this);
             }
             return {
                list,
                err:""
             }
         },
         mounted(){
             utils.post(func[this.type], {}, res => {
                 this.list = this.list.concat(res); 
                 this.$emit("selectMounted", this.type, this.list);
             });
         },
         updated(){
             this.change();
         },
         methods:{
             check(){
                 var v = this.$parent.data[this.name];
                 if(v==undefined) {
                     this.err = "不能为空";
                     return false;
                 }
                 this.err = "";
                 return true;
             },
             change(){
                 this.$emit("change", this.list[this.$refs.select.selectedIndex]);
             }
         }
     }
</script>
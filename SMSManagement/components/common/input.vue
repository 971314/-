<template>
    <span>
        <input v-if="type=='password'" type="password" v-model="$parent.data[name]" maxlength="20"/>
        <textarea v-else-if="type=='textarea'" v-model.trim="$parent.data[name]" @keyup="change"></textarea>
        <input v-else type="text" v-model.trim="$parent.data[name]" maxlength="20"/>
        <i class="fc-red">{{err}}</i>
    </span>
</template>
<script>
     module.exports = {
         props:["name", "type", "reg", "require"],
         data(){
             var ref = this.$parent.$refs;
             !ref.chks && (ref.chks = []);
             ref.chks.push(this);
             return {
                 err:""
             }
         },
         methods:{
             check(){
                 var v = this.$parent.data[this.name];
                 if(this.require!=0 && !v) {
                     this.err = "不能为空";
                     return false;
                 }
                 if(this.reg && !utils[this.reg+"Reg"].test(v)) {
                     this.err = "格式不正确";
                     return false;
                 }
                 this.err = "";
                 return true;
             },
             change(){
                 this.$emit("change", this.$parent.data[this.name]);
             }
         }
     }
</script>
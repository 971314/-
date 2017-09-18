<template>
  <em>{{err}}</em>
</template>
<script>
     module.exports = {
         props:["require", "min", "max", "reg"],
         data(){
             return {
                 err:"" 
             }
         },
         methods: {
             check () {
                 var t = this, val = t.input.val();
                 if(t.require && !val) {
                     t.err = "不能为空";
                     t.open();
                     return false;
                 }
                 if(t.min && val && val.length<t.min) {
                     t.err = "不能小于" + t.min + "个字";
                     t.open();
                     return false;
                 }
                 if(t.max && val && val.length>t.max) {
                     t.err = "不能大于" + t.max + "个字";
                     t.open();
                     return false;
                 }
                 if(t.reg && !utils[t.reg+"Reg"].test(val)) {
                     t.err = "格式不正确";
                     t.open();
                     return false;
                 }
                 t.err = "";
                 return true;   
             },
             open(){
                 this.box.hasClass("collapsed") && this.box.trigger("click");
             }
         },
         ready() {
             var r = this.$parent.$refs;
             !r.chks && (r.chks = []);
             r.chks.push(this);
             this.input = $(this.$el).parent().find("input,textarea");
             this.box = $(this.$el).closest(".bd").prev();
         }                    
     }
</script>
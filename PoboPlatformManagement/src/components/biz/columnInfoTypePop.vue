<template>
    <div class="mask" :class="{show:show}">
        <div class="popup">
            <ul>
                <li v-for="d in list">
                    <input type="checkbox" ref="checkbox" :checked="checks.indexOf(d.code)!=-1"/>
                    {{d.name}}
                </li>
            </ul>
            <div class="center">
                <a class="btn1" @click="select">确定</a>
                <a class="btn1" @click="show=false">取消</a>
            </div>
        </div>
    </div>
</template>
<script>
     module.exports = {
         props:["checks"],
         data(){
             return {
                 show:false,
                 list:[]
             }
         },
         methods:{
             select(){
                 var checks = [];
                 for(var i=0;i<this.$refs.checkbox.length;i++){
                     this.$refs.checkbox[i].checked && checks.push(this.list[i]);
                 }
                 this.$emit("select", checks);
                 this.show = false;
             }
         },
         mounted(){
             utils.infoPost(703, {}, res=>{
                 this.list = res;
                 this.$emit("load");
             });
         }
     }
</script>
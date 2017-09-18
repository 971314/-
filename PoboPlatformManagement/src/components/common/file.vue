<template>
    <span class="upload" :class="{upload2:layout}">
       <input type="file" name="file" ref="file" @change="change" />
       <input type="button" class="btn1" @click="upload()" :value="disabled?'上传中':(uploadName||'上传')" />
        <i class="fc-red">{{err}}</i>
        <span v-show="disabled"></span>
    </span>
</template>
<script>
     module.exports = {
         props:["reg", "uploadName", "layout", "func"],
         data(){
             return {
                 err:"",
                 disabled: false
             }
         },
         methods:{
             change(){
                 if(this.layout){
                     this.upload();
                 }  
             },
             upload(){
                 if(this.disabled || !this.$refs.file.value)
                     return;
                 if(this.reg && !utils[this.reg+"Reg"].test(this.$refs.file.value)) {
                     this.err = "文件类型不正确";
                     return;
                 }
                 this.err = "";
                 this.disabled = true;
                 var file = this.$refs.file.files[0];
                 var fd = new FormData();
                 fd.append("files", file);
                 fd.append("func", this.func);
                 var xhr = new XMLHttpRequest();
                 xhr.withCredentials = true;
                 xhr.addEventListener("load", e=>{
                     var result = JSON.parse(e.target.responseText);
                     this.disabled = false;
                     if(result.status == 0)
                         this.$emit("upload", result);
                     else
                         alert(result.msg);
                 }, false);
                 xhr.open("POST", config.funcUploadApi);
                 xhr.send(fd);
             }
         }
     }
</script>
<template>
    <div>
        <div class="title"><span>{{$route.params.id==0?"新增":"修改"}}短信模板</span></div>
        <div class="edit">
            <div>
                <label>短信渠道</label>
                <CustomSelect name="channelID" chk="1" type="channel" @selectMounted="selectMounted"></CustomSelect>
            </div>
            <div>
                <label>短信类型</label>
                <CustomSelect name="typeID" chk="1" type="type" @change="updateType" @selectMounted="selectMounted"></CustomSelect>
            </div>
            <div>
                <label>内容</label>
                <CustomInput name="content" type="textarea" @change="genKeyNum"></CustomInput>
                <br><a class="fc-blue" style="margin-left:220px;" @click="defaultContent()">使用默认内容</a>
            </div>
            <div>
                <label></label>
                请核对参数数量：{{data.keyNum}}。<br>
                <label></label>
                注：[prefix]不算参数数量。
            </div>
            <div class="btns">
                <button class="btn1" @click="submit()">保 存</button>
                <a class="btn1 btn2" onclick="history.go(-1)">取 消</a>
            </div>
        </div>
    </div>
</template>
<script>
     module.exports = {
         mixins: [utils.editView],
         data(){
             this.func = {get:545, add:541, edit:542};
             this.typeContent = "";
             this.defer = 2;
             return {
                 data:{
                     content:"",
                     keyNum:0
                 }
             }
         },
         methods:{
             selectMounted(type, list){
                 this.$route.params.id == 0 && (this.data[type+"ID"] = list[0].id);
                 this.resolve();
             },
             submit(){
                 var result = this.check();
                 if(result){
                     this.data.channelID -= 0;
                     this.data.typeID -= 0;
                     this.data.keyNum -= 0;
                     this.save();
                 }
             },
             updateType(o){
                 o && (this.typeContent = o.content);
//                 if((this.$route.params.id==0 || this.data.id) && !this.data.content)
//                     setTimeout(()=>{
//                         this.data.content = t.content;
//                         this.genKeyNum();
//                     }, 100);
             },
             genKeyNum(){
                 var con = this.data.content;
                 if(!con)
                     this.data.keyNum = 0;
                 else {
                     var m = con.replace(/\[prefix\]/g, "").match(/\[[^\[\]]+\]/g);
                     if(!m) {
                         this.data.keyNum = 0;
                         return;
                     }
                     this.data.keyNum = m.length;
                 }
             },
             defaultContent(){
                 this.data.content = this.typeContent;
                 this.genKeyNum();
             }
         }
     }
</script>
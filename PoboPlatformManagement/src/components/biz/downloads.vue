<template>
    <div class="bizDownload">
        <div class="title">APP下载地址管理</div>
        <div class="edit">
            <div style="margin:-20px 0 25px 40px;">
                客户推荐下载地址管理
            </div>
            <div>
                <label>IOS下载地址</label>
                <CustomInput name="QHGSIOS" require="0" maxlength="1000"></CustomInput>
                （应用在“app store”的地址）
            </div>
            <div>
                <label>安卓下载地址</label>
                <CustomInput name="QHGSAND" require="0" maxlength="1000"></CustomInput>
                （应用在“应用市场”的地址）
            </div>
            <div>
                <label>期货公司下载地址</label>
                <CustomInput name="QHGSDLOAD" require="0" maxlength="1000"></CustomInput>
            </div>
            <div class="btns">
                <a class="btn1" @click="submit()">保 存</a>
            </div>
        </div>
    </div>
</template>
<script>
     module.exports = {
         mixins: [utils.editView],
         data(){
             return {
                 data:{
                     QHGSAND:"",
                     QHGSIOS:"",
                     QHGSDLOAD:""
                 }
             }
         },
         methods:{
             submit(){
                 if(this.check()) {
                     this.save();
                 }
             },
             save(){
                 utils.post2(648, {key:"QHGSAND", value:this.data.QHGSAND}, res => {
                     utils.post2(648, {key:"QHGSIOS", value:this.data.QHGSIOS}, res => {
                         utils.post2(648, {key:"QHGSDLOAD", value:this.data.QHGSDLOAD}, res => {
                             alert("保存成功！");
                         });
                     });
                 });
             },
             get(){
                 utils.post2(647, {key:["QHGSAND", "QHGSIOS", "QHGSDLOAD"]}, res => {
                  for(var i=0;i<res.length;i++) {
                      this.data[res[i].key] = res[i].value;
                  }
                });
             }
         }
     }
</script>
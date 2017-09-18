<template>
    <div class="userView">
        <div class="title"><span>{{$route.params.id==0?"新增":"修改"}}机构</span></div>
        <div class="edit">
            <div>
                <label>机构编号</label>
                <CustomInput name="id" v-if="$route.params.id==0" reg="int"></CustomInput>
                <span v-if="$route.params.id>0">{{$route.params.id}}</span>
            </div>
            <div>
                <label>机构名称</label>
                <CustomInput name="name"></CustomInput>
            </div>
            <div>
                <label>短信前缀</label>
                <CustomInput name="prefix" require="0"></CustomInput>
            </div>
            <div>
                <label>渠道选择</label>
                <select v-model="data.channelSelect">
                    <option value="2">所有</option>
                    <option value="0">公共</option>
                    <option value="1">专有</option>
                </select>
            </div>
            <div>
                <label>有效</label>
                <input type="checkbox" v-model="data.valid" />
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
             this.func = {get:524, add:521, edit:522};
             return {
                 data:{
                     prefix:"",
                     channelSelect:2,
                     valid:true
                 }
             }
         },
         methods:{
             submit(){
                 if(this.check()) {
                     this.data.id -= 0;
                     this.data.channelSelect -= 0;
                     this.save();
                 }
             }
         }
     }
</script>
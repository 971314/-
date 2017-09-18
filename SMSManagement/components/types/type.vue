<template>
    <div>
        <div class="title"><span>{{$route.params.id==0?"新增":"修改"}}短信类型</span></div>
        <div class="edit">
            <div>
                <label>短信类型编号</label>
                <CustomInput name="id" reg="int2" v-if="$route.params.id==0"></CustomInput>
                <span v-else>{{data.id}}</span>
            </div>
            <div>
                <label>短信类型名称</label>
                <CustomInput name="name"></CustomInput>
            </div>
            <div>
                <label>默认前缀</label>
                <CustomInput name="prefix"></CustomInput>
            </div>
            <div>
                <label>默认模板</label>
                <CustomInput name="content" type="textarea"></CustomInput>
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
             this.func = {get:514, add:511, edit:512};
             return {
                 data:{
                     valid:true
                 }
             }
         },
         methods:{
             submit(){
                 var result = this.check();
                 if(result) {
                     this.data.id -= 0;
                     this.save();
                 }
             }
         }
     }
</script>
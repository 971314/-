<template>
    <div>
        <div class="title"><span>{{$route.params.id==0?"新增":"修改"}}短信渠道</span></div>
        <div class="edit">
            <div>
                <label>短信渠道名称</label>
                <CustomInput name="name"></CustomInput>
            </div>
            <div>
                <label>所属机构</label>
                <CustomSelect name="orgID" chk="1" type="org" public="1" @selectMounted="resolve"></CustomSelect>
            </div>
            <div>
                <label>地址</label>
                <CustomInput name="url" require="0" type="textarea"></CustomInput>
            </div>
            <div>
                <label>用户名</label>
                <CustomInput name="username" require="0"></CustomInput>
            </div>
            <div>
                <label>密码</label>
                <CustomInput name="password" require="0"></CustomInput>
            </div>
            <div>
                <label>优先级</label>
                <select v-model="data.priority">
<!--                    <option value="">自动</option>-->
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
<!--                <CustomInput v-else name="priority"></CustomInput>-->
            </div>
            <div>
                <label>包名</label>
                <CustomInput name="packageName" type="textarea"></CustomInput>
            </div>
            <div>
                <label>是否支持状态响应</label>
                <input type="checkbox" v-model="data.report" />
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
             this.func = {get:534, add:531, edit:532};
             this.defer = 1;
             return {
                 data:{
                     url:"",
                     username:"",
                     password:"",
                     priority:0,
                     report:0,
                     valid:true,
                     orgID:0
                 }
             }
         },
         methods:{
             submit(){
                 var result = this.check();
                 if(result){
                     this.data.orgID -= 0;
                     this.data.priority -= 0;
                     this.data.report = this.data.report?1:0;
                     this.save();
                 }
             }
         }
     }
</script>
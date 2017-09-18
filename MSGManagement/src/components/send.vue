<template>
   <div class="sendView">
    <tabs v-model="tab">
        <pane label="群发" name="1">
               <el-form :model="form1" :rules="rule" ref="form1" label-width="137px">
                <el-form-item label="消息标题" prop="title"><el-input v-model.trim="form1.title" maxlength="20" placeholder="字数控制在20字以内"></el-input></el-form-item>
                <el-form-item label="消息类型">
                    <el-select v-model="form1.type">
                        <el-option v-for="(v,k) in types" :label="v" :value="k"></el-option>
                    </el-select>
                    <span class="desc">（发送对象将按消息类型接收消息，为保证消息能准确送达，请准确填写消息类型）</span>
                </el-form-item>
                <el-form-item label="消息正文" prop="content">
                    <el-input type="textarea" v-model="form1.content" maxlength="140" rows="4" ref="cont1"></el-input>
                </el-form-item>
                <div class="num">剩余<span>{{num1}}</span>个字</div>
                <el-form-item label="页面跳转">
                    <el-input v-model.trim="form1.url"></el-input>
                </el-form-item>
                <el-form-item label="手机类型">
                    <el-select v-model="form1.terminaltype">
                        <el-option v-for="(v,k) in terminalTypes" :label="v" :value="k"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="版本号">
                    <el-select v-model="form1.softver">
                        <el-option v-for="(v,k) in softVers" :label="v" :value="k"></el-option>
                    </el-select>
                </el-form-item>
                <div class="time">
                    <el-checkbox v-model="time1">定时发送</el-checkbox>
                    <el-form-item prop="time"><el-date-picker type="datetime" v-model="form1.time" :editable="false" format="yyyy-MM-dd HH:mm" :picker-options="timeOptions"></el-date-picker></el-form-item>
                </div>
                </el-form>
        </pane>
        <pane label="发送给指定客户" name="2">
               <el-form :model="form2" :rules="rule" ref="form2" label-width="137px">
                <el-form-item label="消息标题" prop="title"><el-input v-model.trim="form2.title" maxlength="20" placeholder="字数控制在20字以内"></el-input></el-form-item>
                <el-form-item label="消息类型">
                    <el-select v-model="form2.type">
                        <el-option v-for="(v,k) in types" :label="v" :value="k"></el-option>
                    </el-select>
                    <span class="desc">（发送对象将按消息类型接收消息，为保证消息能准确送达，请准确填写消息类型）</span>
                </el-form-item>
                <el-form-item label="消息正文" prop="content">
                    <el-input type="textarea" v-model="form2.content" maxlength="140" rows="4" ref="cont2"></el-input>
                </el-form-item>
                <div class="num">剩余<span>{{num2}}</span>个字</div>
                <el-form-item label="页面跳转">
                    <el-input v-model.trim="form2.url"></el-input>
                </el-form-item>
                <el-form-item label="发送给">
                    <div class="fc-gray">（可发送给指定交易账号，手机号或分组成员）</div>
                    <el-select v-model="form2.receivertype">
                        <el-option v-for="(v,k) in receiverTypes" :label="v" :value="k"></el-option>
                    </el-select> 
                </el-form-item>
                <div class="account">
                    <el-form-item label="账号" prop="account" v-show="form2.receivertype<3">
                        <el-input v-model.trim="form2.account"></el-input>
                    </el-form-item>
                    <el-form-item label="分组"  v-show="form2.receivertype==3">
                        <el-select v-model="form2.group">
                            <el-option v-for="g in groups" :label="g.groupname" :value="g.groupid"></el-option>
                        </el-select>  
                    </el-form-item>     
                </div>
                <div class="time">
                    <el-checkbox v-model="time2">定时发送</el-checkbox>
                    <el-form-item prop="time"><el-date-picker v-model="form2.time" type="datetime" :editable="false" format="yyyy-MM-dd HH:mm"></el-date-picker></el-form-item>
                </div>
                </el-form>
        </pane>
    </tabs>
        <div class="btns txt-r">
            <btn type="primary" @click="send">发送</btn>
        </div>
    </div>
</template>
<script>
    var t;
module.exports = {
    data(){
        t = this;
        return {
            tab:"1",
            form1:{
                type:"1",
                terminaltype:"0",
                softver:"0",
                url:"",
                time:null
            },
            form2:{
                type:"1",
                url:"",
                receivertype:"1",
                group:"",
                time:null
            },
            time1:false,
            time2:false,
            groups:[],
            num1:140,
            num2:140,
            rule: {
                title:{ required: true, message: '请输入消息标题', trigger:" " },
                content:{ required: true, message: '请输入消息正文', trigger:" " },
//                url:{validator(rule, value, cb){
//                    if(value && )
//                }},
                account:{validator(rule, value, cb){
                             if (t.form2.receivertype < 3 && !value)
                                 return cb(new Error('请输入账号'));
                             cb();
                         },
                         trigger:" "},
                time:{validator(rule, value, cb){
                          if (t["time"+t.tab] && !value) 
                               return cb(new Error('请输入时间'));
                          cb();
                       },
                       trigger:" "}
            },
            timeOptions: {
//                disabledDate(d){
//                    console.log(d);
//                    return true;
//                }
            }
        }
    },
    methods:{
        send() {
            var i = t.tab, form = t["form"+i];
            t.$refs["form"+i].validate(valid => {
              if (valid) {
                  if(i==2)
                      form.receiver = (form.receivertype<3?form.account:form.group);
                  form.sendtime = (t["time"+i]&&form.time.getTime())||0;
                t.$post(i==1?2001:2002, form, ()=>{
                    t.$info("提交成功！");
                });
              } 
            });
       }
    },
    mounted(){
        var el = t.$refs.cont1.$el.children[0];
        el.onkeyup = t.$refs.cont2.$el.children[0].onkeyup = (e)=>{
            e = e.target;
            if(e.value.length>140)
                e.value = e.value.substr(0, 140);
            t[e==el?"num1":"num2"] = 140 - e.value.length;
        }
        t.$post(2003, {}, ({list})=>{
            t.groups = list;
            list.length>0 && (t.form2.group = list[0].groupid);
        }, {page:"1", count:"1000"})
    }
}
</script>
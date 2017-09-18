<template>
    <div class="editView">
        <form target="formframe" method="post" enctype="multipart/form-data" id="form" action="{{url + (data.productid?'product/update':'product/create')}}">
        <input type="hidden" v-model="data.uid" name="uid" />
        <input type="hidden" v-model="data.productid" name="{{data.productid?'productid':''}}"/>
        <div class="box">
            <div class="tit" data-toggle="collapse" data-target="#bd1">
                基本信息<span class="fc-gray" v-show="data.modifytime">（最近更新时间 {{data.modifytime}}）</span><a class="icon"></a>
            </div>
            <div class="bd in" id="bd1">
              <div style="border-top:1px solid #b0b0b0;height:14px;"></div>
              <div class="clearfix">
                <div class="left">
                    <div class="input">
                        <span><i>*</i> 产品名称</span>
                        <input type="text" name="productname" v-model="data.productname" maxlength="20"/>
                        <chk require="1" max="20"></chk>
                    </div>
                    <div class="input input2">
                        <span><i>*</i> 认购起点</span>
                        <input type="text" name="subscribeline" v-model="data.subscribeline" placeholder="填入整数" title="填入整数"/>
                        <ins>万</ins>
                        <chk require="1" reg="int"></chk>
                    </div>
                    <div class="input">
                        <span><i>*</i> 存续期限</span>
                        <input type="text" name="duration" v-model="data.duration" />
                        <chk require="1"></chk>
                    </div>
                    <div class="input">
                        <span><i>*</i> 风险评级</span>
                        <select name="risklevel" v-model="data.risklevel">
                            <option value="1">低风险</option>
                            <option value="2">中风险</option>
                            <option value="3">高风险</option>
                        </select>
                    </div>
                </div>
                <div class="left">
                    <div class="input">
                        <span><i>*</i> 类型</span>
                        <select style="width:95px;" name="opertype" v-model="data.opertype">
                            <option value="1">自营</option>
                            <option value="2">代销</option>
                        </select>
                        <select style="width:101px;" name="channel" v-model="data.channel">
                            <option value="1">管理型</option>
                            <option value="2">通道型</option>
                        </select>
                    </div>
                    <div class="input">
                        <span><i>*</i> 成立时间</span>
                        <input type="text" id="endTime" name="time" v-model="data.time" placeholder="2016-11-11" title="格式2016-11-11"/>
                        <chk require="1"></chk>
                    </div>
                    <div class="input input2">
                        <span><i>*</i> 发行规模</span>
                        <input type="text" name="issuesize" v-model="data.issuesize" placeholder="填入整数" title="填入整数"/>
                        <ins>万</ins>
                        <chk require="1" reg="int"></chk>
                    </div>
                    <div class="input">
                        <span><i>*</i> 产品状态</span>
                        <select name="period" v-model="data.period">
                            <option value="1">认购期</option>
                            <option value="2">封闭期</option>
                            <option value="3">正常开放</option>
                        </select>
                    </div>
                </div>
              </div>
              <div class="input">
                  <span>投资目标</span>
                  <textarea name="infogoal" v-model="data.infogoal" placeholder="简介（0至500字）" style="height:90px;" maxlength="500" title="简介（0至500字）"></textarea>
                  <chk max="500"></chk>
              </div>
              <div class="input">
                  <span>投资范围</span>
                  <textarea name="infoscope" v-model="data.infoscope" placeholder="简介（0至500字）" style="height:90px;" maxlength="500" title="简介（0至500字）"></textarea>
                  <chk max="500"></chk>
              </div> 
              <div class="input">
                  <span>产品简介</span>
                  <textarea name="infobrief" v-model="data.infobrief" placeholder="推广用简介（0至500字）" style="height:55px;" maxlength="500" title="推广用简介（0至500字）"></textarea>
                  <chk max="500"></chk>
              </div>
            </div>
        </div>
        <div class="box">
            <div class="tit collapsed" data-toggle="collapse" data-target="#bd2">
                <i>*</i> 产品费率<a class="icon"></a>
            </div>
            <div class="bd" id="bd2">
              <div style="border-top:1px solid #b0b0b0;height:14px;"></div>
              <div class="clearfix">
                <div class="left">
                    <div class="input input2">
                        <span>管理费</span>
                        <input type="text" name="managefee" v-model="data.managefee" placeholder="填入数字" title="填入数字"/>
                        <ins>%&nbsp;</ins>
                        <chk require="1" reg="f2"></chk>
                    </div>
                </div>
                <div class="left">
                    <div class="input input2">
                        <span>托管费</span>
                        <input type="text" name="trusteefee" v-model="data.trusteefee" placeholder="填入数字" title="填入数字"/>
                        <ins>%&nbsp;</ins>
                        <chk require="1" reg="f2"></chk>
                    </div>
                </div>
              </div>
              <div class="input">
                  <span>其他费用</span>
                  <textarea name="infodescription" v-model="data.infodescription" placeholder="文字描述" title="文字描述" style="height:55px;"></textarea>
                  <chk require="1"></chk>
              </div>
              <div class="input">
                  <span>盈利分配</span>
                  <textarea name="infoallocation" v-model="data.infoallocation" placeholder="文字描述" title="文字描述" style="height:55px;"></textarea>
                  <chk require="1"></chk>
              </div>  
            </div>
        </div>
        <div class="box">
            <div class="tit collapsed" data-toggle="collapse" data-target="#bd3">
                <i>*</i> 产品风控<a class="icon"></a>
            </div>
            <div class="bd" id="bd3">
              <div style="border-top:1px solid #b0b0b0;height:14px;"></div>
              <div class="clearfix">
                <div class="left">
                    <div class="input">
                        <span>预警线净值</span>
                        <input type="text" name="warnnav" v-model="data.warnnav" placeholder="填入数字" title="填入数字"/>
                        <chk require="1" reg="f4"></chk>
                    </div>
                </div>
                <div class="left">
                    <div class="input">
                        <span>止损线净值</span>
                        <input type="text" name="stoplossnav" v-model="data.stoplossnav" placeholder="填入数字" title="填入数字"/>
                        <chk require="1" reg="f4"></chk>
                    </div>
                </div>
              </div>
            </div>
        </div>
        <div class="box">
            <div class="tit collapsed" data-toggle="collapse" data-target="#bd4">
                <i>*</i> 其他信息<a class="icon"></a>
            </div>
            <div class="bd" id="bd4">
              <div style="border-top:1px solid #b0b0b0;height:14px;"></div>
              <div class="input">
                    <span>申购与赎回</span>
                    <textarea name="infosar" v-model="data.infosar" placeholder="文字描述" title="文字描述" style="height:55px;"></textarea>
                    <chk require="1"></chk>
              </div>
              <div class="clearfix">
                <div class="left">
                    <div class="input">
                        <span>投资顾问</span>
                        <input type="text" name="infoadvisor" v-model="data.infoadvisor"/>
                        <chk require="1"></chk>
                    </div>
                    <div class="input">
                        <span>投资经理</span>
                        <input type="text" name="infomanager" v-model="data.infomanager"/>
                        <chk require="1"></chk>
                    </div>
                </div>
              </div>
            </div>
        </div>
        <div class="box">
            <div class="tit collapsed" data-toggle="collapse" data-target="#bd5">
                数据导入<a class="icon"></a>
            </div>
            <div class="bd" id="bd5">
              <div style="border-top:1px solid #b0b0b0;height:14px;"></div>
              <div class="input file" id="file">
                    <span>净值数据</span>
                    <input type="text" placeholder="导入数据"/>
                    <a class="icon"></a>
                    <a class="btn-white fc-blue" @click="showLog()">操作日志</a>
                    <em>{{fileErr}}</em>
                    <input type="file" class="f" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" title="导入数据"/>
                    <input type="file" name="file" style="display:none;"/>
                    <div class="fc-red">*支持EXCEL格式的数据资料</div>
              </div>
              <br>
            </div>
        </div>
        </form>
        <iframe name="formframe" style="display:none;"></iframe>
        <div class="btns">
            <a class="btn-white" onclick="app.goback()">返回</a>
            <a class="btn-blue" @click="save()">保存</a>
        </div>
        <logs v-ref:logs></logs>
    </div>
</template>
<script>
     var t, fs;
     module.exports = {
         data(){
            app.current = 10;
            app.title = "产品编辑";
            t = this;
             return {
                 data: {uid:app.currentUser.uid,
                       opertype:1,
                       channel:1,
                       risklevel:1,
                       period:1,
                        productid:0,
                        modifytime:""
                       },
                 url: config.api,
                 fileErr:""
             }
         },
         methods:{
             save () {
                 var valid = true;
                 for(var i=0;i<t.$refs.chks.length;i++){
                     valid = t.$refs.chks[i].check() && valid; 
                 }
                 if(fs[1].name=="file" && !utils.xlsReg.test(fs[1].value)){
                     t.fileErr = "请选择EXCEL文件";
                     return;
                 }
                 t.fileErr = "";
                 if(valid) {
                     app.showMask = true;
                     $("#form").submit(); 
                 }
             },
             showLog() {
                 t.$refs.logs.load("product/excelrecords", t.data.productid);
             }
         },
         ready(){
             fs = $("#file input");
             fs.eq(1).on("change", function(){
                     fs[0].value = this.value.match(/[^\/\\]+$/); 
                     this.name = "file";
                     fs[2].name = "";
             });
                 
             window.productCallback = res => {
                     app.showMask = false;
                     if(res.retHead != 1) {
                         alert(res.desc);
                         if(res.retHead == -104) {
                             utils.clear();
                             app.$router.go("/");
                         }
                         return;
                     }
                     if(!t.data.productid) {
                         t.data.productid = res.data[0].productid;
                     }
                     t.data.modifytime = res.data[0].modifytime;
                     fs[2].name = "file";
                     fs[1].name = "";
                     alert("保存成功！");
             }
                 
             if(t.$route.params.id>0) {
                utils.post("product/getinfo", {id: t.$route.params.id}, res=>{
                         t.data = res[0].product;
                         t.data.uid = app.currentUser.uid;
                         setTimeout(function(){
                             $("#endTime").datepicker({format: "yyyy-mm-dd",autoclose:true});
                         }, 1000);
                     })
             }else 
                 $("#endTime").datepicker({format: "yyyy-mm-dd", autoclose:true}); 
         }
     }

</script>
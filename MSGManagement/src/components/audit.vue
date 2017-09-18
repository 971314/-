<template>
    <div class="auditView">
       <tabs v-model="tab" @tab-click="changeTab">
           <pane label="群发" name="0">
        <div class="search">
            <div class="r ms">
                          <el-input v-model.trim="param[0].msg" placeholder="搜索消息">
                              <btn slot="append" icon="search" @click="search"></btn>
                          </el-input>
                  </div>
        </div>
        <el-table :data="data0">
                    <column prop="sn" label="序号" min-width="70"></column>
                    <column prop="sender" label="发送者" min-width="100"></column>
                    <column label="类型" min-width="95">
                        <template scope="d">{{types[d.row.type]}}</template>
                    </column>
                    <column prop="title" label="标题" min-width="140"></column>
                    <column label="内容" width="190">
                        <template scope="d">
                            <div :title="d.row.content">{{d.row.content.ellipse()}}</div>
                        </template>
                    </column>
                    <column label="设备类型" min-width="95">
                        <template scope="d">{{terminalTypes[d.row.terminaltype]}}</template>
                    </column>
                    <column label="版本号" min-width="126">
                        <template scope="d">{{d.row.softver}}</template>
                    </column>
                    <column label="创建时间" min-width="112">
                        <template scope="d">{{d.row.createtime|time}}</template>
                    </column>
                    <column min-width="70">
                        <template scope="d">
                            <a class="btn" @click="showAudit(d.row)">审核</a>
                        </template>
                    </column>
                </el-table>
        <page @current-change="loadData" :total="total[0]" ref="page0"></page>
           </pane>
           <pane label="发送给指定客户" name="1">
               <div class="search">
                  <div class="r ms">
                          <el-input v-model.trim="param[1].msg" placeholder="搜索消息">
                              <btn slot="append" icon="search" @click="search"></btn>
                          </el-input>
                  </div>
               </div>
               <el-table :data="data1">
                    <column prop="sn" label="序号" min-width="70"></column>
                    <column prop="sender" label="发送者" min-width="100"></column>
                    <column label="类型" min-width="95">
                        <template scope="d">{{types[d.row.type]}}</template>
                    </column>
                    <column prop="title" label="标题" min-width="140"></column>
                    <column label="内容" width="190">
                        <template scope="d">
                            <div :title="d.row.content">{{d.row.content.ellipse()}}</div>
                        </template>
                    </column>
                    <column label="发送类型" min-width="95">
                        <template scope="d">{{receiverTypes[d.row.receivertype]}}</template>
                    </column>
                    <column prop="receiver" label="发送用户" min-width="126"></column>
                    <column label="创建时间" min-width="112">
                        <template scope="d">{{d.row.createtime|time}}</template>
                    </column>
                    <column width="70">
                        <template scope="d">
                            <a class="btn" @click="showAudit(d.row)">审核</a>
                        </template>
                    </column>
                </el-table>
        <page @current-change="loadData" :total="total[1]" ref="page1"></page>
           </pane>
        </tabs>
        <el-dialog title="消息审核" :visible.sync="dialog" custom-class="auditDialog">
            <div><span>序号：</span>{{auData.sn}}</div>
            <div><span>发送者：</span>{{auData.sender}}</div>
            <div><span>消息类型：</span>{{types[auData.type]}}</div>
            <div><span>标题：</span><div>{{auData.title}}</div></div>
            <div><span>内容：</span><div>{{auData.content}}</div></div>
<!--            <div><span>页面跳转：</span><div>{{auData.url}}</div></div>-->
            <div v-if="tab==0"><span>设备类型：</span>{{terminalTypes[auData.terminaltype]}}</div>
            <div v-else><span>发送类型：</span>{{receiverTypes[auData.receivertype]}}</div>
            <div v-if="tab==0"><span>版本号：</span>{{auData.softver}}</div>
            <div v-else><span>发送用户：</span>{{auData.receiver}}</div>
            <div><span>创建时间：</span>{{auData.createtime|time}}</div>
            <div><span>预定发送时间：</span>{{auData.sendtime|time}}</div>
            <div class="a">
                <span>审核结果：</span>
                <div>
                    <el-radio v-model="auParam.result" label="1">通过</el-radio>
                    <el-radio v-model="auParam.result" label="2">回退</el-radio>
                </div>
            </div>
            <div v-show="auParam.result==2"><span>回退原因：</span><div>
                <el-input type="textarea" v-model.trim="auParam.reason" ref="reason" maxlength="80"></el-input>
                <div class="txt-r">剩余<i class="fc-blue">{{num}}</i>字</div>
            </div></div>    
            <span slot="footer" class="dialog-footer">
                <btn type="primary" @click="audit">确定</btn>
                <btn @click="dialog=false">取消</btn>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    var t, flag, flag2, query;
    module.exports={
        data(){
            t = this;
            flag = flag2 = 0;
            query = [{msg:""}, {msg:""}];
            return {
                tab:"0",
                data0:[],
                data1:[],
                param:[{},{}],
                total:[0, 0],
                dialog:false,
                auData:{},
                auParam:{
                    result:"1",
                    reason:""
                },
                num:80
            }
        },
        methods:{
            search(){
                var i = t.tab;
                $.extend(query[i], t.param[i]);
                t.loadData(t.$refs["page"+i].internalCurrentPage = 1);
            },
            loadData(p){
                var i = t.tab;
                !p && (p=t.$refs["page"+i].internalCurrentPage);
                t.$post(2009, $.extend({notice:+i+1+""},query[i]), res=>{
                    t["data"+i] = res.list;
                    t.total[i] = +res.totalCount;
                }, p+"");
            },
            showAudit(d){
                t.auData = d;
                t.auParam.result = "1";
                t.auParam.reason = "";
                t.num = 80;
                t.dialog = true;
                if(!flag2)
                    setTimeout(()=>{
                        t.$refs.reason.$el.children[0].onkeyup = e=>{
                            e = e.target;
                            if(e.value.length>80)
                                e.value = e.value.substr(0, 80);
                            t.num = 80 - e.value.length;
                        }
                        flag2 = 1;
                    }, 1000);
            },
            audit(){
                t.dialog = false;
                t.auParam.notice = +t.tab+1;
                t.auParam.id = t.auData.id;
                t.$post(2011, t.auParam, ()=>{
                    t.loadData();
                })
            },
            changeTab(){
                if(t.tab==1&&!flag) {
                    flag = 1;
                    t.loadData(1);
                }
            }
        },
        mounted(){
            t.loadData(1);
        }
    }
</script>
<template>
    <div class="msgView">
       <tabs v-model="tab" @tab-click="changeTab">
           <pane label="群发" name="0">
               <div class="search">
                  <div class="r ms">
                          <el-input v-model.trim="param[0].msg" placeholder="搜索消息">
                              <btn slot="append" icon="search" @click="search"></btn>
                          </el-input>
                  </div>
               </div>
               <div class="el-table el-table--enable-row-hover el-table--enable-row-transition">
                    <table class="el-table__body">
                        <tr>
                            <th style="width:70px">序号</th>
                            <th style="width:95px;">类型</th>
                            <th style="width:140px;">标题</th>
                            <th style="width:190px;">内容</th>
                            <th style="width:95px;">设备类型</th>
                            <th style="width:126px;">版本号</th>
                            <th style="width:112px;">{{$route.params.id==1?'预定发送时间':($route.params.id==4?'发送时间':'创建时间')}}</th>
                            <th v-if="$route.params.id==2" style="width:120px">回退原因</th>
                            <th v-if="$route.params.id==2" style="width:90px">审核人</th>
                            <th v-if="$route.params.id==1" style="width:90px"></th>
                        </tr>
                        <tr v-for="d in data0">
                            <td><div class="cell">{{d.sn}}</div></td>
                            <td><div class="cell">{{types[d.type]}}</div></td>
                            <td><div class="cell">{{d.title}}</div></td>
                            <td><div class="cell" :title="d.content">{{d.content.ellipse()}}</div></td>
                            <td><div class="cell">{{terminalTypes[d.terminaltype]}}</div></td>
                            <td><div class="cell">{{d.softver}}</div></td>
                            <td><div class="cell">{{($route.params.id==1?d.sendtime:($route.params.id==4?d.senttime:d.createtime))|time}}</div></td>
                            <td v-if="$route.params.id==2"><div class="cell" :title="d.reason">{{d.reason&&d.reason.ellipse(20)}}</div></td>
                            <td v-if="$route.params.id==2"><div class="cell">{{d.auditor}}</div></td>
                            <td v-if="$route.params.id==1"><div class="cell"><a class="btn-danger" @click="cancel(d)">取消发送</a></div></td>
                        </tr>
                    </table>
                    <div class="el-table__empty-block" v-show="!data0.length"><span class="el-table__empty-text">暂无数据</span></div>
                </div>
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
                <div class="el-table el-table--enable-row-hover el-table--enable-row-transition">
                    <table class="el-table__body">
                        <tr>
                            <th style="width:70px">序号</th>
                            <th style="width:95px;">类型</th>
                            <th style="width:140px;">标题</th>
                            <th style="width:190px;">内容</th>
                            <th style="width:95px;">发送类型</th>
                            <th style="width:126px;">发送用户</th>
                            <th style="width:112px;">{{$route.params.id==1?'预定发送时间':($route.params.id==4?'发送时间':'创建时间')}}</th>
                            <th v-show="$route.params.id==2" style="width:120px">回退原因</th>
                            <th v-show="$route.params.id==2" style="width:90px">审核人</th>
                            <th v-show="$route.params.id==1" style="width:90px"></th>
                        </tr>
                        <tr v-for="d in data1">
                            <td><div class="cell">{{d.sn}}</div></td>
                            <td><div class="cell">{{types[d.type]}}</div></td>
                            <td><div class="cell">{{d.title}}</div></td>
                            <td><div class="cell" :title="d.content">{{d.content.ellipse()}}</div></td>
                            <td><div class="cell">{{receiverTypes[d.receivertype]}}</div></td>
                            <td><div class="cell">{{d.receiver}}</div></td>
                            <td><div class="cell">{{($route.params.id==1?d.sendtime:($route.params.id==4?d.senttime:d.createtime))|time}}</div></td>
                            <td v-if="$route.params.id==2"><div class="cell" :title="d.reason">{{d.reason&&d.reason.ellipse(20)}}</div></td>
                            <td v-if="$route.params.id==2"><div class="cell">{{d.auditor}}</div></td>
                            <td v-if="$route.params.id==1"><div class="cell"><a class="btn-danger" @click="cancel(d)">取消发送</a></div></td>
                        </tr>
                    </table>
                    <div class="el-table__empty-block" v-show="!data1.length"><span class="el-table__empty-text">暂无数据</span></div>
                </div> 
               <page @current-change="loadData" :total="total[1]" ref="page1"></page>
             </pane>
        </tabs>
    </div>
</template>
<script>
    var t, flag, query = [{},{}];
    module.exports={
        data(){
            t = this;
            return {
                tab:"0",
                data0:[],
                data1:[],
                param:[{msg:""},{msg:""}],
                total:[0, 0]
            }
        },
        methods:{
            init(){
                t.tab = "0";
                for(var i=0;i<2;i++) {
                    t.param[i].msg = query[i].msg = "";
                    t["data"+i] = [];
                    t.total[i] = 0;
                    t.$refs["page"+i].internalCurrentPage = 1;
                }
                flag = 0;
                t.loadData(1);
            },
            loadData(p){
                var i = t.tab;
                !p && (p=t.$refs["page"+i].internalCurrentPage);
                t.$post(2007, $.extend({notice:+i+1+"", status:t.$route.params.id},query[i]), res=>{
                    t["data"+i] = res.list;
                    t.total[i] = +res.totalCount;
                }, p);
            },
            search(){
                var i = t.tab;
                $.extend(query[i], t.param[i]);
                t.loadData(t.$refs["page"+i].internalCurrentPage = 1);
            },
            changeTab(){
                 if(t.tab==1&&!flag) {
                     flag = 1;
                     t.loadData(1);
                 }  
            },
            cancel(d){
                t.$confirm('确定要取消发送此消息吗？取消后消息将被删除',
                           ()=>{
                               t.$post(2008, {notice:+t.tab+1, id:d.id}, ()=>{
                                    t.loadData();
                               })
                            })
            }
        },
        mounted(){
            t.init();
        },
        watch: {
           $route(){
               t.init();
           }
        }
    }
</script>
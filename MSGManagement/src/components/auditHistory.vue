<template>
    <div class="auditView">
       <tabs v-model="tab" @tab-click="changeTab">
           <pane label="群发" name="0">
        <div class="search">
            <div class="r">
                <el-select v-model="param[0].audit" @change="search">
                    <el-option label="全部消息" value="0"></el-option>
                    <el-option label="审核通过" value="1"></el-option>
                    <el-option label="审核回退" value="2"></el-option>
                </el-select>
               <div class="s ms">
                          <el-input v-model.trim="param[0].msg" placeholder="搜索消息">
                              <btn slot="append" icon="search" @click="search"></btn>
                          </el-input>
                  </div>
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
                    <column label="审核时间" min-width="112">
                        <template scope="d">{{d.row.audittime|time}}</template>
                    </column>
                    <column label="审核结果" min-width="95">
                        <template scope="d">{{d.row.result==1?"通过":"回退"}}</template>
                    </column>
                    <column label="回退原因" min-width="120">
                        <template scope="d">
                            <div :title="d.row.reason">{{d.row.reason.ellipse(20)}}</div>
                        </template>
                    </column>
                    <column prop="auditor" label="审核人" min-width="90"></column>
                </el-table>
        <page @current-change="loadData" :total="total[0]" ref="page0"></page>
           </pane>
           <pane label="发送给指定客户" name="1">
               <div class="search">
                  <div class="r">
                     <el-select v-model="param[1].audit" @change="search">
                    <el-option label="全部消息" value="0"></el-option>
                    <el-option label="审核通过" value="1"></el-option>
                    <el-option label="审核回退" value="2"></el-option>
                </el-select>
                      <div class="s ms">
                          <el-input v-model.trim="param[1].msg" placeholder="搜索消息">
                              <btn slot="append" icon="search" @click="search"></btn>
                          </el-input>
                      </div>
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
                     <column label="审核时间" min-width="112">
                        <template scope="d">{{d.row.audittime|time}}</template>
                    </column>
                    <column label="审核结果" min-width="95">
                        <template scope="d">{{d.row.result==1?"通过":"回退"}}</template>
                    </column>
                    <column label="回退原因" min-width="120">
                        <template scope="d">
                            <div :title="d.row.reason">{{d.row.reason.ellipse(20)}}</div>
                        </template>
                    </column>
                    <column prop="auditor" label="审核人" min-width="90"></column>
                </el-table>
        <page @current-change="loadData" :total="total[1]" ref="page1"></page>
           </pane>
        </tabs>
    </div>
</template>
<script>
    var t, flag, query;
    module.exports={
        data(){
            t = this;
            flag = 0;
            query = [{audit:"0",msg:""},{audit:"0",msg:""}];
            return {
                tab:"0",
                data0:[],
                data1:[],
                param:[{audit:"0"},{audit:"0"}],
                total:[0, 0]
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
                t.$post(2012, $.extend({notice:+i+1+""}, query[i]), res=>{
                    t["data"+i] = res.list;
                    t.total[i] = +res.totalCount;
                }, p+"");
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
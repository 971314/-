<template>
    <div class="groupView">
        <tabs v-model="tab" @tab-click="changeTab">
            <pane label="分组管理" name="1">
                <el-table :data="data" style="width: 500px">
                    <column prop="groupname" label="组名"></column>
                    <column width="160">
                        <template scope="d">
                            <a class="btn" @click="add(1, d.row)">重命名</a>
                            <a class="btn-danger" @click="del(1, d.row)">删除</a>
                        </template>
                    </column>
                </el-table>
                <btn type="primary" icon="plus" @click="add(2)">新建分组</btn>
            </pane>
            <pane label="分组成员管理" name="2">
                <div style="width:810px;">
                <div class="search">
                    <el-select v-model="query.groupid" @change="search">
                        <el-option label="全部" value="0"></el-option>
                        <el-option v-for="g in data" :label="g.groupname" :value="g.groupid"></el-option>
                    </el-select>
                    <btn type="primary" icon="plus" @click="add(3)" :disabled="query.groupid==0">添加成员</btn>
                    <btn type="primary" @click="download">导出</btn>
                    <el-upload ref="upload" class="upload" :action="uploadApi" :data="query" :before-upload="beforeUpload" :on-error="uploadErr" :on-success="uploadSucc">
                        <btn type="primary">导入</btn>
                    </el-upload>
                    <a class="el-icon-information" @click="dialog=true"></a>
                    <div class="r">
                        <el-input v-model.trim="query.phone" maxlength="11" placeholder="在当前分组查找成员" icon="search" @change="search"></el-input>
                    </div>
                </div>
                <el-table :data="data2">
                    <column prop="phone" label="手机号码" width="200"></column>
                    <column label="所属分组">
                        <template scope="d">{{d.row.groupname.join(",")}}</template>
                    </column>
                    <column width="80">
                        <template scope="d">
                            <a class="btn-danger" @click="del(2, d.row)">移除</a>
                        </template>
                    </column>
                </el-table>
        <page @current-change="loadData" :total="total" ref="page"></page>
                </div>
            </pane>
        </tabs>
        <el-dialog title="导入格式说明" :visible.sync="dialog" custom-class="uploadDialog" top="10%">
            <div>Excel文件按以下格式编辑，<br>
            <img :src="'image/1.png'" /><br>
            在下拉框中选中要导入的分组后导入，只导入excel文件中该分组下的手机号码。<br>
            在下拉框中选择全部后导入，导入excel文件中全部分组下的手机号码。
            </div>
            <span slot="footer">
                <btn type="primary" @click="dialog=false">关闭</btn>
            </span>
        </el-dialog>
        <iframe name="download" :src="downloadPath"></iframe>
    </div>
</template>
<script>
    var t, flag;
    module.exports={
        data(){
            t = this;
            flag = 0;
            return {
                tab:"1",
                data:[],
                data2:[],
                query:{
                    groupid:"0",
                    phone:""
                },
                total:0,
                dialog:false,
                uploadData:{group:"0"},
                downloadPath:""
            }
        },
        methods:{
            add(type, d){
                t.$prompt(type==3?'手机号':'分组名：', d?'重命名':(type==2?'新建分组':'添加成员'), 
                          {
                           inputPattern: /[^\s]+/,
                           inputValue: (d&&d.groupname)||null,
                           inputErrorMessage: type==3?'请输入手机号':'请输入分组名',
                           callback(r, i){
                               if(r=="confirm") {
                                    var v = i.inputValue.trim();
                                    if(type==3){
                                        if(/^1\d{10}$/.test(v))
                                            t.$post(2016, {groupid:t.query.groupid, phone:v}, ()=>{
                                                t.loadData();
                                                t.$info("添加成功！");
                                            })
                                        else
                                            t.$error("手机号格式不正确！");
                                    }else
                                        t.$post(d?2005:2004, {groupname:v, groupid:d?d.groupid:""}, ()=>{
                                            t.loadGroup();
                                        });       
                               }
                         }
                })
            },
            del(type, d){
                t.$confirm(type==1?'确定要删除此分组吗？\n删除后将无法恢复':'确定'+(t.query.groupid==0?'':'从当前分组')+'删除此手机号吗？',
                           ()=>{
                               if(type==1)
                                    t.$post(2006, {groupid:d.groupid}, ()=>{
                                        t.loadGroup();
                                    })    
                                else
                                    t.$post(2017, {groupid:t.query.groupid==0?d.groupid:[t.query.groupid], phone:d.phone}, ()=>{
                                        t.loadData();
                                    }) 
                           })
            },
            beforeUpload(f){
                if(!/\.xlsx?$/i.test(f.name)) {
                    this.$error('请上传excel文件！');
                    return false;
                }
            },
            uploadErr(){
                t.$error('上传出错！');
            },
            uploadSucc(res) {
                this.$refs.upload.clearFiles();
                if(res.retHead==0) {
                    t.$info("导入成功！");
                    t.loadData();
                    return;
                }
                t.$error(res.desc);
            },
            search(){
                t.loadData(t.$refs.page.internalCurrentPage = 1);
            },
            loadGroup(){
                t.$post(2003, {}, res=>{
                    t.data = res.list;
                },{page:1, count:1000})
            },
            loadData(p){
                !p && (p = t.$refs.page.internalCurrentPage);
                t.$post(2015, t.query, res=>{
                    t.data2 = res.list;
                    t.total = +res.totalCount;
                }, p);
            },
            changeTab(){
                if(t.tab==2 && !flag) {
                    flag = 1;
                    t.loadData(1);
                }
            },
            download(){
                t.downloadPath = t.downloadApi + "?groupid=" + t.query.groupid + "&t=" + (new Date().getTime());
            }
        },
        mounted(){
            t.loadGroup();
        }
    }
</script>
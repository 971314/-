<template>
    <div class="logView">
        <div class="search">
            <div class="r">
                <el-select v-model="param.operatorname" @change="search">
                    <el-option label="全部用户" value=""></el-option>
                    <el-option v-for="u in users" :label="u.operatorname" :value="u.operatorname"></el-option>
                </el-select>
                <el-select v-model="param.operatetype" @change="search">
                    <el-option label="全部操作类型" value="0"></el-option>
                    <el-option v-for="(v,k) in operateTypes" :label="v" :value="k"></el-option>
                </el-select>
            </div>
        </div>
        <el-table :data="data">
                    <column prop="operatorname" label="用户名" min-width="100"></column>
                    <column label="操作类型" min-width="120">
                        <template scope="d">{{operateTypes[d.row.operatetype]}}</template>
                    </column>
                    <column prop="logcontent" label="操作内容" min-width="300"></column>
                    <column prop="ip" label="ip" min-width="140"></column>
                    <column label="操作时间" min-width="150">
                        <template scope="d">{{d.row.logtime|time}}</template>
                    </column>
        </el-table>
        <page @current-change="loadData" :total="total" ref="page"></page>
    </div>
</template>
<script>
    var t;
    module.exports={
        data(){
            t = this;
            return {
                users:[],
                data:[],
                param:{operatorname:"",operatetype:"0"},
                total:0
            }
        },
        methods:{
            search(){
                t.loadData(t.$refs.page.internalCurrentPage = 1);
            },
            loadData(p){
                t.$post(2014,t.param, res=>{
                    t.data = res.list;
                    t.total = +res.totalCount;
                }, p)  
            }
        },
        mounted(){
            t.$post(2013, {}, res=>{
                t.users = res.list;
            })
            t.loadData(1);
        }
    }
</script>
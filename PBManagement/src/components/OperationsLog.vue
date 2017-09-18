<template>
  <div class="opslog">
    <el-form ref="form" :inline="true" :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="操作日期">
        <el-date-picker
          v-model="form.time"
          type="daterange"
          align="right"
          placeholder="选择日期范围"
          :picker-options="pickerOptions"
          :editable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="操作类型">
        <!-- <el-select v-model="form.type" clearable placeholder="请选择操作类型">
          <el-option value="用户登录操作"></el-option>
          <el-option value="获取指定用户列表"></el-option>
        </el-select> -->
        <el-input v-model="form.type" placeholder="操作类型"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery" :loading="queryStatus">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="error" v-if="queryError">
      <p>{{ queryError }}</p>
    </div>
    <el-row class="log-table">
      <el-col :span="19">
        <el-table :data="opsData" style="width: 100%">
          <el-table-column prop="loginName" label="用户名" width="100px"></el-table-column>
          <el-table-column prop="time" label="操作时间" width="180px"></el-table-column>
          <el-table-column prop="ip" label="IP地址" width="150px"></el-table-column>
          <el-table-column prop="funcDesc" label="操作类型"></el-table-column>
          <el-table-column prop="result" label="状态" width="70px"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-if="totalSize > 0" class="pagination">
      <el-col :span="19">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalSize">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props: ['userRootAuz'],
  data () {
    return {
      userInfo: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      form: {
        name: '',
        time: ['', ''],
        type: ''
      },
      queryError: '',
      queryStatus: false,
      opsData: [],
      pageSize: 10,
      totalSize: 0,
      currentPage: 1
    }
  },
  mounted () {
    let _this = this;
    let auz = _this.userRootAuz.children.filter(function (item) {
      return item.url === _this.$route.path;
    });
    if (auz.length == 0) {
      _this.$router.replace(_this.userRootAuz.children[0].url);
    }
    _this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    _this.onQuery();
  },
  methods: {
    getLogList () {
      let _this = this;
      _this.queryStatus = true;
      _this.queryError = '';
      _this.$axios.post(PBConf.routerURL, {
        func: '618',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data:[{
          loginName: _this.form.name,
          funcDesc: _this.form.type,
          startTime: _this.form.time[0] ? moment(_this.form.time[0]).format('YYYYMMDD') : '',
          endTime: _this.form.time[1] ? moment(_this.form.time[1]).format('YYYYMMDD') : '',
          pageSize: _this.pageSize + '',
          pageNumber: _this.currentPage + ''
        }]
      }).then(function (axiosData) {
        _this.queryStatus = false;
        if (axiosData.data.retHead == '0') {
          _this.totalSize = +axiosData.data.data[0].logTotal;
          _this.opsData = axiosData.data.data[0].logList;
        } else {
          _this.totalSize = 0;
          _this.opsData = [];
          _this.queryError = axiosData.data.desc;
          return false;
        }
      }).catch(function (error) {
        _this.queryStatus = false;
        console.error(error);
      });
    },
    onQuery () {
      this.currentPage = 1;
      this.getLogList();
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getLogList();
    }
  }
}
</script>

<style>
.opslog .log-table {
  height: 445px;
}
.opslog .pagination {
  margin: 20px auto;
  text-align: center;
}
</style>
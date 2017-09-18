<template>
  <div class="user-query">
    <div v-if="query" class="auz-tree">
      <div class="error" v-if="queryError"><p>{{ queryError }}</p></div>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <el-tree
        :data="auzsData"
        :props="auzsProps"
        ref="auzTree"
        node-key="pid"
        default-expand-all
        :filter-node-method="filterNode"
        :render-content="renderContent">
      </el-tree>
    </div>
    <div v-if="add || edit" class="user-form">
      <el-form ref="form" :model="auzData" :rules="auzRules" label-position="left" label-width="100px">
        <el-form-item label="父节点编号">
          <span>{{ auzData.parentCode }}</span>
        </el-form-item>
        <!-- <el-form-item v-if="add" label="节点编号" prop="code">
          <el-input v-model="auzData.code"></el-input>
        </el-form-item> -->
        <el-form-item label="节点名称" prop="description">
          <el-input v-model="auzData.description" @focus="auzError = ''"></el-input>
        </el-form-item>
        <el-form-item label="节点序号">
          <el-input v-model="auzData.orderNum" @focus="auzError = ''"></el-input>
        </el-form-item>
        <el-form-item label="功能编号">
          <el-input v-model="auzData.funcCode" @focus="auzError = ''"></el-input>
        </el-form-item>
        <el-form-item v-if="add || auzData.children.length == 0" label="节点url">
          <el-input v-model="auzData.url" @focus="auzError = ''"></el-input>
        </el-form-item>
        <el-form-item class="error" v-if="auzError">
          <p>{{ auzError }}</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onGoback()">返回</el-button>
          <el-button type="primary" @click="onSubmit" :loading="submitStatus">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userRootAuz'],
  data () {
    return {
      userInfo: {},
      queryError: '',
      auzError: '',
      filterText: '',
      auzsData: [],
      auzsProps: {
        children: 'children',
        label: 'description'
      },
      auzData: {},
      auzRules: {
        description: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
        ]
      },
      query: true,
      edit: false,
      add: false,
      submitStatus: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.auzTree.filter(val);
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
    onQuery () {
      let _this = this;
      _this.queryError = '';
      let params = {
        func: '613',
        uid: _this.userInfo.userId,
        token: _this.userInfo.token,
        data:[{
          id: '0'
        }]
      };
      _this.$axios.post(PBConf.routerURL, params).then(function (axiosData) {
        if (axiosData.data.retHead == '0') {
          _this.auzsData = axiosData.data.data[0].funcList;
        } else {
          _this.queryError = axiosData.data.desc;
          return false;
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.description.indexOf(value) !== -1;
    },
    onAdd (store, data, event) {
      event.stopPropagation();
      this.auzData = {
        pid: '',
        parentCode: data.code,
        code: '',
        description: '',
        orderNum: '',
        funcCode: '',
        url: '',
        sub: data.sub
      };
      this.query = false;
      this.edit = false;
      this.add = true;
    },
    onEdit (store, data, event) {
      event.stopPropagation();
      this.auzData = {...data};
      this.query = false;
      this.add = false;
      this.edit = true;
    },
    renderContent (h, { node, data, store }) {
      if (data.parentCode == 0) {
        return (
          <span style="white-space: normal;">
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" type="info" disabled>修改</el-button>
              <el-button size="mini" type="info" on-click={ ($event) => this.onAdd(store, data, $event) }>增加</el-button>
            </span>
          </span>
        );
      } else if(node.level > 2) {
        return (
          <span style="white-space: normal;">
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" type="info" on-click={ ($event) => this.onEdit(store, data, $event) }>修改</el-button>
              <el-button size="mini" type="info" disabled>增加</el-button>
            </span>
          </span>
        );
      } else {
        return (
          <span style="white-space: normal;">
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" type="info" on-click={ ($event) => this.onEdit(store, data, $event) }>修改</el-button>
              <el-button size="mini" type="info" on-click={ ($event) => this.onAdd(store, data, $event) }>增加</el-button>
            </span>
          </span>
        );
      }
    },
    onGoback () {
      this.queryError = '';
      this.auzError = '';
      this.edit = false;
      this.add = false;
      this.query = true;
    },
    onSubmit () {
      let _this = this;
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.submitStatus = true;
          _this.auzError = '';
          let params = {
            func: '615',
            uid: _this.userInfo.userId,
            token: _this.userInfo.token,
            data:[{
              pid: _this.auzData.pid,
              parentCode: _this.auzData.parentCode,
              description: _this.auzData.description,
              orderNum: _this.auzData.orderNum || '0',
              funcCode: _this.auzData.funcCode || '',
              url: _this.auzData.url || '',
              sub: _this.auzData.sub || '',
              remark: ''
            }]
          };
          if (_this.add) {
            params.func = '614';
            delete params.data[0].pid;
          }
          _this.$axios.post(PBConf.routerURL, params).then(function (axiosData) {
            _this.submitStatus = false;
            if (axiosData.data.retHead == '0') {
              let msg = '权限修改成功';
              if (_this.add) {
                msg = '权限增加成功'
              }
              _this.$alert(msg, '提示', {
                confirmButtonText: '确定',
                callback: () => {
                  _this.onQuery();
                  _this.onGoback();
                }
              });
            } else {
              _this.auzError = axiosData.data.desc;
              return false;
            }
          }).catch(function (error) {
            _this.submitStatus = false;
            console.error(error);
          });
        } else {
          _this.auzError = '';
          _this.submitStatus = false;
          return false;
        }
      });
    }
  }
}
</script>

<style>
.user-query .auz-tree {
  width: 70%;
}
.user-query .auz-tree input {
  margin-bottom: 20px;
}
.auz-tree .el-tree {
  border-radius: 5px;
}
</style>

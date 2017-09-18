import errors from "./errors.js";
var f = function(){};

module.exports = {
      cookieDisabled(){
          document.cookie = "a=a";
          return !document.cookie;
      },
      cookie(key) {
          if(typeof key == "object") {
              for(var k in key) {
                  document.cookie = k + "=" + key[k];
              }
              return;
          }
          var cookies = document.cookie;
          if(!cookies)
              return null;
          var result = cookies.match(new RegExp("(^|;\\s?)" + key + "=(\\w*)"));
          return result ? result[2] : null;
      },
      post(func, data, success, error) {
          var params = {loginname: user.username || ""};
          $.ajax({
				url: config.api,
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({func, data:$.extend(params, data)}),
                xhrFields: {
					withCredentials: true
				},
				success: function(res){
                    if(res.retHead != 0) {
                        if(res.retHead == -3) {
                            App.$router.push("/");
                            utils.clear();
                        }else if(error) {
                            error(errors[res.retHead]||res.retHead);
                        }else
                            alert(errors[res.retHead]||res.retHead);
                        return;
                    }
                    success(res.data);
                },
				error: f
			})

      },
      clear(){
          document.cookie = "username=";
          document.cookie = "type=";
          user.username = user.type = "";
      },
      f2(value) {
          if(value > 9)
              return value;
          return "0" + value;
      },
    date(d, s){
        s==undefined && (s = "-");
        return d.getFullYear() + s + this.f2(d.getMonth()+1) + s + this.f2(d.getDate());
    },
    time(t){
        if(!t)
            return "";
        var d = new Date();
        d.setTime(t);
        return this.date(d) + " " + this.f2(d.getHours()) + ":" + this.f2(d.getMinutes()) + ":" + this.f2(d.getSeconds());
    },
    parseDate(d){
        var date = new Date();
        d = d.split("-");
        date.setFullYear(d[0]);
        date.setMonth(d[1]-1);
        date.setDate(d[2]);
        return date;
    },
    intReg: /^\d+$/,
    int2Reg: /^[1-9]\d*$/,
    listView: {
            data(){
                this.resolve = function(type, data){
                    if(this.defer)
                        --this.defer<=0 && this.loadData();
                }
                return {
                    list:[]
                }
            },
            methods: {
                loadData(){
                    var page = this.$refs.page;
                     utils.post(this.func, $.extend({pageNumber:page.page, pageSize:page.pageSize}, this.data), res=>{
                        this.list = res.information;
                        page.totalCount(res.maxCount); 
                    });
                },
                search(){
                    this.$refs.page.page = 1;
                    this.loadData();
                }    
            },
            mounted(){
                !this.defer && this.loadData();
            }
    },
    listView2: {
            data(){
                return {
                    list: []
                }
            },
            methods: {
                loadData(){
                    utils.post(this.func, this.data, res=>{
                        this.list = res;
                    });
             
                },
                del(d){
                    if(confirm("确定要删除该条记录吗？")) {
                        utils.post(this.delFunc, {id: d.id}, ()=>{
                            this.loadData();
                        })
                    }
                }
            },
            mounted(){
                this.loadData();
            }
    },
    editView:{
        mounted(){
            !this.defer && this.get();
        },
        methods:{
            resolve(){
                --this.defer <= 0 && this.get();
            },
            check(){
                var chks = this.$refs.chks, result = true;
                for(var i=0;i<chks.length;i++){
                     result = chks[i].check() && result;
                }
                return result;
            },
            save() {
                utils.post(this.$route.params.id && this.$route.params.id != 0 ? this.func.edit : this.func.add, this.data, res => {
                    alert("保存成功！");
                    history.go(-1);
                })
            }, 
            get(){
                var id = this.$route.params.id;
                if(id && this.func.get && id > 0) {
                    utils.post(this.func.get, {id: id-0}, res => {
                        this.data = res;
                    });
                }  
            }
        }
    }
}
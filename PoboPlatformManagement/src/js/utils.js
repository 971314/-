var perms;

window.utils = {
      cookieDisabled(){
          document.cookie = "a=a";
          return !document.cookie;
      },
      cookie(key) {
          if(typeof key == "object") {
              for(var k in key) {
                  document.cookie = k + "=" + (typeof key[k] == "object" ? JSON.stringify(key[k]) : key[k]);
              }
              return;
          }
          var cookies = document.cookie;
          if(!cookies)
              return null;
          var result = cookies.match(new RegExp("(^|;\\s?)" + key + "=([^;]*)"));
          return result ? result[2] : null;
      },
      post(func, data, success, page, error) {
          page && $.extend(data, {pagecount:page.pageSize+"", currentindex:page.page+""});
          $.ajax({
				url: config.api,
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({func:func+"", uid:user.i||"", data:[data]}),
                xhrFields: {
					withCredentials: true
				},
				success: res=>{
                    if(res.retHead != 0) {
                        if(res.retHead == "-104")
                            utils.logout();
                        else
                            (error||alert)(res.desc);
                        return;
                    }
                    if(res.data.length==0) {
                        success();
                        return;
                    }
                    res = res.data[0];
                    success(res.list || res.info || res);
                    page && page.totalCount(res.totalCount); 
                },
				error: (a, b, c)=>{
                    alert(func+"\n"+b+"\n"+c);
                }
			})
      },
      post2(func, data, success, page, error, api) {
          $.ajax({
				url: api || config.api2,
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({func:func+"", uid:user.uid, data:data||{}}),
                xhrFields: {
					withCredentials: true
				},
				success: function(res){
                    if(res.status != 0) {
                        if(res.status == -3)
                            utils.logout();
                        else 
                            (error||alert)(res.msg);
                        return;
                    }
                    success(res.data, res);
                },
				error: (a, b, c)=>{
                    alert(func+"\n"+b+"\n"+c);
                }
			})
      },
      infoPost(func, data, success, page, error) {
          page && $.extend(data, {pageNo:page.page, pageSize:page.pageSize});
          $.ajax({
				url: config.api,
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({func:func+"", uid:user.i||"", data:[data]}),
                xhrFields: {
					withCredentials: true
				},
				success: res=>{
                    if(res.retHead != 0) {
                        if(res.retHead == "-104")
                            utils.logout();
                        else
                            (error||alert)(res.desc);
                        return;
                    }
                    res = res.data;
                    page && page.totalCount(res[0].count); 
                    success(res);
                },
				error: (a, b, c)=>{
                    alert(func+"\n"+b+"\n"+c);
                }
			})
      },
      clear(){
          user.n = user.t = user.i = "";
          user.m = [];
          this.cookie(user);
          this.cookie({p:""});
          perms = "";
      },
      logout(){
          this.clear();
          location.hash = "/";
      },
      loading(f){
          !this.loadEl && (this.loadEl = $("#loading"));
          this.loadEl[f===false?"removeClass":"addClass"]("show");
      },
    intReg: /^\d+$/,
    xlsReg: /\.xlsx?$/i,
    setPerms(p){
        perms = p;
        this.cookie({p});
    },
//    getPerms(){
//        !perms && (perms = this.cookie("p")) && (perms = JSON.parse(perms));
//        return {uid:user.i, perms:perms&&perms[location.hash.match(/\/(\d+)\/\$$/)[1]]}
//    },
    genTree(src, des){
        var d, m = {};
        for(var i=0;i<src.length;i++){
            d = src[i];
            if(d.parentcode == 0) {
                des.push(d);
            }else {
                !m[d.parentcode] && (m[d.parentcode]={subs:[]});
                !m[d.parentcode].subs && (m[d.parentcode].subs=[]);
                m[d.parentcode].open = (sessionStorage.getItem(d.parentcode)=="true"?true:false);
                m[d.parentcode].subs.push(d);
            }
            m[d.code] = $.extend(d, m[d.code]);
        }
    },
    listView: {
            data(){
                return {
                    list:[]
                }
            },
            methods: {
                loadData(){
                    !this.query && (this.query = $.extend({}, this.data));
                    (this.post||utils.post)(this.func, this.query, res=>{
                        if(this.loaded) {
                            this.loaded(res);
                            return;
                        }
                        this.list = res;
                    }, this.$refs.page);
                },
                search(){
                    this.query = $.extend({}, this.data);
                    this.$refs.page && (this.$refs.page.page = 1);
                    this.loadData();
                },
                del(d){
                    if(confirm("确定要删除该条记录吗？")) {
                        (this.post||utils.post)(this.delFunc, {id: d.id}, ()=>{
                            this.loadData();
                        })
                    }
                }
            },
            mounted(){
                !this.defer && this.loadData();
            }
    },
    editView:{
        mounted(){
            !this.defer && this.get();
        },
        methods:{
            check(){
                var chks = this.$refs.chks, result = true;
                if(chks)
                   for(var i=0;i<chks.length;i++){
                       result = chks[i].check() && result;
                   }
                return result;
            },
            save() {
                (this.post||utils.post)(this.$route.params.id != 0 ? this.func.edit : this.func.add, this.data, () => {
                    alert("保存成功！");
                    history.go(-1);
                })
            }, 
            get(){
                var id = this.$route.params.id;
                if(id && id != 0 && this.func.get) {
                    (this.post||utils.post)(this.func.get, {id: id}, res => {
                        if(this.loaded){
                            this.loaded(res);
                            return;
                        }
                        this.data = res;
                    });
                }  
            }
        }
    }
}

var user = {
    n: utils.cookie("n"),
    t: utils.cookie("t"),
    i: utils.cookie("i"),
    m:JSON.parse(utils.cookie("m")||"[]")
}

module.exports = user
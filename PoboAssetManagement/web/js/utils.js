var f = function(){};
function f2(v) {
    return v < 10 ? "0"+v : v;
}
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
      post(url, data, success, error) {
          var uid = 0;
          app.currentUser && (uid = app.currentUser.uid);
          $.ajax({
				url: config.api + url,
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({uid, data:[data]}),
                xhrFields: {
					withCredentials: true
				},
				success: function(res){
                    if(res.retHead != 1) {
                        if(res.retHead == -104) {
                            alert(res.desc);
                            utils.clear();
                            app.$router.go("/");
                        }else if(error) {
                            error(res.desc);
                        }else
                            alert(res.desc);
                        return;
                    }
                    success(res.data);
                },
				error: f
			})

      },
      clear(){
          document.cookie = "uid=";
          document.cookie = "group=";
          app.currentUser = null;
      },
      pageCount: 10,
      time(value) {
          if(!value)
              return "";
          var d = new Date();
          d.setTime(value);
          return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate()
          + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      },
      identityCodeValid(code) {
        if(!code || !/^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(code))
            return false;
//        var city = code.substr(0,2)-0;
//        if(city<11 || (city>15&&city<21) || (city>23&&city<31) || (city>37&&city<41) || (city>46&&city<50) || (city>54&&city<61) || (city>65&&city<71))
//            return false;
//        var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
//        var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
//        var sum = 0;
//        for (var i = 0; i < 17; i++)
//            sum += code[i] * factor[i];
//        return parity[sum % 11] == code[17];
          return true;
    },
    codeReg: /^[\da-zA-Z]{4}$/,
    intReg: /^[1-9]\d*$/,
    f2Reg: /^\d+(\.\d{1,2}0*)?$/,
    f4Reg: /^\d+(\.\d{1,4}0*)?$/,
    xlsReg: /\.xls(x)?$/i,
    listView(menu, filter, url, title) {
        return {
            data(){
                app.current = menu;
                if(menu == 4) app.title = title;
                $(document).on("click.action", e => {
                    if(e.target.className != "icon more") {
                        this.showAction = -1;
                    }
                });
                return {
                    showAction:-1,
                    filter,
                    list:[],
                    totalCount: null
                }
            },
            methods: {
                loadData (page) {
                    utils.post(url + "/list", $.extend({pagecount: utils.pageCount}, this.$route.query),             res => {
                            this.list = res[0].list;
                            page.totalCount(this.totalCount = res[0].totalCount);
                        }) 
                    },
                showLog (id) {
                    this.$refs.logs.load(url + "/records", id);
                },
            },
            beforeDestroy(){
                $(document).off("click.action");
            }
        }
    }
}
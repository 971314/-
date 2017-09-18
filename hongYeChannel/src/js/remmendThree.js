/**
 * Created by xiajing on 2016/10/17.
 */
$(function () {
    var UUID;

    function getRandomCode() {
        $.ajax({
            url: serverIP + randomCodeUrl + new Date().getTime(),
            type: 'GET',
            crossDomain: true,
            success: function (data) {
                if (data.retHead == 0) {
                    $('#randomCodeImg').attr('src','data:image/jpg;base64,' + data.data.image);
                    UUID = data.data.id;
                }
            }, error: function (data) {
                console.error('服务器异常！');
            }
        });
    }
    getRandomCode();
    $('#randomCodeImg').click(getRandomCode);

    var channelId = getUrlParam("channelid");
    //sessionStorage.setItem("channelID", channelId);
    var guid = localStorage.getItem('guid');
    if (!guid) {
        guid = new GUID().newGUID();
        if(isLocalStorageSupported())
            localStorage.setItem('guid', guid);
    }

    function isLocalStorageSupported() {
        var testKey = 'test',
            storage = window.localStorage;
        try {
            storage.setItem(testKey, 'testValue');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    $.ajax({
        url: serverIP + channelUrl,
        type: 'POST',
        data: JSON.stringify({
            func: visits,
            data: {
                codeId: guid,
                channelNumber: channelId
            }
        }),
        contentType: 'application/json',
        crossDomain: true,
        success: function (data) {
            console.log('success');
        }, error: function (data) {
            console.error('统计访问量失败');
        }
    });
    var loginName, userId, pwd;
    var userFlag = 0;// 未注册

    var osType = getOsType();

    $("#sysTitleReg").html(companyName + "手机App");
    $("#remmendBtn").click(function () {

        if (!checkIsWeixin())
            return;

        var phone = $("#phone").val().trim();
        var randomCode = $("#randomCode").val().trim();
        var codeMsg = $("#codeMsg").val().trim();
        if (!phone) {
            $("#remmendMsg").css('display', 'block');
            $("#remmendMsg").html("请输入手机号！");
            return;
        }
        if (!phoneRegexp.test(phone)) {
            $("#remmendMsg").css('display', 'block');
            $("#remmendMsg").html("请正确输入手机号！");
            return;
        }
        if (!randomCode) {
            $("#remmendMsg").css('display', 'block');
            $("#remmendMsg").html("请输入图形验证码！");
            return;
        }
        if (!codeMsg) {
            $("#remmendMsg").css('display', 'block');
            $("#remmendMsg").html("请输入短信验证码！");
            return;
        }
        //alert(userFlag);
        if (userFlag) {
            pwd = phone.substr(5, 6);
            loginName = phone;
            registerUser(loginName, pwd, userId);
        }


        // window.location.href = 'suc.html'
    })


    $("#remmendBtn").blur(function () {
        $("#remmendMsg").css('display', 'none');
    })


    /*获取短信验证码*/
    $("#fetchCodeMsg").click(function () {

        if (!checkIsWeixin())
            return;

        var phone = $("#phone").val().trim();
        var randomCode = $("#randomCode").val().trim();
        if (!phone) {
            $("#remmendMsg").css('display', 'block');
            $("#remmendMsg").html("请输入手机号！");
            return;
        }
        if (!phoneRegexp.test(phone)) {
            $("#remmendMsg").css('display', 'block');
            $("#remmendMsg").html("请正确输入手机号！");
            return;
        }
        if (!randomCode) {
            $("#remmendMsg").css('display', 'block');
            $("#remmendMsg").html("请输入图形验证码！");
            return;
        }


        sendCode();


    })


    function sendCode() {


        var phone = $("#phone").val().trim();
        var randomCode = $("#randomCode").val().trim();
        if (osType == "") {
            $("#remmendMsg").css('display', 'block');
            $("#remmendMsg").html("当前操作系统未知");
            return;
        }

        function countDownBtn() {
          var sec = 60;
          for (var i = 0; i <= 60; i++) {
              window.setTimeout(function () {
                  if (sec != 0) {
                      $("#countDown").show();
                      $("#countDown").html(sec + "秒后重发");
                      $("#fetchCodeMsg").hide();
                      sec--;
                  } else {
                      sec = 60;//如果倒计时结束就让  获取验证码显示出来
                      $("#fetchCodeMsg").show();
                      $("#countDown").hide();
                  }
              }, i * 1000)
          }
        }

        $.ajax({
            url: serverIP + channelUrl,
            type: 'POST',
            data: JSON.stringify({
                func: regiter,
                data: {
                    loginName: phone,
                    os: osType,
                    version: version,
                    codeId: UUID,
                    code: randomCode
                }
            }),
            contentType: 'application/json',
            crossDomain: true,
            success: function (data) {
                countDownBtn();
                if (data.retHead == 0) {
                    console.log(data.data)
                    //sessionStorage.setItem("TwoQr", data.data);
                    //window.location.href = 'view/createQrCode.html'
                    if (data.data["returnFlag"] == 0) {
                        userFlag = 1;//注册
                        loginName = data.data["loginName"];
                        userId = data.data["userId"];
                        pwd = (loginName + "").substr(5, 6);
                        //sessionStorage.setItem("loginName", loginName);
                        //sessionStorage.setItem("loginPwd", pwd);

                    }
                    else if (data.data["returnFlag"] == 6) {
                        $("#dialogContent").html("发送短信验证码失败");
                        getRandomCode();
                        $("#randomCode").val('');
                        $('#flagLoginDialog').modal(flagLoginDialog);
                        $("#fetchCodeMsg").show();
                        $("#countDown").hide();
                    }
                    else if(data.data["returnFlag"] == 5) {
                        userFlag = 0;//未注册已是注册用户
                        //console.log(phone);
                        //sessionStorage.setItem("loginName", phone);
                        //sessionStorage.setItem("loginPwd", "如忘记密码请在App中找回");
                        $("#dialogContent").html("您已是注册用户");
                        getRandomCode();
                        $("#randomCode").val('');
                        $('#flagLoginDialog').modal(flagLoginDialog);
                        $("#existLoginClose").click(function () {
                            window.setTimeout(function () {
                                window.location.href = 'suc.html?name='+phone+"&pwd=0&id="+channelId;
                            }, 1000)
                        })
                    } else {
                        $("#dialogContent").html(data.data["loginName"]);
                        getRandomCode();
                        $("#randomCode").val('');
                        $('#flagLoginDialog').modal(flagLoginDialog);
                        $("#fetchCodeMsg").show();
                        $("#countDown").hide();
                    }


                } else {
                    console.log(data);

                }
            }, error: function (data) {
                console.log("服务器异常！")
            }
        })
    }

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }

    function registerUser(loginName, pwd, userid) {
        var channelId = getUrlParam("channelid");
        var otp = $("#codeMsg").val().trim();
        $.ajax({
            url: serverIP + channelUrl,
            type: 'POST',
            data: JSON.stringify({
                func: verify,
                data: {
                    loginName: loginName,
                    pwd: pwd,
                    otp: otp,
                    os: osType,
                    uid: userid,
                    channelNumber: channelId
                }
            }),
            contentType: 'application/json',
            crossDomain: true,
            success: function (data) {
                if (data.retHead == 0) {
                    console.log(data);
                    if (data.data["returnFlag"] == 8) {
                        getRandomCode();
                        $("#randomCode").val('');
                        alert("校验码不对");
                        console.log("校验码不对");
                    }
                    else {
                        //sessionStorage.setItem("loginName", loginName);
                        //sessionStorage.setItem("loginPwd", pwd);
                        window.location.href = 'suc.html?name='+loginName+"&pwd=1&id="+channelId;
                    }

                }
                else {
                    console.log("请求异常");
                    console.log(data);
                }
            }
        })
    }

    function getOsType() {
        var u = navigator.userAgent;
        console.log(u);
        if (u.indexOf('MicroMessenger') > -1)
            return "WeiXin";
        else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1)
            return "Android";
        else if (u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1 || u.indexOf('iPod') > -1)
            return "IOS";
        else if (u.indexOf('Windows Phone') > -1)
            return "Windows";

        else {
            console.log("当前操作系统未知");
            //未知时返回Android，解决系统未识别问题
            return "Android";
        }

    }

    function checkIsWeixin() {
        if (osType == "WeiXin") {
            $("#regInfo1").css('display', 'none');
            $("#regInfo2").css('display', 'none');
            $("#remmendBtn").css('display', 'none');
            $("#remmendMsg").css('font-size', '18px');
            $("#remmendMsg").css('display', 'block');
            $("#root").attr("class",'');
            $("html").css('background-color','#514F4A');
            $("#root").html("<img src='../images/bgweixin.png' width='100%'' style='position:absolute;left:0;top:0'>");
            $(document).attr("title","App下载");
            return false;
        }
        return true;
    }

    checkIsWeixin();

    var oHeight = $(window).height(); //浏览器当前的高度

    $(".inputText").focus(function () {
        $(".divBgImg").css('height', oHeight + 50);
    });
    $(".inputText").blur(function () {
        $(".divBgImg").css('height', oHeight);
        $(".divBgImg").scrollTop(0);
    });


})

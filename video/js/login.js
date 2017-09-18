//------------------------------
//
//登录处理
//
//------------------------------

//登录成功
CRVideo_LoginSuccess.callback = function (usrID,cookie) {
  removeLodingLayer();
  g_me_user_id = usrID;
  //初始化队列数据
  CRVideo_InitQueueDat();
  $('body').removeClass('bgc-white');
  $('.login_container').css('display',"none");
  //根据登陆的角色显示对应的用户界面
  if (g_login_type == 1) {           //客户
    $('.queue_container').css('display',"block");
    $('.queue_username').text('欢迎'+ g_me_user_id + '...')
  } else if (g_login_type == 2) {    //坐席
    $('.start_server_container').css('display',"block");
    $('.start_server_username').text(g_me_user_id+'...')
  }
}
//登录失败
CRVideo_LoginFail.callback = function (sdkErr,cookie) {
  removeLodingLayer();
  popupTipLayer('登录失败:'+ sdkErr);
}
function getDepartmentList() {
  var data = {
    'func': 2023,
    'type': 2,
    'account':'',
    'token':'',
    'data': [{
      'service': 'adequacy.116',
      'json': JSON.stringify({
        USERCODE: g_nick_name
      }),
    }]
  };
  $.ajax({
    type: 'post',
    url: videoConf.crmServerAddr,
    contentType: 'application/json;charset=utf-8',
    data: JSON.stringify(data),
    dataType: 'json',
    xhrFields: { withCredentials: true },
    crossDomain: true,
    success: function (result) {
      if (result.retHead == 1) {
        g_department_list = JSON.parse(result.data["0"].proxyresult).body.result;
        if (g_department_list.length > 0) {
          //账号
          var cr_account = "demo@cloudroom.com";
          //密码
          var cr_psw = "e10adc3949ba59abbe56e057f20f883e";
          CRVideo_SetServerAddr(g_server_addr);
          CRVideo_Login(cr_account,cr_psw,g_nick_name,g_user_id,"");
          popupLodingLayer();
        } else {
          popupTipLayer('没有查询到所属部门，无法登陆');
        }
      } else {
        popupTipLayer(result.desc);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(jqXHR);
    }
  });
}
//登录
$('#login_btn').click(function () {
  if (!g_is_init) {
    //初始化sdk
    var result = CRVideo_Init("CLOUDROOM",g_location_dir);
    if (result == CRVideo_WEB_OCX_NOTINSTALLED) {
      //没有安装
      $('.login_container').css('display',"none");
      $('#not_installed_tip').css('display',"block");
      return;
    } else if (result == CRVideo_OCX_VERSION_NOTUPPORTED) {
      //版本过低
      $('.login_container').css('display',"none");
      $('#version_low_tip').css('display',"block");
      return;
    } else if (result == CRVideo_WEB_BROWER_NOTUPPORTED) {
      //不支持的浏览器
      popupTipLayer('不支持的浏览器' );
      return;
    } else if (result != 0) {
      //其它错误
      popupTipLayer('初始化插件错误:'+result );
      return;
    } else {
      g_is_init = true
    }
  }

  g_nick_name = $.trim($('#name').val());
  g_user_id = $.trim($('#name').val());
  var password = $.trim($('#pwd').val());
  if (!g_user_id || !password) {
    popupTipLayer('请输入用户名和密码' );
    return;
  }
  var data = {
    'func': 2023,
    'type': 2,
    'account':'',
    'token':'',
    'data': [{
      'service': 'adequacy.110',
      'json': JSON.stringify({
        USERCODE: g_nick_name,
        USERPASSWORD: password
      }),
    }]
  };
  $.ajax({
    type: 'post',
    url: videoConf.crmServerAddr,
    contentType: 'application/json;charset=utf-8',
    data: JSON.stringify(data),
    dataType: 'json',
    xhrFields: { withCredentials: true },
    crossDomain: true,
    success: function (result) {
      if (result.retHead == 1) {
        var loginInfo = JSON.parse(result.data["0"].proxyresult).body.result;
        if (loginInfo.length > 0) {
          g_department = loginInfo[0].DEPARTMENT_ID;
          getDepartmentList();
        } else {
          popupTipLayer('用户名密码错误或没有坐席权限');
        }
      } else {
        popupTipLayer(result.desc);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(jqXHR);
    }
  });
});
$('.login_container').keyup(function (event) {
  if (event.keyCode == 13) {
    $('#login_btn').click();
  }
});
/**
 * 日期格式化
 */
Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "D+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+|Y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
};
//全局对象
var g_is_init = false;//是否初始化
var g_server_addr = videoConf.videoServerAddr;//服务器地址
var g_department;
var g_department_list;
var g_user_id;//用户id
var g_nick_name;//昵称
var g_login_type = 2;//登录类型

var g_meet_id;//会议id
var g_meet_pwd;//会议密码
var g_session_call_id;//会话id
var g_call_user_id;//对方id
var g_call_user_que;//呼叫的队列
var g_me_user_id;//自己的id

var g_loading_index = -1;
var g_loading_deleted = false;

var g_meeting = false;//会议进行中

 //目录地址
var g_location_dir = videoConf.locationDir;

//视频用户信息
var g_user_data;

//弹出提示层
function popupTipLayer(content) {
  if (g_meeting) {
    $(".meeting_container").css("display","none")
  }
  layui.use('layer', function () {
    var layer = layui.layer;
    layer.open({
      title: ['提示', 'font-size:14px;'],
      content:content, //这里content是一个普通的String
      end: function () {
        if (g_meeting) {
          $(".meeting_container").css("display","block")
          if (g_call_video !== undefined && g_me_video !== undefined) {
            g_call_video.setVideo(g_call_user_id);
            g_me_video.setVideo(g_me_user_id);
          }
        }
      }
    });
  });
}
//删除加载层
function removeLodingLayer() {
  if (g_loading_index != -1) {
    layui.use('layer', function () {
      var layer = layui.layer;
      layer.close(g_loading_index);
      g_loading_index = -1;
      g_loading_deleted = false;
    })
  } else {
    g_loading_deleted = true;
  }
}
//弹出加载层
function popupLodingLayer() {
  if (g_meeting) {
    $(".meeting_container").css("display","none")
  }
  layui.use('layer', function () {
    var layer = layui.layer;
    g_loading_deleted = false;
    g_loading_index = layer.load(0, {
      area: '60px',
      end: function () {
        if (g_meeting) {
          $(".meeting_container").css("display","block")
          if (g_call_video !== undefined && g_me_video !== undefined) {
            g_call_video.setVideo(g_call_user_id);
            g_me_video.setVideo(g_me_user_id);
          }
        }
      }
    });
    if (g_loading_deleted) {
      removeLodingLayer();
    }
  });
}

window.onbeforeunload = function () {
  CRVideo_Logout();
  CRVideo_Uninit()
}
//注销
function logout() {
  logoutForPair();
  CRVideo_Logout();
  CRVideo_Uninit();
  g_is_init = false;
  setTimeout(function () {
    location.replace(location.href)
  },200)//延迟刷新页面防止logout未执行完毕
}
//刷新队列
function refresh_que() {
  CRVideo_RefreshAllQueueStatus()
}

//离线
CRVideo_LineOff.callback = function (sdkErr) {
  if (g_meeting) {
    $(".meeting_container").css("display","none")
  }
  layui.use('layer', function () {
    var layer = layui.layer;
    layer.open({
      type: 0,
      area: '400px',
      title : ['提示', 'font-size:14px;'],
      content: "会话掉线", //注意，如果str是object，那么需要字符拼接。
      btn: ['确定'],
      yes: function (index, layero){
        location.replace(location.href);
      }
    });
  });
}
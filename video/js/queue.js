//------------------------------
//
//队列
//
//------------------------------

var g_que_dict;//列队数据
var g_queuing_info;//排队信息
var g_user_srv_layer_index = -1;//服务用户层索引
var g_user_que_layer_index = -1;//服务用户层索引

//查询列队是否在服务中
function getServicedById(queID) {
  var servingQues = CRVideo_GetServingQueues();
  var servingQues_length = servingQues.length;
  for (var i = 0;i < servingQues_length;i++) {
    var item = servingQues[i];
    if (item == queID) {
      return true;
    }
  }
  return false;
}

//设置列队是否免打扰
function setSrvDNDState(state) {
  if (state) {
    $(".start_server_footer_right").css("display","inline-block")
    CRVideo_SetDNDStatus(1);
  } else {
    $(".start_server_footer_right").css("display","none")
    CRVideo_SetDNDStatus(0);//0:代表关闭免打扰， 其它值代表开启免打扰
  }
}

//更新队列状态
function updateQue(status) {
  for (var name in g_que_dict) {
    var item = g_que_dict[name];
    if (item["queId"] == status.queID) {
      if (g_login_type == 2) {
        item["expertNum_span"].text(status.agent_num);
        item["queNum_span"].text(status.wait_num);
        item["srvNum_span"].text(status.srv_num);
      } else {
        item["queNum_span"].text(status.wait_num + "人");
      }
      break;
    }
  }
}

var audio = document.getElementById('audio');
//删除请求服务用户层
function removeUserSrvLayer() {
  if (g_user_srv_layer_index != -1) {
    layui.use('layer', function () {
      var layer = layui.layer;
      layer.close(g_user_srv_layer_index);
      g_user_srv_layer_index = -1;
    })
  }
  if (!audio.paused) {
    audio.pause();
    audio.load();
  }
}
//弹出请求服务用户层
function popupUserSrvLayer(user) {
  layui.use('layer', function () {
    var layer = layui.layer;
    if (g_user_srv_layer_index != -1) {
      layer.close(g_user_srv_layer_index);
    }
    if (audio.paused) {
      audio.play();
    }
    g_user_srv_layer_index = layer.open({
      type : 0,
      area: '400px',
      title : ['用户分配中', 'font-size:14px;'],
      content: '系统为您分配【'+user.usrID+'】', //注意，如果str是object，那么需要字符拼接。
      btn: ['<p style="font-size:14px;">确定</p>','<p style="font-size:14px;">取消</p>'],
      yes: function (index, layero){
          layer.close(index);
          var infoArr = user.usrID.split('|');
          g_user_data = {
            INVESTOR_NAM: infoArr[1],
            ID_NO: infoArr[2],
            PHONENUM : infoArr[0]
          };
          g_call_user_id = user.usrID;
          g_call_user_que = user.queID;
          CRVideo_CreateMeeting(videoConf.meetingSubject)
          g_user_srv_layer_index = -1;
          if (!audio.paused) {
            audio.pause();
            audio.load();
          }
          popupLodingLayer();
      }.bind(this),
      btn2: function (index, layero){
        if (!audio.paused) {
          audio.pause();
          audio.load();
        }
        layer.close(index);
        CRVideo_RejectAssignUser(user.queID, user.usrID);
        g_user_srv_layer_index = -1;
       }.bind(this),
    });
  });
}
//删除请求用户排队层
function removeUserQueLayer() {
  if (g_user_que_layer_index != -1) {
    layui.use('layer', function () {
      var layer = layui.layer;
      layer.close(g_user_que_layer_index);
      g_user_que_layer_index = -1;
    })
  }
}
//弹出请求用户排队层
function popupUserQueLayer(user) {
  layui.use('layer', function () {
    var layer = layui.layer;
    var content;
    var timer;
    var s = 0;
    if (g_user_que_layer_index != -1) {
      layer.close(g_user_que_layer_index);
    }

    g_user_que_layer_index = layer.open({
      type : 0,
      area: '400px',
      title : ['用户分配中', 'font-size:14px;'],
      content: "你已经排队等待0秒", //注意，如果str是object，那么需要字符拼接。
      btn: ['<p style="font-size:14px;">取消</p>'],
      yes: function (index, layero){
        CRVideo_StopQueuing();
        layer.close(index);
        g_user_que_layer_index = -1;
       },
      end:function () {
        clearInterval(timer)
      },
      success: function (layero, index){
        timer = setInterval(function () {
          if (g_queuing_info !== undefined) {
            s++;
            $(layero).find('.layui-layer-content').html("你已经排队等待"+ s+"秒");
          }
        },1000)
      }
    });
  });
}
function oneTouch() {
  $('.start_server_open_server').click();
}
function jsoncallback(result) {
  var que_info = result.Data.queueList;
  //初始化坐席业务列表
  g_que_dict = {};

  var queInfos_length = que_info.length;
  for (var i = 0;i < queInfos_length;i++) {
    var item = que_info[i];
    var queDesc = item.QueDesc ? item.QueDesc.split('-') : item.desc.split('-');
    var departmentList_length = g_department_list.length;
    var hasQueue = false;
    for (var ii = 0; ii < departmentList_length; ii++) {
      if (queDesc[0] !== videoConf.institution || queDesc[1] !== g_department_list[ii].DEPARTMENT_ID) {
        continue;
      } else {
        hasQueue = true;
      }
    }
    if (!hasQueue) {
      continue;
    }
    var queueId = item.QueueID ? item.QueueID : item.queID;
    var queueName = item.QueueName ? item.QueueName : item.name;
    var queuePriority = item.Priority ? item.Priority : item.prio;
    if (g_login_type == 2) {
      var status = CRVideo_GetQueueStatus(queueId);
      var li = $('<li />')

      var name_span = $("<span>"+queueName+"</span>")
      li.append(name_span);

      var expertNum_span = $("<span>"+status.agent_num+"</span>")
      li.append(expertNum_span);

      var queNum_span = $("<span>"+status.wait_num+"</span>")
      li.append(queNum_span);

      var srvNum_span = $("<span>"+status.srv_num+"</span>")
      li.append(srvNum_span);

      var srvStatus_span = $("<span/>")
      var btn = $("<span id=\"srv_open_btn_"+queueId+"\" class=\"start_server_open_server\">请开启服务</span>")
      if (getServicedById(queueId)) {
        btn.text("服务中...");
        btn.addClass("active");
      } else {
        btn.text("请开启服务");
        btn.removeClass("active");
      }
      srvStatus_span.append(btn);
      li.append(srvStatus_span);

      var priority_span = $("<span>"+queuePriority+"</span>")
      li.append(priority_span);

      g_que_dict[btn.attr("id")] = {"queId":queueId,"expertNum_span":expertNum_span,"queNum_span":queNum_span,"srvNum_span":srvNum_span,"srvStatus_span":srvStatus_span};

      $('#start_server_list').append(li)

      btn.click(function (e) {
        queData = g_que_dict[$(this).attr("id")];
        var queID = queData["queId"];
        if (getServicedById(queID)) {
          CRVideo_StopService(queID);
          $(this).text("请开启服务");
          $(this).removeClass("active");
        } else {
          CRVideo_StartService(queID);
          $(this).text("服务中...");
          $(this).addClass("active");
        }
      });
    } else {
      var status = CRVideo_GetQueueStatus(queueId);
      var li = $('<li id="queue_li_' + queueId + '" />')

      var name_span = $("<span class=\"queue_list_left\">"
                +"<span>"+queueName+"</span>"
                +"<span>"+queDesc+"</span>"
                +"</span>"
              )
      li.append(name_span);

      var queNum_span = $("<span class=\"queue_list_right\">"+status.wait_num+"人</span>")
      li.append(queNum_span);

      g_que_dict[li.attr("id")] = {"queId":queueId,"name_span":name_span,"queNum_span":queNum_span};

      $('#queue_list').append(li)

      li.click(function (e) {
        queData = g_que_dict[$(this).attr("id")];
        var queID = queData["queId"];
        CRVideo_StartQueuing(queID);
        popupUserQueLayer();
      });
    }
  }

  if (g_login_type == 2) {
    setSrvDNDState(0)

    $(".start_server_footer_right").click(function (e) {
      CRVideo_ReqAssignUser();
    })

    $("#start_server_disturb").click(function (e) {
      var checkVal = $("input[type='checkbox']").is(':checked');
      setSrvDNDState(checkVal)
    })

    if ($('.start_server_open_server').length > 1) {
      $('#one_touch_btn').css('visibility', 'visible');
    }
  }
  var windowHeight = $(window).height();
  var containerHeight = $('.start_server_container').innerHeight();
  var heightGap = windowHeight - containerHeight;
  if (heightGap > 0) {
    $('.start_server_container').css('margin-top', -containerHeight / 2);
  } else {
    $('.start_server_container').css({'margin-top': 0, 'top': 20});
  }
}
function getQueueInfo() {
  var params = {
    RequestId: new Date().getTime() + '',
    UserName: 'demo@cloudroom.com',
    UserPswd: 'e10adc3949ba59abbe56e057f20f883e',
    QueDesc: videoConf.institution+ '-' + g_department,
    _doaction_: 'get',
    _callback_: 'jsoncallback'
  };
  // if (g_department == '0000000') {
    var que_info = CRVideo_GetAllQueueInfo();
    var result = {
      Data: {
        queueList: []
      }
    };
    result.Data.queueList = que_info;
    jsoncallback(result);
  // } else {
  //   $.ajax({
  //     url: videoConf.videoApiAddr,
  //     data: params,
  //     dataType: 'jsonp',
  //     async: false,
  //     success: function (result) {}
  //   });
  // }
}
//列队数据初始化返回
CRVideo_InitQueueDatRslt.callback = function (sdkErr,cookie) {
  seeisoninfo = CRVideo_GetSessionInfo();
  if (sdkErr == CRVideo_NOERR) {
    if (seeisoninfo.callID != "" && seeisoninfo.duration > 0) {
      layui.use('layer', function (){
        var layer = layui.layer;
        layer.open({
          area: '500px',
          title : ['提示', 'font-size:14px;'],
          content: '是否恢复意外关闭的视频会话', //注意，如果str是object，那么需要字符拼接。
          btn: ['<p style="font-size:14px;">确定</p>','<p style="font-size:14px;">取消</p>'],
          yes: function (index, layero) {
            layer.close(index)
            g_meet_id = seeisoninfo.meetingID;
            g_meet_pwd = seeisoninfo.meetingPswd;
            g_session_call_id = seeisoninfo.callID;
            g_call_user_id = seeisoninfo.peerName;
            CRVideo_EnterMeeting(g_meet_id,g_meet_pwd,g_user_id,g_nick_name);
            popupLodingLayer()
          },
          btn2: function (index, layero) {
            layer.close(index)
            CRVideo_HungupCall(seeisoninfo.callID);
           },
        });
      });
    }
    getQueueInfo();
  }
}
//开始排队响应
CRVideo_StartQueuingRslt.callback = function (errCode,cookie) {
  // console.log("CRVideo_StartQueuingRslt(sdkErr%s)",errCode);
  if (errCode != 0) {
    removeUserQueLayer();
  }
}
//停止排队响应
CRVideo_StopQueuingRslt.callback = function (errCode,cookie) {
  // console.log("CRVideo_StopQueuingRslt(sdkErr%s)",errCode);
}
//
CRVideo_NotifyCallIn.callback = function (callID ,meetObj,callerID,usrExtDat) {
  // console.log("CRVideo_NotifyCallIn(callID%s,callerID%s,usrExtDat%s)",callID ,callerID,usrExtDat);
  removeUserQueLayer();
  CRVideo_AcceptCall(callID,meetObj)

  g_meet_id = meetObj.ID;
  g_meet_pwd = meetObj.pswd;
  g_session_call_id = callID;
  g_call_user_id = callerID;
  popupLodingLayer()
  CRVideo_EnterMeeting(meetObj.ID,meetObj.pswd,g_user_id,g_nick_name);
}
//正在排队信息更新
CRVideo_QueuingInfoChanged.callback = function (queuingInfo) {
  // console.log("CRVideo_QueuingInfoChanged(queuingInfo%s)",queuingInfo);
  g_queuing_info = queuingInfo;
}
//列队状态改变
CRVideo_QueueStatusChanged.callback = function (queStatus) {
  // console.log("CRVideo_QueueStatusChanged(queStatus(queID:%s,agent_num:%s,srv_num:%s,wait_num:%s))",queStatus.queID , queStatus.agent_num , queStatus.srv_num , queStatus.wait_num);
  updateQue(queStatus);
}
//开启队列服务响应
CRVideo_StartServiceRslt.callback = function (queID,sdkErr,cookie) {
  if (sdkErr == CRVideo_NOERR) { //开始服务队列，更新该队列的状态信息
    var status = CRVideo_GetQueueStatus(queID);
    updateQue(status);
  }
}
//停止队列服务响应
CRVideo_StopServiceRslt.callback = function (queID, sdkErr, cookie) {
}
//系统自动安排客户
CRVideo_AutoAssignUser.callback = function (usr) {
  popupUserSrvLayer(usr);
}
//请求分配客户操作结果
CRVideo_ReqAssignUserRslt.callback = function (errCode,usr,cookie) {
  // console.log("CRVideo_ReqAssignUserRslt(errCode:%s)",errCode);
  if (errCode == CRVideo_NOERR) {
    popupUserSrvLayer(usr);
  } else if (errCode == CRVideo_QUE_NOUSER) {
    popupTipLayer("目前没有需要服务的客户")
  } else if (errCode == CRVideo_QUE_SERVICE_NOT_START) {
    popupTipLayer("未开启队列服务")
  }
}
//系统取消自动安排客户
CRVideo_CancelAssignUser.callback = function (queID,usrID) {
  // console.log("CRVideo_CancelAssignUser(queID:%s,usrID:%s)",queID,usrID);
  removeUserSrvLayer();
}
//会议创建成功
CRVideo_CreateMeetingSuccess.callback = function (meetObj, cookie) {
  CRVideo_Call(g_call_user_id,meetObj);
  CRVideo_AcceptAssignUser(g_call_user_que, g_call_user_id);
}
//会议创建失败
CRVideo_CreateMeetingFail.callback = function (sdkErr, cookie) {
  removeLodingLayer();
  popupTipLayer("创建会议失败")
}
//呼叫他人操作成功
CRVideo_CallSuccess.callback = function (callID, cookie) {
}
//呼叫他人操作失败
CRVideo_CallFail.callback = function (callID, sdkErr, cookie) {
  removeLodingLayer();
  popupTipLayer("呼叫失败");
}
//通知呼叫被对方接受
CRVideo_NotifyCallAccepted.callback = function (callID, meetObj, usrExtDat) {
  g_meet_id = meetObj.ID;
  g_meet_pwd = meetObj.pswd;
  g_session_call_id = callID;
  // console.log(usrExtDat);
  CRVideo_EnterMeeting(g_meet_id,g_meet_pwd,g_user_id,g_nick_name);
}
//通知呼叫被对方拒绝
CRVideo_NotifyCallRejected.callback = function (callID, sdkErr,usrExtDat) {
  removeLodingLayer();
  popupTipLayer("呼叫被对方拒绝");
}
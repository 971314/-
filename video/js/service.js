//---------------------------------------------
//
//业务窗口
//
//---------------------------------------------

var g_call_video;//呼叫的视频
var g_me_video;//自己的视频
var g_me_media;//自己播放的媒体对象
var g_playing_media = false;
var g_recording = false
var g_record_timer = -1;
var record_size_arr=[
 [0,0,0]            //0
,[144,80,56]        //1
,[224,128,72]       //2
,[288,160,100]      //3
,[336,192,150]      //4
,[448,256,200]      //5
,[512,288,250]      //6
,[576,320,300]      //7
,[640,360,350]      //8
,[720,400,420]      //9
,[800,600,500]      //10
,[848,480,500]      //11
,[1024,576,650]     //12
,[1280,720,1000]    //13
,[1920,1080,2000]];  //14
var g_hanging_up = false;
var updateRecord = function () {
  if (g_recording) {
    var recContents = [];
    var size = record_size_arr[10]
    var w = size[0]
    var h = size[1]
    if (g_call_user_id !== undefined) {
      var videoAContent = {};
      videoAContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_VIDEO;
      videoAContent["left"] = 0;
      videoAContent["top"] = 0;
      videoAContent["width"] = w/2;
      videoAContent["height"] = h/2;
      videoAContent['keepAspectRatio'] = 1;
      videoAContent["param"] = {"camid":g_call_user_id+"."+CRVideo_GetDefaultVideo(g_call_user_id)};

      recContents.push(videoAContent);
    }

    if (g_me_user_id !== undefined) {
      var videoBContent = {};
      var videoBStampContent = {};
      var videoBlogoContent = {};

      videoBContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_VIDEO;
      videoBContent["left"] = w/2;
      videoBContent["top"] = 0;
      videoBContent["width"] = w/2;
      videoBContent["height"] = h/2;
      videoBContent['keepAspectRatio'] = 1;
      videoBContent["param"] = {"camid":g_me_user_id+"."+CRVideo_GetDefaultVideo(g_me_user_id)};
      recContents.push(videoBContent);

      videoBlogoContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_PIC;
      videoBlogoContent["left"] = w/2 + 3;
      videoBlogoContent["top"] = 3;
      videoBlogoContent["width"] = 32;
      videoBlogoContent["height"] = 32;
      videoBlogoContent["param"] = {"resourceid":g_logo_id};
      videoBlogoContent["keepAspectRatio"] = 1;
      recContents.push(videoBlogoContent);

      videoBStampContent["type"] = CRVideo_REC_VCONTENT_TYPE.RECVTP_TIMESTAMP;
      videoBStampContent["left"] = w/2 + 35;
      videoBStampContent["top"] = 3;
      videoBStampContent["width"] = 175;
      videoBStampContent["height"] = 32;
      videoBStampContent["keepAspectRatio"] = 1;
      recContents.push(videoBStampContent);
    }

    CRVideo_SetRecordVideos(recContents);
  }
}
function completeAppropriateness() {
  //停止录像
  if (g_recording) {
    $("#record_btn").click();
  }
  // 通知CRM用户适当性通过
  var data = {
    'func': 2023,
    'type': 2,
    'account':'',
    'token':'',
    'data': [{
      'service': 'adequacy.113',
      'json': JSON.stringify(g_user_data)
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
        completeVideo();
      } else {
        alert(result.desc);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(jqXHR);
    }
  });
}
function checkAttachment(isEnterMeeting) {
  // 检查是否有客户附件
  var data = {
    'func': 2023,
    'type': 2,
    'account':'',
    'token':'',
    'data': [{
      'service': 'adequacy.101',
      'json': JSON.stringify(g_user_data)
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
    async: false,
    success: function (result) {
      if (result.retHead == 1) {
        var attachment = JSON.parse(result.data["0"].proxyresult).body.result;
        if (isEnterMeeting) {
          if (attachment.VIDEO_FLG != 'Y') {
            var hasHasHey = false;
            for (var key in attachment) {
              if (key.indexOf('HAS_') == 0) {
                hasHasHey = true;
                if (attachment[key] != 'Y') {
                  alert('该客户CRM中附件不全，不能通过适当性');
                  break;
                }
              }
            }
            if (!hasHasHey) {
              alert('该客户CRM中附件不全，不能通过适当性');
            }
          }
        } else {
          if (attachment.VIDEO_FLG == 'Y') {
            completeVideo();
          } else {
            var hasHasHey = false;
            var hasAttachment = true;
            for (var key in attachment) {
              if (key.indexOf('HAS_') == 0) {
                hasHasHey = true;
                if (attachment[key] != 'Y') {
                  hasAttachment = false;
                  g_hanging_up = false;
                  alert('该客户CRM中附件不全，不能通过适当性');
                  break;
                }
              }
            }
            if (!hasHasHey) {
              hasAttachment = false;
              g_hanging_up = false;
              alert('该客户CRM中附件不全，不能通过适当性');
            }
            if (hasAttachment) {
              completeAppropriateness();
            }
          }
        }
      } else {
        alert(result.desc);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(jqXHR);
    }
  });
}
function rejectAppropriateness() {
  //停止录像
  if (g_recording) {
    $("#record_btn").click();
  }
  // 通知CRM用户适当性被驳回
  var data = {
    'func': 2023,
    'type': 2,
    'account':'',
    'token':'',
    'data': [{
      'service': 'adequacy.115',
      'json': JSON.stringify({
        INVESTOR_NAM: g_user_data.INVESTOR_NAM,
        ID_NO: g_user_data.ID_NO,
        PHONENUM : g_user_data.PHONENUM,
        // FILE_TYP: 'INFO_FILE,RECORD_FILE'
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
        completeVideo();
      } else {
        alert(result.desc);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(jqXHR);
    }
  });
}
function completeVideo() {
  layui.use('layer', function () {
    var layer = layui.layer;
    layer.closeAll();
  });
  CRVideo_HungupCall(g_session_call_id);
}
$("#video_undone_btn").click(function () {
  if (!g_hanging_up) {
    g_hanging_up = true;
    rejectAppropriateness();
  }
})
$("#video_done_btn").click(function () {
  if (!g_hanging_up) {
    g_hanging_up = true;
    checkAttachment(false);
  }
})

$('#play_btn').click(function () {
  if (g_playing_media) {
    CRVideo_StopPlayMedia();
  } else {
    CRVideo_StartPlayMedia('C:/Users/Public/pobovideo/record/风险提示1.mp4', 2);
  }
})

$("#record_btn").click(function () {
  if (!g_recording) {
    var date = new Date().format('YYYYMMDD');

    var recordName = g_user_data.ID_NO + "_" + date + '_11' +".mp4"

    var size = record_size_arr[10];
    var frame = 15;
    var zhiliang = 26;

    CRVideo_StartRecordIng(g_location_dir+"record/"+recordName,CRVideo_RECORD_AUDIO_TYPE.REC_AUDIO_TYPE_ALL,frame,size[0],size[1]/2,size[2]*1000,zhiliang,7);

    $("#record_btn").val("停止录像").removeClass('record_start_btn').addClass('record_stop_btn');
    $("#record_span").text("00:00");
    if (g_record_timer != -1) {
      clearInterval(g_record_timer);
    }
    g_record_timer = setInterval(function () {
      var duration = CRVideo_GetRecDuration();
      var size = parseInt(CRVideo_GetRecFileSize()/1024);
      var second = duration%60;
      var second_str = second >= 10? second.toString():"0"+second;
      var minute = parseInt(duration/60);
      var minute_str = minute >= 10? minute.toString():"0"+minute;
      $("#record_span").text(minute_str + ":" + second_str)
    },300)
    g_recording = true
    updateRecord();
  } else {
    CRVideo_StopRecord();
    $("#record_btn").val("开始录制").removeClass('record_stop_btn').addClass('record_start_btn');
    $("#record_span").text("");
    g_recording = false;

    if (g_record_timer != -1) {
      clearInterval(g_record_timer);
      g_record_timer = -1
    }
  }
});
$("#pic_btn").click(function () {
  if (g_call_video.isPicEmpty() == 0) {
    var date = new Date().format('YYYYMMDD');
    var picName = g_user_data.ID_NO + "_" + date +".png"

    g_call_video.savePic(g_location_dir+"img/"+picName)

    // popupTipLayer("截图位置("+g_location_dir+"img/"+picName+")");
  } else {
    // popupTipLayer("没有图像");
  }
})
// $(".meet_file_name_right").click(function () {
//   CRVideo_SendCmd(g_call_user_id,$("#cmd_content").val());
// })
function updateVideoCfg() {
  var cfg = {}

  var sizeType = 10
  cfg.sizeType = sizeType

  var fps = 20
  if (fps < 5) {
    fps = 5
  } else if (fps > 20) {
    fps = 20
  }
  cfg.fps = fps

  cfg.maxbps = record_size_arr[sizeType][2]*1000

  var qp = 0
  if (qp == 0) {
    cfg.qp_min = 22
    cfg.qp_max = 36
  } else if (qp == 1) {
    cfg.qp_min = 22
    cfg.qp_max = 25
  }
  cfg.wh_rate = CRVideo_VIDEO_WH_RATE.RATE_4_3;
  CRVideo_SetVideoCfg(cfg)
}
function updateAudioCfg() {
  var cfg = {}
  cfg.privEC = 0;
  cfg.privAgc = 0;
  CRVideo_SetAudioCfg(cfg)
}
//获取视频用户信息
function getUserBasicInfo() {
  var data = {
    'func': 2023,
    'type': 2,
    'account':'',
    'token':'',
    'data': [{
      'service': 'adequacy.105',
      'json': JSON.stringify({
        INVESTOR_NAM: g_user_data.INVESTOR_NAM,
        ID_NO: g_user_data.ID_NO,
        PHONENUM: g_user_data.PHONENUM,
        ATTACHMENT: 'Y',
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
        if (!JSON.parse(result.data["0"].proxyresult).body) {
          return;
        }
        var userInfo = JSON.parse(result.data["0"].proxyresult).body.result;
        $('#USER_NAM').text(userInfo.USER_NAM);
        $('#PHONENUM').text(userInfo.PHONENUM);
        $('#ID_NO').text(userInfo.ID_NO);
        $('#IDVALID').text(userInfo.IDVALID_ST_DT + ' - ' + (userInfo.IDVALID_END_DT == '2999-12-31' ? '永久' : userInfo.IDVALID_END_DT));
        $('#OCCUPATION_CD').text(userInfo.OCCUPATION_CD);
        $('#DEPARTMENT').text(userInfo.DEPARTMENT_NAM);
        $('#LINKTELEPHONE').text(userInfo.LINKTELEPHONE);
        $('#FAX_NO').text(userInfo.FAX_NO);
        $('#LINKADDR').text(userInfo.LINKADDR);
        $('#POSTCODE').text(userInfo.POSTCODE);
        $('#EMAIL').text(userInfo.EMAIL);
        $('#CONTROLLINK').text(userInfo.CONTROLLINK == 1 ? '无' : userInfo.CONTROLLINK_ITEM);
        var tradeTypeArr = userInfo.TRADE_TYP.split(',');
        var tradeType = [];
        for (var i = 0, l = tradeTypeArr.length; i < l; i++) {
          if (tradeTypeArr[i] == 0) {
            tradeType.push('投机');
          } else if (tradeTypeArr[i] == 1) {
            tradeType.push('套利');
          } else if (tradeTypeArr[i] == 2) {
            tradeType.push('套保');
          } else if (tradeTypeArr[i] == 3) {
            tradeType.push('产品');
          }
        }
        $('#TRADE_TYP').text(tradeType.join('/'));
        $('#BENEFICIARY').text(userInfo.BENEFICIARY == 0 ? '本人' : userInfo.BENEFICIARY_ITEM);
        $('#NO_CREDIT_TYP').text(userInfo.NO_CREDIT_TYP == 0 ? '无' : '有');
        var investTime;
        if (userInfo.INVEST_TIME == 0) {
          investTime = '0年-1年';
        } else if(userInfo.INVEST_TIME == 1) {
          investTime = '1年-5年';
        } else if(userInfo.INVEST_TIME == 2) {
          investTime = '5年以上';
        }
        $('#INVEST_TIME').text(investTime);
        var invesetGain;
        if (userInfo.INVEST_GAIN == 0) {
          invesetGain = '稳健';
        } else if (userInfo.INVEST_GAIN == 1) {
          invesetGain = '成长';
        } else if (userInfo.INVEST_GAIN == 2) {
          invesetGain = '激进';
        }
        $('#INVEST_GAIN').text(invesetGain);
        var investCategoryArr = userInfo.INVEST_CATEGORY.split(',');
        var investCategory = [];
        for (var i = 0, l = investCategoryArr.length; i < l; i++) {
          if (investCategoryArr[i] == 0) {
            investCategory.push('期货');
          } else if (investCategoryArr[i] == 1) {
            investCategory.push('期权');
          } else if (investCategoryArr[i] == 2) {
            investCategory.push('资管产品');
          } else if (investCategoryArr[i] == 3) {
            investCategory.push(userInfo.INVEST_CATEGORY_ITEM);
          }
        }
        $('#INVEST_CATEGORY').text(investCategory.join('/'));
        if (userInfo.FILE_DATA_IDFRONT && userInfo.FILE_DATA_IDBACK) {
          $('#forth').attr('src', userInfo.FILE_DATA_IDFRONT);
          $('#fifth').attr('src', userInfo.FILE_DATA_IDBACK);
          $('#forth').click(function () {
            window.open($(this).attr('src'));
          });
          $('#fifth').click(function () {
            window.open($(this).attr('src'));
          });
        }
      } else {
        alert(result.desc);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(jqXHR);
    }
  });
}
function getAppropriatenessRslt() {
  var data = {
    'func': 2023,
    'type': 2,
    'account':'',
    'token':'',
    'data': [{
      'service': 'adequacy.104',
      'json': JSON.stringify(g_user_data),
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
        if (!JSON.parse(result.data["0"].proxyresult).body) {
          return;
        }
        var appropriatenessRslt = JSON.parse(result.data["0"].proxyresult).body.result;
        $('#GRADE_CODE').text(appropriatenessRslt.GRADE_CODE + '(' + appropriatenessRslt.SCORE + ')');
        // $('#GRADE_CODE').text(appropriatenessRslt.GRADE_CODE);
        $('#MATCH_PRD_RISK').text(appropriatenessRslt.MATCH_PRD_RISK.split('、').join('/'));
      } else {
        alert(result.desc);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(jqXHR);
    }
  });
}
function appendAppropriatenessDetl(appropriatenessDetail) {
  var questions = appropriatenessDetail.QUESTION;
  var html1 = '<div class="qnr-group">';
  var html2 = '<p class="question">';
  var html3 = '<p class="option">';
  var html4 = '<p class="option active">';
  var html5 = '</p>';
  var html6 = '</div>';
  var period  = '.';
  var htmlAll = '';

  for (var i = 0, l = questions.length; i < l; i++) {
    var question = questions[i];
    if (question.QUESTION_TYP == 0 || question.QUESTION_TYP == 1) {
      htmlAll += html1 + html2 + question.QUESTION + html5;
      var record_answers = question.RECORD_ANSWER;
      var record_answer = '';
      for (var rai = 0, ral = record_answers.length; rai < ral; rai++) {
        record_answer += record_answers[rai].ANSWER;
      }
      var answers = question.ANSWER;
      for (var ii = 0, ll = answers.length; ii < ll; ii++) {
        var answer = answers[ii];
        if (record_answer.indexOf(answer.ANSWER_CD) < 0) {
          htmlAll += html3 + answer.ANSWER_CD + period + answer.ANSWER_CONTENT + html5;
        } else {
          htmlAll += html4 + answer.ANSWER_CD + period + answer.ANSWER_CONTENT + html5;
        }
      }
      htmlAll += html6;
    }
  }
  $('#appropriateness_detail').append(htmlAll);
}
function getAppropriatenessDetl() {
  var data = {
    'func': 2023,
    'type': 2,
    'account':'',
    'token':'',
    'data': [{
      'service': 'adequacy.112',
      'json': JSON.stringify({
        INVESTOR_NAM: g_user_data.INVESTOR_NAM,
        ID_NO: g_user_data.ID_NO,
        PHONENUM : g_user_data.PHONENUM,
        ATTACHMENT: 'N'
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
        if (!JSON.parse(result.data["0"].proxyresult).body) {
          return;
        }
        var appropriatenessDetail = JSON.parse(result.data["0"].proxyresult).body.result;
        appendAppropriatenessDetl(appropriatenessDetail);
      } else {
        alert(result.desc);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(jqXHR);
    }
  });
}
function appendAttachmentList(attachmentList) {
  for (var i = 0, l = attachmentList.length; i < l; i++) {
    var div = $('<div class="form-group"></div>');
    div.append('<span class="control-label">' + attachmentList[i].CERT_NAM + '</span>');
    var img = $('<img src="' + videoConf.attachmentAddr + g_user_data.ID_NO + '&agreementType=' + attachmentList[i].KEY_CODE + '" alt="暂无附件">');
    img.click(function () {
      window.open($(this).attr('src'));
    });
    div.append(img);
    $('#attachment_list').append(div);
  }
}
function getAttachmentList() {
  var data = {
    'func': 2023,
    'type': 2,
    'account':'',
    'token':'',
    'data': [{
      'service': 'adequacy.120',
      'json': JSON.stringify({}),
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
        if (!JSON.parse(result.data["0"].proxyresult).body) {
          return;
        }
        var attachmentList = JSON.parse(result.data["0"].proxyresult).body.result;
        appendAttachmentList(attachmentList);
      } else {
        alert(result.desc);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(jqXHR);
    }
  });
}
function clearUserInfo() {
  $('.meeting_container .form-control-static').text('');
  $('.meeting_container #FUNDS_ACC').text('请点击按钮获取');
  $('#appropriateness_detail').empty();
  $('#forth').attr('src', '');
  $('#fifth').attr('src', '');
  $('#attachment_list').empty();
  $("#record_start_btn").val("开始录制");
}
var g_logo_id = "6cb4d64a-5647-11e7-bbc9-989096d01cf2"//logo id
//进入会议结果
CRVideo_EnterMeetingRslt.callback = function (sdkErr) {
  removeLodingLayer();
  clearUserInfo();
  if (sdkErr == CRVideo_NOERR) {
    getUserBasicInfo();
    getAppropriatenessRslt();
    getAppropriatenessDetl();
    getAttachmentList();
    $('.start_server_container').css('display',"none");
    $('.queue_container').css('display',"none");
    $(".meeting_container").css("display","block")
    g_meeting = true;
    CRVideo_SetPicResource(g_logo_id,{
      "fmt":"picdat",
      "dat":"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"
    });
    if (g_call_video === undefined) {
      g_call_video = CRVideo_CreatVideoObj();
      g_call_video.width(628)
      g_call_video.height(471)
      $(".video-guest").append(g_call_video.handler())
    }
    if (g_me_video === undefined) {
      g_me_video = CRVideo_CreatVideoObj();
      g_me_video.width(289)
      g_me_video.height(216)
      $(".video-host").append(g_me_video.handler())
    }
    if (g_me_media === undefined) {
      g_me_media = CRVideo_CreatMediaObj();
      g_me_media.width(289)
      g_me_media.height(216)
      $(".media-host").append(g_me_media.handler())
    }
    //打开麦克风
    CRVideo_OpenMic(g_me_user_id);

    //打开视频
    CRVideo_OpenVideo(g_me_user_id);

    //设置对方的视频,延迟显示(ie8有可能组件还没初始化完毕)
    setTimeout(function () {
      g_call_video.setVideo(g_call_user_id)
    },500);

    //设置自己视频,延迟显示(ie8有可能组件还没初始化完毕)
    setTimeout(function () {
      g_me_video.setVideo(g_me_user_id)
    }, 500);

    updateVideoCfg();
    updateAudioCfg();
    setTimeout(function () {
      checkAttachment(true);
    }, 3000);
  } else {
    $(".meeting_container").css("display","none");
    g_meeting = false
    g_user_srv_layer_index = layer.open({
      type : 0,
      area: '400px',
      title : ['提示', 'font-size:14px;'],
      content: '进入会议失败,是否重连', //注意，如果str是object，那么需要字符拼接。
      btn: ['<p style="font-size:14px;">确定</p>','<p style="font-size:14px;">取消</p>'],
      yes: function (index, layero){
        layer.close(index)
        CRVideo_EnterMeeting(g_meet_id,g_meet_pwd,g_user_id,g_nick_name);
        popupLodingLayer();
      }.bind(this),
      btn2: function (index, layero){
        layer.close(index);
        logout();
       }.bind(this),
    });
  }
}
//会议掉线
CRVideo_MeetingDropped.callback = function () {
  CRVideo_EnterMeeting(g_meet_id,g_meet_pwd,g_user_id,g_nick_name);

  $(".meeting_container").css("display","none");
  g_meeting = false
  popupLodingLayer();
}
//用户进入会议
CRVideo_UserEnterMeeting.callback = function (usrID) {
  // console.log("CRVideo_UserEnterMeeting(usrID:%s)",usrID);

  if (usrID == g_call_user_id) {
    //设置对方的视频

    if (g_call_video !== undefined) {
      g_call_video.setVideo(g_call_user_id);
    }
  } else if (usrID == g_me_user_id) {
    if (g_me_video !== undefined) {
      g_me_video.setVideo(g_me_user_id);
    }
  }
}
CRVideo_NotifyCmdData.callback = function (sourceUserId,data) {
  popupTipLayer("收到"+sourceUserId+"的消息："+data);
}
//挂断呼叫操作成功响应
CRVideo_HangupCallSuccess.callback = function (callID,cookie) {
  // console.log("CRVideo_HangupCallSuccess(callID:%s)",callID);
  CRVideo_ExitMeeting();
  g_session_call_id = null;
  if (g_record_timer != -1) {
    clearInterval(g_record_timer);
    g_record_timer = -1
  }
  $(".meeting_container").css("display","none");
  g_hanging_up = false;
  clearUserInfo();
  g_meeting = false
  if (g_call_video !== undefined && g_me_video !== undefined ) {
    g_call_video.clear();
    g_me_video.clear();
  }
  if (g_login_type == 1) {      //客户
    $('.queue_container').css('display',"block");
  } else if (g_login_type == 2) { //坐席
    $('.start_server_container').css('display',"block");
  }
}
//挂断呼叫操作失败响应
CRVideo_HangupCallFail.callback = function (callID,sdkErr,cookie) {
  // console.log("CRVideo_HangupCallFail(callID:%s,sdkErr:%s)",callID,sdkErr);
  popupTipLayer("挂断呼叫失败！");
}
//SDK通知自己呼叫被挂断
CRVideo_NotifyCallHungup.callback = function (callID,usrExtDat) {
  // console.log("CRVideo_NotifyCallHungup(callID:%s)",callID);
  CRVideo_ExitMeeting();
  g_session_call_id = null;
  if (g_record_timer != -1) {
    clearInterval(g_record_timer);
    g_record_timer = -1
  }
  $(".meeting_container").css("display","none")
  clearUserInfo();
  g_meeting = false
  if (g_call_video !== undefined && g_me_video !== undefined ) {
    g_call_video.clear();
    g_me_video.clear();
  }

  if (g_login_type == 1) {      //客户
    $('.queue_container').css('display',"block");
  } else if (g_login_type == 2) { //坐席
    $('.start_server_container').css('display',"block");
  }
  layui.use('layer', function () {
    var layer = layui.layer;
    layer.closeAll();
  });
  popupTipLayer("对方挂断了呼叫");
}
CRVideo_VideoStatusChanged.callback = function (userID,oldStatus,newStatus) {
  // console.log("CRVideo_VideoStatusChanged(userID:%s,oldStatus:%s,newStatus:%s)",userID,oldStatus,newStatus);
  updateRecord();
};
CRVideo_DefVideoChanged.callback = function (userID,videoID) {
  // console.log("CRVideo_DefVideoChanged(userID:%s,videoID:%s)",userID,videoID);
  updateRecord();
};
CRVideo_VideoDevChanged.callback = function (userID) {
  // console.log("CRVideo_VideoDevChanged()");
  setTimeout(function () {
    updateRecord()
  },50);
};
//媒体停止播放通知
CRVideo_NotifyMediaStop.callback = function (userid) {
  if (userid == g_me_user_id) {
    g_playing_media = false;
    $('.media-host').css('display', 'none');
    g_me_video.setVideo(g_me_user_id);
  }
}
//媒体开始播放通知
CRVideo_NotifyMediaOpened.callback = function (totalTime, width, height) {
  g_playing_media = true;
  $('.media-host').css('display', 'block');
}
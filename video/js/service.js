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
      g_call_video.keepAspectRatio(true);
      $(".video-guest").append(g_call_video.handler())
    }
    if (g_me_video === undefined) {
      g_me_video = CRVideo_CreatVideoObj();
      g_me_video.width(289)
      g_me_video.height(216)
      g_me_video.keepAspectRatio(true);
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
  CRVideo_StopMeeting(g_meet_id);
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
  CRVideo_StopMeeting(g_meet_id);
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
CRVideo_EndMeetingRslt.callback = function (sdkErr) {

};
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
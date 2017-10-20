var heartbeatTimer;
var heartbeatInterval = 5 * 1000;
var serviceTimer;
var serviceTimeout = 30 * 1000;//30秒
var g_current_channel_id;
var g_current_srv_status = 'ONLINE';
var g_load_srv_layer_index = -1;
var g_pobo_srv_layer_index = -1;
var socket;
var audio = document.getElementById('audio');
var openedChannel = {};
function initSocket() {
  try {
    // if ('WebSocket' in window) {
    //   socket = new WebSocket('ws://' + videoConf.poboServerAddr + '/custService/queue?brokerId=' + videoConf.institution + '&loginName=' + g_user_id);
    // } else {
    //   socket = new SockJS('http://' + videoConf.poboServerAddr + '/sockJS/custService/queue?brokerId=' + videoConf.institution + '&loginName=' + g_user_id);
    // }
    if (socket) {
      socket = null;
    }
    socket = new SockJS('http://' + videoConf.poboServerAddr + '/sockJS/custService/queue?brokerId=' + videoConf.institution + '&loginName=' + g_user_id);
  } catch (e) {
    console.error('网络连接超时');
  } finally {
    setTimeout(function () {
      if (socket.readyState != 1) {
        removeLoadSrvLayer();
        popupTipLayer('网络连接超时，请检查网络后重新登录');
      }
    }, 15000);
  }
}
function startHeartbeat() {
  if (!heartbeatTimer) {
    heartbeatTimer = setInterval(function () {
      if (socket && socket.readyState == 1) {
        var params = {
          action: 'REQ_WORKING_FINISH',
          body: {}
        };
        socket.send(JSON.stringify(params));
      } else {
        popupTipLayer('网络连接超时，请检查网络后重新登录');
      }
    }, heartbeatInterval);
  }
}
function clearHeartbeat() {
  if (heartbeatTimer) {
    heartbeatTimer = clearInterval(heartbeatTimer);
  }
}
function loginForPair() {
  initSocket();
  socket.onopen = function() {
    removeLoadSrvLayer();
    // startHeartbeat();
    for (var channel in openedChannel) {
      if (openedChannel.hasOwnProperty(channel)) {
        openChannel(openedChannel[channel].queDesc, openedChannel[channel].queName);
      }
    }
  };
  socket.onmessage = function(e) {
    var rspData = JSON.parse(e.data);
    switch (rspData.action) {
      case 'RSP_MATCH_SUCCESS':
        if (rspData.errCode == 0 && rspData.body.brokerId == videoConf.institution) {
          // clearHeartbeat();
          var user = g_que_dict['srv_open_btn_' + rspData.body.channelId].queName + '|' + rspData.body.userName;
          popPoboSrvLayer(user, rspData.body.channelId);
        }
        break;
      case 'RSP_ACCEPT_MATCH':
          if (rspData.errCode == 0) {
            startService();
          } else {
            popupTipLayer(rspData.errMsg);
          }
        break;
      case 'RSP_QUEUE_INFO':
        if (rspData.errCode == 0 && rspData.body.length > 0) {
          for (var i = 0, l = rspData.body.length; i < l; i++) {
            updatePoboQue(rspData.body[i]);
          }
        }
        break;
      case 'RSP_USER_DISCONNECT':
      case 'RSP_MATCH_ACCEPTED':
        removePoboSrvLayer();
        removeLodingLayer();
        stopService();
        // startHeartbeat();
        break;
      default:
        break;
    }
  };
  socket.onclose = function() {
    // popupTipLayer('网络连接超时，请检查网络后重新登录');
  };
  socket.onerror = function (e) {
    // popupTipLayer('网络连接超时，请检查网络后重新登录');
  };
}
function logoutForPair() {
  var params = {
    action: 'REQ_DISCONNECT',
    body: {}
  };
  socket.send(JSON.stringify(params));
}
function removeLoadSrvLayer() {
  if (g_load_srv_layer_index != -1) {
    layui.use('layer', function () {
      var layer = layui.layer;
      layer.close(g_load_srv_layer_index);
      g_load_srv_layer_index = -1;
    })
  }
}
function popLoadSrvLayer() {
  layui.use('layer', function () {
    var layer = layui.layer;
    if (g_load_srv_layer_index != -1) {
      layer.close(g_load_srv_layer_index);
    }
    g_load_srv_layer_index = layer.msg('正在连接服务器，请稍等', {
      icon: 16,
      time: 0,
      shade: 0.01
    });
  });
}
//删除请求服务用户层
function removePoboSrvLayer() {
  if (g_pobo_srv_layer_index != -1) {
    layui.use('layer', function () {
      var layer = layui.layer;
      layer.close(g_pobo_srv_layer_index);
      g_pobo_srv_layer_index = -1;
    })
  }
  if (!audio.paused) {
    audio.pause();
    audio.load();
  }
}
function popPoboSrvLayer(user, channelId) {
  layui.use('layer', function () {
    var layer = layui.layer;
    if (g_pobo_srv_layer_index != -1) {
      layer.close(g_pobo_srv_layer_index);
    }
    if (audio.paused) {
      audio.play();
    }
    g_pobo_srv_layer_index = layer.open({
      type : 0,
      area: '400px',
      title : ['用户分配中', 'font-size:14px;'],
      content: '【'+user+'】请求服务', //注意，如果str是object，那么需要字符拼接。
      btn: ['<p style="font-size:14px;">确定</p>','<p style="font-size:14px;">取消</p>'],
      yes: function (index, layero){
          layer.close(index);
          var params = {
            action: 'REQ_ACCEPT_MATCH',
            body: {
              channelId: channelId
            }
          };
          socket.send(JSON.stringify(params));
          g_current_channel_id = channelId;
          g_pobo_srv_layer_index = -1;
          if (!audio.paused) {
            audio.pause();
            audio.load();
          }
      }.bind(this),
      btn2: function (index, layero){
        if (!audio.paused) {
          audio.pause();
          audio.load();
        }
        layer.close(index);
        var params = {
          action: 'REQ_REFUSE_MATCH',
          body: {
            channelId: channelId
          }
        };
        socket.send(JSON.stringify(params));
        // clearHeartbeat();
        g_pobo_srv_layer_index = -1;
      }.bind(this),
      cancel: function (index, layero) {
        if (!audio.paused) {
          audio.pause();
          audio.load();
        }
        layer.close(index);
        var params = {
          action: 'REQ_REFUSE_MATCH',
          body: {
            channelId: channelId
          }
        };
        socket.send(JSON.stringify(params));
        // clearHeartbeat();
        g_pobo_srv_layer_index = -1;
      }
    });
  });
}
//更新队列状态
function updatePoboQue(status) {
  var item = g_que_dict['srv_open_btn_' + status.channelId];
  item["queNum_span"].text(status.queueLength);
}
function openChannel(channelId, channelName) {
  var params = {
    action: 'REQ_OPEN_CHANNEL',
    body: {
      channelId: channelId,
      channelName: channelName
    }
  };
  socket.send(JSON.stringify(params));
}
function closeChannel(channelId, channelName) {
  var params = {
    action: 'REQ_CLOSE_CHANNEL',
    body: {
      channelId: channelId,
      channelName: channelName
    }
  };
  socket.send(JSON.stringify(params));
}
function startService() {
  CRVideo_StartService(g_que_dict['srv_open_btn_' + g_current_channel_id].queId);
}
function stopService() {
  stopServiceTimer();
  if (g_current_channel_id) {
    CRVideo_StopService(g_que_dict['srv_open_btn_' + g_current_channel_id].queId);
    g_current_channel_id = undefined;
  }
}
function startMeeting() {
  stopServiceTimer();
}
function stopMeeting() {
  var params = {
    action: 'REQ_WORKING_FINISH',
    body: {
      channelId: g_current_channel_id
    }
  };
  socket.send(JSON.stringify(params));
  // startHeartbeat();
  stopService();
}
function startServiceTimer() {
  if (!serviceTimer) {
    serviceTimer = setTimeout(function () {
      removeLodingLayer();
      stopService();
      stopServiceTimer();
    }, serviceTimeout);
  }
}
function stopServiceTimer() {
  if (serviceTimer) {
    serviceTimer = clearTimeout(serviceTimer);
  }
}
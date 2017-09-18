!function (global) {
  var VideoConf = function () {};
  var videoConf = new VideoConf();
  videoConf.videoServerAddr = 'spjz.pobo.net.cn:2727';    //视频服务地址
  videoConf.videoApiAddr = 'http://spjz.pobo.net.cn:2727/api/queryQueueAPI';    //查询视频队列接口
  videoConf.institution = '1996';   //期货机构编号
  videoConf.locationDir = 'C:/Users/Public/pobovideo/';   //录制视频及拍照文件存放路径
  videoConf.crmServerAddr = 'http://101.226.207.143:58080/Hall/webservice';   //webservice服务地址
  videoConf.attachmentAddr = 'http://101.226.207.143:58080/signature-1.2/agreement/png?id=';   //附件地址
  videoConf.meetingSubject = '公版适当性双录';   //视频通话主题
  //常用话术
  videoConf.generalWords = '<p><b>视频人员：</b>XX（客户全名）先生\女士，您好。我是XX营业部适当性管理专员XXX，期货执业资格号FXXXXXX。首先，感谢您选择XX期货，下面将对您的适当性风险评估结果进行核对确认。请您手持身份证，正面对准摄像头。</p>' +
  '<p><b>视频人员：</b>好的，请您收好您的身份证。下面跟您核实几个问题，请您用“是”或者“否”来回答。请问您通过“XX期货一站通”APP适当性评估窗口提交的《投资者基本信息表》、《普通投资者风险承受能力问卷》等信息是否是您本人独立自主完成，且内容真实、准确、完整？</p>' +
  '<p><b>客户：</b>是。</p>' +
  '<p><b>视频人员：</b>根据您提供的信息及风险承受能力问卷作答情况，本公司对您的风险承受能力进行了综合评估，评估结果及适当性匹配意见如下：您是CX类风险承受能力投资者，适配R1-RX风险等级的产品或服务。请问您是否已知晓您的风险承受能力及适当性匹配意见？</p>' +
  '<p><b>客户：</b>是。</p>' +
  '<p><b>视频人员：</b>请问您是否已阅读并亲自签署《投资者基本信息表》、《普通投资者风险承受能力问卷》、《普通投资者适当性匹配意见及特别保护信息告知书》，并充分理解普通投资者特别保护信息告知的全部内容？</p>' +
  '<p><b>客户：</b>是。</p>' +
  '<p><b>视频人员：</b>感谢您的配合，祝您投资愉快。</p>';

  !global.videoConf && (global.videoConf = videoConf);
}(window)
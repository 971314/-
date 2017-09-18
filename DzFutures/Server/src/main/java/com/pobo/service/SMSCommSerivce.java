package com.pobo.service;

import com.lxt2.javaapi.ActiveSubmitSender;
import com.lxt2.javaapi.util.MsgConstant;
import com.lxt2.protocol.cbip20.CbipSubmit;
import com.lxt2.protocol.common.Standard_SeqNum;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * Project: DzFutures
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-8-29 14:04
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Component
public class SMSCommSerivce {
	private int CLIENTID = 9035;                // 程序ID
	private String LOGINNAME = "9035";          // 用户名
	private String PASSWORD = "9035";           // 密码
	private String SERVERIP = "58.246.39.26";   // 服务器IP
	private int SERVERPORT = 6004;              // 服务器端口

	private static ActiveSubmitSender activeSubmitSender;

	@PostConstruct
	public void init() {
		MsgConstant.clientId = CLIENTID;
		MsgConstant.loginName = LOGINNAME;
		MsgConstant.password = PASSWORD;
		MsgConstant.serverIp = SERVERIP;
		MsgConstant.serverPort = SERVERPORT;

		/*
		 * 以下参数必须，默认值即可，如修改请慎重
		 */
		MsgConstant.connectNum = 2; // 连接数,建议填写2，不需修改
		MsgConstant.inBufferSize = 1024;
		MsgConstant.outBufferSize = 1024;
		MsgConstant.IdleTime = 10; // 心跳间隔时间
		MsgConstant.controlWindowsSize = 16; // 滑动窗口（条）
		MsgConstant.maxSendTime = 3; // 最大重发次数
		MsgConstant.clearTimeOut = 10000;// 滑动窗口清理时间，单位是ms
		MsgConstant.clearSleepTime = 10000; // 线程休眠时间，单位是ms
		MsgConstant.reconnectTime = 3000; // 失败重连接时间，单位是ms
		MsgConstant.reSend = false; // 是否重发，true是重发，false不重发,建议关闭重发！！！


		// 启动客户端将实例化的参数传递给客户端引擎
//		ClientEngine client = new ClientEngine(new RespReceiver(),
//				new ReportReceiver(), new DeliverReceiver());
//		System.out.println("启动短信引擎......");
//		client.start();
//		System.out.println("短信引擎启动完成......");

		// 初始化主动发送器
		activeSubmitSender = new ActiveSubmitSender();
	}

	public void sendSms(String mobile, String content) {
		int productID = 0;
		long seqid = Standard_SeqNum.computeSeqNoErr(2);
		try {
			// 实例化短信对象
			CbipSubmit smsSubmit = getSmsInstance(mobile, content, productID, seqid);
			// 发送短信
			activeSubmitSender.sendSubmit(smsSubmit);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	private CbipSubmit getSmsInstance(String mobile, String content,
	                                  int prcid, long seqid) throws Exception {
		// 创建短信对象
		CbipSubmit smsSubmit = new CbipSubmit();
		// 提交流水号,即短信序列号,自定义，不要超过18位
		smsSubmit.setClientSeq(seqid);
		// smsSubmit.setClientSeq(-1000000000123456789L);
		// 子号，默认填写"",即不允许扩展
		smsSubmit.setSrcNumber("");
		// 优先级，默认填写1
		smsSubmit.setMessagePriority((byte) 1);
		// 是否需要状态报告 0 不需要 1 需要
		smsSubmit.setReportType((short) 1);

		System.out.println("===短信长度===" + content.length());
		// 下发消息格式 15 普通短信 32 长短信
		// 现在默认用32，由平台根据通道判断
		if (content.length() > 70) {
			smsSubmit.setMessageFormat((byte) 32);
			System.out.println("===设置为32===");
		} else {
			smsSubmit.setMessageFormat((byte) 32);
			System.out.println("===设置为15===");
		}

		// 产品编号，即通道组编号
		smsSubmit.setProductID(prcid);
		// 如果手机号码组包个数超出限制(100以内)，可能抛出异常
		smsSubmit.setDestMobiles(mobile);
		// 如果短信内容超出长度限制(1000字以内)，可能抛出异常
		smsSubmit.setContentString(content);
		// 扩展字段内容
		smsSubmit.setCustomString("");
		// 短信签名，默认不起作用
		smsSubmit.setSignString("");
		return smsSubmit;
	}
}

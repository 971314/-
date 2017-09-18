package com.pobo.service;

import com.esms.MessageData;
import com.esms.PostMsg;
import com.esms.common.entity.Account;
import com.esms.common.entity.GsmsResponse;
import com.esms.common.entity.MTPack;
import com.pobo.bean.PropertyConfigurer;
import com.pobo.cache.CacheKey;
import com.pobo.cache.SessionCacheManager;
import com.pobo.util.HttpPostRequestUtil;
import com.pobo.util.XySmsUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-7-19 11:24
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class GmSmsService {
	//private static Account ac;
	//private static PostMsg pm = new PostMsg();
	protected static Logger logger = LoggerFactory.getLogger(GmSmsService.class);
	private static final String SMSUSERNAME ="slqh"; //PropertyConfigurer.getProperty("sms.username");
	private static final String SMSPASSWORD ="xyqh123"; //PropertyConfigurer.getProperty("sms.password");
	private static final String SMSSERVICEURL ="http://api.sms1086.com/Api/Send.aspx"; //PropertyConfigurer.getProperty("sms.serviceurl");
	private static final String SMSSIGNATURE ="兴业期货"; //PropertyConfigurer.getProperty("sms.signature");
	//static {
	//	String acc = PropertyConfigurer.getProperty("sms.account");
	//	String pwd = PropertyConfigurer.getProperty("sms.pwd");
	//	ac = new Account(acc, pwd);
	//	String smsIp = PropertyConfigurer.getProperty("sms.ip");
	//	int cmPort = Integer.parseInt(PropertyConfigurer.getProperty("sms.cmport"));
	//	int wsPort = Integer.parseInt(PropertyConfigurer.getProperty("sms.wsport"));
	//	pm.getCmHost().setHost(smsIp, cmPort);//设置网关的IP和port，用于发送信息，建议可配
	//	pm.getWsHost().setHost(smsIp, wsPort);//设置网关的IP和port，用于获取账号信息、上行、状态报告等等，建议可配
	//}

	public static String sendSmsCaptcha(String phone) throws Exception {
		// 生成验证码
		String captcha = genSmsCaptcha();
		// 发送
		doSendSms(phone, captcha);
		return captcha;
	}

	public static boolean checkSmsCaptcha(String token, String captcha) {
		if (!SessionCacheManager.getInstance().isExist(token, CacheKey.GM_ESMS_CAPTCHA)) {
			return false;
		} else {
			String expectCaptcha = (String) SessionCacheManager.getInstance().get(token, CacheKey.GM_ESMS_CAPTCHA);
			return captcha.equals(expectCaptcha);
		}
	}

	private static void doSendSms(String phone, String captcha) throws Exception {
		//MTPack pack = new MTPack();
		//pack.setBatchID(UUID.randomUUID());
		//pack.setBatchName("短信验证码");
		//pack.setMsgType(MTPack.MsgType.SMS);
		//pack.setBizType(0);
		//pack.setDistinctFlag(false);
		//ArrayList<MessageData> msgs = new ArrayList<>();
		//pack.setSendType(MTPack.SendType.MASS);
		String content = "尊敬的客户您好：您的验证码为" + captcha + "，该验证码有效时间为120秒，过期请重新验证！【"+SMSSIGNATURE+"】";
		String timestamp = XySmsUtil.getFormatedDateString(8);
		String tmpPassWord = XySmsUtil.MD5(SMSPASSWORD + timestamp);
		//msgs.add(new MessageData(phone, content));
		//pack.setMsgs(msgs);
		//GsmsResponse resp = pm.post(ac, pack);
		//System.out.println(resp);
		Map map=new HashMap();
		map.put("username", SMSUSERNAME);//必填
		map.put("password",tmpPassWord);//必填
		map.put("content", content);//必填,前面是签名
		map.put("mobiles", phone);//必填
		map.put("timestamp", timestamp);//必填
		map.put("f", "1");
		logger.info("content:"+content);
		String postResult;
		int attemptCount=0;
		while(attemptCount<3)
		{
			postResult=XySmsUtil.sendPost(SMSSERVICEURL, map,"GBK");
			postResult=URLDecoder.decode(postResult,"GBK");
			String[] resultArray=postResult.split("&");
			map.clear();
			for(String r:resultArray)
			{
				if(r.contains("="))
				{
					String[] keyValue=r.split("=");
					if(keyValue.length==2)
					map.put(keyValue[0], keyValue[1]);
				}
			}
			if(map.containsKey("result")&&map.containsKey("description"))
			{
				if("0".equals(map.get("result")))
				{
					attemptCount=3;
					logger.info(map.get("description").toString());
				}
				else
				{
					attemptCount++;
					logger.info(map.get("description").toString());
					Thread.sleep(1000);
				}
			}
		}
	}


	/**
	 * 生成短信验证码，短信验证码采用 6 位数字
	 *
	 * @return 返回随机生成的 6位数字
	 */
	private static String genSmsCaptcha() {
		Random random = new Random();
		int captcha = random.nextInt(999999) % (999999 - 100000 + 1) + 100000;
		return String.valueOf(captcha);
	}
}

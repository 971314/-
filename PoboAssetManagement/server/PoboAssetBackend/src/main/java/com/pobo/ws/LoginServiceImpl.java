package com.pobo.ws;

import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Project: PoboAssetBackgroundSys
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/27 9:57
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Service(value = "loginService")
public class LoginServiceImpl implements LoginService {

	// 暂用，之后需删除
	private static Map loginTemp(String poboNumber, String loginName, String loginType, String pwd,
	                             String devicdId, String OS, String version, String orgNumber) {
		return null;
	}

	// 暂用，之后需删除
	private static Map registerTemp(String poboNumber, String loginName,
	                                String loginType, String devicdId, String pwd,
	                                String FatherAccount, String OS, String version, String orgNumber) {
		return null;
	}

	@Override
	public Map newLogin(String poboNumber, String loginName, String loginType, String pwd,
	                    String devicdId, String OS, String version, String orgNumber) {
		return null;

	}

	@Override
	public Map tokenLogin(String poboNumber, String uid, String deviceId,
	                      String OS, String vsersion, String token, String address, String orgNumber) {
		return null;
	}

	@Override
	public Map updateToken(String loginName, String uid, String oldToken) {

		return null;
	}

}

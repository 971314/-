package com.pobo.model;

import com.pobo.bean.PropertyConfigurer;
import com.pobo.cc.ca.poboPack;
import com.pobo.cc.work.Jpobocclong;
import com.pobo.exception.AmException;
import com.pobo.httpservice.HTTPCommService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-8-15 16:43
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Component
public class PoboAuthAction {
	@Autowired
	public static HTTPCommService httpService;

	protected Logger logger = LoggerFactory.getLogger(getClass());

	private
	@Value("${auth.default.deviceid}")
	static String DEV_ID = "127.0.0.1";

	private
	@Value("${auth.default.os}")
	static String OS = "iOS";

	private
	@Value("${auth.url}")
	String keepUrl = "61.172.197.214";

	private
	@Value("${auth.port}")
	String keepPort = "6001";

	private static String libPobo_oAuthLib_dir = PropertyConfigurer.getProperty("libPobo_oAuthLib.dir");

	private static Jpobocclong j = null;

	@PostConstruct
	public void init() {
		try {
			if (j == null) {
				logger.info("云认证启动..." + keepUrl + ":" + keepPort);
				j = new Jpobocclong(keepUrl, Integer.valueOf(keepPort), libPobo_oAuthLib_dir);
				j.init_longLinkFig();
				logger.info("云认证启动完成！");
			}

			if (httpService == null) {
				httpService = new HTTPCommService();
			}
		} catch (Exception e) {
			logger.error("云认证初始化失败！", e);
			e.printStackTrace();
		}
	}

	/**
	 * 客户端以用户名和密码登录，获取 Token
	 *
	 * @param poboNumber 应用程序编号	N(10) 澎博认证中心统一分配的程序编号
	 * @param loginName  登录名 V(32)
	 * @param loginType  登录名类型 N(2)
	 * @param pwd        密码 V(20)
	 * @param deviceId   设备 ID V(32) 手机等移动端需要传递UUID
	 * @param os         操作系统 V(20)
	 * @param version    软件版本信息
	 * @param orgNumber  机构编码 N(10)
	 * @return 返回 Map<String, String>
	 */
//	public Map<String, String> login(String poboNumber, String loginName,
//	                                 String loginType, String pwd,
//	                                 String deviceId, String os,
//	                                 String version, String orgNumber) {
//		logger.info("protocol_4: poboNumber=[{}], loginName=[{}], loginType=[{}], pwd=[{}], " +
//						"deviceId=[{}], os=[{}], version=[{}], orgNumber=[{}]",
//				poboNumber, loginName, this.loginType, pwd, deviceId, os, version, this.orgNumber);
//		poboPack pack = null;
//
//		try {
//			/* Socket request */
//			pack = j.protocol_4(poboNumber, loginName, this.loginType, pwd, null,
//					deviceId, null, null, os, version, this.orgNumber);
//		} catch (Exception e) {
//			throw new AmException("云认证网络错误");
//		}
//
//		HashMap<String, String> map = new HashMap<>();
//		if (null == pack) {
//			// if socket failure, try http
//			logger.error("云认证 Socket 返回为 null");
//		} else {
//			if ("0".equals(pack.GetString(1))) {
//				map.put("retCode", pack.GetString(1));
//				map.put("returnFlag", pack.GetString(1));
//				map.put("loginName", pack.GetString(2));
//				map.put("userId", pack.GetString(3));
//				map.put("account", pack.GetString(3));
//				map.put("parentId", pack.GetString(4));
//				map.put("token", pack.GetString(5));
//				map.put("tokenBeginTime", pack.GetString(6));
//				map.put("tokenActiveTime", pack.GetString(7));
//			} else {
//				map.put("retCode", pack.GetString(1));
//				map.put("desc", pack.GetString(2));
//			}
//		}
//		logger.info("云认证返回：[{}]", map);
//		return map;
//	}

	/**
	 * 客户端令牌校验(令牌登陆)
	 * 使用用户名+SSO令牌，校验SSO令牌有效性（本协议可以包含在第三方的通讯协议中）
	 *
	 * @param poboNumber  应用程序编号	N(10) 澎博认证中心统一分配的程序编号
	 * @param userId      用户 ID N(20)
	 * @param deviceId    设备 ID V(32) 手机等移动端需要传递UUID
	 * @param os          操作系统 V(20)
	 * @param version     软件版本信息
	 * @param token       SSO 令牌 S
	 * @param destination 期望访问地址 V(256) 令牌校验时期望访问的地址
	 * @param orgNumber   机构编码 N(10)
	 * @return 返回 Map<String, String>
	 */
//	public Map<String, String> tokenLogin(String poboNumber, String userId, String deviceId,
//	                                      String os, String version, String token,
//	                                      String destination, String orgNumber) {
//		logger.info("protocol_6: poboNumber=[{}], userId=[{}], deviceId=[{}], os=[{}], " +
//						"version=[{}], token=[{}], destination=[{}], orgNumber=[{}]",
//				poboNumber, userId, deviceId, os, version, token, destination, this.orgNumber);
//		poboPack pack = null;
//		try {
//			pack = j.protocol_6(poboNumber, userId, deviceId, os, version, token, destination, this.orgNumber);
//		} catch (Exception e) {
//			throw new AmException("云认证网络错误");
//		}
//
//		HashMap<String, String> map = new HashMap<>();
//		if (null == pack) {
//			// if socket failure, try http
//			logger.error("云认证 Socket 返回为 null");
//		} else {
//			if ("0".equals(pack.GetString(1))) {
//				map.put("retCode", pack.GetString(1));
//				map.put("returnFlag", pack.GetString(1));
//				map.put("loginName", pack.GetString(2));
//				map.put("account", pack.GetString(3));
//				map.put("userId", pack.GetString(3));
//				map.put("destination", pack.GetString(4));
//			} else {
//				map.put("retCode", pack.GetString(1));
//				map.put("desc", pack.GetString(2));
//			}
//		}
//		logger.info("云认证返回：[{}]", map);
//		return map;
//	}

	/**
	 * 用户使用手机号/邮箱注册/用户名注册
	 *
	 * @param poboNumber 应用程序编号	N(10) 澎博认证中心统一分配的程序编号
	 * @param loginName  登录名 V(32)
	 * @param loginType  登录名类型 N(2)
	 * @param deviceId   设备 ID V(32) 手机等移动端需要传递UUID
	 * @param os         操作系统 V(20)
	 * @param version    软件版本信息
	 * @param orgNumber  机构编码 N(10)
	 * @return 返回 Map<String, String>
	 */
//	public Map<String, String> register(String poboNumber, String loginName,
//	                                    String loginType, String deviceId,
//	                                    String os, String version, String orgNumber) {
//		logger.info("protocol_8: poboNumber=[{}], loginName=[{}], loginType=[{}], deviceId=[{}], " +
//						"os=[{}], version=[{}], orgNumber=[{}]",
//				poboNumber, loginName, this.loginType, deviceId, os, version, this.orgNumber);
//		poboPack pack = null;
//		try {
//			pack = j.protocol_8(poboNumber, loginName, this.loginType, deviceId,
//					null, null, os, version, this.orgNumber);
//		} catch (Exception e) {
//			throw new AmException("云认证网络错误");
//		}
//
//		HashMap<String, String> map = new HashMap<>();
//		if (null == pack) {
//			// if socket failure, try http
//			logger.error("云认证 Socket 返回为 null");
//		} else {
//			if ("0".equals(pack.GetString(1))) {
//				map.put("retCode", pack.GetString(1));
//				map.put("returnFlag", pack.GetString(1));
//				map.put("loginName", pack.GetString(2));
//			} else {
//				map.put("retCode", pack.GetString(1));
//				map.put("desc", pack.GetString(2));
//			}
//		}
//		logger.info("云认证返回：[{}]", map);
//		return map;
//	}

	/**
	 * 校验注册验证码，用户使用手机号（只针对手机号码）
	 *
	 * @param poboNumber 应用程序编号	N(10) 澎博认证中心统一分配的程序编号
	 * @param loginName  登录名 V(32)
	 * @param loginType  登录名类型 N(2)
	 * @param captcha    验证码 N(8)
	 * @param deviceId   设备 ID V(32) 手机等移动端需要传递UUID
	 * @return 返回 Map<String, String>
	 */
//	public Map<String, String> checkSmsCapthca(String poboNumber, String loginName,
//	                                           String loginType, String captcha,
//	                                           String deviceId, String userId, String orgNumber) {
//		logger.info("protocol_9: poboNumber=[{}], loginName=[{}], loginType=[{}], captcha=[{}], " +
//				"deviceId=[{}], userId=[{}], orgNumber=[{}]", poboNumber, loginName, this.loginType, captcha, deviceId, userId, this.orgNumber);
//		poboPack pack = null;
//		try {
//			pack = j.protocol_9(poboNumber, loginName, this.loginType, captcha, deviceId, userId, this.orgNumber);
//		} catch (Exception e) {
//			throw new AmException("云认证网络错误");
//		}
//
//		HashMap<String, String> map = new HashMap<>();
//		if (null == pack) {
//			// if socket failure, try http
//			logger.error("云认证 Socket 返回为 null");
//		} else {
//			if ("0".equals(pack.GetString(1))) {
//				map.put("retCode", pack.GetString(1));
//				map.put("returnFlag", pack.GetString(1));
//				map.put("account", pack.GetString(2));
//				map.put("userId", pack.GetString(2));
//				map.put("token", pack.GetString(3));
//			} else {
//				map.put("retCode", pack.GetString(1));
//				map.put("desc", pack.GetString(2));
//			}
//		}
//		logger.info("云认证返回：[{}]", map);
//		return map;
//	}

	/**
	 * 用户修改密码
	 *
	 * @param poboNumber 应用程序编号	N(10) 澎博认证中心统一分配的程序编号
	 * @param loginName  登录名 V(32)
	 * @param loginType  登录名类型 N(2)
	 * @param token      SSO 令牌 S
	 * @param oldPwd     原密码 V(20)
	 * @param newPwd     新密码 V(20)
	 * @param userId     用户 ID N(20)
	 * @return 返回 Map<String, String>
	 */
//	public Map<String, String> updatePassword(String poboNumber, String loginName,
//	                                          String loginType, String token, String oldPwd,
//	                                          String newPwd, String userId) {
//		logger.info("protocol_10: poboNumber=[{}], loginName=[{}], loginType=[{}], token=[{}], " +
//						"oldPwd=[{}], newPwd=[{}], userId=[{}]",
//				poboNumber, loginName, this.loginType, token, oldPwd, newPwd, userId);
//		poboPack pack = null;
//		try {
//			pack = j.protocol_10(poboNumber, loginName, this.loginType, token, oldPwd, newPwd, userId, this.orgNumber);
//		} catch (Exception e) {
//			throw new AmException("云认证网络错误");
//		}
//
//		HashMap<String, String> map = new HashMap<>();
//		if (null == pack) {
//			// if socket failure, try http
//			logger.error("云认证 Socket 返回为 null");
//		} else {
//			if ("0".equals(pack.GetString(1))) {
//				map.put("retCode", pack.GetString(1));
//				map.put("returnFlag", pack.GetString(1));
//				map.put("account", pack.GetString(2));
//				map.put("userId", pack.GetString(2));
//			} else {
//				map.put("retCode", pack.GetString(1));
//				map.put("desc", pack.GetString(2));
//			}
//		}
//		logger.info("云认证返回：[{}]", map);
//		return map;
//	}

	/**
	 * 据用户名称查询绑定信息, 找回绑定信息
	 *
	 * @param poboNumber 应用程序编号	N(10) 澎博认证中心统一分配的程序编号
	 * @param loginName  登录名 V(32)
	 * @param loginType  登录名类型 N(2)
	 * @param deviceId   设备 ID V(32) 手机等移动端需要传递UUID
	 * @return 返回 Map<String, String>
	 */
//	public Map<String, String> queryUserInfo(String poboNumber, String loginName,
//	                                         String loginType, String deviceId) {
//		logger.info("protocol_12: poboNumber=[{}], loginName=[{}], loginType=[{}], deviceId=[{}]",
//				poboNumber, loginName, loginType, deviceId);
//		poboPack pack = null;
//		try {
//			pack = j.protocol_12(poboNumber, loginName, loginType, deviceId, this.orgNumber);
//		} catch (Exception e) {
//			throw new AmException("云认证网络错误");
//		}
//
//		HashMap<String, String> map = new HashMap<>();
//		if (null == pack) {
//			// if socket failure, try http
//			logger.error("云认证 Socket 返回为 null");
//		} else {
//			if ("0".equals(pack.GetString(1))) {
//				map.put("retCode", pack.GetString(1));
//				map.put("returnFlag", pack.GetString(1));
//				map.put("userId", pack.GetString(2));
//				map.put("phone", pack.GetString(3));
//				map.put("email", pack.GetString(4));
//			} else {
//				map.put("retCode", pack.GetString(1));
//				map.put("desc", pack.GetString(2));
//			}
//		}
//		logger.info("云认证返回：[{}]", map);
//		return map;
//	}

	/**
	 * 获取手机验证码找回密码，发送手机短信，供找回密码使用
	 *
	 * @param poboNumber 应用程序编号	N(10) 澎博认证中心统一分配的程序编号
	 * @param userId     用户 ID N(20)
	 * @param phone      手机号码 C(11)
	 * @param deviceId   设备 ID V(32) 手机等移动端需要传递UUID
	 * @return 返回 Map<String, String>
	 */
//	public Map<String, String> sendSmsForfindPassword(String poboNumber, String userId,
//	                                                  String phone, String deviceId) {
//		logger.info("protocol_13: poboNumber=[{}], userId=[{}], phone=[{}], deviceId=[{}]",
//				poboNumber, userId, phone, deviceId);
//		poboPack pack = null;
//		try {
//			pack = j.protocol_13(poboNumber, userId, phone, deviceId, this.orgNumber, this.loginType);
//		} catch (Exception e) {
//			throw new AmException("云认证网络错误");
//		}
//
//		HashMap<String, String> map = new HashMap<>();
//		if (null == pack) {
//			// if socket failure, try http
//			logger.error("云认证 Socket 返回为 null");
//		} else {
//			if ("0".equals(pack.GetString(1))) {
//				map.put("retCode", pack.GetString(1));
//				map.put("returnFlag", pack.GetString(1));
//				map.put("userId", pack.GetString(2));
//				map.put("account", pack.GetString(2));
//			} else {
//				map.put("retCode", pack.GetString(1));
//				map.put("desc", pack.GetString(2));
//			}
//		}
//		logger.info("云认证返回：[{}]", map);
//		return map;
//	}


	/**************************** 云认证 *****************************/
	/**
	 * 根据用户 ID 与 Token, 通过认证
	 *
	 * @param uid 用户 ID
	 * @param sid SSO 令牌
	 * @return 返回 boolean
	 */
	public boolean checkToken(String uid, String sid) {
		poboPack pack = null;
		try {
			pack = j.protocol_6(null, uid, DEV_ID, OS, null, sid, null, null);
		} catch (Exception e) {
			e.printStackTrace();
		}

		boolean flag = true;
		if (null == pack) {
			// if socket failure, try http
			logger.error("云认证 Socket 返回为 null");
		} else {
			flag = "0".equals(pack.GetString(1));
		}
		return flag;
	}

//	public static void main(String[] args) throws IOException {
//		Scanner scanner = new Scanner(System.in);
//		PoboAuthAction poboAuth = new PoboAuthAction();
//		poboAuth.httpService = new HTTPCommService();
//		poboAuth.init();
//
//		//String token = poboAuth.getToken("18621542135", "wwc6561331");
//		String userName = "18621542135";
//		String userType = "1";
//		String pwd = "wwc6561331";
//		Map<String, String> ret0 = poboAuth.login("1", userName, userType, pwd, DEV_ID, OS, "1.0.0", "789");
//
//		String token = ret0.get("token");
//		String account = ret0.get("account");
//
//		boolean ret9 = poboAuth.checkToken(account, token);
//
//		Map<String, String> ret1 = poboAuth.register(null, userName, userType, DEV_ID, OS, null, null);
//
//		String captcha = scanner.nextLine();
//
//		Map<String, String> ret2 = poboAuth.checkSmsCapthca(null, userName, userType, captcha, null, null, "1");
//		String userId = ret2.get("userId");
//		//String token = ret2.get("token");
//
//		Map<String, String> ret3 = poboAuth.updatePassword(null, userName, userType, token, "", "123456", userId);
//
//		System.out.println(token);
//	}
}

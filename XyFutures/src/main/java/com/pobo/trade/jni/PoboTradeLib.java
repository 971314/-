package com.pobo.trade.jni;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/7/4 18:40
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class PoboTradeLib {

	static {
		// 调用文件名为JNI libPobo_TradeLib.dll的动态库
		System.loadLibrary("libPobo_TradeLib");
	}

	/**
	 * @param Param pszConfigFile 配置文件地址
	 * @return Int returnFlag 0为成功
	 */
	native public static String InitLib(String Param);

	/**
	 * @param Param
	 * @return Int returnFlag 0为成功
	 */
	native public static String ReleaseLib(String Param);

	/**
	 * @param Param serNo 内存中唯一的编号
	 *              long userId 交易号ID
	 * @return int returnFlag 0为成功
	 * long pInterface 服务端产生的唯一编号
	 */
	native public static String CreateUserExt(String Param);

	/**
	 * @param Param serNo 内存中唯一的编号
	 *              long userId 交易号ID
	 *              long pInterface 服务端产生的唯一编号
	 * @return int returnFlag 0为成功
	 */
	native public static String CloseUserExt(String Param);

	/**
	 * @param Param serNo 内存中唯一的编号
	 *              long userId 交易号ID
	 *              long pInterface 服务端产生的唯一编号
	 *              String  request  请求
	 *              Int requestSize 请求大小
	 * @return int returnFlag 0为成功
	 * String out 返回结果
	 * Int outLen 返回结果大小
	 */
	native public static String TranslateRequest(String Param);

	/**
	 * @param Param serNo 内存中唯一的编号
	 *              long userId 交易号ID
	 *              long pInterface 服务端产生的唯一编号
	 *              String  request  请求
	 *              Int requestSize 请求大小
	 * @return int returnFlag 0为成功
	 * String out 返回结果
	 * Int outLen 返回结果大小
	 */
	native public static String Idle_Step(String Param);

	/**
	 * 密码加密 native 方法，调用了 libPobo_EncryptLib.dll
	 *
	 * @param data 需要加密的字符串
	 * @param Key  密钥，用于加密处理
	 * @return 返回加密后的字符串
	 */
	native public static String DesSetPwd(String data, String Key);
}

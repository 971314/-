package com.pobo.exception;

import com.pobo.constant.ErrorCode;

/**
 * Project: PoboAssetBackgroundSys
 * Comments: 应用自定义异常类
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-10-24 13:32
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class AmException extends RuntimeException {
	private int errCode;

	public AmException() {}

	/**
	 * 异常类方法，提供自定义错误信息，返回统一的错误码 0
	 *
	 * @param errDecs 自定义错误信息
	 */
	public AmException(String errDecs) {
		super(errDecs);
		this.errCode = 0;
	}

	/**
	 * 异常类方法，提供错误码和错误信息，由错误码表中错误信息与自定义错误信息拼接而成
	 *
	 * @param errCode 错误码
	 * @param errDecs 自定义错误信息
	 */
	public AmException(int errCode, String errDecs) {
		super(ErrorCode.getDesc(errCode) + errDecs);
		this.errCode = errCode;
	}

	/**
	 * 异常类主方法，提供错误码，返回错误信息
	 *
	 * @param errCode 错误码
	 */
	public AmException(int errCode) {
		super(ErrorCode.getDesc(errCode));
		this.errCode = errCode;
	}
}

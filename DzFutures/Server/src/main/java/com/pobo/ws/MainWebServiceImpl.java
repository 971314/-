package com.pobo.ws;

import com.pobo.controller.AuthController;
import com.pobo.controller.CaptchaController;
import com.pobo.controller.CrmController;
import com.pobo.exception.DzException;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Project: DzFutures
 * Comments: Web Service 主入口
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/27 9:57
 * Version: <版本号>
 * *************************************
 * Modified By: Wang Wenchao
 * Modified Date：2016-06-14
 * Reason：增加注释
 * Version：<版本号>
 */

@Service(value = "mainService")
public class MainWebServiceImpl implements MainWebService {

	protected Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private CrmController crmController;

	@Autowired
	private CaptchaController captchaController;

	@Autowired
	private AuthController authController;

	/**
	 * WebService 主入口，WebService 服务，除了部分验证码服务等以外，都
	 * 是以此为入口处理。入口对应 URL 为 http://host:port/<Project>
	 * 作为程序需要，方法传入参数需带有 request 请求，以获取 session 等信息；以及
	 * 前端传入参数 data，data 原生格式为 Json，此处映射为 WsRequest 实例
	 *
	 * @param httpRequest  HttpServletRequest 请求，用于获取 Http 请求的
	 * @param httpResponse HttpServletResponse，返回数据
	 * @param data         WsRequest 实例, 前端传入参数
	 * @return 返回前端 WsResponse 实例，并转化为 Json 字符串
	 */
	public WsResponse doWebService(HttpServletRequest httpRequest, HttpServletResponse httpResponse, WsRequest data) {
		/* 获取功能码 func 和请求类型 type */
		int func = data.getFunc();
		int type = data.getType();

		/* 新建返回的 WsResponse 实例 */
		WsResponse response = new WsResponse(func, type);

		/* 根据功能码和请求类型确定服务 */
		try {
			if (type == 0) {
			/* 仅 WS 服务 */
				if (func == 1012) {
					captchaController.genSmsCaptcha(httpRequest, data, response);
				} else if (func == 1024) {
					authController.login(httpRequest, data, response);
				} else if (func == 1028) {
					authController.register(httpRequest, data, response);
				} else if (func == 1029) {
					authController.checkSmsCaptcha(httpRequest, data, response);
				} else if (func == 1030) {
					authController.resetPwdAndLogin(httpRequest, data, response);
				} else if (func == 1031) {
					authController.updatePwdAndLogin(httpRequest, data, response);
				} else if (func == 1032) {
					authController.sendSmsForfindPassword(httpRequest, data, response);
				}
			} else if (type == 1) {
			/* 交易相关 */
				if (func == 1012) {
					captchaController.genSmsCaptcha(httpRequest, data, response);
				} else if (func == 1013) {
					captchaController.checkSmsCaptcha(httpRequest, data, response);
				}
			} else if (type == 2) {
			/* CRM 相关 */
				if (func == 2101) {
					crmController.cutsomerRegister(httpRequest, data, response);
				} else if (func == 2102) {
					crmController.brokerRegister(httpRequest, data, response);
				} else if (func == 2103) {
					crmController.advisorRegister(httpRequest, data, response);
				} else if (func == 2104) {
					crmController.referrerBinding(httpRequest, data, response);
				} else if (func == 2105) {
					crmController.queryBroker(httpRequest, data, response);
				} else if (func == 2106) {
					crmController.queryAdvisor(httpRequest, data, response);
				} else if (func == 2107) {
					crmController.queryUserInfo(httpRequest, data, response);
				}
			} else {
				throw new DzException("错误的功能码 " + func);
			}
		} catch (DzException err) {
			logger.error(err.getMessage(), err);
			return response.setError(err.getMessage());
		}

		return response;
	}
}

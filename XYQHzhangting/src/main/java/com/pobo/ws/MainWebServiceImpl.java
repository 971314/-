package com.pobo.ws;

import com.pobo.controller.*;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.util.CloneUtil;
import com.pobo.util.HttpServletRequestUtil;
import com.pobo.util.PasswordCoverUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Project: GmHall
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
	@Autowired
	private CapitalController capitalController;
	@Autowired
	private LoginController loginController;
	@Autowired
	private TradeController tradeController;
	@Autowired
	private UserController userController;
	@Autowired
	private WorkFlowController workFlowController;
	@Autowired
	private BankController bankController;
	@Autowired
	private CaptchaController captchaController;

	protected Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * WebService 主入口，WebService 服务，除了部分验证码服务等以外，都
	 * 是以此为入口处理。入口对应 URL 为 http://host:port/hall
	 * 作为程序需要，方法传入参数需带有 request 请求，以获取 session 等信息；以及
	 * 前端传入参数 data，data 原生格式为 Json，此处映射为 WsRequest 实例
	 *
	 * @param request HttpServletRequest 请求，用于获取 Http 请求的
	 * @param data    前端传入参数
	 * @return 返回前端 WsResponse 实例，并转化为 Json 字符串
	 * @see com.pobo.constant.FuncCode  功能码查询
	 * @see com.pobo.constant.RetCode   错误码查询
	 */
	public WsResponse doWebService(HttpServletRequest request, HttpServletResponse httpResponse, WsRequest data) {
		WsRequest tdata = CloneUtil.clone(data);
		if (PasswordCoverUtil.funcHasPwd.contains(tdata.getFunc())) {
			tdata = PasswordCoverUtil.coverPassword(tdata);
		}
		logger.info("####  前端请求数据: [{}]", tdata);
		logger.info("请求终端身份: [{}]", HttpServletRequestUtil.getClientIP(request));

		/* 获取功能码 func 和请求类型 type */
		int func = data.getFunc();
		int type = data.getType();

		/* 新建返回的 WsResponse 实例 */
		WsResponse response = new WsResponse(func, type);

		/* 处理异常功能码 */
		if (func == 0) {
			return response.setError(-101);
		}

		/* 根据功能码和请求类型确定服务 */
		if (type == 0) {
			/* 仅 WS 服务 */
			if (func == 1001) {
				loginController.preLogin(request, data, response);
			} else if (func == 1002) {
				loginController.isLogin(request, data, response);
			} else if (func == 1011) {
				captchaController.checkCaptcha(request, data, response);
			} else if (func == 1012) {
				captchaController.genSmsCaptcha(request, data, response);
			} else if (func == 1013) {
				captchaController.checkSmsCaptcha(request, data, response);
			} else if (func == 1099) {
				loginController.logout(request, data, response);
			} else {
				return response.setError(-102);
			}
		} else if (type == 1) {
			/* 交易相关 */
			if (func == 6011) {
				loginController.login(request, data, response);
			} else if (func == 6012) {
				capitalController.queryDayCapital(request, data, response);
			} else if (func == 6013) {
				tradeController.queryDayDeal(request, data, response);
			} else if (func == 6014) {
				tradeController.queryDayPosition(request, data, response);
			} else if (func == 6019) {
				tradeController.queryDayOrder(request, data, response);
			} else if (func == 6040) {
				tradeController.queryHolderAccount(request, data, response);
			} else if (func == 6023) {
				userController.updatePassword(request, data, response);
			} else if (func == 6200) {
				bankController.queryBankAccount(request, data, response);
			} else if (func == 6203) {
				bankController.queryBankRemain(request, data, response);
			} else if (func == 6201) {
				bankController.transFutureToBank(request, data, response);
			} else if (func == 6202) {
				bankController.transBankToFuture(request, data, response);
			} else if (func == 6205) {
				bankController.queryBankCashFlow(request, data, response);
			} else if (func == 6052) {
				tradeController.queryHistoryOrder(request, data, response);
			} else {
				return response.setError(-102);
			}
		} else if (type == 2) {
			/* CRM 相关 */
			if (func == 2001) {
				userController.getUserInfo(request, data, response);
			} else if (func == 2010) {
				userController.getLastLoginInfo(request, data, response);
			} else if (func == 2011) {
				userController.recordLastLoginInfo(request, data, response);
			} else if (func == 2101) {
				workFlowController.queryWorkFlows(request, data, response);
			} else if (func == 2110) {
				workFlowController.doUpdatePhoneNo(request, data, response);
			} else if (func == 2111) {
				workFlowController.doUpdateAddr(request, data, response);
			} else if (func == 2112) {
				workFlowController.doUpdateSystem(request, data, response);
			} else if (func == 2113) {
				workFlowController.doActiveAccount(request, data, response);
			} else if (func == 2114) {
				workFlowController.doUpdateIdDate(request, data, response);
			} else if (func == 2115) {
				workFlowController.doResetPassword(request, data, response);
			} else if (func == 2116) {
				workFlowController.checkActiveAccount(request, data, response);
			} else if (func == 2117) {
				workFlowController.checkResetPassword(request, data, response);
			} else if (func == 2130) {
				workFlowController.doCancelDepositLimit(request, data, response);
			} else if (func == 2131) {
				workFlowController.checkCancelDepositLimit(request, data, response);
			} else if (func == 3001) {
				capitalController.queryCapitalDetails(request, data, response);
			} else {
				return response.setError(-102);
			}
		} else {
			return response.setError(-103);
		}

		return response;
	}
}

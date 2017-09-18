package com.pobo.interceptor;

import com.pobo.cache.SessionCacheManager;
import com.pobo.cache.UserCacheManager;
import com.pobo.constant.RetCode;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import org.apache.logging.log4j.core.config.Order;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.xml.ws.WebServiceException;
import java.util.List;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/6/12 19:59
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Aspect
@Order(5)
@Component
public class ValidInterceptor {
	protected Logger logger = LoggerFactory.getLogger(getClass());

	@Pointcut("execution(public * com.pobo.controller..*(..)) && @annotation(com.pobo.interceptor.Validator)")
	private void doValidateAction() {
	}

	@Around("com.pobo.interceptor.ValidInterceptor.doValidateAction()")
	public WsResponse beforeValidAction(ProceedingJoinPoint pjp) {
		Object[] args = pjp.getArgs();

		if (args.length != 3) {
			logger.error("系统内参数传递错误");
			return new WsResponse(-104, "系统内参数传递错误");
		}

		HttpServletRequest request = (HttpServletRequest) args[0];
		WsRequest data = (WsRequest) args[1];
		WsResponse response = (WsResponse) args[2];

		/** 数据校验 **/
		List list = data.getData();
		// 校验有无 data
		if (list == null || list.isEmpty()) {
			return response.setError(-105);
		}

		// 校验有无 account
		String account = data.getAccount();
		if (account == null || account.isEmpty()) {
			return response.setError(-106);
		}

		// 校验 account 有无异常字符
		if (!account.matches("[0-9]{1,}")) {
			return response.setError(-109);
		}

		// 校验有无 token, token 为 uuid 编码
		String token = data.getToken();
		if (token == null || token.isEmpty()) {
			return response.setError(-107);
		}

		/** 登录状态校验 **/
		if (data.getFunc() != 6011) {
			// 6011 系为登录操作，不对 IS_LOGIN 标志位进行判断
			if (!UserCacheManager.getInstance().hasSession(account, token)) {
				return response.setError(-1001);
			}
		}

		/** 客户操作对其现有缓存数据进行时间戳的更新 **/
		// 更新用户时间戳
		UserCacheManager.getInstance().activeRefresh(account);
		// 更新会话时间戳
		SessionCacheManager.getInstance().activeRefresh(token);

		/** 执行 **/
		WsResponse value = new WsResponse(data.getFunc(), data.getType());
		try {
			value = (WsResponse) pjp.proceed();
		} catch (WebServiceException e) {
			logger.error(RetCode.getDesc(-13), e);
			return response.setError(-13);
		} catch (Throwable e) {
			logger.error(RetCode.getDesc(-12), e);
		}

		return value;
	}
}
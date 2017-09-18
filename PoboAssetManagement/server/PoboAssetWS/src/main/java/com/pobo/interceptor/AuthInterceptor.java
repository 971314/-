package com.pobo.interceptor;

import com.pobo.exception.AmException;
import com.pobo.model.PoboAuthAction;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-8-29 20:28
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Aspect
@Component
public class AuthInterceptor {
	@Autowired
	private PoboAuthAction poboAuth;

	@Pointcut("execution(* com.pobo.ws..*(..)) && @annotation(com.pobo.interceptor.AuthCheck)")
	private void checkAuthAction() {
	}

	/**
	 * 校验操作时的登录状态，若 token 未通过校验，则不允许进行下一步操作
	 * */
	@Around("checkAuthAction()")
	public WsResponse aroundCheckAuth(ProceedingJoinPoint pjp) {
		Object[] args = pjp.getArgs();

		WsRequest data;
		String uid;
		String sid;
		String loginName;
		String orgId;

		try {
			data = (WsRequest) args[1];
		} catch (Exception e) {
			throw new AmException(-11, e.getMessage());
		}

		/* 校验各类 id */
		uid = data.getUid();
		sid = data.getSid();
		loginName = data.getLoginname();
		orgId = data.getOrgid();

		if (uid == null || uid.equals("")
				|| sid == null || sid.equals("")
				|| loginName == null || loginName.equals("")
				|| orgId == null || orgId.equals("")) {
			throw new AmException(-101);
		}

		/* 校验 token */
		boolean expected = poboAuth.checkToken(uid, sid);
		if (!expected) {
			throw new AmException(-102);
		}

		WsResponse value;
		try {
			value = (WsResponse) pjp.proceed();
		} catch (Throwable e) {
			throw new AmException(-12, e.getMessage());
		}
		return value;
	}
}

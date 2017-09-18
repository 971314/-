package com.pobo.model.crm;

import com.apex.crm.wsclient.*;
import com.apex.livebos.client.lbdocument.LBDocumentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/11 19:14
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class CrmInfoLocal {

	private static ThreadLocal<CrmSessionInfo> threadLocal = new ThreadLocal<>();

	protected static Logger logger = LoggerFactory.getLogger(CrmInfoLocal.class);

	public static LoginResult loginCrm() {
		CrmSessionInfo sessionInfo = getSessionInfo();
		LoginResult result = sessionInfo.getResult();

		logger.debug("CRM 登录: result=[{}] message=[{}], sessionId=[{}]",
				result.getResult(), result.getMessage(), result.getSessionId());
		return result;
	}

	public static LogoutResult LogoutCrm() {
		if (hasSessionInfo()) {
			CrmSessionInfo sessionInfo = getSessionInfo();
			LBEBusinessService client = sessionInfo.getServiePort();
			LogoutResult result = client.logout(sessionInfo.getResult().getSessionId());

			logger.debug("CRM 登出: result=[{}] message=[{}], sessionId=[{}]",
					result.getResult(), result.getMessage(), getSessionId());
			threadLocal.set(null);
			return result;
		}
		return null;
	}

	// 获取 ThreadLocal 所存 CrmSessionInfo 的信息
	private static CrmSessionInfo getSessionInfo() {
		CrmSessionInfo sessionInfo = threadLocal.get();
		if (sessionInfo == null) {
			sessionInfo = new CrmSessionInfo();
			threadLocal.set(sessionInfo);
		}
		return sessionInfo;
	}

	private static boolean hasSessionInfo() {
		CrmSessionInfo sessionInfo = threadLocal.get();
		return sessionInfo != null;
	}

	public static LBEBusinessService getServicePort() {
		if (hasSessionInfo()) {
			return getSessionInfo().getServiePort();
		}
		return null;
	}

	public static LBDocumentService getServieDocumentPort() {
		if (hasSessionInfo()) {
			return getSessionInfo().getServieDocumentPort();
		}
		return null;
	}

	public static String getSessionId() {
		if (hasSessionInfo()) {
			return getSessionInfo().getResult().getSessionId();
		}
		return null;
	}

	// 输出查询结果
	public static void printQueryResult(QueryResult qrs) {
		logger.debug("CRM result message: [{}], count: [{}], hasMore: [{}], size: [{}]",
				qrs.getMessage(), qrs.getCount(), qrs.isHasMore(), qrs.getRecords().size());

		for (ColInfo colInfo : qrs.getMetaData().getColInfo()) {
			System.out.print(colInfo.getLabel() + "[" + colInfo.getName()
					+ "]\t");
		}
		System.out.println("\n===============================================================================");
		for (LbRecord record : qrs.getRecords()) {
			for (Object o : record.getValues()) {
				System.out.print(o + "\t");
			}
			System.out.println("");
		}
	}
}

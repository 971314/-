package com.pobo.model.crm;

import com.apex.crm.wsclient.LBEBusinessService;
import com.apex.crm.wsclient.LBEBusinessWebService;
import com.apex.crm.wsclient.LoginResult;
import com.apex.livebos.client.lbdocument.LBDocumentService;
import com.apex.livebos.client.lbdocument.LBDocumentWebService;
import com.pobo.bean.PropertyConfigurer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.namespace.QName;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/12 10:26
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class CrmSessionInfo {
	private LBEBusinessService serviePort;
	private LBDocumentService servieDocumentPort; // 文档附件处理端口

	private LoginResult result;

	private static final QName SERVICE_NAME = new QName(
			PropertyConfigurer.getProperty("crm.servicename"), "LBEBusinessWebService");
	private static final QName SERVICE_DOCUMENT_NAME = new QName(
			PropertyConfigurer.getProperty("crm.servicedocumentname"), "LBDocumentWebService");

	private static final String CRMUSERID = PropertyConfigurer.getProperty("crm.userid");
	private static final String CRMPASSWORD = PropertyConfigurer.getProperty("crm.pwd");
	private static final String CRMSCHEME = PropertyConfigurer.getProperty("crm.scheme");
	private static final String CRMALGORITHM = PropertyConfigurer.getProperty("crm.algo");
	private static final String CRMSECURITYCODE = PropertyConfigurer.getProperty("crm.secu");

	private static final String CRMSERVICEURL = PropertyConfigurer.getProperty("crm.serviceurl");
	private static final String CRMDOCUMENTSERVICEURL = PropertyConfigurer.getProperty("crm.documentserviceurl");

	protected Logger logger = LoggerFactory.getLogger(getClass());

	public CrmSessionInfo() {
		setServiePort();
		setServieDocumentPort();
		setResult();
	}

	public LBEBusinessService getServiePort() {
		return serviePort;
	}

	// 获取服务端口信息及登陆信息
	private void setServiePort() {
		if (serviePort == null) {
			LBEBusinessWebService service;
			URL wsdlURL = null;
			try {
				wsdlURL = new URL(CRMSERVICEURL);
			} catch (MalformedURLException e) {
				e.printStackTrace();
			}
			service = new LBEBusinessWebService(wsdlURL, SERVICE_NAME);
			serviePort = service.getLBEBusinessServiceImplPort();
		}
	}

	// 获取附件上传服务端口信息
	private void setServieDocumentPort() {
		if (servieDocumentPort == null) {
			LBDocumentWebService service;
			URL wsdlURL = null;
			try {
				wsdlURL = new URL(CRMDOCUMENTSERVICEURL);
			} catch (MalformedURLException e) {
				e.printStackTrace();
			}
			service = new LBDocumentWebService(wsdlURL, SERVICE_DOCUMENT_NAME);
			servieDocumentPort = service.getLBDocumentServiceImplPort();
		}
	}

	public LBDocumentService getServieDocumentPort() {
		return servieDocumentPort;
	}

	public LoginResult getResult() {
		return result;
	}

	private void setResult() {
		if (result == null) {
			logger.debug("CRM 登录账户信息: userid=[{}], password=[{}], scheme=[{}], algorithm=[{}], securityCode=[{}]",
					CRMUSERID, "******", CRMSCHEME, CRMALGORITHM, CRMSECURITYCODE);
			result = serviePort.login(CRMUSERID, CRMPASSWORD, CRMSCHEME, CRMALGORITHM, CRMSECURITYCODE);
		}
	}

}

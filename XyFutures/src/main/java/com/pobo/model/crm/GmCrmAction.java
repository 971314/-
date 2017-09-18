package com.pobo.model.crm;

import com.apex.crm.wsclient.*;
import com.apex.livebos.client.lbdocument.Document;
import com.apex.livebos.client.lbdocument.LBDocumentService;
import com.pobo.bean.PropertyConfigurer;
import com.pobo.util.HttpPostRequestUtil;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.activation.DataHandler;
import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/12 12:41
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Component
public class GmCrmAction {
	protected Logger logger = LoggerFactory.getLogger(getClass());
	private static final String CRMUSERNAME = PropertyConfigurer.getProperty("dscrm.username");
	private static final String CRMPASSWORD = PropertyConfigurer.getProperty("dscrm.password");
	private static final String CRMSERVICEURL = PropertyConfigurer.getProperty("dscrm.serviceurl");
	private @Value("${crm.uid}") String UID = "857";
	
	//crm登录
		//{"body":{"sessionId":"DFB04B6D5DE04DACC35A5BE3D0F157B8"},"head":{"message":"登录成功!","code":"0"}}
		private boolean crmLogin()
		{
			Map<String,String> map=new HashMap<String,String>();
			map.put("username", CRMUSERNAME);
			map.put("password", CRMPASSWORD);
			String jsonStr=JSONObject.fromObject(map).toString();
			map.clear();
			map.put("service", "login");
			map.put("json", jsonStr);
			String postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			jsonStr=null;
			map=null;
			JSONObject jo=JSONObject.fromObject(postResult);
			if("0".equals(((JSONObject)jo.get("head")).get("code")))
			{
				logger.info("CRM 登录成功");
				HttpPostRequestUtil.JSESSIONID=((JSONObject)jo.get("body")).get("sessionId").toString();
				jo=null;
				return true;
			}
			else
			{
				jo=null;
				logger.info("CRM 登录失败  "+postResult);
				return false;
			}
		}

		// 获取客户信息
		public String getKhxx(String account) {
			if (account == null)
			{
				return null;
			}
			logger.info("CRM 获取客户信息: KHH=[{}], SJ=[{}]", account, "");
			Map map=new HashMap();
			map.put("KHH", account);
			map.put("SJ", "");
			String jsonStr=JSONObject.fromObject(map).toString();
			map.clear();
			map.put("service", "app.407");
			map.put("json", jsonStr);
			String postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			JSONObject jo=JSONObject.fromObject(postResult);
			if("999".equals(((JSONObject)jo.get("head")).get("code")))
			{
				crmLogin();
				postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			}
			jsonStr=null;
			map=null;
			return postResult;
		}

	// 获取客户流程办理进度
	public String getKhlcjd(String account, String startDate, String endDate, String type) {
		if (account == null)
			return null;
		if (startDate == null)
			startDate = "";
		if (endDate == null)
			endDate = "";
		if (type == null)
			type = "";

		logger.info("CRM 获取客户流程办理进度: KHH=[{}], SQRQ=[{}], JSRQ=[{}], SPZT=[{}]", account, startDate,endDate,type);
		Map map=new HashMap();
		map.put("KHH", account);
		map.put("SQRQ", startDate);
		map.put("JSRQ", endDate);
		map.put("SPZT",type);
		String jsonStr=JSONObject.fromObject(map).toString();
		map.clear();
		map.put("service", "app.406");
		map.put("json", jsonStr);
		String postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
		JSONObject jo=JSONObject.fromObject(postResult);
		if("999".equals(((JSONObject)jo.get("head")).get("code")))
		{
			crmLogin();
			postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
		}
		jsonStr=null;
		map=null;
		return postResult;
	}

	/*// 获取客户信息发布
	public QueryResult getXxfb() {
		LBEBusinessService client = CrmInfoLocal.getServicePort();
		QueryOption queryOption = new QueryOption();
		queryOption.setBatchNo(1);
		queryOption.setBatchSize(200);
		queryOption.setQueryCount(true);
		queryOption.setValueOption(ValueOption.DISPLAY);

		logger.info("CRM 获取客户信息发布");
		QueryResult qrs = null;
		if (client != null) {
			qrs = client.query(CrmInfoLocal.getSessionId(), "vWTXXGG", null, null, queryOption);
		}
		CrmInfoLocal.printQueryResult(qrs);
		return qrs;
	}

	// 客户最新一次登陆操作查询
	public QueryResult getKhzxczrz(String account) {
		LBEBusinessService client = CrmInfoLocal.getServicePort();
		QueryOption queryOption = new QueryOption();
		queryOption.setBatchNo(1);
		queryOption.setBatchSize(200);
		queryOption.setQueryCount(true);
		queryOption.setValueOption(ValueOption.DISPLAY);

		List<LbParameter> params = new ArrayList<>();
		LbParameter p1 = new LbParameter();
		p1.setName("KHH");
		p1.setValue(account);
		params.add(p1);

		logger.info("CRM 查询客户最新一次登陆操作");
		QueryResult qrs = null;
		if (client != null) {
			qrs = client.query(CrmInfoLocal.getSessionId(), "SQL_WTCZRZCX", params, null, queryOption);
		}
		CrmInfoLocal.printQueryResult(qrs);
		return qrs;
	}
	*/
	// 记录客户登陆日志
		public String execXzczrz(String account, String date, String time, String type, String url, String desc,
				String ip, String mac) {
			if (account == null)
				return null;
			if (date == null)
				return null;
			if (time == null)
				return null;
			if (type == null)
				return null;
			if (ip == null)
				return null;

			logger.info("CRM 记录客户登陆日志: KHH=[{}], RQ=[{}], FSSJ=[{}], CZKM=[{}], URL=[{}], CZSM=[{}], IP=[{}], MAC=[{}]", account, date,time,type,url,desc,ip,mac);
			Map map=new HashMap();
			map.put("KHH", account);
			map.put("RQ", date);
			map.put("FSSJ", time);
			map.put("CZKM",type);
			map.put("URL", url);
			map.put("CZSM", desc);
			map.put("IP", ip);
			map.put("MAC",mac);
			String jsonStr=JSONObject.fromObject(map).toString();
			map.clear();
			map.put("service", "app.409");
			map.put("json", jsonStr);
			String postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			JSONObject jo=JSONObject.fromObject(postResult);
			if("999".equals(((JSONObject)jo.get("head")).get("code")))
			{
				crmLogin();
				postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			}
			jsonStr=null;
			map=null;
			return postResult;
		}
		//{"body":{"result":[]},"head":{"message":"联系方式变更申请成功","title":"联系方式变更申请","service":"app.401","code":"0"}}
		//{"body":{"result":[]},"head":{"message":"您已申请过联系方式变更，正在审批过程中!","title":"联系方式变更申请","service":"app.401","code":"app.401.1"}}
		// 发起客户联系方式变更申请
		public String doWorkKhlxfsbgsq(String account, String phoneNo, String ip, String mac) {
			if (account == null)
				return null;
			if (phoneNo == null)
				return null;
			if (ip == null)
				ip = "";

			logger.info("CRM 发起客户联系方式变更申请: KHH=[{}], IP=[{}], MAC=[{}], XSJ=[{}]", account,ip,mac,phoneNo);
			Map map=new HashMap();
			map.put("KHH", account);
			map.put("SQSM", "客户网厅申请");
			map.put("XSJ", phoneNo);
			map.put("IP", ip);
			map.put("MAC",mac);
			String jsonStr=JSONObject.fromObject(map).toString();
			map.clear();
			map.put("service", "app.401");
			map.put("json", jsonStr);
			String postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			JSONObject jo=JSONObject.fromObject(postResult);
			if("999".equals(((JSONObject)jo.get("head")).get("code")))
			{
				crmLogin();
				postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			}
			jsonStr=null;
			map=null;
			return postResult;
		}
		//{"body":{"result":[]},"head":{"message":"通讯地址变更申请成功","title":"通讯地址变更申请","service":"app.402","code":"0"}}
		// 发起客户通讯地址变更申请流程
		public String doWorkKhtxdzbgsq(String account, String addr, String ip, String mac) {
			if (account == null)
				return null;
			if (addr == null)
				addr = "";
			if (ip == null)
				ip = "";

			logger.info("CRM 发起客户联系方式变更申请: KHH=[{}], IP=[{}], MAC=[{}], XLXDZ2=[{}]", account,ip,mac,addr);
			Map map=new HashMap();
			map.put("KHH", account);
			map.put("SQSM", "客户网厅申请");
			map.put("XLXDZ2", addr);
			map.put("IP", ip);
			map.put("MAC",mac);
			String jsonStr=JSONObject.fromObject(map).toString();
			map.clear();
			map.put("service", "app.402");
			map.put("json", jsonStr);
			String postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			JSONObject jo=JSONObject.fromObject(postResult);
			if("999".equals(((JSONObject)jo.get("head")).get("code")))
			{
				crmLogin();
				postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			}
			jsonStr=null;
			map=null;
			return postResult;
		}

		// 获取客户出入金明细
		public String getKhcrjmx(String account, String startDate, String toDate) {
			logger.info("CRM 获取客户出入金明细: KHH=[{}], KSRQ=[{}], JSRQ=[{}]", account, startDate,toDate);
			Map map=new HashMap();
			map.put("KHH", account);
			map.put("KSRQ", startDate);
			map.put("JSRQ", toDate);
			String jsonStr=JSONObject.fromObject(map).toString();
			map.clear();
			map.put("service", "app.408");
			map.put("json", jsonStr);
			String postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			JSONObject jo=JSONObject.fromObject(postResult);
			if("999".equals(((JSONObject)jo.get("head")).get("code")))
			{
				crmLogin();
				postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			}
			jsonStr=null;
			map=null;
			return postResult;
		}

		// 发起客户交易系统切换申请
		public String doWorkKhjyxtqhsq(String account, String system, String ip, String mac) {
			if (account == null)
				return null;
			if (system == null)
				return null;
			if (ip == null)
				ip = "";

			logger.info("CRM 发起客户交易系统切换申请: KHH=[{}], IP=[{}], MAC=[{}], SQXT=[{}]", account,ip,mac,system);
			Map map=new HashMap();
			map.put("KHH", account);
			map.put("SQSM", "客户网厅申请");
			map.put("SQXT", system);
			map.put("IP", ip);
			map.put("MAC",mac);
			String jsonStr=JSONObject.fromObject(map).toString();
			map.clear();
			map.put("service", "app.403");
			map.put("json", jsonStr);
			String postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			JSONObject jo=JSONObject.fromObject(postResult);
			if("999".equals(((JSONObject)jo.get("head")).get("code")))
			{
				crmLogin();
				postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			}
			jsonStr=null;
			map=null;
			return postResult;
		}

		// 发起客户激活申请流程
		public String doWorkKhjhsq(String account, String ip, String mac) {
			if (account == null)
				return null;
			if (ip == null)
				ip = "";

			logger.info("CRM 发起客户激活申请流程: KHH=[{}], IP=[{}], MAC=[{}]]", account, ip,mac);
			Map map=new HashMap();
			map.put("KHH", account);
			map.put("SQSM", "客户网厅申请");
			map.put("IP", ip);
			map.put("MAC",mac);
			String jsonStr=JSONObject.fromObject(map).toString();
			map.clear();
			map.put("service", "app.404");
			map.put("json", jsonStr);
			String postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			JSONObject jo=JSONObject.fromObject(postResult);
			if("999".equals(((JSONObject)jo.get("head")).get("code")))
			{
				crmLogin();
				postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
			}
			jsonStr=null;
			map=null;
			return postResult;
		}

		// 发起客户激活申请校验
	/*public LbeResult checkWorkKhjhsq(String account, String ip, String mac) {
		if (account == null) return null;
		if (ip == null) ip = "";

		LBEBusinessService client = CrmInfoLocal.getServicePort();
		List<LbParameter> params = new ArrayList<>();
		LbParameter p1 = new LbParameter();
		p1.setName("KHH");
		p1.setValue(account);
		params.add(p1);

		LbParameter p2 = new LbParameter();
		p2.setName("IP");
		p2.setValue(ip);
		params.add(p2);

		LbParameter p3 = new LbParameter();
		p3.setName("MAC");
		p3.setValue(mac);
		params.add(p3);

		LbeResult result = new LbeResult();
		result.setResult(1);

		// 进行客户激活申请流程校验
		BizProcessResult resultBizProcess = null;
		if (client != null) {
			resultBizProcess = client.execBizProcess(
					CrmInfoLocal.getSessionId(), "TKHJHSQ_CHECK", null, params, null);
		}

		if (resultBizProcess != null && resultBizProcess.getResult() < 0) {
			result.setResult(-1);
			result.setMessage("客户激活申请流程校验失败");
			return result;
		}

		String o_ret_note = "";
		String o_ret_code = "";
		if (resultBizProcess != null && resultBizProcess.getResult() == 1) {
			for (int i = 0; i < resultBizProcess.getOutputVariables().size(); i++) {
				if (resultBizProcess.getOutputVariables().get(i).getName().equals("o_ret_note")
						&& resultBizProcess.getOutputVariables().get(i).getValue() != null) {
					o_ret_note = resultBizProcess.getOutputVariables().get(i).getValue();
				}
				if (resultBizProcess.getOutputVariables().get(i).getName().equals("o_ret_code")
						&& resultBizProcess.getOutputVariables().get(i).getValue() != null) {
					o_ret_code = resultBizProcess.getOutputVariables().get(i).getValue();
				}
			}
		}

		// 验证返回账号错误
		if (!o_ret_code.equals("1")) {
			result.setResult(Integer.parseInt(o_ret_code));
			result.setMessage(o_ret_note);
		}

		return result;
	}*/

	// 发起客户身份证有效期变更申请流程
	public String doWorkKhsfzyxqbgsq(String account, String newDate, String fntFileName, String bckFileName,
			String idFntImg, String idBckImg, String ip, String mac) {
		if (account == null)
			return null;
		if (newDate == null)
			return null;

		logger.info("CRM 发起客户身份证有效期变更申请流程: KHH=[{}], BGSM=[{}], IP=[{}], MAC=[{}]", account,
				newDate, ip, mac);
		//image/图片后缀名;base64,图片数据
		String fimg="image/"+fntFileName.substring(fntFileName.lastIndexOf(".")+1).toLowerCase().trim()+";base64,"+idFntImg;
		String bimg="image/"+bckFileName.substring(bckFileName.lastIndexOf(".")+1).toLowerCase().trim()+";base64,"+idBckImg;
		Map map=new HashMap();
		map.put("KHH", account);
		map.put("BGSM", newDate);
		map.put("IP", ip);
		map.put("MAC",mac);
		map.put("PIC_DATA1", fimg);
		map.put("PIC_DATA2", bimg);
		String jsonStr=JSONObject.fromObject(map).toString();
		map.clear();
		map.put("service", "app.405");
		map.put("json", jsonStr);
		String postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
		JSONObject jo=JSONObject.fromObject(postResult);
		if("999".equals(((JSONObject)jo.get("head")).get("code")))
		{
			crmLogin();
			postResult=HttpPostRequestUtil.sendPost(CRMSERVICEURL, map,"GBK");
		}
		jsonStr=null;
		map=null;
		return postResult;
	}

	/*// 发起客户密码重置变更申请流程
	public LbeResult doWorkKhmmczsq(String account, String pwdtype, String fntFileName, String bckFileName,
	                                String idFntImg, String idBckImg, String ip, String mac) {
		if (account == null) return null;
		if (pwdtype == null)
			return null;
		else if (!(pwdtype.equals("1") || pwdtype.equals("2")
				|| pwdtype.equals("1;2") || pwdtype.equals("2;1")))
			return null;

		LBEBusinessService client = CrmInfoLocal.getServicePort();
		List<LbParameter> params = new ArrayList<>();

		LbParameter p1 = new LbParameter();
		p1.setName("KHH");
		p1.setValue(account);
		params.add(p1);

		LbParameter p2 = new LbParameter();
		p2.setName("BGXM");
		p2.setValue(pwdtype);
		params.add(p2);

		LbParameter p3 = new LbParameter();
		p3.setName("BGSM");
		p3.setValue("客户网厅申请");
		params.add(p3);

		LbParameter p4 = new LbParameter();
		p4.setName("UID");
		p4.setValue(UID);
		params.add(p4);

		LbParameter p5 = new LbParameter();
		p5.setName("IP");
		p5.setValue(ip);
		params.add(p5);

		LbParameter p6 = new LbParameter();
		p6.setName("MAC");
		p6.setValue(mac);
		params.add(p6);

		logger.info("CRM 发起客户密码重置变更申请流程: KHH=[{}], BGXM=[{}], BGSM=[{}], UID=[{}], IP=[{}], MAC=[{}]",
				p1.getValue(), p2.getValue(), p3.getValue(), p4.getValue(), p5.getValue(), p6.getValue());

		BizProcessResult resultBizProcess = null;
		if (client != null) {
			resultBizProcess = client.execBizProcess(CrmInfoLocal.getSessionId(),
					"lcKHXXBGSQ_JYMMCZ", null, params, null);
		}

		if (resultBizProcess != null && resultBizProcess.getResult() != 1) {
			return resultBizProcess;
		}

		String o_ret_note = "";
		String o_ret_code = "";
		String lcid = "";
		if (resultBizProcess != null && resultBizProcess.getResult() == 1) {
			for (int i = 0; i < resultBizProcess.getOutputVariables().size(); i++) {
				if (resultBizProcess.getOutputVariables().get(i).getName().equals("o_ret_note")
						&& resultBizProcess.getOutputVariables().get(i).getValue() != null) {
					o_ret_note = resultBizProcess.getOutputVariables().get(i).getValue();
				}
				if (resultBizProcess.getOutputVariables().get(i).getName().equals("o_ret_code")
						&& resultBizProcess.getOutputVariables().get(i).getValue() != null) {
					o_ret_code = resultBizProcess.getOutputVariables().get(i).getValue();
				}
				if (resultBizProcess.getOutputVariables().get(i).getName().equals("o_fjid")
						&& resultBizProcess.getOutputVariables().get(i).getValue() != null) {
					lcid = resultBizProcess.getOutputVariables().get(i).getValue();
				}
			}
		}

		LbeResult result = new LbeResult();
		result.setResult(1);

		// 验证返回账号错误
		if (!o_ret_code.equals("1")) {
			result.setResult(Integer.parseInt(o_ret_code));
			result.setMessage(o_ret_note);
		} else {
			if (lcid != null && !"".equals(lcid) && lcid.length() > 0) {
				String[] lcidSplit = lcid.split(";");
				boolean resFnt = uploadDocument("tAttachments", "attachment", fntFileName, idFntImg, lcidSplit[0]);
				boolean resBck = uploadDocument("tAttachments", "attachment", bckFileName, idBckImg, lcidSplit[1]);

				if (!resFnt || !resBck) {
					result.setResult(-1);
					result.setMessage("身份证图片上传失败");
					return result;
				}
			}
		}

		return result;
	}

	// 发起客户保底限制取消申请流程
	public LbeResult doWorkBdxzqxsq(String account, String ip, String mac) {
		LBEBusinessService client = CrmInfoLocal.getServicePort();
		List<LbParameter> params = new ArrayList<>();

		LbParameter p1 = new LbParameter();
		p1.setName("KHH");
		p1.setValue(account);
		params.add(p1);

		LbParameter p2 = new LbParameter();
		p2.setName("SQSM");
		p2.setValue("客户网厅申请");
		params.add(p2);

		LbParameter p3 = new LbParameter();
		p3.setName("IP");
		p3.setValue(ip);
		params.add(p3);

		LbParameter p4 = new LbParameter();
		p4.setName("MAC");
		p4.setValue(mac);
		params.add(p4);

		LbParameter p5 = new LbParameter();
		p5.setName("UID");
		p5.setValue(UID);
		params.add(p5);

		logger.info("CRM 发起客户保底限制取消申请流程: KHH=[{}], SQSM=[{}], IP=[{}], MAC=[{}], UID=[{}]",
				p1.getValue(), p2.getValue(), p3.getValue(), p4.getValue(), p5.getValue());

		BizProcessResult resultBizProcess = null;
		if (client != null) {
			resultBizProcess = client.execBizProcess(CrmInfoLocal.getSessionId(),
					"lcCDBSL_QXBDXZ", null, params, null);
		}

		if (resultBizProcess != null && resultBizProcess.getResult() < 0) {
			return resultBizProcess;
		}

		String o_ret_note = "";
		String o_ret_code = "";
		if (resultBizProcess != null && resultBizProcess.getResult() == 1) {
			for (int i = 0; i < resultBizProcess.getOutputVariables().size(); i++) {
				if (resultBizProcess.getOutputVariables().get(i).getName().equals("o_ret_note")
						&& resultBizProcess.getOutputVariables().get(i).getValue() != null) {
					o_ret_note = resultBizProcess.getOutputVariables().get(i).getValue();
				}
				if (resultBizProcess.getOutputVariables().get(i).getName().equals("o_ret_code")
						&& resultBizProcess.getOutputVariables().get(i).getValue() != null) {
					o_ret_code = resultBizProcess.getOutputVariables().get(i).getValue();
				}
			}
		}

		LbeResult result = new LbeResult();
		result.setResult(1);

		// 验证返回账号错误
		if (!o_ret_code.equals("1")) {
			result.setResult(Integer.parseInt(o_ret_code));
			result.setMessage(o_ret_note);
		} else {
			result.setResult(1);
		}

		return result;
	}

	// 上传文档附件
	public static boolean uploadDocument(String objectName, String columnName,
	                                     String filename, String image, String lcid) {
		LBDocumentService docClient = CrmInfoLocal.getServieDocumentPort();

		Document doc = new Document();
		byte[] imgByte = Base64.getDecoder().decode(image);
		DataHandler dataHandler = new DataHandler(
				new InputStreamDataSource(new ByteArrayInputStream(imgByte, 0, imgByte.length)));

		doc.setFilename(filename);
		doc.setLength(image.length());
		doc.setDocumentData(dataHandler);

		com.apex.livebos.client.lbdocument.LbeResult result = null;
		if (docClient != null) {
			result = docClient.putDocument(CrmInfoLocal.getSessionId(), doc,
					objectName, columnName, lcid);
		}

		LBEBusinessService busClient = CrmInfoLocal.getServicePort();
		List<LbParameter> params = new ArrayList<>();
		LbParameter p = new LbParameter();
		p.setName("name");
		p.setValue(filename);
		params.add(p);
		if (busClient != null) {
			busClient.update(CrmInfoLocal.getSessionId(), "tAttachments", lcid, params);
		}
		return result != null;
	}*/
}

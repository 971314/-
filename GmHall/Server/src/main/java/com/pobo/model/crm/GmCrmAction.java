package com.pobo.model.crm;

import com.apex.crm.wsclient.*;
import com.apex.livebos.client.lbdocument.Document;
import com.apex.livebos.client.lbdocument.LBDocumentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.activation.DataHandler;
import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

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

	private @Value("${crm.uid}") String UID = "857";

	// 获取客户信息
	public QueryResult getKhxx(String account) {
		if (account == null) return null;

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

		LbParameter p2 = new LbParameter();
		p2.setName("SJ");
		p2.setValue("");
		params.add(p2);

		logger.info("CRM 获取客户信息: KHH=[{}], SJ=[{}]", p1.getValue(), p2.getValue());
		QueryResult qrs = null;
		if (client != null) {
			qrs = client.query(CrmInfoLocal.getSessionId(), "Sql_WT_KHXX", params,
					null, queryOption);
		}
		CrmInfoLocal.printQueryResult(qrs);
		return qrs;
	}

	// 获取客户流程办理进度
	public QueryResult getKhlcjd(String account, String startDate, String endDate, String type) {
		if (account == null) return null;
		if (startDate == null) startDate = "";
		if (endDate == null) endDate = "";
		if (type == null) type = "";

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

		LbParameter p2 = new LbParameter();
		p2.setName("SQRQ");
		p2.setValue(startDate);
		params.add(p2);

		LbParameter p3 = new LbParameter();
		p3.setName("JSRQ");
		p3.setValue(endDate);
		params.add(p3);

		LbParameter p4 = new LbParameter();
		p4.setName("SPZT");
		p4.setValue(type);
		params.add(p4);

		LbParameter p5 = new LbParameter();
		p5.setName("UID");
		p5.setValue(UID);
		params.add(p5);

		logger.info("CRM 获取客户流程办理进度: KHH=[{}], SQRQ=[{}], JSRQ=[{}], SPZT=[{}], UID=[{}]",
				p1.getValue(), p2.getValue(), p3.getValue(), p4.getValue(), p5.getValue());
		QueryResult qrs = null;
		if (client != null) {
			qrs = client.query(CrmInfoLocal.getSessionId(), "Sql_WT_LCBLJDCX",
					params, null, queryOption);
		}
		CrmInfoLocal.printQueryResult(qrs);
		return qrs;
	}

	// 获取客户信息发布
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

	// 记录客户登陆日志
	public LbeResult execXzczrz(String account, String date, String time, String type,
	                                  String url, String desc, String ip, String mac) {
		if (account == null) return null;
		if (date == null) return null;
		if (time == null) return null;
		if (type == null) return null;
		if (ip == null) return null;

		LBEBusinessService client = CrmInfoLocal.getServicePort();
		List<LbParameter> params = new ArrayList<>();

		LbParameter p1 = new LbParameter();
		p1.setName("KHH");
		p1.setValue(account);
		params.add(p1);

		LbParameter p2 = new LbParameter();
		p2.setName("RQ");
		p2.setValue(date);
		params.add(p2);

		LbParameter p3 = new LbParameter();
		p3.setName("FSSJ");
		p3.setValue(time);
		params.add(p3);

		LbParameter p4 = new LbParameter();
		p4.setName("CZKM");
		p4.setValue(type);
		params.add(p4);

		LbParameter p5 = new LbParameter();
		p5.setName("URL");
		p5.setValue(url);
		params.add(p5);

		LbParameter p6 = new LbParameter();
		p6.setName("CZSM");
		p6.setValue(desc);
		params.add(p6);

		LbParameter p7 = new LbParameter();
		p7.setName("IP");
		p7.setValue(ip);
		params.add(p7);

		LbParameter p8 = new LbParameter();
		p8.setName("MAC");
		p8.setValue(mac);
		params.add(p8);

		logger.info("CRM 记录客户登陆日志: KHH=[{}], RQ=[{}], FSSJ=[{}], CZKM=[{}], URL=[{}], CZSM=[{}], IP=[{}], MAC=[{}]",
				p1.getValue(), p2.getValue(), p3.getValue(), p4.getValue(), p5.getValue(), p6.getValue(), p7.getValue(), p8.getValue());

		BizProcessResult resultBizProcess = null;
		if (client != null) {
			resultBizProcess = client.execBizProcess(CrmInfoLocal.getSessionId(),
					"tWT_CZRZ_XZWTRZ", null, params, null);
		}

		if (resultBizProcess != null && resultBizProcess.getResult() != 1) {
			return resultBizProcess;
		}

		return resultBizProcess;
	}

	// 发起客户联系方式变更申请
	public LbeResult doWorkKhlxfsbgsq(String account, String phoneNo, String ip, String mac) {
		if (account == null) return null;
		if (phoneNo == null) return null;
		if (ip == null) ip = "";

		LBEBusinessService client = CrmInfoLocal.getServicePort();
		List<LbParameter> params = new ArrayList<>();

		LbParameter p1 = new LbParameter();
		p1.setName("KHH");
		p1.setValue(account);
		params.add(p1);

		LbParameter p2 = new LbParameter();
		p2.setName("XSJ");
		p2.setValue(phoneNo);
		params.add(p2);

		LbParameter p3 = new LbParameter();
		p3.setName("SQSM");
		p3.setValue("客户网厅申请");
		params.add(p3);

		LbParameter p4 = new LbParameter();
		p4.setName("IP");
		p4.setValue(ip);
		params.add(p4);

		LbParameter p5 = new LbParameter();
		p5.setName("MAC");
		p5.setValue(mac);
		params.add(p5);

		LbParameter p6 = new LbParameter();
		p6.setName("UID");
		p6.setValue(UID);
		params.add(p6);

		logger.info("CRM 发起客户联系方式变更申请: KHH=[{}], XSJ=[{}], SQSM=[{}], IP=[{}], MAC=[{}], UID=[{}]",
				p1.getValue(), p2.getValue(), p3.getValue(), p4.getValue(), p5.getValue(), p6.getValue());

		BizProcessResult resultBizProcess = null;
		if (client != null) {
			resultBizProcess = client.execBizProcess(CrmInfoLocal.getSessionId(),
					"lcFKHSMZXXBGSQ_LXDHBG", null, params, null);
		}

		if (resultBizProcess != null && resultBizProcess.getResult() != 1) {
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
		if (!o_ret_code.equals("1")) {
			result.setResult(Integer.parseInt(o_ret_code));
			result.setMessage(o_ret_note);
		}
		return result;
	}

	// 发起客户通讯地址变更申请流程
	public LbeResult doWorkKhtxdzbgsq(String account, String addr, String ip, String mac) {
		if (account == null) return null;
		if (addr == null) addr = "";
		if (ip == null) ip = "";

		LBEBusinessService client = CrmInfoLocal.getServicePort();
		List<LbParameter> params = new ArrayList<>();

		// 客户号
		LbParameter p1 = new LbParameter();
		p1.setName("KHH");
		p1.setValue(account);
		params.add(p1);

		// 联系新地址
		LbParameter p2 = new LbParameter();
		p2.setName("XLXDZ2");
		p2.setValue(addr);
		params.add(p2);

		LbParameter p3 = new LbParameter();
		p3.setName("SQSM");
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

		logger.info("CRM 发起客户通讯地址变更申请流程: KHH=[{}], XLXDZ2=[{}], SQSM=[{}], UID=[{}], IP=[{}], MAC=[{}]",
				p1.getValue(), p2.getValue(), p3.getValue(), p4.getValue(), p5.getValue(), p6.getValue());

		BizProcessResult resultBizProcess = null;
		if (client != null) {
			resultBizProcess = client.execBizProcess(CrmInfoLocal.getSessionId(), "lcFKHSMZXXBGSQ_LXDZBG", null, params, null);
		}

		if (resultBizProcess != null && resultBizProcess.getResult() != 1) {
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
		if (!o_ret_code.equals("1")) {
			result.setResult(Integer.parseInt(o_ret_code));
			result.setMessage(o_ret_note);
		}
		return result;
	}

	// 获取客户出入金明细
	public QueryResult getKhcrjmx(String account, String startDate, String toDate) {
		LBEBusinessService client = CrmInfoLocal.getServicePort();
		QueryOption queryOption = new QueryOption();
		queryOption.setBatchNo(1);
		queryOption.setBatchSize(200);
		queryOption.setQueryCount(true);
		queryOption.setValueOption(ValueOption.DISPLAY);

		List<LbParameter> params = new ArrayList<>();
		LbParameter p1 = new LbParameter();
		p1.setName("KHH");
		if (account == null) return null;
		p1.setValue(account);
		params.add(p1);

		LbParameter p2 = new LbParameter();
		p2.setName("KSRQ");
		p2.setValue(startDate);
		params.add(p2);

		LbParameter p3 = new LbParameter();
		p3.setName("JSRQ");
		p3.setValue(toDate);
		params.add(p3);

		logger.info("CRM 发起客户出入金明细: KHH=[{}], KSRQ=[{}], JSRQ=[{}]",
				p1.getValue(), p2.getValue(), p3.getValue());

		QueryResult qrs = null;
		if (client != null) {
			qrs = client.query(CrmInfoLocal.getSessionId(), "Sql_WT_KHCRJMX",
					params, null, queryOption);
		}
		CrmInfoLocal.printQueryResult(qrs);
		return qrs;
	}

	// 发起客户交易系统切换申请
	public LbeResult doWorkKhjyxtqhsq(String account, String system, String ip, String mac) {
		if (account == null) return null;
		if (system == null) return null;
		if (ip == null) ip = "";

		LBEBusinessService client = CrmInfoLocal.getServicePort();
		List<LbParameter> params = new ArrayList<>();

		LbParameter p1 = new LbParameter();
		p1.setName("KHH");
		p1.setValue(account);
		params.add(p1);

		LbParameter p2 = new LbParameter();
		p2.setName("SQXT");
		p2.setValue(system);
		params.add(p2);

		LbParameter p3 = new LbParameter();
		p3.setName("SQSM");
		p3.setValue("客户网厅申请");
		params.add(p3);

		LbParameter p4 = new LbParameter();
		p4.setName("IP");
		p4.setValue(ip);
		params.add(p4);

		LbParameter p5 = new LbParameter();
		p5.setName("MAC");
		p5.setValue(mac);
		params.add(p5);

		LbParameter p6 = new LbParameter();
		p6.setName("UID");
		p6.setValue(UID);
		params.add(p6);

		logger.info("CRM 发起客户交易系统切换申请: KHH=[{}], SQXT=[{}], SQSM=[{}], IP=[{}], MAC=[{}], UID=[{}]",
				p1.getValue(), p2.getValue(), p3.getValue(), p4.getValue(), p5.getValue(), p6.getValue());

		BizProcessResult resultBizProcess = null;
		if (client != null) {
			resultBizProcess = client.execBizProcess(CrmInfoLocal.getSessionId(),
					"lcJYXTQH_JYXTQH", null, params, null);
		}

		if (resultBizProcess != null && resultBizProcess.getResult() != 1) {
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
		if (!o_ret_code.equals("1")) {
			result.setResult(Integer.parseInt(o_ret_code));
			result.setMessage(o_ret_note);
		}
		return result;
	}

	// 发起客户激活申请流程
	public LbeResult doWorkKhjhsq(String account, String ip, String mac) {
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
		LbParameter p4 = new LbParameter();
		p4.setName("UID");
		p4.setValue(UID);
		params.add(p4);

		logger.info("CRM 发起客户激活申请流程: KHH=[{}], IP=[{}], MAC=[{}], UID=[[{}]",
				p1.getValue(), p2.getValue(), p3.getValue(), p4.getValue());

		BizProcessResult resultBizProcess = null;
		if (client != null) {
			resultBizProcess = client.execBizProcess(CrmInfoLocal.getSessionId(),
					"TKHJHSQ_KHJH", null, params, null);
		}

		if (resultBizProcess != null && resultBizProcess.getResult() != 1) {
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
		if (!o_ret_code.equals("1")) {
			result.setResult(Integer.parseInt(o_ret_code));
			result.setMessage(o_ret_note);
		}
		return result;
	}

	// 发起客户激活申请校验
	public LbeResult checkWorkKhjhsq(String account, String ip, String mac) {
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
	}

	// 发起客户身份证有效期变更申请流程
	public LbeResult doWorkKhsfzyxqbgsq(String account, String newDate, String fntFileName, String bckFileName,
	                                    String idFntImg, String idBckImg, String ip, String mac) {
		if (account == null) return null;
		if (newDate == null) return null;

		LBEBusinessService client = CrmInfoLocal.getServicePort();
		List<LbParameter> params = new ArrayList<>();

		LbParameter p1 = new LbParameter();
		p1.setName("KHH");
		p1.setValue(account);
		params.add(p1);

		LbParameter p2 = new LbParameter();
		p2.setName("UID");
		p2.setValue(UID);
		params.add(p2);

		LbParameter p3 = new LbParameter();
		p3.setName("BGSM");
		//p5.setValue("2016.05至2036.05");
		p3.setValue(newDate);
		params.add(p3);

		LbParameter p4 = new LbParameter();
		p4.setName("IP");
		p4.setValue(ip);
		params.add(p4);
		LbParameter p5 = new LbParameter();
		p5.setName("MAC");
		p5.setValue(mac);
		params.add(p5);

		logger.info("CRM 发起客户身份证有效期变更申请流程: KHH=[{}], UID=[{}], BGSM=[{}], IP=[{}], MAC=[{}]",
				p1.getValue(), p2.getValue(), p3.getValue(), p4.getValue(), p5.getValue());

		BizProcessResult resultBizProcess = null;
		if (client != null) {
			resultBizProcess = client.execBizProcess(CrmInfoLocal.getSessionId(),
					"lcKHXXBGSQ_BGSFZYXQSQ", null, params, null);
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

	// 发起客户密码重置变更申请流程
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
	}
}

package com.pobo.model;

import com.pobo.dao.mapper.ICustomerMapper;
import com.pobo.dao.mapper.ILogMapper;
import com.pobo.entity.CustomerInfo;
import com.pobo.entity.CustomerLog;
import com.pobo.exception.AmException;
import com.pobo.utils.JsonUtil;
import org.codehaus.jackson.node.ArrayNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-10-28 17:00
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Component
public class CustomerAction {
	@Autowired
	private ICustomerMapper customerMapper;

	@Autowired
	private LogAction logAction;

	// 获取客户注册信息
	public HashMap<String, Object> getCustomerInfo(String loginName, String orgId) {
		HashMap<String, Object> map;
		try {
			map = customerMapper.queryCustomer(loginName, orgId);
		} catch (Exception e) {
			throw new AmException(-20);
		}
		return map;
	}

	// 输入身份证和联系方式，资管新建客户
	public int initialCustomer(String loginName, String idNum, String name, String risklevel, String orgId) {
		// 查找是否已存在
		Map<String, Object> map = customerMapper.queryCustomer(loginName, orgId);
		if (map != null) {
			throw new AmException(-103);
		}

		CustomerInfo info = new CustomerInfo();
		try {
			info.setIdNum(idNum);
			info.setLoginName(loginName);
			info.setOrgId(orgId);
			info.setName(name);
			info.setRiskLevel(risklevel);
			customerMapper.insertCustomerInfo(info);
		} catch (Exception e) {
			throw new AmException(-20);
		}
		return Integer.parseInt(info.getId());
	}

	// 根据答题结果，计算测评成绩
	public String calcRiskLevel(List<String> answers) {
		int score = 0;
		for (int i = 0; i < answers.size(); i++) {
			String answer = answers.get(i);
			if (answer.equalsIgnoreCase("A")) {
				score += 2;
			} else if (answer.equalsIgnoreCase("B")) {
				score += 4;
			} else if (answer.equalsIgnoreCase("C")) {
				score += 6;
			} else if (answer.equalsIgnoreCase("D")) {
				score += 8;
			} else {
				throw new AmException(-108);
			}
		}
		if (score <= 40) {
			return "1";
		} else if (40 < score && score <= 60) {
			return "2";
		} else if (60 < score) {
			return "3";
		}
		return String.valueOf(score);
	}

	// 设置风险测评分数，返回风险测评分数
	public String setRiskLevel(String loginName, String orgId, List<String> answers) {
		String riskLevel = calcRiskLevel(answers);
		try {
			customerMapper.updateRiskLevel(loginName, orgId, riskLevel);
		} catch (Exception e) {
			throw new AmException(-20);
		}
		return riskLevel;
	}

	/**********************************************************************************/

}

package com.pobo.dao.mapper;

import com.pobo.entity.CustomerInfo;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.type.JdbcType;
import org.springframework.stereotype.Repository;

import java.util.HashMap;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-11-1 19:26
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */


@Repository
public interface ICustomerMapper {
	public int insertCustomerInfo(CustomerInfo info);


	public int updateRegisterStep(@Param("loginname") String loginName,
	                              @Param("orgid") String orgId,
	                              @Param("step") String step);

	public HashMap<String, String> queryRegisterStep(@Param("loginname") String loginName,
	                                                  @Param("orgid") String orgId);

	public int updateRiskLevel(@Param("loginname") String loginName,
	                           @Param("orgid") String orgId,
	                           @Param("risklevel") String riskLevel);

	public int queryRiskLevel(@Param("loginname") String loginName,
	                          @Param("orgid") String orgId);

	public HashMap<String, Object> queryCustomer(@Param("loginname") String loginName,
	                                             @Param("orgid") String orgId);
}

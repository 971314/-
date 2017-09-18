package com.pobo.dao.mapper;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.pobo.model.CustomerInfo;
import com.pobo.model.CustomerInfoShort;
import com.pobo.model.CustomerLog;
import com.pobo.model.CustomerQueryParameters;

@Repository
public interface CustomerMapper {
	public List<CustomerInfoShort> GetPageList(CustomerQueryParameters cqp);

	public int GetPageTotalCount(CustomerQueryParameters cqp);

	public int UpdateCustomerInfo(HashMap<String, String> map);

	public CustomerInfo GetCustomerInfo(String id);

	public List<CustomerLog> GetCustomerRecords(HashMap<String, String> map);
}

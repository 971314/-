package com.pobo.dao.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.pobo.model.GetOpetationLog;
import com.pobo.model.LogParameters;
import com.pobo.model.OperationLog;
@Repository
public interface LoggerMapper {
	public int WriteLog(OperationLog log);
	
	public List<GetOpetationLog> GetLog(LogParameters lp);
}

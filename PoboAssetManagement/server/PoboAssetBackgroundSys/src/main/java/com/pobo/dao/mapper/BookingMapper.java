package com.pobo.dao.mapper;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.pobo.model.BookingInfo;
import com.pobo.model.BookingQueryParameters;

@Repository
public interface BookingMapper {

	public List<BookingInfo> GetPageList(BookingQueryParameters bqp);

	public int GetPageTotalCount(BookingQueryParameters bqp);

	public int UpdateBookingStatus(HashMap<String, String> map);
}

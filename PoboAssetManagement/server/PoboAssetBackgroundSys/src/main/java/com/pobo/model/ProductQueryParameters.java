package com.pobo.model;

public class ProductQueryParameters {
	int periodid;
	int channelid;
	int typeid;
	String orderfield;
	String ordertype;
	int currentindex;
	int pagecount;
	int totalcount;

	public int getPeriodid() {
		return periodid;
	}

	public void setPeriodid(int periodid) {
		this.periodid = periodid;
	}

	public int getChannelid() {
		return channelid;
	}

	public void setChannelid(int channelid) {
		this.channelid = channelid;
	}

	public int getTypeid() {
		return typeid;
	}

	public void setTypeid(int typeid) {
		this.typeid = typeid;
	}

	public String getOrderfield() {
		return orderfield;
	}

	public void setOrderfield(String orderfield) {
		this.orderfield = orderfield;
	}

	public String getOrdertype() {
		return ordertype;
	}

	public void setOrdertype(String ordertype) {
		this.ordertype = ordertype;
	}

	public int getCurrentindex() {
		return currentindex;
	}

	public void setCurrentindex(int currentindex) {
		this.currentindex = currentindex;
	}

	public int getPagecount() {
		return pagecount;
	}

	public void setPagecount(int pagecount) {
		this.pagecount = pagecount;
	}

	public int getTotalcount() {
		return totalcount;
	}

	public void setTotalcount(int totalcount) {
		this.totalcount = totalcount;
	}
}

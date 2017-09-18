package com.pobo.model;

public class BookingQueryParameters {
	String c_CustomerName;
	String c_PhoneNum;
	int c_RiskLevel;
	int c_Status;
	String orderField;
	String orderType;
	int currentPageIndex;
	int rowsPerPage;

	public String getC_CustomerName() {
		return c_CustomerName;
	}

	public void setC_CustomerName(String c_CustomerName) {
		this.c_CustomerName = c_CustomerName;
	}

	public String getC_PhoneNum() {
		return c_PhoneNum;
	}

	public void setC_PhoneNum(String c_PhoneNum) {
		this.c_PhoneNum = c_PhoneNum;
	}

	public int getC_RiskLevel() {
		return c_RiskLevel;
	}

	public void setC_RiskLevel(int c_RiskLevel) {
		this.c_RiskLevel = c_RiskLevel;
	}

	public int getC_Status() {
		return c_Status;
	}

	public void setC_Status(int c_Status) {
		this.c_Status = c_Status;
	}

	public String getOrderField() {
		return orderField;
	}

	public void setOrderField(String orderField) {
		this.orderField = orderField;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public int getCurrentPageIndex() {
		return currentPageIndex;
	}

	public void setCurrentPageIndex(int currentPageIndex) {
		this.currentPageIndex = currentPageIndex;
	}

	public int getRowsPerPage() {
		return rowsPerPage;
	}

	public void setRowsPerPage(int rowsPerPage) {
		this.rowsPerPage = rowsPerPage;
	}
	
	@Override
	public String toString() {
		return "BookingQueryParameters {" +
				", c_CustomerName = '" + c_CustomerName + '\'' +
				", c_PhoneNum = '" + c_PhoneNum + '\'' +
				", c_RiskLevel = '" + c_RiskLevel + '\'' +
				", c_Status = '" + c_Status + '\'' +
				", orderField = '" + orderField + '\'' +
				", orderType = '" + orderType + '\'' +
				", currentPageIndex = '" + currentPageIndex + '\'' +
				", rowsPerPage = '" + rowsPerPage + '\'' +
				'}';
	}
}

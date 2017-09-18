package com.pobo.exception;


/**
 * 应用异常
 */
public class DzException extends RuntimeException {
	public DzException() {
	}

	public DzException(String errDecs) {
		super(errDecs);
	}

	public DzException(String errCode, String errDecs) {
		super(errDecs);
	}
}

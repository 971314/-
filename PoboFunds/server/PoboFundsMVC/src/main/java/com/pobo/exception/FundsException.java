package com.pobo.exception;


/**
 * 应用异常
 */
public class FundsException extends RuntimeException {
	public FundsException() {
	}

	public FundsException(String errDecs) {
		super(errDecs);
	}

	public FundsException(String errCode, String errDecs) {
		super(errDecs);
	}
}

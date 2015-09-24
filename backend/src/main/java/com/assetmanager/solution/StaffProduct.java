package com.assetmanager.solution;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StaffProduct {
	@NotNull
	@JsonProperty
	private int productId;
	
	@NotNull
	@JsonProperty
	private int staffId;

	public int getProductId() {
		return productId;
	}

	public StaffProduct setProductId(int productId) {
		this.productId = productId;
		return this;
	}

	public int getStaffId() {
		return staffId;
	}

	public StaffProduct setStaffId(int staffId) {
		this.staffId = staffId;
		return this;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + productId;
		result = prime * result + staffId;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		StaffProduct other = (StaffProduct) obj;
		if (productId != other.productId)
			return false;
		if (staffId != other.staffId)
			return false;
		return true;
	}
	
	
}
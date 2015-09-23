package com.assetmanager.solution;

import java.sql.Date;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Product {

	@NotNull
	@JsonProperty
	private int productId;
	
	@NotNull
	@JsonProperty
	private String serialNr;
	
	@NotNull
	@JsonProperty
	private String productNr;
	
	@NotNull
	@JsonProperty
	private String productName;
	
	@NotNull
	@JsonProperty
	private Date warranty;
	
	@NotNull
	@JsonProperty
	private Date lifespan;
	
	@NotNull
	@JsonProperty
	private String status;
	
	@NotNull
	@JsonProperty
	private String type;
	
	public int getProductId() {
		return productId;
	}
	public Product setProductId(int productId) {
		this.productId = productId;
		return this;
	}
	public String getSerialNr() {
		return serialNr;
	}
	public Product setSerialNr(String serialNr) {
		this.serialNr = serialNr;
		return this;
	}
	public String getProductNr() {
		return productNr;
	}
	public Product setProductNr(String productNr) {
		this.productNr = productNr;
		return this;
	}
	public String getProductName() {
		return productName;
	}
	public Product setProductName(String productName) {
		this.productName = productName;
		return this;
	}
	public Date getWarranty() {
		return warranty;
	}
	public Product setWarranty(Date warranty) {
		this.warranty = warranty;
		return this;
	}
	public Date getLifespan() {
		return lifespan;
	}
	public Product setLifespan(Date lifespan) {
		this.lifespan = lifespan;
		return this;
	}
	public String getStatus() {
		return status;
	}
	public Product setStatus(String status) {
		this.status = status;
		return this;
	}
	public String getType() {
		return type;
	}
	public Product setType(String type) {
		this.type = type;
		return this;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((lifespan == null) ? 0 : lifespan.hashCode());
		result = prime * result + productId;
		result = prime * result
				+ ((productName == null) ? 0 : productName.hashCode());
		result = prime * result
				+ ((productNr == null) ? 0 : productNr.hashCode());
		result = prime * result
				+ ((serialNr == null) ? 0 : serialNr.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		result = prime * result
				+ ((warranty == null) ? 0 : warranty.hashCode());
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
		Product other = (Product) obj;
		if (lifespan == null) {
			if (other.lifespan != null)
				return false;
		} else if (!lifespan.equals(other.lifespan))
			return false;
		if (productId != other.productId)
			return false;
		if (productName == null) {
			if (other.productName != null)
				return false;
		} else if (!productName.equals(other.productName))
			return false;
		if (productNr == null) {
			if (other.productNr != null)
				return false;
		} else if (!productNr.equals(other.productNr))
			return false;
		if (serialNr == null) {
			if (other.serialNr != null)
				return false;
		} else if (!serialNr.equals(other.serialNr))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		if (type == null) {
			if (other.type != null)
				return false;
		} else if (!type.equals(other.type))
			return false;
		if (warranty == null) {
			if (other.warranty != null)
				return false;
		} else if (!warranty.equals(other.warranty))
			return false;
		return true;
	}
	
}
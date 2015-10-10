package com.assetmanager.solution.product;

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
	private String status;
	
	@NotNull
	@JsonProperty
	private String p_productNr;
	
	@NotNull
	@JsonProperty
	private Date p_warranty;
	
	@NotNull
	@JsonProperty
	private Date p_lifespan;
	
	@NotNull
	@JsonProperty
	private Date p_purchased;
	
	@JsonProperty
	private Date p_disposed;
	
	@NotNull
	@JsonProperty
	private String comment;

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

	public String getStatus() {
		return status;
	}

	public Product setStatus(String status) {
		this.status = status;
		return this;
	}

	public String getP_productNr() {
		return p_productNr;
	}

	public Product setP_productNr(String p_productNr) {
		this.p_productNr = p_productNr;
		return this;
	}

	public Date getP_warranty() {
		return p_warranty;
	}

	public Product setP_warranty(Date p_warranty) {
		this.p_warranty = p_warranty;
		return this;
	}

	public Date getP_lifespan() {
		return p_lifespan;
	}

	public Product setP_lifespan(Date p_lifespan) {
		this.p_lifespan = p_lifespan;
		return this;
	}

	public Date getP_purchased() {
		return p_purchased;
	}

	public Product setP_purchased(Date p_purchased) {
		this.p_purchased = p_purchased;
		return this;
	}

	public Date getP_disposed() {
		return p_disposed;
	}

	public Product setP_disposed(Date p_disposed) {
		this.p_disposed = p_disposed;
		return this;
	}

	public String getComment() {
		return comment;
	}

	public Product setComment(String comment) {
		this.comment = comment;
		return this;
	}

	
	
}
package com.assetmanager.solution.mpview;

import java.util.Date;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Mpview {
	
	
	//Model
	@NotNull
	@JsonProperty
	private int modelId;
	
	@NotNull
	@JsonProperty
	private String name;
	
	@NotNull
	@JsonProperty
	private String type;
	
	@NotNull
	@JsonProperty
	private String m_productNr;
	
	@NotNull
	@JsonProperty
	private int m_warranty;
	
	@NotNull
	@JsonProperty
	private int m_lifespan;
	
	@JsonProperty
	private String m_image;
	
	@JsonProperty
	private String m_tbimage;
	
	
	//Product
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
	private String comment; 
	
	
	//ModelProduct
	@NotNull
	@JsonProperty
	private int fk_modelId;
	
	@NotNull
	@JsonProperty
	private int fk_productId;
	

	public int getModelId() {
		return modelId;
	}

	public Mpview setModelId(int modelId) {
		this.modelId = modelId;
		return this;
	}

	public String getName() {
		return name;
	}

	public Mpview setName(String name) {
		this.name = name;
		return this;
	}

	public String getType() {
		return type;
	}

	public Mpview setType(String type) {
		this.type = type;
		return this;
	}

	public String getM_productNr() {
		return m_productNr;
	}

	public Mpview setM_productNr(String m_productNr) {
		this.m_productNr = m_productNr;
		return this;
	}

	public int getM_warranty() {
		return m_warranty;
	}

	public Mpview setM_warranty(int m_warranty) {
		this.m_warranty = m_warranty;
		return this;
	}

	public int getM_lifespan() {
		return m_lifespan;
	}

	public Mpview setM_lifespan(int m_lifespan) {
		this.m_lifespan = m_lifespan;
		return this;
	}

	public String getM_image() {
		return m_image;
	}

	public Mpview setM_image(String m_image) {
		this.m_image = m_image;
		return this;
	}

	public String getM_tbimage() {
		return m_tbimage;
	}

	public Mpview setM_tbimage(String m_tbimage) {
		this.m_tbimage = m_tbimage;
		return this;
	}

	public int getProductId() {
		return productId;
	}

	public Mpview setProductId(int productId) {
		this.productId = productId;
		return this;
	}

	public String getSerialNr() {
		return serialNr;
	}

	public Mpview setSerialNr(String serialNr) {
		this.serialNr = serialNr;
		return this;
	}

	public String getStatus() {
		return status;
	}

	public Mpview setStatus(String status) {
		this.status = status;
		return this;
	}

	public String getP_productNr() {
		return p_productNr;
	}

	public Mpview setP_productNr(String p_productNr) {
		this.p_productNr = p_productNr;
		return this;
	}

	public Date getP_warranty() {
		return p_warranty;
	}

	public Mpview setP_warranty(Date p_warranty) {
		this.p_warranty = p_warranty;
		return this;
	}

	public Date getP_lifespan() {
		return p_lifespan;
	}

	public Mpview setP_lifespan(Date p_lifespan) {
		this.p_lifespan = p_lifespan;
		return this;
	}

	public int getFk_modelId() {
		return fk_modelId;
	}

	public Mpview setFk_modelId(int fk_modelId) {
		this.fk_modelId = fk_modelId;
		return this;
	}

	public int getFk_productId() {
		return fk_productId;
	}

	public Mpview setFk_productId(int fk_productId) {
		this.fk_productId = fk_productId;
		return this;
	}

	public String getComment() {
		return comment;
	}

	public Mpview setComment(String comment) {
		this.comment = comment;
		return this;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + fk_modelId;
		result = prime * result + fk_productId;
		result = prime * result + m_lifespan;
		result = prime * result
				+ ((m_productNr == null) ? 0 : m_productNr.hashCode());
		result = prime * result + m_warranty;
		result = prime * result + modelId;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result
				+ ((p_lifespan == null) ? 0 : p_lifespan.hashCode());
		result = prime * result
				+ ((p_productNr == null) ? 0 : p_productNr.hashCode());
		result = prime * result
				+ ((p_warranty == null) ? 0 : p_warranty.hashCode());
		result = prime * result + productId;
		result = prime * result
				+ ((serialNr == null) ? 0 : serialNr.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result + ((type == null) ? 0 : type.hashCode());
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
		Mpview other = (Mpview) obj;
		if (fk_modelId != other.fk_modelId)
			return false;
		if (fk_productId != other.fk_productId)
			return false;
		if (m_lifespan != other.m_lifespan)
			return false;
		if (m_productNr == null) {
			if (other.m_productNr != null)
				return false;
		} else if (!m_productNr.equals(other.m_productNr))
			return false;
		if (m_warranty != other.m_warranty)
			return false;
		if (modelId != other.modelId)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (p_lifespan == null) {
			if (other.p_lifespan != null)
				return false;
		} else if (!p_lifespan.equals(other.p_lifespan))
			return false;
		if (p_productNr == null) {
			if (other.p_productNr != null)
				return false;
		} else if (!p_productNr.equals(other.p_productNr))
			return false;
		if (p_warranty == null) {
			if (other.p_warranty != null)
				return false;
		} else if (!p_warranty.equals(other.p_warranty))
			return false;
		if (productId != other.productId)
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
		return true;
	}
	
	
	
}
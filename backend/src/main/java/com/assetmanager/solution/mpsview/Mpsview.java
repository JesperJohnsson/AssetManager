package com.assetmanager.solution.mpsview;

import java.util.Date;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Mpsview {
	
	@NotNull
	@JsonProperty
	private int m_id;
	
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
	
	@NotNull
	@JsonProperty
	private int p_id;
	
	@NotNull
	@JsonProperty
	private String p_name;
	
	@NotNull
	@JsonProperty
	private String p_type;
	
	@NotNull
	@JsonProperty
	private String p_serialNr;
	
	@NotNull
	@JsonProperty
	private String p_status;
	
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
	private String p_comment;
	
	@NotNull
	@JsonProperty
	private int s_id;
	
	@NotNull
	@JsonProperty
	private String s_name;

	public int getM_id() {
		return m_id;
	}

	public Mpsview setM_id(int m_id) {
		this.m_id = m_id;
		return this;
	}

	public String getM_productNr() {
		return m_productNr;
	}

	public Mpsview setM_productNr(String m_productNr) {
		this.m_productNr = m_productNr;
		return this;
	}

	public int getM_warranty() {
		return m_warranty;
	}

	public Mpsview setM_warranty(int m_warranty) {
		this.m_warranty = m_warranty;
		return this;
	}

	public int getM_lifespan() {
		return m_lifespan;
	}

	public Mpsview setM_lifespan(int m_lifespan) {
		this.m_lifespan = m_lifespan;
		return this;
	}

	public String getM_image() {
		return m_image;
	}

	public Mpsview setM_image(String m_image) {
		this.m_image = m_image;
		return this;
	}

	public String getM_tbimage() {
		return m_tbimage;
	}

	public Mpsview setM_tbimage(String m_tbimage) {
		this.m_tbimage = m_tbimage;
		return this;
	}

	public int getP_id() {
		return p_id;
	}

	public Mpsview setP_id(int p_id) {
		this.p_id = p_id;
		return this;
	}

	public String getP_name() {
		return p_name;
	}

	public Mpsview setP_name(String p_name) {
		this.p_name = p_name;
		return this;
	}

	public String getP_type() {
		return p_type;
	}

	public Mpsview setP_type(String p_type) {
		this.p_type = p_type;
		return this;
	}

	public String getP_serialNr() {
		return p_serialNr;
	}

	public Mpsview setP_serialNr(String p_serialNr) {
		this.p_serialNr = p_serialNr;
		return this;
	}

	public String getP_status() {
		return p_status;
	}

	public Mpsview setP_status(String p_status) {
		this.p_status = p_status;
		return this;
	}

	public Date getP_warranty() {
		return p_warranty;
	}

	public Mpsview setP_warranty(Date p_warranty) {
		this.p_warranty = p_warranty;
		return this;
	}

	public Date getP_lifespan() {
		return p_lifespan;
	}

	public Mpsview setP_lifespan(Date p_lifespan) {
		this.p_lifespan = p_lifespan;
		return this;
	}
	
	public Date getP_purchased() {
		return p_purchased;
	}

	public Mpsview setP_purchased(Date p_purchased) {
		this.p_purchased = p_purchased;
		return this;
	}

	public Date getP_disposed() {
		return p_disposed;
	}

	public Mpsview setP_disposed(Date p_disposed) {
		this.p_disposed = p_disposed;
		return this;
	}

	public String getP_comment() {
		return p_comment;
	}

	public Mpsview setP_comment(String p_comment) {
		this.p_comment = p_comment;
		return this;
	}

	public int getS_id() {
		return s_id;
	}

	public Mpsview setS_id(int s_id) {
		this.s_id = s_id;
		return this;
	}

	public String getS_name() {
		return s_name;
	}

	public Mpsview setS_name(String s_name) {
		this.s_name = s_name;
		return this;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + m_id;
		result = prime * result + m_lifespan;
		result = prime * result
				+ ((m_productNr == null) ? 0 : m_productNr.hashCode());
		result = prime * result + m_warranty;
		result = prime * result
				+ ((p_comment == null) ? 0 : p_comment.hashCode());
		result = prime * result + p_id;
		result = prime * result
				+ ((p_lifespan == null) ? 0 : p_lifespan.hashCode());
		result = prime * result + ((p_name == null) ? 0 : p_name.hashCode());
		result = prime * result
				+ ((p_serialNr == null) ? 0 : p_serialNr.hashCode());
		result = prime * result
				+ ((p_status == null) ? 0 : p_status.hashCode());
		result = prime * result + ((p_type == null) ? 0 : p_type.hashCode());
		result = prime * result
				+ ((p_warranty == null) ? 0 : p_warranty.hashCode());
		result = prime * result + s_id;
		result = prime * result + ((s_name == null) ? 0 : s_name.hashCode());
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
		Mpsview other = (Mpsview) obj;
		if (m_id != other.m_id)
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
		if (p_comment == null) {
			if (other.p_comment != null)
				return false;
		} else if (!p_comment.equals(other.p_comment))
			return false;
		if (p_id != other.p_id)
			return false;
		if (p_lifespan == null) {
			if (other.p_lifespan != null)
				return false;
		} else if (!p_lifespan.equals(other.p_lifespan))
			return false;
		if (p_name == null) {
			if (other.p_name != null)
				return false;
		} else if (!p_name.equals(other.p_name))
			return false;
		if (p_serialNr == null) {
			if (other.p_serialNr != null)
				return false;
		} else if (!p_serialNr.equals(other.p_serialNr))
			return false;
		if (p_status == null) {
			if (other.p_status != null)
				return false;
		} else if (!p_status.equals(other.p_status))
			return false;
		if (p_type == null) {
			if (other.p_type != null)
				return false;
		} else if (!p_type.equals(other.p_type))
			return false;
		if (p_warranty == null) {
			if (other.p_warranty != null)
				return false;
		} else if (!p_warranty.equals(other.p_warranty))
			return false;
		if (s_id != other.s_id)
			return false;
		if (s_name == null) {
			if (other.s_name != null)
				return false;
		} else if (!s_name.equals(other.s_name))
			return false;
		return true;
	}
	
	
	
}
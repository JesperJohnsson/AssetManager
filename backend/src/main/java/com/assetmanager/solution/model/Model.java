package com.assetmanager.solution.model;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Model {
	
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
	
	public int getModelId() {
		return modelId;
	}

	public Model setModelId(int modelId) {
		this.modelId = modelId;
		return this;
	}

	public String getName() {
		return name;
	}

	public Model setName(String name) {
		this.name = name;
		return this;
	}

	public String getType() {
		return type;
	}

	public Model setType(String type) {
		this.type = type;
		return this;
	}

	public String getM_productNr() {
		return m_productNr;
	}

	public Model setM_productNr(String m_productNr) {
		this.m_productNr = m_productNr;
		return this;
	}

	public int getM_warranty() {
		return m_warranty;
	}

	public Model setM_warranty(int m_warranty) {
		this.m_warranty = m_warranty;
		return this;
	}

	public int getM_lifespan() {
		return m_lifespan;
	}

	public Model setM_lifespan(int m_lifespan) {
		this.m_lifespan = m_lifespan;
		return this;
	}

	public String getM_image() {
		return m_image;
	}

	public Model setM_image(String m_image) {
		this.m_image = m_image;
		return this;
	}

	public String getM_tbimage() {
		return m_tbimage;
	}

	public Model setM_tbimage(String m_tbimage) {
		this.m_tbimage = m_tbimage;
		return this;
	}
	
	
}
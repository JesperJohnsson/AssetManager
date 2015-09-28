package com.assetmanager.solution.modelproduct;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ModelProduct {
	@NotNull
	@JsonProperty
	private int modelId;
	
	@NotNull
	@JsonProperty
	private int productId;

	public int getModelId() {
		return modelId;
	}

	public ModelProduct setModelId(int modelId) {
		this.modelId = modelId;
		return this;
	}

	public int getProductId() {
		return productId;
	}

	public ModelProduct setProductId(int productId) {
		this.productId = productId;
		return this;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + modelId;
		result = prime * result + productId;
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
		ModelProduct other = (ModelProduct) obj;
		if (modelId != other.modelId)
			return false;
		if (productId != other.productId)
			return false;
		return true;
	}

}
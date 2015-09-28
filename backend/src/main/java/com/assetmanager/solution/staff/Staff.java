package com.assetmanager.solution.staff;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Staff {
	
	@NotNull
	@JsonProperty
	private int staffId;
	
	@NotNull
	@JsonProperty
	private String name;

	public int getStaffId() {
		return staffId;
	}

	public Staff setStaffId(int staffId) {
		this.staffId = staffId;
		return this;
	}

	public String getName() {
		return name;
	}

	public Staff setName(String name) {
		this.name = name;
		return this;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
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
		Staff other = (Staff) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (staffId != other.staffId)
			return false;
		return true;
	}
	
	
}


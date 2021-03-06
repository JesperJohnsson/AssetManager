package com.assetmanager.solution.staff.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import com.assetmanager.solution.staff.Staff;

public class StaffMapper implements ResultSetMapper<Staff> {

	@Override
	public Staff map(int index, ResultSet r, StatementContext ctx) throws SQLException {
		return new Staff()
			.setStaffId(r.getInt("STAFFID"))
			.setName(r.getString("NAME"));
	}
	
}
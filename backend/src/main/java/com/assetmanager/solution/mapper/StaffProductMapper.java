package com.assetmanager.solution.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import com.assetmanager.solution.StaffProduct;

public class StaffProductMapper implements ResultSetMapper<StaffProduct> {
	@Override
	public StaffProduct map(int index, ResultSet r, StatementContext ctx) throws SQLException {
		return new StaffProduct()
			.setProductId(r.getInt("PRODUCTID"))
			.setStaffId(r.getInt("STAFFID"));
	}
}
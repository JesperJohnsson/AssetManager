package com.assetmanager.solution.modelproduct.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import com.assetmanager.solution.modelproduct.ModelProduct;

public class ModelProductMapper implements ResultSetMapper<ModelProduct> {
	@Override
	public ModelProduct map(int index, ResultSet r, StatementContext ctx) throws SQLException {
		return new ModelProduct()
			.setModelId(r.getInt("FK_MODELID"))
			.setProductId(r.getInt("FK_PRODUCTID"));
	}
}
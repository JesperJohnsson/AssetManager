package com.assetmanager.solution.model.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import com.assetmanager.solution.model.Model;

public class ModelMapper implements ResultSetMapper<Model> {
	@Override
	public Model map(int index, ResultSet r, StatementContext ctx) throws SQLException {
		return new Model()
			.setModelId(r.getInt("MODELID"))
			.setName(r.getString("NAME"))
			.setType(r.getString("TYPE"))
			.setM_productNr(r.getString("M_PRODUCTNR"))
			.setM_warranty(r.getInt("M_WARRANTY"))
			.setM_lifespan(r.getInt("M_LIFESPAN"));
	}
}
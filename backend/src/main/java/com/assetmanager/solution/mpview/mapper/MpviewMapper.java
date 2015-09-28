package com.assetmanager.solution.mpview.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import com.assetmanager.solution.mpview.Mpview;

public class MpviewMapper implements ResultSetMapper<Mpview> {
	@Override
	public Mpview map(int index, ResultSet r, StatementContext ctx) throws SQLException {
		return new Mpview()
			.setModelId(r.getInt("MODELID"))
			.setName(r.getString("NAME"))
			.setType(r.getString("TYPE"))
			.setM_productNr(r.getString("M_PRODUCTNR"))
			.setM_warranty(r.getInt("M_WARRANTY"))
			.setM_lifespan(r.getInt("M_LIFESPAN"))
			.setFk_modelId(r.getInt("FK_MODELID"))
			.setFk_productId(r.getInt("FK_PRODUCTID"))
			.setProductId(r.getInt("PRODUCTID"))
			.setSerialNr(r.getString("SERIALNR"))
			.setStatus(r.getString("STATUS"))
			.setP_productNr(r.getString("P_PRODUCTNR"))
			.setP_warranty(r.getDate("P_WARRANTY"))
			.setP_lifespan(r.getDate("P_LIFESPAN"))
			.setComment(r.getString("COMMENT"));
	}
}
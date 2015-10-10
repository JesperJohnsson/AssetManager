package com.assetmanager.solution.mpsview.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import com.assetmanager.solution.mpsview.Mpsview;

public class MpsviewMapper implements ResultSetMapper<Mpsview> {
	@Override
	public Mpsview map(int index, ResultSet r, StatementContext ctx) throws SQLException {
		return new Mpsview()
			.setM_id(r.getInt("M_ID"))
			.setM_productNr(r.getString("M_PRODUCTNR"))
			.setM_warranty(r.getInt("M_WARRANTY"))
			.setM_lifespan(r.getInt("M_LIFESPAN"))
			.setM_image(r.getString("M_IMAGE"))
			.setM_tbimage(r.getString("M_TBIMAGE"))
			.setP_id(r.getInt("P_ID"))
			.setP_name(r.getString("P_NAME"))
			.setP_type(r.getString("P_TYPE"))
			.setP_serialNr(r.getString("P_SERIALNR"))
			.setP_status(r.getString("P_STATUS"))
			.setP_warranty(r.getDate("P_WARRANTY"))
			.setP_lifespan(r.getDate("P_LIFESPAN"))
			.setP_comment(r.getString("P_COMMENT"))
			.setP_purchased(r.getDate("P_PURCHASED"))
			.setP_disposed(r.getDate("P_DISPOSED"))
			.setS_id(r.getInt("S_ID"))
			.setS_name(r.getString("S_NAME"));
	}
}
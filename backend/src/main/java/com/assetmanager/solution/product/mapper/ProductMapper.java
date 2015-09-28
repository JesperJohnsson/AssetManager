package com.assetmanager.solution.product.mapper;

import com.assetmanager.solution.product.Product;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ProductMapper implements ResultSetMapper<Product> {
	@Override
	public Product map(int index, ResultSet r, StatementContext ctx) throws SQLException {
		return new Product()
			.setProductId(r.getInt("PRODUCTID"))
			.setSerialNr(r.getString("SERIALNR"))
			.setStatus(r.getString("STATUS"))
			.setP_productNr(r.getString("P_PRODUCTNR"))
			.setP_warranty(r.getDate("P_WARRANTY"))
			.setP_lifespan(r.getDate("P_LIFESPAN"))
			.setComment(r.getString("COMMENT"));
	}
}
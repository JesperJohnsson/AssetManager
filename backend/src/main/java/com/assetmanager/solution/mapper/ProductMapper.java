package com.assetmanager.solution.mapper;

import com.assetmanager.solution.Product;
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
			.setProductNr(r.getString("PRODUCTNR"))
			.setProductName(r.getString("PRODUCTNAME"))
			.setWarranty(r.getDate("WARRANTY"))
			.setLifespan(r.getDate("LIFESPAN"))
			.setStatus(r.getString("STATUS"))
			.setType(r.getString("TYPE"));
	}
}
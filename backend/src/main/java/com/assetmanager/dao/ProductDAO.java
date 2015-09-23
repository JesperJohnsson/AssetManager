package com.assetmanager.dao;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import com.assetmanager.solution.Product;
import com.assetmanager.solution.mapper.ProductMapper;

@RegisterMapper(ProductMapper.class)
public interface ProductDAO {
	
	@SqlQuery("SELECT PRODUCTID FROM PRODUCT ORDER BY PRODUCTID DESC LIMIT 1")
	int getCount();
	
	@SqlQuery("SELECT * FROM PRODUCT")
	List<Product> getAll();
	
	@SqlQuery("SELECT * FROM PRODUCT WHERE PRODUCTID = :productId")
	Product findByProductId(@Bind("productId") int productId);
	
	@SqlUpdate("DELETE FROM PRODUCT WHERE PRODUCTID = :productId")
	int deleteByProductId(@Bind("productId") int productId);
	
	@SqlUpdate("UPDATE PRODUCT SET SERIALNR = :serialNr, PRODUCTNR = :productNr, PRODUCTNAME = :productName, STATUS = :status, WARRANTY = :warranty, LIFESPAN = :lifespan, TYPE = :type WHERE PRODUCTID = :productId")
	int update(@BindBean Product product);
	
	@SqlUpdate("INSERT INTO PRODUCT (PRODUCTID, SERIALNR, PRODUCTNR, PRODUCTNAME, WARRANTY, LIFESPAN, STATUS, TYPE) VALUES(:productId, :serialNr, :productNr, :productName, :warranty, :lifespan, :status, :type)")
	int insert(@BindBean Product product);	
}
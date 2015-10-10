package com.assetmanager.dao;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import com.assetmanager.solution.product.Product;
import com.assetmanager.solution.product.mapper.ProductMapper;

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
	
	@SqlUpdate("UPDATE PRODUCT SET SERIALNR = :serialNr, STATUS = :status, P_PRODUCTNR = :p_productNr, P_WARRANTY = :p_warranty, P_LIFESPAN = :p_lifespan, P_PURCHASED = :p_purchased, P_DISPOSED = :p_disposed, COMMENT = :comment WHERE PRODUCTID = :productId")
	int update(@BindBean Product product);
	
	@SqlUpdate("INSERT INTO PRODUCT (PRODUCTID, SERIALNR, STATUS, P_PRODUCTNR, P_WARRANTY, P_LIFESPAN, P_PURCHASED, P_DISPOSED, COMMENT) VALUES(:productId, :serialNr, :status, :p_productNr, :p_warranty, :p_lifespan, :p_purchased, :p_disposed, :comment)")
	int insert(@BindBean Product product);	
	
	@SqlUpdate("UPDATE PRODUCT SET P_DISPOSED = CURRENT_DATE(), STATUS = 'Disposed' WHERE PRODUCTID = :productId")
	int dipose(@Bind("productId") int productId);
}
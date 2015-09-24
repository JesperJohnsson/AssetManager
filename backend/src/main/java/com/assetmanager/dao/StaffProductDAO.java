package com.assetmanager.dao;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import com.assetmanager.solution.StaffProduct;
import com.assetmanager.solution.mapper.StaffProductMapper;

@RegisterMapper(StaffProductMapper.class)
public interface StaffProductDAO {
	
	@SqlQuery("SELECT * FROM STAFFPRODUCT")
	List<StaffProduct> getAll();
	
	@SqlQuery("SELECT * FROM STAFFPRODUCT WHERE PRODUCTID = :productId")
	StaffProduct findByProductId(@Bind("productId") int productId);
	
	@SqlUpdate("DELETE FROM STAFFPRODUCT WHERE PRODUCTID = :productId")
	int deleteByProductId(@Bind("productId") int productId);
	
	@SqlUpdate("UPDATE STAFFPRODUCT SET STAFFID = :staffId WHERE PRODUCTID = :productId")
	int update(@BindBean StaffProduct staffproduct);
	
	@SqlUpdate("INSERT INTO STAFFPRODUCT (PRODUCTID, STAFFID) VALUES(:productId, :staffId)")
	int insert(@BindBean StaffProduct staffproduct);	
	
	
}
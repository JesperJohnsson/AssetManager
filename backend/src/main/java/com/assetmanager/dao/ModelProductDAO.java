package com.assetmanager.dao;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import com.assetmanager.solution.modelproduct.ModelProduct;
import com.assetmanager.solution.modelproduct.mapper.ModelProductMapper;


@RegisterMapper(ModelProductMapper.class)
public interface ModelProductDAO {
	
	@SqlQuery("SELECT * FROM MODELPRODUCT")
	List<ModelProduct> getAll();
	
	@SqlQuery("SELECT * FROM MODELPRODUCT WHERE FK_PRODUCTID = :productId")
	ModelProduct findByModelId(@Bind("productId") int productId);
	
	@SqlUpdate("DELETE FROM MODELPRODUCT WHERE FK_PRODUCTID = :productId")
	int deleteByModelId(@Bind("productId") int productId);
	
	@SqlUpdate("UPDATE MODELPRODUCT SET FK_MODELID = :modelId WHERE FK_PRODUCTID = :productId")
	int update(@BindBean ModelProduct modelproduct);
	
	@SqlUpdate("INSERT INTO MODELPRODUCT (FK_MODELID, FK_PRODUCTID) VALUES(:modelId, :productId)")
	int insert(@BindBean ModelProduct modelproduct);	
	
	
}
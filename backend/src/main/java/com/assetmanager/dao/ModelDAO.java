package com.assetmanager.dao;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import com.assetmanager.solution.model.Model;
import com.assetmanager.solution.model.mapper.ModelMapper;

@RegisterMapper(ModelMapper.class)
public interface ModelDAO {
	
	//Statistics
	
	@SqlQuery("SELECT AVG(CAST(M_WARRANTY AS FLOAT)) AS AVG_WARRANTY FROM MODEL WHERE TYPE = :type")
	Float getAverageWarranty(@Bind("type") String type);
	
	@SqlQuery("SELECT AVG(CAST(M_LIFESPAN AS FLOAT)) AS AVG_LIFESPAN FROM MODEL WHERE TYPE = :type")
	Float getAverageLifespan(@Bind("type") String type);
	
	//------------------------------------------------
	
	@SqlQuery("SELECT MODELID FROM MODEL ORDER BY MODELID DESC LIMIT 1")
	int getCount();
	
	@SqlQuery("SELECT * FROM MODEL")
	List<Model> getAll();
	
	@SqlQuery("SELECT * FROM MODEL WHERE MODELID = :modelId")
	Model findByModelId(@Bind("modelId") int model);
	
	@SqlQuery("SELECT * FROM MODEL WHERE M_PRODUCTNR = :productNr")
	Model findByProductNr(@Bind("productNr") String productNr);
	
	@SqlUpdate("DELETE FROM MODEL WHERE MODELID = :modelId")
	int deleteByModelId(@Bind("modelId") int model);
	
	@SqlUpdate("UPDATE MODEL SET NAME = :name, TYPE = :type, M_PRODUCTNR = :m_productNr, M_WARRANTY = :m_warranty, M_LIFESPAN = :m_lifespan, M_IMAGE = :m_image WHERE MODELID = :modelId")
	int update(@BindBean Model model);
	
	@SqlUpdate("INSERT INTO MODEL (MODELID, NAME, TYPE, M_PRODUCTNR, M_WARRANTY, M_LIFESPAN, M_IMAGE, M_TBIMAGE) VALUES(:modelId, :name, :type, :m_productNr, :m_warranty, :m_lifespan, :m_image, :m_tbimage)")
	int insert(@BindBean Model model);	
}
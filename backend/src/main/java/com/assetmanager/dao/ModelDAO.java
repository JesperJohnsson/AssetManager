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
	
	@SqlUpdate("UPDATE MODEL SET NAME = :name, TYPE = :type, M_PRODUCTNR = :m_productNr, M_WARRANTY = :m_warranty, M_LIFESPAN = :m_lifespan WHERE MODELID = :modelId")
	int update(@BindBean Model model);
	
	@SqlUpdate("INSERT INTO MODEL (MODELID, NAME, TYPE, M_PRODUCTNR, M_WARRANTY, M_LIFESPAN) VALUES(:modelId, :name, :type, :m_productNr, :m_warranty, :m_lifespan)")
	int insert(@BindBean Model model);	
}
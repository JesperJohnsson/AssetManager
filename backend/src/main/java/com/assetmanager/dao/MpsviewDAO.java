package com.assetmanager.dao;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import com.assetmanager.solution.mpsview.Mpsview;
import com.assetmanager.solution.mpsview.mapper.MpsviewMapper;

@RegisterMapper(MpsviewMapper.class)
public interface MpsviewDAO {
	
	@SqlQuery("SELECT * FROM MPS")
	List<Mpsview> getAll();
	
	@SqlQuery("SELECT * FROM MPS WHERE P_ID = :productId")
	Mpsview findByProductId(@Bind("productId") int productId);
	
	@SqlQuery("SELECT * FROM MPS WHERE M_ID = :modelId")
	List<Mpsview> findByModelId(@Bind("modelId") int modelId);
	
	@SqlQuery("SELECT * FROM MPS WHERE S_ID = :staffId")
	List<Mpsview> findByStaffId(@Bind("staffId") int staffId);
}
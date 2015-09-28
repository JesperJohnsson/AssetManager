package com.assetmanager.dao;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import com.assetmanager.solution.mpview.Mpview;
import com.assetmanager.solution.mpview.mapper.MpviewMapper;

@RegisterMapper(MpviewMapper.class)
public interface MpviewDAO {
	
	@SqlQuery("SELECT * FROM MP")
	List<Mpview> getAll();
	
	@SqlQuery("SELECT * FROM MP WHERE PRODUCTID = :productId")
	Mpview findByProductId(@Bind("productId") int productId);
}
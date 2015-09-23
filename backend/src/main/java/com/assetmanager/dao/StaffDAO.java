package com.assetmanager.dao;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import com.assetmanager.solution.Staff;
import com.assetmanager.solution.mapper.StaffMapper;

@RegisterMapper(StaffMapper.class)
public interface StaffDAO {
	
	@SqlQuery("SELECT STAFFID FROM STAFF ORDER BY STAFFID DESC LIMIT 1;")
	int getCount();
	
	@SqlQuery("SELECT * FROM STAFF")
	List<Staff> getAll();
	
	@SqlQuery("SELECT * FROM STAFF WHERE STAFFID = :staffId")
	Staff findByStaffId(@Bind("staffId") int staffId);
	
	@SqlUpdate("DELETE FROM STAFF WHERE STAFFID = :staffId")
	int deleteByStaffId(@Bind("staffId") int staffId);
	
	@SqlUpdate("UPDATE STAFF SET NAME = :name, PHONE = :phone WHERE STAFFID = :staffId")
	int update(@BindBean Staff staff);
	
	@SqlUpdate("INSERT INTO STAFF (STAFFID, NAME, PHONE) VALUES(:staffId, :name, :phone)")
	int insert(@BindBean Staff staff);	
}
package com.assetmanager.solution.staff;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.assetmanager.dao.StaffDAO;


@Path("/staff")
@Consumes({MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_JSON})
public class StaffResource {
	
	StaffDAO staffDAO;
	AtomicInteger counter;
	
	public StaffResource(StaffDAO staffDAO) {
		this.staffDAO = staffDAO;
		counter = new AtomicInteger(staffDAO.getCount());
	}
	
	@GET
	public List<Staff> getAll() {
		return staffDAO.getAll();
	}
	
	@GET
	@Path("/{staffId}")
	public Staff get(@PathParam("staffId") int staffId) {
		return staffDAO.findByStaffId(staffId);
	}
	
	@POST
	public Staff insert(@Valid Staff staff) {
		staff.setStaffId(counter.incrementAndGet());
		staffDAO.insert(staff);
		return staff;
	}
	
	@PUT
	@Path("/{staffId}")
	public Staff update(@PathParam("staffId") int staffId, @Valid Staff staff) {
		staff = staff.setStaffId(staffId);
		staffDAO.update(staff);
		return staff;
	}
	
	@DELETE
	@Path("/{staffId}")
	public void delete(@PathParam("staffId") int staffId) {
		staffDAO.deleteByStaffId(staffId);
	}
}

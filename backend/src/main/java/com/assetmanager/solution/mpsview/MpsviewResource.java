package com.assetmanager.solution.mpsview;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.assetmanager.dao.MpsviewDAO;


@Path("/mpsview")
@Consumes({MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_JSON})
public class MpsviewResource {
	
	MpsviewDAO mpsviewDAO;
	
	public MpsviewResource(MpsviewDAO mpsviewDAO) {
		this.mpsviewDAO = mpsviewDAO;
	}
	
	@GET
	public List<Mpsview> getAll() {
		return mpsviewDAO.getAll();
	}
	
	@GET
	@Path("/product/{productId}")
	public Mpsview getWithProductId(@PathParam("productId") int productId) {
		return mpsviewDAO.findByProductId(productId);
	}
	
	@GET
	@Path("/model/{modelId}")
	public List<Mpsview> getAllWithModelId(@PathParam("modelId") int modelId) {
		return mpsviewDAO.findByModelId(modelId);
	}
	
	@GET
	@Path("/staff/{staffId}")
	public List<Mpsview> getAllWithStaffId(@PathParam("staffId") int staffId) {
		return mpsviewDAO.findByStaffId(staffId);
	}
	
}
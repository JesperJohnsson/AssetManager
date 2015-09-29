package com.assetmanager.solution.mpview;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.assetmanager.dao.MpviewDAO;


@Path("/mpview")
@Consumes({MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_JSON})
public class MpviewResource {
	
	MpviewDAO mpviewDAO;
	
	public MpviewResource(MpviewDAO mpviewDAO) {
		this.mpviewDAO = mpviewDAO;
	}
	
	@GET
	public List<Mpview> getAll() {
		return mpviewDAO.getAll();
	}
	
	@GET
	@Path("/storage")
	public List<Mpview> getStorage() {
		return mpviewDAO.getStorage();
	}
	
	@GET
	@Path("/{productId}")
	public Mpview get(@PathParam("productId") int productId) {
		return mpviewDAO.findByProductId(productId);
	}
	
}
package com.assetmanager.solution;

import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.assetmanager.dao.StaffProductDAO;


@Path("/staffproduct")
@Consumes({MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_JSON})
public class StaffProductResource {
	
	StaffProductDAO staffproductDAO;
	
	public StaffProductResource(StaffProductDAO staffproductDAO) {
		this.staffproductDAO = staffproductDAO;
	}
	
	@GET
	public List<StaffProduct> getAll() {
		return staffproductDAO.getAll();
	}
	
	@GET
	@Path("/{productId}")
	public StaffProduct get(@PathParam("productId") int productId) {
		return staffproductDAO.findByProductId(productId);
	}
	
	@POST
	public StaffProduct insert(@Valid StaffProduct staffproduct) {
		int productId = staffproductDAO.insert(staffproduct);
        return staffproduct.setProductId(productId);
	}
	
	@PUT
	@Path("/{productId}")
	public StaffProduct update(@PathParam("productId") int productId, @Valid StaffProduct staffproduct) {
		staffproduct = staffproduct.setProductId(productId);
		staffproductDAO.update(staffproduct);
		return staffproduct;
	}
	
	@DELETE
	@Path("/{productId}")
	public void delete(@PathParam("productId") int productId) {
		staffproductDAO.deleteByProductId(productId);
	}
}
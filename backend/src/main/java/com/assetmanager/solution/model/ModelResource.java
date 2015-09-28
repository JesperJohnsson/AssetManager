package com.assetmanager.solution.model;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

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

import com.assetmanager.dao.ModelDAO;
import com.assetmanager.solution.model.Model;

@Path("/model")
@Consumes({MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_JSON})
public class ModelResource {
	
	ModelDAO modelDAO;
	AtomicInteger modelCounter;
	
	public ModelResource(ModelDAO modelDAO) {
		this.modelDAO = modelDAO;
		modelCounter = new AtomicInteger(modelDAO.getCount());
	}
	
	@GET
	public List<Model> getAll() {
		return modelDAO.getAll();
	}
	
	@GET
	@Path("/lastinserted")
	public Model getLastInsertedRow() {
		return modelDAO.findByModelId(modelDAO.getCount());
	}
	
	@GET
	@Path("/productnr/{productNr}")
	public Model getModelWithProductNr(@PathParam("productNr") String productNr) {
		/*try {
			String result = java.net.URLDecoder.decode(productNr, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}*/
		return modelDAO.findByProductNr(productNr);
	}
	
	@GET
	@Path("/{modelId}")
	public Model get(@PathParam("modelId") int modelId) {
		return modelDAO.findByModelId(modelId);
	}
	
	@POST
	public Model insert(@Valid Model model) {
		if(modelCounter.equals(0)) {
			model.setModelId(0);
		} else {
			model.setModelId(modelCounter.incrementAndGet());
		}
		modelDAO.insert(model);
		return model;
	}
	
	@PUT
	@Path("/{modelId}")
	public Model update(@PathParam("modelId") int modelId, @Valid Model model) {
		model = model.setModelId(modelId);
		modelDAO.update(model);
		return model;
	}
	
	@DELETE
	@Path("/{modelId}")
	public void delete(@PathParam("modelId") int modelId) {
		modelDAO.deleteByModelId(modelId);
	}
}
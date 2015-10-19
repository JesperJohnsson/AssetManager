package com.assetmanager;


import java.sql.SQLException;

import org.h2.tools.Server;
import org.skife.jdbi.v2.DBI;

import com.bazaarvoice.dropwizard.assets.ConfiguredAssetsBundle;

import io.dropwizard.Application;
import io.dropwizard.jdbi.DBIFactory;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

import com.assetmanager.configuration.AssetManagerConfiguration;
import com.assetmanager.dao.ModelDAO;
import com.assetmanager.dao.ModelProductDAO;
import com.assetmanager.dao.MpsviewDAO;
import com.assetmanager.dao.MpviewDAO;
import com.assetmanager.dao.ProductDAO;
import com.assetmanager.dao.StaffDAO;
import com.assetmanager.dao.StaffProductDAO;
import com.assetmanager.solution.model.ModelResource;
import com.assetmanager.solution.modelproduct.ModelProductResource;
import com.assetmanager.solution.mpsview.MpsviewResource;
import com.assetmanager.solution.mpview.MpviewResource;
import com.assetmanager.solution.product.ProductResource;
import com.assetmanager.solution.staffproduct.StaffProductResource;
import com.assetmanager.solution.staff.StaffResource;

public class AssetManagerApplication extends Application<AssetManagerConfiguration>
{

    @Override
    public void run(AssetManagerConfiguration configuration, Environment environment)
    {
		final DBIFactory factory = new DBIFactory();
		final DBI jdbi = factory.build(environment, configuration.getDataSourceFactory(), "h2");
		
		Server myH2adminGUI;
		
		try {
			myH2adminGUI = org.h2.tools.Server.createWebServer("-webDaemon");
			myH2adminGUI.start();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		final ModelDAO modelDao = jdbi.onDemand(ModelDAO.class);
		environment.jersey().register(new ModelResource(modelDao));
		
		final ProductDAO productDao = jdbi.onDemand(ProductDAO.class);
		environment.jersey().register(new ProductResource(productDao));
		
		final StaffDAO staffDao = jdbi.onDemand(StaffDAO.class);
		environment.jersey().register(new StaffResource(staffDao));
		
		final StaffProductDAO staffproductDao = jdbi.onDemand(StaffProductDAO.class);
		environment.jersey().register(new StaffProductResource(staffproductDao));
		
		final ModelProductDAO modelproductDao = jdbi.onDemand(ModelProductDAO.class);
		environment.jersey().register(new ModelProductResource(modelproductDao));
		
		final MpviewDAO mpviewDao = jdbi.onDemand(MpviewDAO.class);
		environment.jersey().register(new MpviewResource(mpviewDao));
		
		final MpsviewDAO mpsviewDao = jdbi.onDemand(MpsviewDAO.class);
		environment.jersey().register(new MpsviewResource(mpsviewDao));
    }
    
    @Override
    public void initialize(Bootstrap<AssetManagerConfiguration> bootstrap)
    {
        bootstrap.addBundle(new ConfiguredAssetsBundle("/assets/", "/", "index.html"));
    }
    

    public static void main(String[] args) throws Exception
    {
        new AssetManagerApplication().run(args);
    }
}
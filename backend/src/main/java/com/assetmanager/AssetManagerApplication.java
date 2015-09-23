package com.assetmanager;


import org.skife.jdbi.v2.DBI;

import com.bazaarvoice.dropwizard.assets.ConfiguredAssetsBundle;

import io.dropwizard.Application;
import io.dropwizard.jdbi.DBIFactory;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

import com.assetmanager.configuration.AssetManagerConfiguration;
import com.assetmanager.dao.ProductDAO;
import com.assetmanager.dao.StaffDAO;
import com.assetmanager.solution.ProductResource;
import com.assetmanager.solution.StaffResource;

/**
 * Main application class for Web Introduction presentation. Will start dropwizard application server.
 * @see <a href="http://www.dropwizard.io/getting-started.html">http://www.dropwizard.io/getting-started.html</a>
 *
 */
public class AssetManagerApplication extends Application<AssetManagerConfiguration>
{

    @Override
    public void run(AssetManagerConfiguration configuration, Environment environment)
    {
		final DBIFactory factory = new DBIFactory();
		final DBI jdbi = factory.build(environment, configuration.getDataSourceFactory(), "h2");
		
		final ProductDAO productDao = jdbi.onDemand(ProductDAO.class);
		environment.jersey().register(new ProductResource(productDao));
		
		final StaffDAO staffDao = jdbi.onDemand(StaffDAO.class);
		environment.jersey().register(new StaffResource(staffDao));
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
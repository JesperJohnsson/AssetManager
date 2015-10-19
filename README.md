# AssetManager
Project for Softhouse in the course Induviduell projektkurs at BTH

## Installation instructions

### Download
Download the zip file or fork the project. Make sure you know the installation/download path of the project.

### Database
Make sure you have the H2 database engine installed and all the tables and views created. When connecting to h2 in the browser, make sure that the database you're connecting to is named ~/assetmanager, the default value is ~/test.

The SQL code for the database is located in the file 

<pre>backend/src/main/resources/db/migration/db.sql.</pre>

After executing the sql code you should have a working database.

### Application
To run the application you can connect in two ways from eclipse using gradle, or a commandprompt using gradle. 
In eclipse you need to have the plugin gradle installed and same goes for the command prompt. 
You'll find all you need about gradle <a href="http://gradle.org/">here</a>. Follow the instructions for either way.

#### Eclipse
Create a run configuration. Create a new run configuration by clicking "Run" in the top menu bar. Then "Run Configurations" in the dropdown menu. In the "Main" tab set "Main class" to

<pre>com.assetmanager.AssetManagerApplication</pre>

and in the tab "Arguments" set "Program arguments" to

<pre>server src/dist/config/assetmanager.yml</pre>

After that you can press the run button and your application will start. This is a first time setup case, when running the program after the first time, all you'll have to do is running the program as usual. By clicking the green play button in eclipse.

#### Command Prompt
Cd into the downloaded/installed project folder. Cd into backend.
Here you will have to have gradle installed to continue. In the backend folder write 

<pre>gradle oneJar</pre>

to make sure the project is up to date. Then to run the application

<pre>java -jar build/libs/backend-standalone.jar server src/dist/config/assetmanager.yml</pre>

here the jar file may have changed name, so to be sure it's correct go into the folder

<pre>build/libs/</pre>

and see if you find a jar file named backend-standalone. If you do you're all set. Otherwise the application should have started in the previous step.

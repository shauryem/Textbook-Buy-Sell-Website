# Deployment Instructions (Lab05)



- Go to http://signup.heroku.com and create an account with Heroku (if you don't already have an account)
- Create a new app on Heroku (click new on the top right corner of your dashboard, then click "Create a new app", enter a name, then click create)
- Click on the app you just created and then click on deploy; scroll down to where it says connect and connect it to the github repo
- Now you just need to set up OAuth and a database and connect them to the heroku app
- To set up OAuth you must first create an account on Auth0 if you don't already (go to https://auth0.com/signup, follow the steps, and make sure you select personal as the account type)
- When you get your account set up or if you already have an account, click on applications tab on the left and then click on create new application (make sure to select single page web application)
- Once you've created the app, click on the app's settings tab and scroll down to where it says "Application URIs"
- In the box that says "Allowed Callback URLs" add "http://[appname].herokuapp.com/api/callback" and in the box that says "Allowed Logout URLs" add "http://[appname].herokuapp.com/" both of which have your heroku app's name in place of [appname]
- Then scroll back up to the top of the page and find where it says "Basic Information"
- Copy the value for domain and then go to your heroku app, click on the settings tab for your app, scroll down to where it says "Config Vars" on the left, click "Reveal Config Vars", and then paste the domain value into the VALUE box. Put "AUTH0_DOMAIN" in the KEY box and then press add
- Go back to the Auth0 app settings page and copy the client id and put it as a config var on heroku with key "AUTH0_CLIENT_ID", then copy the client secret from the Auth0 page and put it as a config var with key "AUTH0_CLIENT_SECRET"
- You also need to add 2 more config vars: add key "POST_LOGOUT_REDIRECT_URI" with value http://[appname].herokuapp.com and then add key "REDIRECT_URI" with value http://[appname].herokuapp.com/callback/api both of which where [appname] is the name of your heroku app (for example our app is named cs48-f19-s3-t4-prod, so our "REDIRECT_URI" is "http://cs48-f19-s3-t4-prod.herokuapp.com/callback/api")
- We also suggest to then go back to the Auth0 page for your app and click on the connections tab (2 right of settings and not the connections tab on the right side of the page) and unclick username-password-authentication and make sure google-oauth is clicked.
- After this all you need to do is set up the database
- To set up a MongoDB database, you need to first create an account with mongoDB Cloud Atlas if you don't already have one
- To do this go to https://mongodb.com/cloud/atlas and click on start free, follow the steps and make sure to do the free plan and select a provider that is close to you (I'm guessing US west will be the best for most members of this CS48) then click Create Cluster
- Cloud Atlas will take a few minutes to create a cluster for you so just wait on the clusters page (should be auto taken to it but if not click on the "Clusters" tab on the left
- Once the page no longer says "Your cluster is being created" click "Network Access" on the left, then click "Add IP Address", then click allow access from anywhere, and then click confirm.
- Then you need to click on the clusters tab on the left and click on connect. Look for where it says Create a MongDB User, write a username (something like adminUser or dbUser is fine), then click on Autogenerate Secure Password, and then click Create MongoDB User
- Then click on Choose a Connection Method and click Connect your Application (the middle option) and copy the line in the grey box right under "Connection String Only" (make sure Connection String Only is clicked and not grey letters)
- Then, go to your heroku app and again go to settings and find config vars (make sure to press reveal config vars) add a new key "MONGODB_URI" and paste what you copied into the value box
- Go back to the Cloud Atlas page and click on Databse Access on the left. Click on edit for the user you have created, click on edit password, click Autogenerate Secure Password again and this time copy the password, and then click Update User.
- Then go back to the Heroku app's settings page and find the config vars and click reveal config vars. Click the purple pencil icon to the right of the MONGODB_URI secret to edit it and replace "password" (includeing the >< carrots) in the value box with the password you have copied, and make sure to click save changes in the bottom right.
- Almost done, but now you need to go back to the cloud atlas page, make sure you're on clusters tab (click clusters on the left), click on collections, then click create database on the left, enter something like database or mainDatabase as the database name and (very important) enter the collection name as "posts" (without the quotes) then click create. If the collection isn't named "posts" the app will not be able to connect with the database with the current way we have it set up
- After this, the app is fully set up, you just need to go back to your heroku app to the deploy tab, scroll down to the bottom, and either set up automatic deploys from the master branch of the repo (click the drop down under Automatic Deploys and click master then click enable automatic deploys) or manually deploy the master branch (click the drop down under Manual Deploy and click master then click deploy). Typically you would want to do automatic deploys so the app is automatically reupdated when changes are made to the source code in the github repo, but manual deploy is fine for this lab.

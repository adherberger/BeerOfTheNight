# BeerOfTheNight
Simple voting application to determine best beer.

To run the app, navigate to botn-ui, and enter the following:
```npm install```
```npm start```

Then in Eclipse, import the botn-backend project and run BotnApplication.java inside the IDE.

By default, the app will run on port 3000, and reach out to localhost:8080 for API calls.
To change the URL for the API (e.g. if you want to run the app on a local network and connect via a mobile device, but still make API calls):

1. Create a file called `.env` in the botn-ui folder
2. Add the following line to `.env`:
```REACT_APP_BOTN_API_ROOT={local-IP-address}:8080```
3. Restart the Node server


### git helpful commands ###
 git config --global user.email "aherberger@gmail.com"
 
 git config --global user.name "Andy Herberger"
 
 #saves your userid and password so you don't have to keep entering them!
 
 git config credential.helper store   

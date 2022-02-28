# [Boston Craft Cocktails](https://github.com/tomfuller71/boston-craft-cocktails)

*A web-site that focuses on the original cocktails available in Boston's many bars and restaurants that make their own original cocktails*

![image main page](/main-page.png "The main page")

### Instructions for use
Please feel free to clone or fork this repo but be aware that to use this you would need api-keys for:
- Yelp Fusion
- Google Maps Javascript API
- AWS/S3

A template .env file is included with the key names but you would need to source your own keys.
Note that the Google Maps key is not in the .env template but should instead be inserted into the `VenueMap.js file`.

In addition the back-end requires access to a Postgres database in the run-time environment - see config set out in `server/src/config/getDatabaseUrl.cjs`.

In you wish to seed a development environment with dummy-data `yarn run db:seed` from the server folder.  This however will require a [cocktailDB key](https://www.thecocktaildb.com/api.php).

### Heroku deployments

To see the current version of this app, feel free to visit:

- [heroku staging](https://fathomless-depths-30256.herokuapp.com/)
- [heroku production](https://boston-craft-cocktails.herokuapp.com/)

Both versions of this site may include images and information taken from The Cocktail Database and should not be copied or used without their permission.


### To-do:
The app remains a work in process, if you are interested please see the project Trello board to see what is currently being worked on and future plans.

- [trello project board](https://trello.com/b/fPvSVEur/breakable-toy)


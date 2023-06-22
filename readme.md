# Dishcovery App

Welcome to Dishcovery App!


## Features

- **Home**: View hero banner with selected top recipes, see top recipes as card,
- **Search**: Use the search feature to find dishes, works as MySQL LIKE SQL,
- **Recipe Details**: Get detailed information about each dish, including ingredients, cooking instructions, and serving suggestions,
- **User Profiles**: Create your profile
- **Admin**: if you have database restored, log in with username: kafi, password: 1234, then you will see Manage button to CRUD dishes. Or just register after importing database.
- **Logged in User**: Only logged in users can see full instructions for the dish


## Technologies Used

- **Frontend**: Angular (Version 16)
- **Backend**: Node.JS, Express, MongoDB


## Installation

cd dishcovery (root directory)
npm install
cd public/dishcovery
npm install


## Import Database

mongorestore --db dishcovery /path/to/bson-json/dishcovery


## Run Project

From the root directory, npm start
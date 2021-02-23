# la_poke_lucha

Api for serving pokemon data for a fighting game

## installation
You will need a mongoDB database in order to deploy this project

1. clone the repository
2. run: npm install to install dependencys
3. add a .env file and insert your mongoDB connection data (use .env.sample as a guide) 
4. run: npm run populate to fetch all needed data from pokeapi and store it in your mongoDB
5. run: npm start

## endpoints

### GET /pokemon
returns pokemon from the db  
#### query params:
  - **limit:** amount of pokemon to fetch
  - **offset:** index offset
  - **name:** partial filter pokemon by name
  - **type:** filter pokemon by type
***
### GET /pokemon/:id
returns pokemon with specific id
***  
  
### GET /pokemon/:id/:info
returns info file of specific pokemon
**info** must be one of [base, name, type]
***  
  
### GET /type/
returns all possible types of our pokemon
***
### GET /game/all
returns the record of game results 
***
### POST /game/insertgame
insert a game result into the record
#### body fields:
  - **winner:** ObjectId of a pokemon
  - **looser:** ObjectId of a pokemon
  - **turns:** Number
  - **winnerScore:** Number
  - **looserScore:** Number



  
    


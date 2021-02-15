const Pokemon = require("./models/Pokemon");

//longjohn https://github.com/mattinsler/longjohn
if (process.env.NODE_ENV !== "production") {
  require("longjohn");
}

// import provided pokemonlist.json
let pokemonList = require("./services/pokedex.json");

//axios
const axios = require("axios");

//dotenv
const dotenv = require("dotenv");
dotenv.config();
const {DBPW, DBUSER, DBHOST, DBNAME}= process.env;

//mongoose setup
const mongoose = require("mongoose");
mongoose.Promise = Promise; // Set mongoose to use ES6 Promises.
const mongoDB = `mongodb+srv://${DBUSER}:${DBPW}@${DBHOST}/${DBNAME}?retryWrites=true&w=majority`;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

pokemons = require("./services/pokedex.json");

const populateDB = async () => {
  try {
    
    const batchSize = 100;
    let res = [];

    //resolve pokemon requests in batches of <batchSize> and add them to res array
    console.log("fetching pokemon  from pokeapi...");
    for (let i = 0; i < pokemonList.length; i = i + batchSize) {
      const batch = await Promise.all(
        pokemonList
          .slice(
            i,
            i + batchSize <= pokemonList.length ? i + batchSize : pokemonList.length
          )
          .map((pokemon) => {
            //workaround for pokeapi bug: id 477 and 519 are not found
            if([477, 519].includes(pokemon.id)) {        
              return axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon.name.english.toLowerCase())
            };
            return axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon.id);
          })
      );
      console.log(i);
      res.push(...batch);
    }
    console.log("number of pokemon fetched: " + res.length);

    // combine the pokeapi data with the existing data from json
    pokemons = pokemons.map((pokemonFromDB) => {
      res.forEach((pokemonFromAxios) => {
        if (pokemonFromDB.id == pokemonFromAxios.data.id) {
          pokemonFromDB.image = pokemonFromAxios.data.sprites.other["official-artwork"].front_default;
          pokemonFromDB.weight = pokemonFromAxios.data.weight;
          pokemonFromDB.base_experience = pokemonFromAxios.data.base_experience;
          // mongodb doesn't allow dots in keys
          pokemonFromDB.base.Special_Attack = pokemonFromDB.base["Sp. Attack"];
          delete pokemonFromDB.base["Sp. Attack"];
          pokemonFromDB.base.Special_Defense = pokemonFromDB.base["Sp. Defense"]; 
          delete pokemonFromDB.base["Sp. Defense"];
        }   
        // todo other properties
      });
      return pokemonFromDB;
    });
    
    //connect to mongodb
    console.log("connecting mongoose");
    await mongoose.connect(mongoDB, dbOptions);
    const db = mongoose.connection;
    console.log("mongoose connected");
    //Bind connection to error event (to get notification of connection errors)
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    //insert data into db
    console.log("inserting into db");
    await Pokemon.insertMany(pokemons);
    console.log("done");
    
  } catch (e) {
    console.error(e);
  } finally {
    console.log("disconnecting mongoose");
    mongoose.connection.close();
  }
};

populateDB();
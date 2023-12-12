import { headerComponent } from "./src/component/headerComponent";
import { mainComponent } from "./src/component/mainComponent";
import { getPokemonById } from "./src/helper/getPokemonById";
import { getPokemonByName } from "./src/helper/getPokemonByName";
import { renderCardPokemon } from "./src/utils/renderCardPokemon";
import "./style.css";

const body = document.getElementById("body");

headerComponent(body);
await mainComponent(body);

const cardsPokemons = document.querySelector(".main-container");
const formSearch = document.querySelector(".form-search");
const inputSearch = formSearch.querySelector(".input-search");
const btnSearch = formSearch.querySelector(".btn-search");

cardsPokemons.addEventListener("click", async (e) => {
  if (e.target.className === "card-pokemon" || e.target.className === "card-img") {
    let card = '';
    if(e.target.className === "card-pokemon"){
        card = e.target;
    }else if(e.target.className === "card-img"){
        card = e.target.closest('.card-pokemon');
    }
    
    const id = card.getAttribute("data-id");
    const img = card.querySelector(".card-img");
    const name = card.querySelector(".card-name");
    const types = card.querySelector(".card-types");
    const abilities = card.querySelector(".card-abilities");

    const pokemon = await getPokemonById(id);

    console.log(pokemon);
    if (img.src === pokemon.sprites.front_default) {
      img.src = pokemon.sprites.back_default;
      name.style.display = "none";
      types.style.display = "none";
      abilities.style.display = "block";
    } else {
      img.src = pokemon.sprites.front_default;
      name.style.display = "block";
      types.style.display = "block";
      abilities.style.display = "none";
    }
  }
});

inputSearch.addEventListener("keydown", async (e) => {
    if(e.key === "Enter" && inputSearch.value != ""){
        cardsPokemons.innerHTML = "";
        const pokemons = await getPokemonByName(inputSearch.value);
        pokemons.map((p) => renderCardPokemon(cardsPokemons, p));
        inputSearch.value = "";
        
    }else if(e.key === "Escape" || e.key === "Enter" && inputSearch.value === ""){
        cardsPokemons.innerHTML = "";
        await mainComponent(body);
        inputSearch.value = "";

    }
})

btnSearch.addEventListener("click", async (e) => {
    if(inputSearch.value != ""){
        cardsPokemons.innerHTML = "";
        const pokemons = await getPokemonByName(inputSearch.value);
        pokemons.map((p) => renderCardPokemon(cardsPokemons, p));
        inputSearch.value = "";

    }else if(inputSearch.value === ""){
        cardsPokemons.innerHTML = "";
        await mainComponent(body);
        inputSearch.value = "";

    }
})


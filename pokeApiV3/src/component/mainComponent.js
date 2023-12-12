import { getPokemonsApi } from "../helper/getPokemonsApi";
import { renderCardPokemon } from "../utils/renderCardPokemon";

export async function mainComponent(body) {
    const mainContainer = document.createElement('div');
    mainContainer.className = 'main-container';
    
    const pokemons = await getPokemonsApi();
    
    pokemons.forEach(pokemon => {
        renderCardPokemon(mainContainer, pokemon);
    })

    body.appendChild(mainContainer);
}
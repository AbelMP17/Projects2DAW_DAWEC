import { getPokemonsApi } from "./getPokemonsApi";

export async function getPokemonByName(name) {
    const pokemonsApi = await getPokemonsApi();
    const pokemons = pokemonsApi.filter(p => p.name.includes(name));
    return pokemons;
}
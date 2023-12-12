export async function getPokemonsApi() {
  try {
    let pokemons = [];
    for(let i = 1; i < 1018 ; i++) {
        const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${i}`
        );
        const pokemon = await response.json();
        pokemons.push(pokemon);
    }
    for(let i = 10001; i < 10276 ; i++) {
        const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${i}`
        );
        const pokemon = await response.json();
        pokemons.push(pokemon);
    }
    return pokemons;
  } catch (err) {
    throw new Error(err);
  }
}

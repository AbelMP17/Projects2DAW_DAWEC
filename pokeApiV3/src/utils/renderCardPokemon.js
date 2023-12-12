export function renderCardPokemon(container, pokemon) {
  const card = document.createElement("div");
  card.setAttribute("data-id", pokemon.id);
  card.className = "card-pokemon";
  const img = document.createElement("img");
  img.className = "card-img";
  img.src = pokemon.sprites.front_default;

  const name = document.createElement("h3");
  name.className = "card-name";
  name.textContent = pokemon.name;

  const types = document.createElement("p");
  types.className = "card-types";

  const abilities = document.createElement("p");
  abilities.className = "card-abilities";
  abilities.style.display = "none";

  const tipos = pokemon.types.map((tipo) => tipo.type.name);
  const habilidades = pokemon.abilities.map((habilidad) =>habilidad.ability.name);

  types.textContent = tipos.join(" / ");
  abilities.textContent = habilidades.join(" / ");

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(types);
  card.appendChild(abilities);

  container.appendChild(card);
}
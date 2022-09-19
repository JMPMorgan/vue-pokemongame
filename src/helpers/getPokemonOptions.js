const getPokemons = () => {
  const pokemonArr = Array.from(Array(649));
  return pokemonArr.map((_, index) => index);
};
const getPokemonsOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));
  return pokemons;
};
const getPokemonNames = async (pokemons = []) => {
  const allResponse = pokemons.map((pokemon) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((response) =>
      response.json()
    )
  );
  const [p1, p2, p3, p4] = await Promise.all(allResponse);
  return [
    { name: p1.name, id: p1.id },
    { name: p2.name, id: p2.id },
    { name: p3.name, id: p3.id },
    { name: p4.name, id: p4.id },
  ];
};

export default getPokemonsOptions;

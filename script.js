const pokemonContainer = document.getElementById('pokemon-container');

// Fetch and display 18 Pokémon
async function fetchPokemon() {
  // Clear container before fetching new data (useful when returning from detail view)
  pokemonContainer.innerHTML = '';
  for (let i = 1; i <= 18; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const pokemon = await response.json();
    createPokemonCard(pokemon);
  }
}

// Create Pokémon cards for the homepage
function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('pokemon-card');
  card.addEventListener('click', () => displaySinglePokemon(pokemon.id));

  card.innerHTML = `
    <h2>${pokemon.name.toUpperCase()}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
  `;

  pokemonContainer.appendChild(card);
}

// Display individual Pokémon details with a Back button
async function displaySinglePokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = await response.json();

  // Clear existing cards
  pokemonContainer.innerHTML = '';

  const singleCard = document.createElement('div');
  singleCard.classList.add('single-pokemon-card');

  // Get the first 5 moves for display
  const moves = pokemon.moves
    .slice(0, 5)
    .map(move => `<li>${move.move.name}</li>`)
    .join('');

  singleCard.innerHTML = `
    <h2>${pokemon.name.toUpperCase()}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <h3>Moves:</h3>
    <ul>${moves}</ul>
    <button id="back-btn">Back</button>
  `;

  pokemonContainer.appendChild(singleCard);

  // Add event listener for the Back button
  document.getElementById('back-btn').addEventListener('click', () => {
    // Clear the detail view and re-fetch the grid view.
    pokemonContainer.innerHTML = '';
    fetchPokemon();
  });
}

fetchPokemon();

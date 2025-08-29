async function getPokemon() {
  const nameOrId = document.getElementById("pokemonInput").value.toLowerCase();
  const infoDiv = document.getElementById("pokemonInfo");

  if (!nameOrId) {
    infoDiv.innerHTML = "<p>Digite um nome ou número!</p>";
    return;
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    if (!res.ok) throw new Error("Pokémon não encontrado");

    const data = await res.json();

    // Extrai tipos
    const types = data.types.map(t => `<span class="type">${t.type.name}</span>`).join(" ");

    infoDiv.innerHTML = `
      <h2>${data.name.toUpperCase()} (#${data.id})</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <div class="types">Tipos: ${types}</div>
    `;
  } catch (error) {
    infoDiv.innerHTML = "<p>❌ Pokémon não encontrado!</p>";
  }
}

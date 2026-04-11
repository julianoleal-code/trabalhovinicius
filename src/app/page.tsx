import PokemonCard from "@/components/PokemonCard";
import Link from "next/link";

export default async function Home() {
  // Buscar Pokémon do tipo Psychic
  const psychicRes = await fetch("https://pokeapi.co/api/v2/type/psychic");
  const psychicData = await psychicRes.json();
  const psychicPokemons = psychicData.pokemon.slice(0, 10).map((p: any) => ({
    name: p.pokemon.name,
    url: p.pokemon.url,
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.pokemon.url.split('/').filter(Boolean).pop()}.png`
  }));

  // Buscar Pokémon do tipo Ghost
  const ghostRes = await fetch("https://pokeapi.co/api/v2/type/ghost");
  const ghostData = await ghostRes.json();
  const ghostPokemons = ghostData.pokemon.slice(0, 10).map((p: any) => ({
    name: p.pokemon.name,
    url: p.pokemon.url,
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.pokemon.url.split('/').filter(Boolean).pop()}.png`
  }));

  const pokemons = [...psychicPokemons, ...ghostPokemons];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
          Catálogo de Pokémon
        </h2>
        <p style={{ color: '#6b7280' }}>
          Explore nosso catálogo com 10 Pokémon Psíquicos e 10 Fantasmas. Clique em qualquer
          card para ver mais detalhes!
        </p>
        <div style={{ marginTop: '1rem' }}>
          <Link
            href="/sobre"
            style={{
              display: 'inline-block',
              backgroundColor: '#1e40af',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              transition: 'background-color 0.3s'
            }}
          >
            Sobre o Projeto
          </Link>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
            imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').filter(Boolean).pop()}.png`}
          />
        ))}
      </div>
    </div>
  );
}

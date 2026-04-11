import Link from "next/link";
import { notFound } from "next/navigation";

const typeColors: any = {
  normal: "#9ca3af",
  fighting: "#b91c1c",
  flying: "#3b82f6",
  poison: "#7c3aed",
  ground: "#d97706",
  rock: "#4b5563",
  bug: "#16a34a",
  ghost: "#7c3aed",
  steel: "#6b7280",
  fire: "#dc2626",
  water: "#2563eb",
  grass: "#16a34a",
  electric: "#eab308",
  psychic: "#db2777",
  ice: "#bfdbfe",
  dragon: "#7c3aed",
  dark: "#1f2937",
  fairy: "#ec4899",
};

export async function generateMetadata({
  params,
}: {
  params: any;
}) {
  const { name } = await params;
  return {
    title: `${name.charAt(0).toUpperCase() + name.slice(1)} - PokeExplorer`,
  };
}

export default async function PokemonDetail({
  params,
}: {
  params: any;
}) {
  const { name } = await params;
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      notFound();
    }

    const pokemon = await res.json();
    const pokemonName =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const abilities = pokemon.abilities.slice(0, 3);

    return (
      <div style={{ width: '100%', maxWidth: '64rem', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#1e40af', textDecoration: 'none', marginBottom: '1.5rem', display: 'inline-block' }}>
          ← Voltar para Catálogo
        </Link>

        <div style={{ backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', padding: '2rem', border: '2px solid #e5e7eb' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Imagem */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                position: 'relative',
                height: '20rem',
                width: '20rem',
                backgroundColor: '#f3f4f6',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <img
                  src={
                    pokemon.sprites.other["official-artwork"].front_default ||
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/pokemon/other/official-artwork/" +
                      pokemon.id +
                      ".png"
                  }
                  alt={pokemonName}
                  style={{ objectFit: 'contain', height: '100%', width: '100%' }}
                />
              </div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                {pokemonName}
              </h1>
              <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>#{pokemon.id}</p>
            </div>

            {/* Informações */}
            <div>
              {/* Tipos */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.75rem' }}>Tipos</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {pokemon.types.map((type: any) => (
                    <span
                      key={type.type.name}
                      style={{
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        backgroundColor: typeColors[type.type.name] || '#9ca3af'
                      }}
                    >
                      {type.type.name.charAt(0).toUpperCase() +
                        type.type.name.slice(1)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Medidas */}
              <div style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontWeight: 'bold', color: '#1f2937' }}>Altura</h3>
                  <p style={{ color: '#6b7280' }}>
                    {(pokemon.height / 10).toFixed(1)} m
                  </p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 'bold', color: '#1f2937' }}>Peso</h3>
                  <p style={{ color: '#6b7280' }}>
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </p>
                </div>
              </div>

              {/* Habilidades */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.75rem' }}>
                  Habilidades
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {abilities.map((ability: any) => (
                    <div
                      key={ability.ability.name}
                      style={{ backgroundColor: '#f3f4f6', padding: '0.75rem', borderRadius: '0.5rem' }}
                    >
                      <p style={{ fontWeight: 'semibold', color: '#1f2937' }}>
                        {ability.ability.name
                          .split("-")
                          .map((word: any) => word[0].toUpperCase() + word.slice(1))
                          .join(" ")}
                      </p>
                      {ability.is_hidden && (
                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          (Habilidade Oculta)
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}

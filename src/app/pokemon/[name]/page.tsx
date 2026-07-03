import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PokemonDetailResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: Array<{
    ability: { name: string };
    is_hidden: boolean;
  }>;
  types: Array<{
    type: { name: string };
  }>;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  moves: Array<{
    move: { name: string };
  }>;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
};

const typeColors: Record<string, string> = {
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

async function getPokemon(name: string): Promise<PokemonDetailResponse> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    notFound();
  }

  return (await res.json()) as PokemonDetailResponse;
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  return {
    title: `${name.charAt(0).toUpperCase() + name.slice(1)} - PokeExplorer`,
  };
}

export default async function PokemonDetail({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const pokemon = await getPokemon(name);
  const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const abilities = pokemon.abilities.slice(0, 3);
  const mainMove = pokemon.moves[0]?.move.name;
  const imageSrc =
    pokemon.sprites.other["official-artwork"].front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/pokemon/other/official-artwork/${pokemon.id}.png`;
  const statLabels: Record<string, string> = {
    hp: "HP",
    attack: "Ataque",
    defense: "Defesa",
    "special-attack": "Sp. Atq",
    "special-defense": "Sp. Def",
    speed: "Velocidade",
  };

  return (
    <div style={{ width: "100%", maxWidth: "64rem", margin: "0 auto" }}>
      <Link href="/" style={{ color: "#1e40af", textDecoration: "none", marginBottom: "1.5rem", display: "inline-block" }}>
        ← Voltar para Catálogo
      </Link>

      <div style={{ backgroundColor: "white", borderRadius: "1.25rem", boxShadow: "0 16px 35px rgba(15, 23, 42, 0.12)", padding: "2rem", border: "2px solid #e5e7eb" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                position: "relative",
                height: "20rem",
                width: "20rem",
                background: "radial-gradient(circle at top, #ffffff 0%, #dbeafe 45%, #bfdbfe 100%)",
                borderRadius: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                border: "1px solid #bfdbfe",
              }}
            >
              <Image src={imageSrc} alt={pokemonName} width={320} height={320} style={{ objectFit: "contain", height: "100%", width: "100%" }} />
            </div>
            <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#1f2937" }}>{pokemonName}</h1>
            <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>#{pokemon.id}</p>
          </div>

          <div style={{ display: "grid", gap: "1.25rem" }}>
            {mainMove && (
              <div style={{ background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)", borderRadius: "1rem", padding: "1rem", color: "white", boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)" }}>
                <p style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.9 }}>Ataque principal</p>
                <h2 style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "0.25rem" }}>
                  {mainMove
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h2>
              </div>
            )}

            <div style={{ backgroundColor: "#f8fafc", borderRadius: "1rem", padding: "1rem", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1f2937", marginBottom: "0.75rem" }}>Tipos</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    style={{
                      color: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "9999px",
                      backgroundColor: typeColors[type.type.name] || "#9ca3af",
                    }}
                  >
                    {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ backgroundColor: "#f8fafc", borderRadius: "1rem", padding: "1rem", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontWeight: "bold", color: "#1f2937" }}>Altura</h3>
                <p style={{ color: "#6b7280", marginTop: "0.25rem" }}>{(pokemon.height / 10).toFixed(1)} m</p>
              </div>
              <div style={{ backgroundColor: "#f8fafc", borderRadius: "1rem", padding: "1rem", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontWeight: "bold", color: "#1f2937" }}>Peso</h3>
                <p style={{ color: "#6b7280", marginTop: "0.25rem" }}>{(pokemon.weight / 10).toFixed(1)} kg</p>
              </div>
            </div>

            <div style={{ backgroundColor: "#f8fafc", borderRadius: "1rem", padding: "1rem", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1f2937", marginBottom: "0.75rem" }}>Informações rápidas</h2>
              <p style={{ color: "#475569", marginBottom: "0.25rem" }}><strong>Experiência base:</strong> {pokemon.base_experience}</p>
              <p style={{ color: "#475569" }}><strong>Habilidades principais:</strong> {abilities.length}</p>
            </div>

            <div style={{ backgroundColor: "#f8fafc", borderRadius: "1rem", padding: "1rem", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1f2937", marginBottom: "0.75rem" }}>Estatísticas</h2>
              <div style={{ display: "grid", gap: "0.65rem" }}>
                {pokemon.stats.map((stat) => {
                  const label = statLabels[stat.stat.name] || stat.stat.name;
                  const percent = Math.min(Math.round((stat.base_stat / 255) * 100), 100);
                  return (
                    <div key={stat.stat.name}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem", color: "#475569" }}>
                        <span>{label}</span>
                        <strong>{stat.base_stat}</strong>
                      </div>
                      <div style={{ height: "0.6rem", backgroundColor: "#e2e8f0", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ width: `${percent}%`, height: "100%", background: "linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)", borderRadius: "999px" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ backgroundColor: "#f8fafc", borderRadius: "1rem", padding: "1rem", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1f2937", marginBottom: "0.75rem" }}>Habilidades</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {abilities.map((ability) => (
                  <div key={ability.ability.name} style={{ backgroundColor: "#ffffff", padding: "0.75rem", borderRadius: "0.75rem", border: "1px solid #e2e8f0" }}>
                    <p style={{ fontWeight: "semibold", color: "#1f2937" }}>
                      {ability.ability.name
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </p>
                    {ability.is_hidden && <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>(Habilidade Oculta)</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

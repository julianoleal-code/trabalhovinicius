import PokemonCard from "@/components/PokemonCard";
import Link from "next/link";

type PokemonSummary = {
  name: string;
  url: string;
};

type PokemonTypeResponse = {
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
};

async function getPokemonByType(type: string): Promise<PokemonSummary[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`, {
    next: { revalidate: 3600 },
  });
  const data = (await res.json()) as PokemonTypeResponse;

  return data.pokemon.slice(0, 10).map((item) => ({
    name: item.pokemon.name,
    url: item.pokemon.url,
  }));
}

export default async function Home() {
  const [psychicPokemons, ghostPokemons] = await Promise.all([
    getPokemonByType("psychic"),
    getPokemonByType("ghost"),
  ]);

  const pokemons = [...psychicPokemons, ...ghostPokemons].slice(0, 20);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937", marginBottom: "0.5rem" }}>
          Catálogo de Pokémon
        </h2>
        <p style={{ color: "#6b7280" }}>
          Explore nosso catálogo com 10 Pokémon Psíquicos e 10 Fantasmas. Clique em qualquer card para ver mais detalhes!
        </p>
        <div style={{ marginTop: "1rem" }}>
          <Link
            href="/sobre"
            style={{
              display: "inline-block",
              backgroundColor: "#1e40af",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
            }}
          >
            Sobre o Projeto
          </Link>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
        {pokemons.map((pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
              imageUrl={imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}

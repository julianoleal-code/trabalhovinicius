import Image from "next/image";
import Link from "next/link";

type PokemonCardProps = {
  name: string;
  url: string;
  imageUrl: string;
};

export default function PokemonCard({ name, url, imageUrl }: PokemonCardProps) {
  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);
  const pokemonId = url.split("/").filter(Boolean).pop();

  return (
    <Link href={`/pokemon/${name}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)",
          borderRadius: "1.25rem",
          boxShadow: "0 14px 30px rgba(30, 64, 175, 0.16)",
          padding: "1rem",
          cursor: "pointer",
          border: "2px solid #dbeafe",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          transform: "translateY(0)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.75rem",
          }}
        >
          <span style={{ backgroundColor: "#1d4ed8", color: "white", borderRadius: "999px", padding: "0.25rem 0.6rem", fontSize: "0.75rem", fontWeight: 700 }}>
            Pokémon
          </span>
          <span style={{ color: "#475569", fontWeight: 700 }}>#{pokemonId}</span>
        </div>

        <div
          style={{
            position: "relative",
            height: "9rem",
            width: "100%",
            marginBottom: "1rem",
            background: "radial-gradient(circle at top, #ffffff 0%, #dbeafe 45%, #bfdbfe 100%)",
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #bfdbfe",
          }}
        >
          <Image src={imageUrl} alt={pokemonName} width={160} height={160} style={{ objectFit: "contain", height: "100%", width: "100%" }} />
        </div>

        <div style={{ display: "grid", gap: "0.35rem" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#1f2937", textAlign: "center" }}>{pokemonName}</h2>
          <p style={{ fontSize: "0.875rem", color: "#64748b", textAlign: "center" }}>Clique para ver detalhes</p>
        </div>
      </div>
    </Link>
  );
}

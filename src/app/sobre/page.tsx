import Link from "next/link";
import { projectContent } from "@/data/projectData";

export const metadata = {
  title: "Sobre - PokeExplorer",
  description: "Sobre o projeto PokeExplorer e seu desenvolvedor",
};

export default function Sobre() {
  return (
    <div style={{ width: "100%", maxWidth: "64rem", margin: "0 auto" }}>
      <Link href="/" style={{ color: "#2563eb", textDecoration: "none", marginBottom: "1.5rem", display: "inline-block" }}>
        ← Voltar para Catálogo
      </Link>

      <div style={{ backgroundColor: "white", borderRadius: "1rem", boxShadow: "0 10px 15px rgba(0,0,0,0.1)", padding: "2rem", border: "2px solid #e5e7eb" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1.5rem" }}>
          {projectContent.title}
        </h1>

        <section style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>Desenvolvedor</h2>
          <div style={{ backgroundColor: "#f9fafb", padding: "1.5rem", borderRadius: "0.5rem" }}>
            <p style={{ fontSize: "1.125rem", fontWeight: "semibold", color: "#1f2937", marginBottom: "0.25rem" }}>
              Nome: {projectContent.developerName}
            </p>
            <p style={{ color: "#6b7280", marginBottom: "0.25rem" }}>Disciplina: {projectContent.discipline}</p>
            <p style={{ color: "#6b7280" }}>Instituição: {projectContent.institution}</p>
          </div>
        </section>

        <section style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>Descrição do Projeto</h2>
          <p style={{ color: "#374151", marginBottom: "1rem" }}>{projectContent.description}</p>
          <ul style={{ listStyleType: "disc", listStylePosition: "inside", color: "#374151", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {projectContent.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>Tecnologias</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {projectContent.technologies.map((group) => (
              <div key={group.title} style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "0.5rem" }}>
                <h3 style={{ fontWeight: "bold", color: "#1f2937", marginBottom: "0.5rem" }}>{group.title}</h3>
                <ul style={{ listStyleType: "disc", listStylePosition: "inside", color: "#374151", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>Requisitos Atendidos</h2>
          <ul style={{ listStyleType: "disc", listStylePosition: "inside", color: "#374151", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {projectContent.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </section>

        <section style={{ marginTop: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937", marginBottom: "1rem" }}>Como Executar</h2>
          <div style={{ backgroundColor: "#f3f4f6", padding: "1rem", borderRadius: "0.5rem" }}>
            <pre style={{ color: "#374151", fontFamily: "monospace", fontSize: "0.875rem", whiteSpace: "pre-wrap" }}>
              {projectContent.howToRun.join("\n")}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}

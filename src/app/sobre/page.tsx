import Link from "next/link";

export const metadata = {
  title: "Sobre - PokeExplorer",
  description: "Sobre o projeto PokeExplorer e seu desenvolvedor",
};

export default function Sobre() {
  return (
    <div style={{ width: '100%', maxWidth: '64rem', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', marginBottom: '1.5rem', display: 'inline-block' }}>
        ← Voltar para Catálogo
      </Link>

      <div style={{ backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', padding: '2rem', border: '2px solid #e5e7eb' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Sobre o Projeto</h1>

        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Desenvolvedor</h2>
          <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '1.125rem', fontWeight: 'semibold', color: '#1f2937', marginBottom: '0.25rem' }}>Nome: Juliano</p>
          </div>
        </section>

        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Descrição do Projeto</h2>
          <p style={{ color: '#374151', marginBottom: '1rem' }}>
            PokeExplorer é uma aplicação interativa desenvolvida com Next.js que permite explorar dados de Pokémon.
          </p>
          <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', color: '#374151', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Listagem de 20 Pokémon (10 Psíquicos e 10 Fantasmas) da PokéAPI</li>
            <li>Página de detalhes com informações completas</li>
            <li>Interface responsiva e intuitiva</li>
          </ul>
        </section>

        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Tecnologias</h2>
          <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', color: '#374151', display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
            <li>Next.js 16</li>
            <li>React 19</li>
            <li>JavaScript</li>
            <li>CSS</li>
            <li>PokéAPI</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Como Executar</h2>
          <div style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem' }}>
            <p style={{ color: '#374151', fontFamily: 'monospace', fontSize: '0.875rem' }}>
              npm install <br />
              npm run dev <br />
              Acesse: http://localhost:3000
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

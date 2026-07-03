import Link from "next/link";

export default function Header() {
  return (
    <header style={{ backgroundColor: '#1e40af', color: 'white', padding: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>PokeExplorer</h1>
            <p style={{ fontSize: '0.875rem', color: '#bfdbfe' }}>Explore o Mundo Pokémon</p>
          </div>
          <nav style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Catálogo</Link>
            <Link href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
            <Link href="/login" style={{ color: 'white', textDecoration: 'none' }}>Entrar</Link>
            <Link href="/register" style={{ color: 'white', textDecoration: 'none' }}>Cadastrar</Link>
            <Link href="/sobre" style={{ color: 'white', textDecoration: 'none' }}>Sobre</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

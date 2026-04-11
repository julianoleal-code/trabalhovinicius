export default function Header() {
  return (
    <header style={{ backgroundColor: '#1e40af', color: 'white', padding: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>PokeExplorer</h1>
        <p style={{ fontSize: '0.875rem', color: '#bfdbfe' }}>Explore o Mundo Pokémon</p>
      </div>
    </header>
  );
}

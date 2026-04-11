export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '1.5rem 0', marginTop: '3rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ borderTop: '1px solid #374151', paddingTop: '1rem' }}>
          <p style={{ textAlign: 'center', color: '#9ca3af' }}>
            © 2026 PokeExplorer - Desenvolvido por <span style={{ fontWeight: 'bold', color: 'white' }}>Juliano</span>
          </p>
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
            PokeExplorer - Projeto pessoal
          </p>
        </div>
      </div>
    </footer>
  );
}

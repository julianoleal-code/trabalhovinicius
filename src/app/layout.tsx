import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PokeExplorer - Catálogo de Pokémon",
  description: "Explore e descubra informações sobre todos os Pokémon com PokeExplorer",
};

export default function RootLayout({
  children,
}: {
  children: any;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, maxWidth: '72rem', margin: '0 auto', width: '100%', padding: '2rem 1rem' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

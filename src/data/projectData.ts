export const projectContent = {
  title: "Sobre o Projeto",
  developerName: "Juliano",
  discipline: "Programação e Design para Web II",
  institution: "FAETERJ - Barra Mansa",
  description:
    "PokeExplorer é uma aplicação interativa desenvolvida com Next.js que combina catálogo público de Pokémon com autenticação, banco de dados e gerenciamento de cards personalizados.",
  features: [
    "Autenticação por e-mail/senha com JWT armazenado em cookie",
    "Dashboard protegido para criar, editar, buscar e excluir cards Pokémon",
    "Armazenamento de cards em PostgreSQL via Prisma",
    "Catálogo público de Pokémon usando a PokéAPI",
  ],
  technologies: [
    {
      title: "Frontend",
      items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Backend e Banco de Dados",
      items: ["Prisma", "PostgreSQL", "JWT", "bcryptjs", "API Routes com autenticação"],
    },
  ],
  requirements: [
    "Projeto Next.js com App Router e estrutura correta de pastas",
    "Backend com autenticação JWT e sessão por cookie",
    "Integração com banco de dados PostgreSQL usando Prisma",
    "Rotas protegidas e dashboard com CRUD de cards do usuário",
    "Página sobre com informações do projeto e do desenvolvedor",
  ],
  howToRun: ["npm install", "npm run dev", "Acesse: http://localhost:3000"],
};

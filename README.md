# PokeExplorer

Uma aplicação web simples criada com **Next.js 16** que permite explorar e ver informações sobre Pokémon usando a **PokéAPI**.

## Visão Geral

PokeExplorer é um catálogo de Pokémon que usa recursos básicos do Next.js, incluindo:

- App Router
- Rotas dinâmicas com parâmetros
- Componentes reutilizáveis
- Consumo de API pública
- Navegação com Link
- Carregamento de dados no servidor

## Funcionalidades

### Página Principal (`/`)
- Listagem de 20 Pokémon da PokéAPI
- Exibição de imagem e nome de cada Pokémon
- Cards clicáveis que redirecionam para a página de detalhes
- Link para acessar a página "Sobre"

### Página de Detalhes (`/pokemon/[name]`)
- Nome, ID e imagem oficial do Pokémon
- Tipos de Pokémon (com cores distintas)
- Peso e altura em unidades apropriadas
- 3 primeiras habilidades do Pokémon
- Navegação de volta para o catálogo

### Página Sobre (`/sobre`)
- Informações do desenvolvedor
- Descrição do projeto
- Tecnologias utilizadas
- Requisitos atendidos
- Instruções de execução

## Tecnologias Utilizadas

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização responsiva
- **PokéAPI** - API gratuita de Pokémon (https://pokeapi.co)

## Estrutura do Projeto

```
pokeexplorer/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Rota principal - listagem
│   │   ├── layout.tsx            # Layout raiz com Header e Footer
│   │   ├── globals.css           # Estilos globais
│   │   ├── sobre/
│   │   │   └── page.tsx          # Página estática /sobre
│   │   └── pokemon/
│   │       └── [name]/
│   │           └── page.tsx      # Rota dinâmica /pokemon/:name
│   └── components/
│       ├── Header.tsx            # Cabeçalho da aplicação
│       ├── Footer.tsx            # Rodapé com créditos
│       └── PokemonCard.tsx       # Card de Pokémon para listagem
├── public/                       # Arquivos estáticos
├── package.json
├── tsconfig.json
├── postcss.config.mjs          # Configuração PostCSS com Tailwind CSS v4
├── next.config.ts
└── README.md
```

## Como Executar Localmente

### Pré-requisitos
- Node.js 16.x ou superior
- npm, yarn, pnpm ou bun

### Passos de Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/usuario/pokeexplorer.git
   cd pokeexplorer
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abra no navegador**
   Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação em ação.

## Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Executar versão de produção
npm run start

# Lint e verificação de código
npm run lint
```

## 🌐 Deploy

A aplicação pode ser facilmente deployada na **Vercel** (recomendado para Next.js):


## Referências

- [Documentação Next.js](https://nextjs.org/docs)
- [PokéAPI Docs](https://pokeapi.co/docs/v2)
- [Tailwind CSS](https://tailwindcss.com)

##  Aluno

**Nome:** Juliano  
**Disciplina:** Programação e Design para Web II  
**Instituição:** FAETERJ - Barra Mansa



---

**Desenvolvido em 2026**

# Madzone Web 2.0

Komplexní modernizace webové platformy madzone.cz s využitím moderního technologického stacku založeného na Node.js a React.

## 🚀 Přehled Projektu

Madzone Web 2.0 je rozsáhlá full-stack aplikace sestávající ze tří klíčových komponent:

1. **Veřejný Web** - E-shop, interaktivní mapa, Instagram feed
2. **Administrativní Panel** - Správa vzhledu webu
3. **Týmový Panel** - Plánovač, správce úkolů (Jira-style), výkaznictví výdajů (Odoo-inspired)

## 🛠️ Technologický Stack

### Frontend (Aktuální)
- **Framework**: Next.js 15+ s App Router
- **Jazyk**: TypeScript
- **Stylování**: Tailwind CSS
- **UI Komponenty**: shadcn/ui
- **State Management**: Zustand

### Backend (Plánováno)
- **Runtime**: Node.js
- **API**: GraphQL s Apollo Server  
- **ORM**: Prisma
- **Databáze**: PostgreSQL
- **Autentizace**: Clerk/SuperTokens
- **Autorizace**: Casbin RBAC

### Budoucí Architektura
- **Struktura**: Turborepo Monorepo
- **Build System**: Turborepo s inteligentním kešováním

## 📁 Struktura Projektu

```
madzone-web2.0/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/
│   │   └── ui/             # shadcn/ui komponenty
│   ├── lib/                # Utility funkce
│   └── store/              # Zustand stores
├── .github/
│   └── copilot-instructions.md
└── ...konfigurační soubory
```

## 🏃‍♂️ Spuštění Projektu

### Předpoklady
- Node.js 18+
- npm

### Instalace a spuštění

```bash
# Klonování projektu
git clone <repository-url>
cd madzone-web2.0

# Instalace závislostí
npm install

# Spuštění development serveru
npm run dev
```

Aplikace bude dostupná na `http://localhost:3000`

## 📋 Dostupné Příkazy

```bash
npm run dev          # Spuštění development serveru
npm run build        # Build pro produkci
npm run start        # Spuštění produkční verze
npm run lint         # ESLint kontrola
npm run type-check   # TypeScript kontrola
```

## 🎯 Klíčové Funkce

### ✅ Implementováno
- [x] Next.js 15 s App Router setup
- [x] TypeScript konfigurace
- [x] Tailwind CSS stylování
- [x] shadcn/ui komponenty (button, card, input, label)
- [x] Zustand store pro UI state management
- [x] Responzivní homepage
- [x] Copilot instrukce pro lepší AI asistenci

### 🔄 V Plánování
- [ ] GraphQL backend s Apollo Server
- [ ] Prisma ORM + PostgreSQL setup
- [ ] Autentizace a autorizace
- [ ] E-shop komponenty
- [ ] Interaktivní mapa
- [ ] Týmový panel
- [ ] Turborepo monorepo migrace

## 🔐 Bezpečnost a Výkon

- **Typová bezpečnost**: Kompletní TypeScript coverage
- **State management**: Oddělení server/client state
- **Performance**: Next.js optimalizace, lazy loading
- **SEO**: Server-side rendering pro veřejné stránky

## 📚 Dokumentace

Detailní technická specifikace a architektonické rozhodnutí jsou zdokumentovány v `.github/copilot-instructions.md`.

## 🤝 Příspěvky

Projekt využívá GitHub Copilot pro efektivní vývoj. Před přispěním si prosím přečtěte Copilot instrukce.

## 📄 Licence

[Licenční informace]

---

**Status**: 🚧 V aktivním vývoji  
**Verze**: 2.0.0-alpha  
**Poslední aktualizace**: Srpen 2025

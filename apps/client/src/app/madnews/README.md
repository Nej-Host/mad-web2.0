# Madnews Blog

Moderní blog pro paranormální výzkum s tmavým designem a červenými akcenty.

## Struktura

### Stránky
- `/madnews` - Hlavní stránka blogu
- `/madnews/[id]` - Detail článku

### Komponenty

#### Blog komponenty (`/components/blog/`)
- `blog-hero.tsx` - Hero sekce s vyhledáváním a statistikami
- `blog-categories.tsx` - Kategorie článků s filtry
- `blog-grid.tsx` - Grid zobrazení článků s featured články
- `blog-newsletter.tsx` - Newsletter signup
- `blog-article.tsx` - Detail článku s plným obsahem
- `related-articles.tsx` - Související články
- `blog-comments.tsx` - Komentáře s odpověďmi a liky

#### UI komponenty
- `textarea.tsx` - Textarea komponenta pro komentáře
- `avatar.tsx` - Avatar komponenta pro uživatele

## Funkcionality

### Implementované
- ✅ Responsivní design
- ✅ Kategorie článků s filtry
- ✅ Vyhledávání v článcích
- ✅ Featured články
- ✅ Načítání dalších článků
- ✅ Detail článku s plným obsahem
- ✅ Komentáře s odpověďmi
- ✅ Like systém pro články i komentáře
- ✅ Newsletter signup
- ✅ Sharing funkce
- ✅ Bookmark funkce
- ✅ Responsive design
- ✅ SEO optimalizace

### Připraveno pro backend
- 🔄 API integrace pro články
- 🔄 API integrace pro komentáře
- 🔄 Uživatelská autentizace
- 🔄 Admin dashboard integrace
- 🔄 PostgreSQL databáze

## Design systém

### Barvy
- **Primární**: Černá (#000000)
- **Sekundární**: Tmavě šedá (#111827, #1F2937)
- **Akcent**: Červená (#EF4444)
- **Text**: Bílá (#FFFFFF), Šedá (#D1D5DB, #9CA3AF)

### Komponenty
- Tmavé pozadí s transparentními kartami
- Červené akcenty pro CTA elementy
- Hover efekty s červenou barvou
- Gradientní pozadí pro hero sekce

## Mock Data

### Články
Obsahuje ukázková data pro:
- Expedice na hrady a zámky
- Paranormální vybavení
- Historické články
- EVP analýzy
- Psychologické aspekty

### Komentáře
- Vnořené odpovědi
- Like systém
- Timestamp
- Autor označení
- Moderation funkce

## Budoucí rozšíření

### Dashboard integrace
- CRUD operace pro články
- Správa komentářů
- Analitika čtení
- SEO optimalizace

### PostgreSQL schéma
```sql
-- Articles table
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category VARCHAR(100),
  author_id INTEGER,
  featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Comments table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  article_id INTEGER REFERENCES articles(id),
  parent_id INTEGER REFERENCES comments(id),
  author_name VARCHAR(255),
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Instalace závislostí

```bash
npm install @radix-ui/react-avatar
```

## Použití

Blog je navázán na hlavní navigaci a je přístupný přes `/madnews`. Všechny komponenty jsou připravené pro integraci s backendem a databází.

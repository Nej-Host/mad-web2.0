# Madzone Web 2.0 - Veřejná Část

Tato dokumentace popisuje implementaci veřejně přístupného webu podle specifikace v Části 3.

## 🏗️ Implementované funkce

### 3.1 E-commerce platforma (Headless Commerce)

#### Technologie
- **Frontend**: React komponenty s TypeScript
- **Backend**: Integrace s Medusa.js headless commerce
- **API klient**: @medusajs/medusa-js

#### Komponenty
- `ProductGrid` - Responzivní mřížka produktů s filtrováním
- `ShoppingCart` - Plně funkční nákupní košík
- `useProducts` - Hook pro načítání produktů z Medusa API
- `useCart` - Hook pro správu košíku a checkout procesu

#### Funkce
- ✅ Zobrazení produktů s obrázky a cenami
- ✅ Přidávání do košíku
- ✅ Správa množství v košíku
- ✅ Filtrování podle kategorií
- ✅ Vyhledávání v produktech
- ✅ Řazení podle ceny/názvu
- ✅ Responsive design
- ✅ Mock data pro development

#### Cesty
- `/shop` - Hlavní obchod
- `/shop/cart` - Nákupní košík (součást shop stránky)

### 3.2 Interaktivní mapa

#### Technologie
- **Mapa**: React-Leaflet s OpenStreetMap
- **Lightweight**: ~42KB, mobile-optimized
- **No API keys needed**: Zdarma, open-source

#### Komponenty
- `LocationMap` - Hlavní mapová komponenta
- `MadzoneLocationMap` - Wrapper s ukázkovými daty

#### Funkce
- ✅ Interaktivní mapa s markers
- ✅ Kategorizované lokace (sídlo, události, partneři)
- ✅ Custom ikony podle typu
- ✅ Popup okna s informacemi
- ✅ Přizpůsobitelná velikost
- ✅ SSR kompatibilita

#### Lokace
- 🏢 Headquarters (Václavské náměstí, Praha)
- 🎉 Events (Letná, Praha)
- 🤝 Partners (Národní třída, Praha)

### 3.3 Instagram Feed (Graph API)

#### Technologie
- **API**: Instagram Graph API v18.0
- **Cache**: In-memory s TTL (1 hodina)
- **Fallback**: Mock data pro development

#### Backend endpoints
- `GET /api/instagram/feed` - Načtení příspěvků
- `GET /api/instagram/stats` - Statistiky účtu

#### Komponenty
- `InstagramFeed` - Grid pro zobrazení příspěvků
- `useInstagramFeed` - Hook pro načítání dat
- `useInstagramStats` - Hook pro statistiky

#### Funkce
- ✅ Zobrazení posledních příspěvků
- ✅ Podpora obrázků, videí, albumů
- ✅ Počet lajků a komentářů
- ✅ Přímé odkazy na Instagram
- ✅ Full-size náhled
- ✅ Automatické cachování
- ✅ Rate limiting protection

#### Bezpečnost
- ✅ API tokeny pouze na backend
- ✅ CORS konfigurace
- ✅ Error handling
- ✅ Fallback na mock data

## 📁 Struktura souborů

```
src/
├── components/public/
│   ├── e-commerce/
│   │   ├── product-grid.tsx
│   │   └── shopping-cart.tsx
│   ├── map/
│   │   └── location-map.tsx
│   └── instagram/
│       └── instagram-feed.tsx
├── lib/hooks/
│   ├── use-medusa.ts
│   └── use-instagram.ts
├── app/
│   ├── shop/page.tsx
│   ├── instagram/page.tsx
│   ├── page.tsx (homepage)
│   └── api/
│       └── instagram/
│           ├── feed/route.ts
│           └── stats/route.ts
└── .env.example
```

## 🚀 Rychlý start

### 1. Instalace závislostí
```bash
npm install leaflet react-leaflet @medusajs/medusa-js @types/leaflet
```

### 2. Environment Variables
```bash
cp .env.example .env.local
# Upravte hodnoty podle potřeby
```

### 3. Spuštění
```bash
npm run dev
```

### 4. Testování
- Hlavní stránka: http://localhost:3000
- E-shop: http://localhost:3000/shop
- Instagram: http://localhost:3000/instagram
- API: http://localhost:3000/api/instagram/feed

## 🔧 Konfigurace

### Instagram Graph API Setup

Pro produkci je potřeba:

1. **Instagram Business Account**
   - Převést osobní účet na Business/Creator
   - Propojit s Facebook stránkou

2. **Facebook for Developers App**
   ```
   App ID: your_facebook_app_id
   App Secret: your_facebook_app_secret
   ```

3. **Permissions**
   - `instagram_basic`
   - `pages_show_list`
   - `instagram_manage_insights`

4. **Long-lived Page Access Token**
   ```bash
   # Exchange short-lived for long-lived token
   curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id={app_id}&client_secret={app_secret}&fb_exchange_token={short_lived_token}"
   ```

### Medusa Backend Setup

Pro produkci:

1. **Nasazení Medusa serveru**
   - Railway/Render doporučeno
   - PostgreSQL databáze
   - Redis pro sessions

2. **Environment Variables**
   ```
   NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-medusa-backend.com
   ```

3. **CORS konfigurace**
   ```javascript
   // medusa-config.js
   module.exports = {
     projectConfig: {
       cors: process.env.FRONTEND_URL,
       // ...
     }
   }
   ```

## 📊 Performance

### Optimalizace
- ✅ Next.js Image optimalizace
- ✅ Lazy loading komponent
- ✅ Efektivní cachování
- ✅ Bundle splitting
- ✅ Responsive images

### Cache strategie
- **Instagram**: 1 hodina TTL
- **Produkty**: Real-time s fallback
- **Statistiky**: 4 hodiny TTL
- **Mapa**: Statické assets

## 🔒 Bezpečnost

### API Endpointy
- ✅ Rate limiting
- ✅ CORS konfigurace
- ✅ Environment variables
- ✅ Error handling
- ✅ Input validation

### Frontend
- ✅ TypeScript strict mode
- ✅ ESLint konfigurace
- ✅ Secure HTTP-only cookies
- ✅ XSS protection

## 📱 Responsive Design

Všechny komponenty jsou optimalizované pro:
- 📱 Mobile (320px+)
- 📲 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🧪 Testing

### Mock Data
Všechny komponenty mají fallback mock data pro:
- Development testing
- API nedostupnost
- Offline funkcionality

### API Testing
```bash
# Test Instagram API
curl http://localhost:3000/api/instagram/feed

# Test Instagram stats
curl http://localhost:3000/api/instagram/stats
```

## 🚢 Deployment

### Doporučená strategie
1. **Frontend**: Vercel (Next.js optimized)
2. **Backend**: Render/Railway (Medusa + PostgreSQL)
3. **CDN**: Automaticky přes Vercel
4. **Monitoring**: Vercel Analytics

### Environment pro produkci
```bash
# .env.production
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.madzone.cz
INSTAGRAM_PAGE_ACCESS_TOKEN=EAAxxxxx
NEXT_PUBLIC_SITE_URL=https://madzone.cz
```

## 📈 Další kroky

### Plánované rozšíření
- [ ] Product detail pages
- [ ] User authentication
- [ ] Wishlist funkcionalita
- [ ] Instagram Stories API
- [ ] Analytics tracking
- [ ] SEO optimalizace
- [ ] PWA support

### Backend integrace
- [ ] Vlastní GraphQL API
- [ ] Payload CMS integrace
- [ ] Real-time notifications
- [ ] Advanced caching (Redis)

---

## 💡 Poznámky

Tato implementace představuje kompletní základ pro moderní e-commerce a social media integraci. Všechny komponenty jsou navrženy jako modulární a snadno rozšiřitelné podle specifických potřeb projektu.

Pro produkční nasazení je nutné nakonfigurovat skutečné API endpointy a zabezpečení podle této dokumentace.

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedBlog() {
  console.log('🌱 Seeding blog data...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'technologie' },
      update: {},
      create: {
        name: 'Technologie',
        slug: 'technologie',
        description: 'Nejnovější trendy v technologiích'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'business' },
      update: {},
      create: {
        name: 'Business',
        slug: 'business',
        description: 'Podnikání a ekonomické novinky'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'lifestyle' },
      update: {},
      create: {
        name: 'Lifestyle',
        slug: 'lifestyle',
        description: 'Životní styl a zajímavosti'
      }
    })
  ])

  console.log('✅ Categories created:', categories.length)

  // Get existing demo user or create new one
  let testUser = await prisma.user.findUnique({
    where: { email: 'demo@madzone.cz' }
  })

  if (!testUser) {
    testUser = await prisma.user.create({
      data: {
        email: 'admin@madzone.cz',
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN'
      }
    })
  }

  console.log('✅ Using user:', testUser.email)

  // Create test articles
  const articles = await Promise.all([
    prisma.article.create({
      data: {
        title: 'Vítejte na Madzone.cz',
        slug: 'vitejte-na-madzone-cz',
        content: `# Vítejte na Madzone.cz

Vítejte na našem novém webu! Toto je první článek v našem moderním blog systému.

## Co najdete na našem webu

- Nejnovější technologické trendy
- Business a podnikatelské novinky  
- Lifestyle a zajímavosti
- Praktické návody a tipy

Těšíme se na vaše komentáře a zpětnou vazbu!`,
        excerpt: 'Úvodní článek představující náš nový web a blog systém.',
        authorId: testUser.id,
        categoryId: categories[0].id,
        status: 'PUBLISHED',
        featured: true,
        readTime: 2,
        publishedAt: new Date()
      }
    }),
    prisma.article.create({
      data: {
        title: 'Budoucnost technologií v roce 2025',
        slug: 'budoucnost-technologii-2025',
        content: `# Budoucnost technologií v roce 2025

Rok 2025 přináší mnoho zajímavých technologických novinek. Podívejme se na hlavní trendy.

## Umělá inteligence

AI se stává součástí každodenního života a mění způsob, jak pracujeme a komunikujeme.

## Web3 a blockchain

Decentralizované technologie nabírají na síle a mění online ekonomiku.

## Udržitelné technologie

Zelené technologie jsou klíčové pro budoucnost planety.`,
        excerpt: 'Přehled hlavních technologických trendů pro rok 2025.',
        authorId: testUser.id,
        categoryId: categories[0].id,
        status: 'PUBLISHED',
        featured: false,
        readTime: 5,
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // včera
      }
    }),
    prisma.article.create({
      data: {
        title: 'Jak začít s podnikáním v digitální éře',
        slug: 'jak-zacit-s-podnikanim-digitalni-era',
        content: `# Jak začít s podnikáním v digitální éře

Podnikání v digitální době nabízí nové možnosti i výzvy.

## Klíčové kroky

1. **Definujte svou vizi** - Co chcete dosáhnout?
2. **Najděte svůj trh** - Kdo jsou vaši zákazníci?
3. **Vytvořte MVP** - Minimální životaschopný produkt
4. **Testujte a iterujte** - Učte se od zákazníků

## Digitální nástroje

- Social media marketing
- E-commerce platformy
- Analytické nástroje
- Cloud služby

Úspěch vyžaduje vytrvalost a ochotu se učit!`,
        excerpt: 'Praktické tipy pro začínající podnikatele v digitální éře.',
        authorId: testUser.id,
        categoryId: categories[1].id,
        status: 'PUBLISHED',
        featured: true,
        readTime: 7,
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // předevčírem
      }
    })
  ])

  console.log('✅ Articles created:', articles.length)

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'ai' },
      update: {},
      create: {
        name: 'AI',
        slug: 'ai'
      }
    }),
    prisma.tag.upsert({
      where: { slug: 'web-development' },
      update: {},
      create: {
        name: 'Web Development',
        slug: 'web-development'
      }
    }),
    prisma.tag.upsert({
      where: { slug: 'startup' },
      update: {},
      create: {
        name: 'Startup',
        slug: 'startup'
      }
    })
  ])

  console.log('✅ Tags created:', tags.length)

  console.log('🎉 Blog seeding completed!')
}

seedBlog()
  .catch((e) => {
    console.error('❌ Blog seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

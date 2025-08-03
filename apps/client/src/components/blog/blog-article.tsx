'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Eye, Heart, MessageCircle, Share2, User, ArrowLeft, Bookmark } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Mock data - v reálné aplikaci by se načítala z API
const mockArticle = {
  id: 1,
  title: 'Noční expedice na hrad Kašperk: Co jsme opravdu viděli',
  content: `
# Úvod do expedice

Hrad Kašperk, majestátní pevnost z 14. století, se tyčí nad Šumavou jako němý svědek dávných časů. Ale co když vám řeknu, že jeho zdi stále skrývají více, než by se na první pohled zdálo?

Naše týmová expedice na tento historický hrad začala jako rutinní průzkum, ale rychle se ukázalo, že jsme narazili na něco mnohem více znepokojivého.

## Příprava expedice

Před samotným výjezdem jsme strávili týdny studiem historie hradu a přípravou našeho vybavení:

- **EMF detektory** pro měření elektromagnetických polí
- **Thermal kamery** pro zachycení teplotních anomálií  
- **Digital rekordéry** pro EVP (Electronic Voice Phenomena)
- **Infrared kamery** pro noční vidění

### Co nás čekalo

Historie hradu Kašperk je plná tragických událostí. Během husitských válek zde bylo zabito mnoho nevinných lidí, a podle místních pověstí jejich duše nikdy neopustily tyto zdi.

## První kontakt

Kolem půlnoci, když jsme procházeli hlavní věží, naše EMF detektory začaly vykazovat abnormální hodnoty. Nejprve jsme si mysleli, že jde o technickou chybu, ale pak se začaly dít věci, které nelze vysvětlit běžnou logikou.

> "V tu chvíli jsem pocítil chlad, který prostoupil až do kostí. Nebyl to obyčejný noční chlad – bylo to něco mnohem intenzivnějšího." - Jan Novák, vedoucí expedice

### Teplotní anomálie

Naše thermal kamery zaznamenaly v severovýchodní části hradu pokles teploty o 15°C během několika sekund. Tato anomálie trvala přibližně 3 minuty a pak zmizela stejně rychle, jak se objevila.

## EVP záznamy

Nejznepokojivější byly však naše audio záznamy. Při analýze jsme objevili několik hlasů, které rozhodně nepatřily nikomu z našeho týmu:

1. **Ženský hlas**: "Pomozte mi..."
2. **Dětský hlas**: "Kde je mama?"
3. **Mužský hlas**: "Odejděte odsud!"

### Analýza zvukových stop

Každý z těchto hlasů byl zaznamenán na frekvencích, které lidské ucho normálně nevnímá. Teprve při zpomalení a úpravě zvuku se staly srozumitelnými.

## Vizuální jevy

Kromě audio záznamů se nám podařilo zachytit i několik vizuálních anomálií:

- **Stínové postavy** pohybující se po hradbách
- **Světelné orby** létající kolem věže
- **Pohyblivé objekty** bez zjevné příčiny

### Fotodokumentace

Jedna z našich kamer zachytila postavu v historickém oděvu, která se objevila jen na několika snímcích a pak zmizela. Analýza ukázala, že se nejedná o žádnou známou optickou iluzi.

## Závěr expedice

Po šesti hodinách intenzivního průzkumu jsme opustili hrad s pocitem, že jsme se dotkli něčeho, co překračuje naše chápání reality. Evidence, kterou jsme shromáždili, je přesvědčivá, ale nechávám na vás, abyste si udělali vlastní názor.

## Co si z toho odnést?

Paranormální výzkum není jen o hledání duchů. Je to o pochopení toho, co leží za hranicemi našeho běžného vnímání. Každá expedice nás učí něco nového – nejen o místech, která navštěvujeme, ale i o nás samotných.

Pokud vás naše zkušenost zaujala, sledujte náš blog pro další příběhy z expedic. A kdo ví? Možná se k nám jednou připojíte na některé z našich výzkumných cest.

---

*Celý audio a video materiál z expedice najdete v naší [galerii](). Pokud máte vlastní zkušenosti s hradem Kašperk, podělte se o ně v komentářích níže.*
  `,
  excerpt: 'Během naší nejnovější expedice na hrad Kašperk jsme zaznamenali několik nevysvětlitelných jevů...',
  category: 'Expedice',
  author: 'Jan Novák',
  date: '2025-07-28',
  readTime: '8 min',
  views: 3847,
  likes: 156,
  comments: 23,
  image: '/images/blog/kasperk-expedition.jpg',
  tags: ['Hrad Kašperk', 'EVP', 'Thermal anomálie', 'Duchové', 'Expedice']
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

interface BlogArticleProps {
  articleId: string
}

export function BlogArticle({ articleId }: BlogArticleProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likes, setLikes] = useState(mockArticle.likes)

  // TODO: Použít articleId pro načtení konkrétního článku z API
  console.log('Loading article:', articleId)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: mockArticle.title,
          text: mockArticle.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <article className="py-20">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="outline" className="border-gray-600 text-gray-400 hover:text-white" asChild>
            <Link href="/madnews">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zpět na blog
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                {mockArticle.category}
              </Badge>
              {mockArticle.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-400">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              {mockArticle.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{mockArticle.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(mockArticle.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{mockArticle.readTime}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4 text-gray-400">
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {mockArticle.views.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {mockArticle.comments}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleLike}
                    className={`border-gray-600 ${isLiked ? 'text-red-500 border-red-500' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                    {likes}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`border-gray-600 ${isBookmarked ? 'text-yellow-500 border-yellow-500' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleShare}
                    className="border-gray-600 text-gray-400 hover:text-white"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl mb-12 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <Eye className="h-24 w-24 text-gray-400" />
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div 
              className="text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: mockArticle.content
                  .split('\n')
                  .map(line => {
                    if (line.startsWith('# ')) {
                      return `<h2 class="text-3xl font-bold text-white mt-12 mb-6">${line.substring(2)}</h2>`
                    }
                    if (line.startsWith('## ')) {
                      return `<h3 class="text-2xl font-bold text-white mt-10 mb-4">${line.substring(3)}</h3>`
                    }
                    if (line.startsWith('### ')) {
                      return `<h4 class="text-xl font-bold text-white mt-8 mb-3">${line.substring(4)}</h4>`
                    }
                    if (line.startsWith('> ')) {
                      return `<blockquote class="border-l-4 border-red-500 pl-6 py-4 my-6 bg-gray-900/50 rounded-r-lg italic text-gray-300">${line.substring(2)}</blockquote>`
                    }
                    if (line.startsWith('- ') || line.startsWith('1. ')) {
                      return `<li class="mb-2">${line.substring(2)}</li>`
                    }
                    if (line.trim() === '') {
                      return '<br />'
                    }
                    if (line.startsWith('*') && line.endsWith('*')) {
                      return `<p class="text-sm text-gray-500 italic mt-8 pt-8 border-t border-gray-800">${line.substring(1, line.length - 1)}</p>`
                    }
                    return `<p class="mb-4">${line}</p>`
                  })
                  .join('')
              }}
            />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {mockArticle.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-400">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handleLike}
                  className={`border-gray-600 ${isLiked ? 'text-red-500 border-red-500' : 'text-gray-400 hover:text-white'}`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  Líbí se mi ({likes})
                </Button>

                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="border-gray-600 text-gray-400 hover:text-white"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Sdílet
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </article>
  )
}

'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Instagram, Youtube, Mail, Globe } from 'lucide-react';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string[];
  image: string;
  social: {
    instagram?: string;
    youtube?: string;
    website?: string;
    email?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 'patrik',
    name: 'Patrik Horyna',
    role: 'CREATIVE DIRECTOR | ALPHA TÝM',
    description: [
      'Je zakladatel a jeden z hlavních členů skupiny MadZone, zastává v týmu klíčovou pozici CREATIVE DIRECTOR. Jeho hlavním úkolem je střih videí a celková finalizace epizod, čímž se stará o to, aby každý díl dosahoval nejvyšší kvality a přinášel divákům nezapomenutelný zážitek.',
      'Patrik je známý svou výjimečnou schopností komunikace s „druhou stranou" a přirozeným cítěním pro nadpřirozeno. Jeho intuice a citlivost na jemné energie často přinášejí nečekané a fascinující momenty paranormálních jevů. Proto je kapitánem Alpha týmu.',
      'Patrik se narodil 21.2.1995 v Liberci a už od mládí měl zálibu v umění. Vystudoval Střední uměleckou školu v Liberci, kde se začal věnovat fotografii a vizuálnímu umění, a následně pokračoval studiem herectví na vysoké škole v Praze.',
      'S více než 13 lety zkušeností na YouTube patří Patrik mezi veterány české YouTube scény. Jeho kariéra začala na kanálu FREAKOUT, kde svým humorem a energií bavil statisíce diváků. Patrikův první virální úspěch přišel s komediálními videi "10 typů".',
      'Patrik je také známý svou precizností a smyslem pro detail, což mu pomáhá udržovat vysokou úroveň produkce MadZone. Jeho osobitý styl a zkušenosti z umělecké i herecké oblasti přispívají k jedinečné atmosféře každé epizody.'
    ],
    image: '/team/patrik-horyna.svg',
    social: {
      instagram: 'https://www.instagram.com/patrikhoryna/',
      youtube: 'https://www.youtube.com/@PatrikHoryna'
    }
  },
  {
    id: 'matej',
    name: 'Matěj Zlatev',
    role: 'PROJECT MANAGER | KAMERAMAN',
    description: [
      'Matěj je spoluzakladatelem a hlavním členem skupiny MadZone. Ve své roli se stará nejen o organizační a administrativní činnosti, ale také o koordinaci projektů a plánování natáčení.',
      'Díky svému přístupu zastává v týmu pozici Project Manager a také kameramana, čímž kombinuje kreativní i technickou stránku natáčení. Jeho práce zahrnuje širokou škálu úkolů – od tvorby scénářů až po jednání s partnery.',
      'Matěj vystudoval SŠUM v Brně, zaměřenou na film a management, což mu poskytlo solidní základy pro řízení projektů i práci s filmovou technikou. Kombinace organizačních a technických zkušeností mu umožňuje efektivně přispívat k projektu.',
      'Jeho vzdělání v oblasti filmu mu umožňuje lépe chápat potřeby týmu a pomáhá vytvářet obsah, který je nejen poutavý, ale také profesionálně zpracovaný.',
      'Ve volném čase rád experimentuje s filmovou tvorbou a technikou, a přestože není fanouškem cestování, rád si najde chvíli na klid a odpočinek.'
    ],
    image: '/team/matej-zlatev.svg',
    social: {
      instagram: 'https://www.instagram.com/matejzlatev'
    }
  },
  {
    id: 'jan-hanauer',
    name: 'Jan Hanauer',
    role: 'STŘIHAČ | DABÉR',
    description: [
      'Honza je třetím hlavním členem týmu MadZone od 15. září 2022. Narodil se 7. dubna 1998 v Teplicích, kde vystudoval Střední zdravotnickou školu v oboru Masér sportovní a rekondiční.',
      'Od mládí se věnoval herectví a dabingu. Působil v Hereckém studiu v Teplicích, kde ztvárnil role jako Kleantes ve hře Lakomec nebo Zvíře v inscenaci Kráska a Zvíře.',
      'Od roku 2015 je aktivním dabérem v zájmové skupině Fénix ProDabing, kde má na kontě více než 500 dabingových rolí.',
      'Na YouTube začínal s kanálem JJ Filming Crew, kde spolupracoval na projektu Mafia: The City of Gamers, čtyřhodinovém hraném filmu podle známé hry.',
      'V roce 2022 se připojil k MadZone, kde se věnuje střihu a voiceoverům, čímž využívá své bohaté zkušenosti z dabingu a filmové tvorby.'
    ],
    image: '/team/jan-hanauer.svg',
    social: {
      instagram: 'https://www.instagram.com/mistr_jack/'
    }
  },
  {
    id: 'andrea',
    name: 'Andrea Šauerová',
    role: 'FOTOGRAFKA',
    description: [
      'Andy je jedinou ženskou členkou týmu MadZone, kde se věnuje fotografování. Miluje svoji rodinu, zvířata, cestování, dobré jídlo, horory a černý humor.',
      'Její fascinace nadpřirozenem začala už v dětství, kdy si oblíbila duchařské příběhy a pohádky s temnou tematikou, což ji přirozeně přivedlo k zájmu o paranormální vyšetřování.',
      'Fotografování je její vášní i prací. Přestože nevystudovala uměleckou školu, našla svou cestu ke kreativnímu vyjádření skrze foťák, který poprvé vzala do ruky během rodičovské dovolené.',
      'Zpočátku fotila pro radost, ale postupně si vybudovala klientelu a dnes se fotografování věnuje naplno už tři roky. Andy si váží možnosti tvořit vzpomínky, které přetrvají.',
      'Do týmu MadZone se přidala díky společnému zájmu o nadpřirozeno a sdílené dobrodružství s partou stejně „ulítlých" lidí.'
    ],
    image: '/team/andrea-sauerova.svg',
    social: {
      instagram: 'https://www.instagram.com/andyfotii/'
    }
  },
  {
    id: 'jiri',
    name: 'Jiří Jehlář',
    role: 'IT GURU | SYSTÉMOVÝ ADMINISTRÁTOR',
    description: [
      'Jura je hlavní technik týmu MadZone, známý jako „IT guru". Stará se o chod webových stránek, technickou podporu projektu a režii MadCastů.',
      'Přestože se původně učil opravovat auta, vždy ho více zajímala technologie a IT. Postupně se v tomto oboru zdokonaloval samostudiem při svých předchozích zaměstnáních.',
      'Dnes žije na Moravě a pracuje jako systémový administrátor a OSVČ, kde se věnuje tvorbě webových stránek a správě serverů.',
      'K týmu MadZone se připojil díky náhodě – při poslechu MadCastu zaslechl zmínku o plánovaných webových stránkách a rozhodl se klukům napsat.',
      'Dnes je nepostradatelnou součástí týmu, kde se stará nejen o weby, ale také o technickou podporu celého projektu. Je to naše entita, která se zjevila.'
    ],
    image: '/team/jiri-jehlar.svg',
    social: {
      instagram: 'https://www.instagram.com/jura.jehlar/'
    }
  },
  {
    id: 'jan-flekal',
    name: 'Jan Flekal',
    role: 'STŘIHAČ HERNÍHO OBSAHU',
    description: [
      'Honza „Hydro" je členem týmu MadZone, kde se věnuje především střihu dodatkových videí. Pochází z Pardubic a od dětství ho fascinovala herní technika, úprava videí a hry.',
      'Má rád hororové filmy a seriály, adrenalinové sporty a zajímá se o rozvoj virtuální reality.',
      'K MadZone se přidal díky náhodě – s Patrikem hráli hry a dostal nabídku připojit se jako střihač herního obsahu.',
      'Dnes se věnuje hlavně tvorbě "top videí", která jsou nedílnou součástí kanálu.',
      'Donedávna také spravoval týmový Instagram, který předal Danovi, aby se mohl věnovat střihu.'
    ],
    image: '/team/jan-flekal.svg',
    social: {
      instagram: 'https://www.instagram.com/flicekhonzik'
    }
  }
];

export default function AboutPageContent() {
  // Strukturovaná data pro SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MadZone",
    "url": "https://madzone.cz",
    "foundingDate": "2022",
    "description": "Tým, který se zajímá o nevysvětlitelné úkazy a paranormální jevy",
    "employee": teamMembers.map(member => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.role,
      "sameAs": Object.values(member.social).filter(Boolean)
    }))
  };

  return (
    <div className="bg-gradient-to-b from-zinc-900 via-black to-zinc-900">
      {/* Strukturovaná data pro SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Founded Badge */}
          <div className="inline-flex items-center gap-4 mb-8">
            <Badge variant="outline" className="text-red-400 border-red-400/50 bg-red-950/30 px-6 py-2">
              ZALOŽENO
            </Badge>
            <span className="text-6xl font-bold text-red-500">2022</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Jsme tým, který se zajímá o{' '}
            <span className="text-red-500">nevysvětlitelné úkazy</span>
          </h1>
          
          <p className="text-xl text-zinc-300 max-w-4xl mx-auto leading-relaxed">
            Všichni máme různé zkušenosti a zájmy, ale spojuje nás stejná vášeň.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur">
            <CardContent className="p-8">
              <p className="text-lg text-zinc-300 leading-relaxed">
                Na našich cestách se nám stávají věci, které nedokážeme vysvětlit. Hledáme
                odpovědi na otázky, které zůstávají nezodpovězené. Jezdíme po místech, která mají
                temnou historii, a dokumentujeme důkazy o existenci paranormálních jevů. Každou
                lokaci se snažíme poznat a prověřit i její minulost. Toto jsou naše svědectví, naše
                pátrání po neznámém a kontroverzním tématu nadpřirozených jevů.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Náš <span className="text-red-500">tým</span>
          </h2>
          
          <div className="space-y-20">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Photo */}
                <div className="lg:w-1/3">
                  <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
                    <CardContent className="p-4">
                      <div className="aspect-square relative overflow-hidden rounded-lg bg-zinc-800">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-team.svg';
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Content */}
                <div className="lg:w-2/3">
                  <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur">
                    <CardContent className="p-8">
                      <div className="mb-4">
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {member.name}
                        </h3>
                        <Badge variant="outline" className="text-red-400 border-red-400/50 bg-red-950/30">
                          {member.role}
                        </Badge>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        {member.description.map((paragraph, idx) => (
                          <p key={idx} className="text-zinc-300 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      
                      {/* Social Links */}
                      <div className="flex gap-3">
                        {member.social.instagram && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-zinc-700 hover:border-red-500 hover:text-red-400"
                            onClick={() => window.open(member.social.instagram, '_blank')}
                          >
                            <Instagram className="w-4 h-4 mr-2" />
                            Instagram
                          </Button>
                        )}
                        {member.social.youtube && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-zinc-700 hover:border-red-500 hover:text-red-400"
                            onClick={() => window.open(member.social.youtube, '_blank')}
                          >
                            <Youtube className="w-4 h-4 mr-2" />
                            YouTube
                          </Button>
                        )}
                        {member.social.website && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-zinc-700 hover:border-red-500 hover:text-red-400"
                            onClick={() => window.open(member.social.website, '_blank')}
                          >
                            <Globe className="w-4 h-4 mr-2" />
                            Website
                          </Button>
                        )}
                        {member.social.email && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-zinc-700 hover:border-red-500 hover:text-red-400"
                            onClick={() => window.open(`mailto:${member.social.email}`, '_blank')}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-red-950/30 to-zinc-900/50 border-red-900/50 backdrop-blur">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Připojte se k našemu pátrání
              </h3>
              <p className="text-zinc-300 mb-6">
                Sledujte naše cesty do neznáma a staňte se součástí komunity, která hledá odpovědi na nevysvětlitelné otázky.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => window.open('https://yt.madzone.cz/', '_blank')}
                >
                  <Youtube className="w-4 h-4 mr-2" />
                  YouTube
                </Button>
                <Button 
                  variant="outline"
                  className="border-zinc-700 hover:border-red-500 hover:text-red-400"
                  onClick={() => window.open('https://ig.madzone.cz/', '_blank')}
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
                <Button 
                  variant="outline"
                  className="border-zinc-700 hover:border-red-500 hover:text-red-400"
                  onClick={() => window.open('mailto:info@madzone.cz', '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Kontakt
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

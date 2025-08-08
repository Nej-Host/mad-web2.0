'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Instagram, Youtube, Mail, MapPin, Phone, ArrowUp } from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  main: [
    { name: 'Domů', href: '/' },
    { name: 'O nás', href: '/o-nas' },
    { name: 'Mapa míst', href: '/lokace' },
    { name: 'Aktuality', href: '/aktuality' },
    { name: 'Kontakt', href: '/kontakt' }
  ],
  categories: [
    { name: 'Hrady a zámky', href: '/kategorie/hrady' },
    { name: 'Opuštěné budovy', href: '/kategorie/opustene' },
    { name: 'Hřbitovy', href: '/kategorie/hrbitovy' },
    { name: 'Průmyslové objekty', href: '/kategorie/prumysl' },
    { name: 'Kostely', href: '/kategorie/kostely' }
  ],
  shop: [
    { name: 'Oblečení', href: '/obchod/obleceni' },
    { name: 'Vybavení', href: '/obchod/vybaveni' },
    { name: 'Dárky', href: '/obchod/darky' },
    { name: 'Knihy', href: '/obchod/knihy' },
    { name: 'Dárkové poukazy', href: '/obchod/poukazy' }
  ],
  help: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Doprava', href: '/doprava' },
    { name: 'Reklamace', href: '/reklamace' },
    { name: 'Osobní údaje', href: '/gdpr' },
    { name: 'Obchodní podmínky', href: '/podminky' }
  ]
}

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://ig.madzone.cz',
    icon: Instagram,
    color: 'hover:text-pink-500'
  },
  {
    name: 'YouTube',
    href: 'https://yt.madzone.cz',
    icon: Youtube,
    color: 'hover:text-red-500'
  },
  {
    name: 'Email',
    href: 'mailto:info@madzone.cz',
    icon: Mail,
    color: 'hover:text-blue-500'
  }
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Sledujte naše dobrodružství
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Přihlaste se k odběru novinek a buďte první, kdo se dozví o našich nových expedicích a objevech.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input 
                type="email" 
                placeholder="Váš email" 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-red-500 hover:bg-red-600 text-white px-8">
                Přihlásit se
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <span className="text-2xl font-bold text-white">MADZONE</span>
                <span className="text-red-500">.CZ</span>
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Průkopníci paranormálního výzkumu v České republice. 
                Odkrýváme tajemství míst, kam se ostatní bojí vstoupit.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-red-500" />
                  <span>Praha, Česká republika</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-red-500" />
                  <span>+420 123 456 789</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-red-500" />
                  <span>info@madzone.cz</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Navigace</h4>
              <ul className="space-y-2">
                {footerLinks.main.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold text-white mb-4">Kategorie</h4>
              <ul className="space-y-2">
                {footerLinks.categories.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-semibold text-white mb-4">E-shop</h4>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-semibold text-white mb-4">Podpora</h4>
              <ul className="space-y-2">
                {footerLinks.help.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Media & Back to Top */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-800">
            <div className="flex items-center space-x-6 mb-4 sm:mb-0">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>

            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-400 hover:text-white hover:border-red-500"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Zpět nahoru
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Madzone.cz. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  )
}

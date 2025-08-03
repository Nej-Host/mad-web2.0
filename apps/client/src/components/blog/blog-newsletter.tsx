'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, BookOpen, Bell, Gift } from 'lucide-react'
import { useState } from 'react'

const newsletterFeatures = [
  {
    icon: BookOpen,
    title: 'Exkluzivní články',
    description: 'Přístup k článkům, které nejsou veřejně dostupné'
  },
  {
    icon: Bell,
    title: 'Oznámení expedic',
    description: 'Buďte první, kdo se dozví o našich nových výzkumech'
  },
  {
    icon: Gift,
    title: 'Speciální nabídky',
    description: 'Slevy na merchandise a exkluzivní produkty'
  }
]

export function BlogNewsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implementovat skutečnou registraci
    setTimeout(() => {
      setIsSubscribed(true)
      setIsSubmitting(false)
      setEmail('')
    }, 1000)
  }

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-green-500/10 border-green-500/30">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
                <Mail className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Děkujeme za registraci!
              </h3>
              <p className="text-gray-300 mb-6">
                Potvrzovací email jsme vám odeslali na zadanou adresu. 
                Nezapomeňte zkontrolovat i spam složku.
              </p>
              <Button 
                variant="outline" 
                className="border-green-500 text-green-400 hover:bg-green-500/10"
                onClick={() => setIsSubscribed(false)}
              >
                Přihlásit další email
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-900/50 border-gray-700/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Levá strana - informace */}
                <div className="p-8 lg:p-12">
                  <div className="inline-flex items-center px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-6">
                    <Mail className="h-4 w-4 mr-2" />
                    Madnews Newsletter
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                    ZŮSTAŇTE V OBRAZE
                  </h3>

                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    Přihlaste se k odběru našeho newsletteru a získejte přístup k exkluzivnímu obsahu, 
                    včasným oznámením o nových expedicích a speciálním nabídkám.
                  </p>

                  <div className="space-y-6">
                    {newsletterFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <feature.icon className="h-5 w-5 text-red-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                          <p className="text-gray-400 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pravá strana - formulář */}
                <div className="bg-gradient-to-br from-red-500/10 to-gray-900/50 p-8 lg:p-12 flex items-center">
                  <div className="w-full">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-300 mb-2">
                          Emailová adresa
                        </label>
                        <Input
                          id="newsletter-email"
                          type="email"
                          placeholder="vas@email.cz"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 h-12"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        disabled={isSubmitting}
                        className="w-full bg-red-500 hover:bg-red-600 text-white h-12"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Přihlašuji...
                          </div>
                        ) : (
                          <>
                            <Mail className="mr-2 h-4 w-4" />
                            Přihlásit se k odběru
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        Odesláním souhlasíte s našimi{' '}
                        <a href="/gdpr" className="text-red-400 hover:underline">
                          podmínkami ochrany osobních údajů
                        </a>
                        . Odhlásit se můžete kdykoli.
                      </p>
                    </form>

                    {/* Statistiky */}
                    <div className="mt-8 pt-8 border-t border-gray-700/50">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-white">2.5K+</div>
                          <div className="text-xs text-gray-400">Odběratelů</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">98%</div>
                          <div className="text-xs text-gray-400">Spokojenost</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

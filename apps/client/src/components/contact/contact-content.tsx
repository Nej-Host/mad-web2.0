'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MapPin, Building2, Users, Youtube, Instagram, Send } from 'lucide-react'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactContent() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulace odeslání formuláře
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Formulář odeslán:', form)
    alert('Zpráva byla úspěšně odeslána!')
    
    setForm({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero sekce */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Kontakt
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Spojte se s námi! Rádi odpovíme na vaše dotazy, probereme možnosti spolupráce 
          nebo si jen tak pokecáme o paranormálních zážitcích.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Kontaktní formulář */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Send className="h-5 w-5 text-red-500" />
              Napište nám
            </CardTitle>
            <CardDescription className="text-gray-400">
              Vyplňte formulář a ozveme se vám co nejdříve
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Jméno *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-500"
                    placeholder="Vaše jméno"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-500"
                    placeholder="vas@email.cz"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white">Předmět *</Label>
                <Input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  required
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-500"
                  placeholder="O čem chcete psát?"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">Zpráva *</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                  rows={6}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-500 resize-none"
                  placeholder="Vaše zpráva..."
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Odesílám...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Odeslat zprávu
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Kontaktní informace */}
        <div className="space-y-6">
          {/* E-mailové adresy */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Mail className="h-5 w-5 text-red-500" />
                E-mailové adresy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Users className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-white font-medium">Spolupráce a obchod</p>
                  <a 
                    href="mailto:spoluprace@madzone.cz" 
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    spoluprace@madzone.cz
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Mail className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-white font-medium">Obecné dotazy</p>
                  <a 
                    href="mailto:info@madzone.cz" 
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    info@madzone.cz
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Firemní údaje */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="h-5 w-5 text-red-500" />
                Firemní údaje
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-white">
                <p className="font-medium">Kaetiop s.r.o.</p>
                <p className="text-gray-400">IČO: 03884007</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="text-gray-300">
                  <p>Jedovnická 2347/6</p>
                  <p>Líšeň, 628 00 Brno</p>
                  <p>Česká republika</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sociální sítě */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-500" />
                Sledujte nás
              </CardTitle>
              <CardDescription className="text-gray-400">
                Nejnovější videa a fotky z našich výprav
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://youtube.com/@madzonecz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors group"
                >
                  <Youtube className="h-5 w-5 text-white" />
                  <span className="text-white font-medium">YouTube</span>
                </a>
                
                <a
                  href="https://instagram.com/madzone.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-colors group"
                >
                  <Instagram className="h-5 w-5 text-white" />
                  <span className="text-white font-medium">Instagram</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dodatečné informace */}
      <div className="mt-12 text-center">
        <Card className="bg-gray-900 border-gray-700 max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <h3 className="text-white text-lg font-semibold mb-3">
              Odpovědi na časté dotazy
            </h3>
            <div className="text-gray-300 space-y-2 text-sm">
              <p>• <strong>Doba odpovědi:</strong> Obvykle odpovídáme do 24-48 hodin</p>
              <p>• <strong>Spolupráce:</strong> Pro obchodní návrhy použijte e-mail spoluprace@madzone.cz</p>
              <p>• <strong>Obsah:</strong> Všechny naše videa najdete na YouTube kanálu</p>
              <p>• <strong>Lokace:</strong> Neodhalujeme přesné souřadnice aktivních míst</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, MapPin, Instagram, Star, Users, Calendar } from 'lucide-react';

// Import komponent
import { MadzoneLocationMap } from '@/components/public/map/location-map';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero sekce */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              Madzone Web 2.0
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Vítejte v Madzone
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Moderní platforma pro události, merchandise a mnohem více. 
              Objevte naší komunitu a staňte se součástí něčeho velkého.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/shop">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Prohlédnout obchod
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#about">
                  Dozvědět se více
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features sekce */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Co nabízíme</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Objevte všechny možnosti naší platformy
            </p>
          </div>

          <Tabs defaultValue="shop" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="shop">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Obchod
              </TabsTrigger>
              <TabsTrigger value="map">
                <MapPin className="mr-2 h-4 w-4" />
                Mapa
              </TabsTrigger>
              <TabsTrigger value="instagram">
                <Instagram className="mr-2 h-4 w-4" />
                Instagram
              </TabsTrigger>
            </TabsList>

            <TabsContent value="shop" className="mt-8">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <ShoppingBag className="h-6 w-6" />
                    E-commerce platforma
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Oficiální merchandise</h3>
                      <p className="text-muted-foreground mb-6">
                        Objevte naši exkluzivní kolekci triček, mikin a dalších produktů. 
                        Všechny produkty jsou vyráběny s důrazem na kvalitu a udržitelnost.
                      </p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-primary" />
                          <span className="text-sm">Vysoká kvalita materiálů</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-primary" />
                          <span className="text-sm">Rychlé dodání</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-primary" />
                          <span className="text-sm">Bezpečné platby</span>
                        </div>
                      </div>
                      <Button asChild>
                        <Link href="/shop">
                          Prohlédnout produkty
                        </Link>
                      </Button>
                    </div>
                    <div className="bg-muted rounded-lg p-8 text-center">
                      <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        E-commerce platforma poháněná moderní Medusa technologií
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="map" className="mt-8">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <MapPin className="h-6 w-6" />
                    Interaktivní mapa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-6">
                        Najděte naše lokace, připravované události a partnery na interaktivní mapě
                      </p>
                    </div>
                    
                    {/* Mapa komponenta */}
                    <MadzoneLocationMap />
                    
                    <div className="grid sm:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl mb-2">🏢</div>
                        <h4 className="font-semibold">Sídlo</h4>
                        <p className="text-sm text-muted-foreground">Hlavní pobočka</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl mb-2">🎉</div>
                        <h4 className="font-semibold">Události</h4>
                        <p className="text-sm text-muted-foreground">Připravované akce</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl mb-2">🤝</div>
                        <h4 className="font-semibold">Partneři</h4>
                        <p className="text-sm text-muted-foreground">Naše spolupráce</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instagram" className="mt-8">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Instagram className="h-6 w-6" />
                    Instagram feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-6">
                    <p className="text-muted-foreground">
                      Sledujte naše nejnovější příspěvky a buďte v obraze o všem, co se děje
                    </p>
                    
                    <div className="bg-muted rounded-lg p-8">
                      <Instagram className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">
                        Instagram feed bude integrován pomocí Graph API
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Následuje implementace backendu pro bezpečné cachování dat
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold">15.2k</h4>
                        <p className="text-sm text-muted-foreground">Followerů</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold">456</h4>
                        <p className="text-sm text-muted-foreground">Příspěvků</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold">892</h4>
                        <p className="text-sm text-muted-foreground">Sledujeme</p>
                      </div>
                    </div>

                    <Button variant="outline" asChild>
                      <a 
                        href="https://instagram.com/madzone.cz" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Instagram className="mr-2 h-4 w-4" />
                        Sledovat na Instagramu
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* O nás sekce */}
      <section id="about" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">O Madzone</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Jsme tým nadšenců, kteří se věnují vytváření nezapomenutelných zážitků 
              a budování silné komunity. Naše moderní webová platforma kombinuje 
              nejnovější technologie s uživatelsky přívětivým designem.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl mb-4">🚀</div>
                  <h3 className="font-semibold mb-2">Moderní technologie</h3>
                  <p className="text-sm text-muted-foreground">
                    Využíváme nejnovější webové technologie pro optimální výkon
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl mb-4">👥</div>
                  <h3 className="font-semibold mb-2">Silná komunita</h3>
                  <p className="text-sm text-muted-foreground">
                    Spojujeme lidi se společnými zájmy a vášní
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl mb-4">⭐</div>
                  <h3 className="font-semibold mb-2">Kvalitní služby</h3>
                  <p className="text-sm text-muted-foreground">
                    Zaměřujeme se na kvalitu a spokojenost našich uživatelů
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA sekce */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Připojte se k naší komunitě
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Nezmeškejte žádné novinky, exkluzivní nabídky a připravované události. 
                Staňte se součástí Madzone komunity ještě dnes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/team-panel">
                    Týmový panel
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/shop">
                    Navštívit obchod
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Instagram, Users, Calendar, Star, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// Import komponent
import { InstagramFeed } from '@/components/public/instagram/instagram-feed';
import { useInstagramFeed, useInstagramStats, formatInstagramCount } from '@/lib/hooks/use-instagram';

export default function InstagramPage() {
  const [columns, setColumns] = useState<2 | 3 | 4>(3);
  const [showCaptions, setShowCaptions] = useState(true);
  const [showStats, setShowStats] = useState(true);

  const { posts, loading, error, refreshFeed } = useInstagramFeed();
  const { stats, loading: statsLoading } = useInstagramStats();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Domů
                </Link>
              </Button>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Instagram className="h-8 w-8" />
              Instagram Feed
            </h1>
            <p className="text-muted-foreground mt-2">
              Sledujte naše nejnovější příspěvky přímo zde
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={refreshFeed}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Obnovit
            </Button>
            <Button variant="outline" asChild>
              <a 
                href="https://instagram.com/madzone.cz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram size={16} />
                Sledovat
              </a>
            </Button>
          </div>
        </div>

        {/* Statistiky */}
        {stats && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Instagram statistiky
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="text-center p-4 bg-muted rounded-lg animate-pulse">
                      <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-20 mx-auto" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h4 className="text-2xl font-bold">{formatInstagramCount(stats.followers_count || 0)}</h4>
                    <p className="text-sm text-muted-foreground">Followerů</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h4 className="text-2xl font-bold">{formatInstagramCount(stats.media_count || 0)}</h4>
                    <p className="text-sm text-muted-foreground">Příspěvků</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h4 className="text-2xl font-bold">{formatInstagramCount(stats.follows_count || 0)}</h4>
                    <p className="text-sm text-muted-foreground">Sledujeme</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Nastavení zobrazení */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nastavení zobrazení</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sloupce:</span>
                <div className="flex gap-1">
                  {([2, 3, 4] as const).map((num) => (
                    <Button
                      key={num}
                      variant={columns === num ? "default" : "outline"}
                      size="sm"
                      onClick={() => setColumns(num)}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={showCaptions ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowCaptions(!showCaptions)}
                >
                  Popisky
                </Button>
                <Button
                  variant={showStats ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowStats(!showStats)}
                >
                  Statistiky
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error banner */}
        {error && (
          <Card className="mb-8 border-destructive">
            <CardContent className="py-4">
              <div className="flex items-center gap-2 text-destructive">
                <Instagram size={16} />
                <span className="font-medium">Upozornění:</span>
                <span>{error}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Zobrazují se ukázková data pro demonstraci funkcionality. 
                Pro plnou funkčnost je potřeba nakonfigurovat Instagram Graph API.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Instagram Feed */}
        <InstagramFeed
          posts={posts}
          loading={loading}
          error={error}
          maxPosts={24}
          columns={columns}
          showCaption={showCaptions}
          showStats={showStats}
          onRefresh={refreshFeed}
        />

        {/* Info panel */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>O Instagram integraci</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Instagram className="h-5 w-5" />
                  Technické informace
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Použití Instagram Graph API v18.0</li>
                  <li>• Automatické cachování dat (1 hodina)</li>
                  <li>• Podpora pro obrázky, videa a albumy</li>
                  <li>• Responsive design pro všechna zařízení</li>
                  <li>• Bezpečné ukládání přístupových tokenů</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Funkce
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Zobrazení posledních příspěvků</li>
                  <li>• Počet lajků a komentářů</li>
                  <li>• Přímé odkazy na Instagram</li>
                  <li>• Náhled v full-size módu</li>
                  <li>• Přizpůsobitelné zobrazení</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>Poznámka:</strong> Pro produkční prostředí je potřeba nakonfigurovat 
                Instagram Business Account, Facebook stránku a vytvořit aplikaci v Facebook for Developers. 
                Současně jsou zobrazena ukázková data.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

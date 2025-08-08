'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingBag, Filter, Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Import komponent
import { ProductGrid } from '@/components/public/e-commerce/product-grid';
import { ShoppingCart } from '@/components/public/e-commerce/shopping-cart';
import { useProducts, useCart, type Product } from '@/lib/hooks/use-medusa';

export default function ShopPage() {
  const [view, setView] = useState<'products' | 'cart'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Hooks pro data
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { cart, loading: cartLoading, addToCart, updateQuantity, removeItem, checkout } = useCart();

  // Filtrování a řazení produktů
  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      product.collection?.title.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        const priceA = a.variants[0]?.prices[0]?.amount || 0;
        const priceB = b.variants[0]?.prices[0]?.amount || 0;
        return priceA - priceB;
      case 'price-high':
        const priceA2 = a.variants[0]?.prices[0]?.amount || 0;
        const priceB2 = b.variants[0]?.prices[0]?.amount || 0;
        return priceB2 - priceA2;
      case 'name':
        return a.title.localeCompare(b.title);
      default: // newest
        return 0;
    }
  });

  const handleAddToCart = async (productId: string, variantId: string) => {
    await addToCart(variantId, 1);
  };

  const handleProductClick = (product: Product) => {
    console.log('Zobrazit detail produktu:', product);
    // TODO: Implementovat detail produktu
  };

  const handleCheckout = async () => {
    const checkoutId = await checkout();
    if (checkoutId) {
      console.log('Redirect na platbu pro košík:', checkoutId);
      // TODO: Implementovat redirect na platební bránu
    }
  };

  if (view === 'cart') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setView('products')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Zpět do obchodu
            </Button>
            <h1 className="text-3xl font-bold">Nákupní košík</h1>
          </div>

          <ShoppingCart
            items={cart?.items || []}
            summary={{
              subtotal: cart?.subtotal || 0,
              tax_total: cart?.tax_total || 0,
              total: cart?.total || 0,
              currency_code: cart?.currency_code || 'czk'
            }}
            isLoading={cartLoading}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    );
  }

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
              <ShoppingBag className="h-8 w-8" />
              Madzone Obchod
            </h1>
            <p className="text-muted-foreground mt-2">
              Objevte naši exkluzivní kolekci merchandise
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="hidden sm:flex">
              {products.length} produktů
            </Badge>
            <Button 
              variant="outline" 
              onClick={() => setView('cart')}
              className="flex items-center gap-2"
            >
              <ShoppingBag size={16} />
              Košík ({cart?.items?.length || 0})
            </Button>
          </div>
        </div>

        {/* Filtry a vyhledávání */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtrování a řazení
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Hledat produkty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všechny kategorie</SelectItem>
                  <SelectItem value="oblečení">Oblečení</SelectItem>
                  <SelectItem value="doplňky">Doplňky</SelectItem>
                  <SelectItem value="limitované">Limitované edice</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Řadit podle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Nejnovější</SelectItem>
                  <SelectItem value="price-low">Cena: od nejnižší</SelectItem>
                  <SelectItem value="price-high">Cena: od nejvyšší</SelectItem>
                  <SelectItem value="name">Název: A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Produkty */}
        {productsError && (
          <Card className="mb-8">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">{productsError}</p>
              <p className="text-sm text-muted-foreground">
                Zobrazují se mock data pro demonstraci funkcionality.
              </p>
            </CardContent>
          </Card>
        )}

        <ProductGrid
          products={sortedProducts}
          loading={productsLoading}
          onAddToCart={handleAddToCart}
          onProductClick={handleProductClick}
        />

        {/* Výsledky hledání */}
        {searchQuery && (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              {filteredProducts.length === 0 
                ? `Žádné výsledky pro "${searchQuery}"`
                : `Nalezeno ${filteredProducts.length} produktů pro "${searchQuery}"`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

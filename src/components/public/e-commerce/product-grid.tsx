'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

// Interface pro produkt podle Medusa API
interface Product {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  handle: string;
  thumbnail?: string;
  images?: Array<{
    id: string;
    url: string;
  }>;
  variants: Array<{
    id: string;
    title: string;
    prices: Array<{
      amount: number;
      currency_code: string;
    }>;
    inventory_quantity: number;
  }>;
  collection?: {
    id: string;
    title: string;
  };
  tags?: Array<{
    id: string;
    value: string;
  }>;
  status: 'draft' | 'proposed' | 'published' | 'rejected';
}

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onAddToCart: (productId: string, variantId: string) => void;
  onProductClick: (product: Product) => void;
}

export function ProductGrid({ 
  products, 
  loading = false, 
  onAddToCart, 
  onProductClick 
}: ProductGridProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const formatPrice = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: currencyCode.toUpperCase(),
    }).format(amount / 100); // Medusa ukládá ceny v centimes
  };

  const getLowestPrice = (product: Product) => {
    if (!product.variants.length) return null;
    
    const lowestPriceVariant = product.variants.reduce((lowest, variant) => {
      if (!variant.prices.length) return lowest;
      const variantPrice = variant.prices[0].amount;
      const lowestPrice = lowest?.prices[0]?.amount || Infinity;
      return variantPrice < lowestPrice ? variant : lowest;
    });

    return lowestPriceVariant?.prices[0] 
      ? formatPrice(lowestPriceVariant.prices[0].amount, lowestPriceVariant.prices[0].currency_code)
      : null;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200" />
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-8 bg-gray-200 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const lowestPrice = getLowestPrice(product);
        const defaultVariant = product.variants[0];
        const isInStock = defaultVariant?.inventory_quantity > 0;

        return (
          <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              {product.thumbnail ? (
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Eye size={48} />
                </div>
              )}
              
              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-8 h-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                >
                  <Heart 
                    size={16} 
                    className={favorites.has(product.id) ? 'fill-red-500 text-red-500' : ''} 
                  />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-8 h-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onProductClick(product);
                  }}
                >
                  <Eye size={16} />
                </Button>
              </div>

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {!isInStock && (
                  <Badge variant="secondary" className="text-xs">
                    Vyprodáno
                  </Badge>
                )}
                {product.collection && (
                  <Badge variant="outline" className="text-xs">
                    {product.collection.title}
                  </Badge>
                )}
              </div>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                {product.title}
              </CardTitle>
              {product.subtitle && (
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {product.subtitle}
                </p>
              )}
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-3">
                {lowestPrice ? (
                  <span className="text-lg font-semibold text-primary">
                    {lowestPrice}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Cena na vyžádání
                  </span>
                )}
              </div>

              <Button
                className="w-full"
                size="sm"
                disabled={!isInStock || !defaultVariant}
                onClick={(e) => {
                  e.stopPropagation();
                  if (defaultVariant) {
                    onAddToCart(product.id, defaultVariant.id);
                  }
                }}
              >
                <ShoppingCart size={16} className="mr-2" />
                {isInStock ? 'Přidat do košíku' : 'Vyprodáno'}
              </Button>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag.id} variant="outline" className="text-xs">
                      {tag.value}
                    </Badge>
                  ))}
                  {product.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

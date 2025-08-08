'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

// Interface pro položku v košíku
interface CartItem {
  id: string;
  variant_id: string;
  product_id: string;
  title: string;
  variant_title?: string;
  thumbnail?: string;
  quantity: number;
  unit_price: number;
  currency_code: string;
  total: number;
}

interface CartSummary {
  subtotal: number;
  tax_total: number;
  total: number;
  currency_code: string;
}

interface ShoppingCartProps {
  items: CartItem[];
  summary: CartSummary;
  isLoading?: boolean;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export function ShoppingCart({
  items,
  summary,
  isLoading = false,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: ShoppingCartProps) {
  const formatPrice = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: currencyCode.toUpperCase(),
    }).format(amount / 100);
  };

  if (items.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ShoppingBag size={64} className="text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Váš košík je prázdný</h3>
          <p className="text-muted-foreground text-center mb-6">
            Přidejte nějaké produkty a my je zde zobrazíme
          </p>
          <Button onClick={() => window.history.back()}>
            Pokračovat v nákupu
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag size={20} />
            Nákupní košík ({items.length} {items.length === 1 ? 'položka' : items.length < 5 ? 'položky' : 'položek'})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              {/* Obrázek produktu */}
              <div className="w-16 h-16 relative bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ShoppingBag size={24} />
                  </div>
                )}
              </div>

              {/* Informace o produktu */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.title}</h4>
                {item.variant_title && (
                  <Badge variant="outline" className="text-xs mt-1">
                    {item.variant_title}
                  </Badge>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  {formatPrice(item.unit_price, item.currency_code)} / ks
                </p>
              </div>

              {/* Množství */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-8 h-8 p-0"
                  disabled={isLoading || item.quantity <= 1}
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus size={14} />
                </Button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-8 h-8 p-0"
                  disabled={isLoading}
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>

              {/* Celková cena */}
              <div className="text-right min-w-0">
                <p className="font-semibold text-sm">
                  {formatPrice(item.total, item.currency_code)}
                </p>
              </div>

              {/* Odstranit */}
              <Button
                size="sm"
                variant="ghost"
                className="w-8 h-8 p-0 text-destructive hover:text-destructive"
                disabled={isLoading}
                onClick={() => onRemoveItem(item.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Souhrn košíku */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Souhrn objednávky</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Mezisoučet:</span>
              <span>{formatPrice(summary.subtotal, summary.currency_code)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>DPH:</span>
              <span>{formatPrice(summary.tax_total, summary.currency_code)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold">
                <span>Celkem:</span>
                <span className="text-lg">
                  {formatPrice(summary.total, summary.currency_code)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <Button 
              className="w-full" 
              size="lg"
              disabled={isLoading || items.length === 0}
              onClick={onCheckout}
            >
              {isLoading ? 'Zpracovává se...' : 'Pokračovat k platbě'}
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.history.back()}
            >
              Pokračovat v nákupu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

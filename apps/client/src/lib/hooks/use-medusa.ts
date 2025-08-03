'use client';

import { useState, useEffect, useCallback } from 'react';
import Medusa from '@medusajs/medusa-js';

// Konfigurace Medusa klienta
const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000',
  maxRetries: 3,
});

// Types pro e-commerce
export interface Product {
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

export interface CartItem {
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

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax_total: number;
  total: number;
  currency_code: string;
}

// Hook pro načítání produktů
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { products } = await medusa.products.list({
        limit: 50,
        expand: 'variants,variants.prices,images,collection,tags'
      });

      setProducts(products as Product[]);
    } catch (err) {
      console.error('Chyba při načítání produktů:', err);
      setError('Nepodařilo se načíst produkty');
      
      // Fallback na mock data pro development
      setProducts([
        {
          id: 'mock-1',
          title: 'Madzone Tričko',
          subtitle: 'Oficiální merchandise',
          description: 'Kvalitní bavlněné tričko s logem Madzone',
          handle: 'madzone-tricko',
          thumbnail: '/api/placeholder/400/400',
          variants: [{
            id: 'variant-1',
            title: 'M / Černá',
            prices: [{
              amount: 59900,
              currency_code: 'czk'
            }],
            inventory_quantity: 10
          }],
          collection: {
            id: 'col-1',
            title: 'Oblečení'
          },
          tags: [{
            id: 'tag-1',
            value: 'tričko'
          }],
          status: 'published'
        },
        {
          id: 'mock-2',
          title: 'Madzone Mikina',
          subtitle: 'Zimní kolekce',
          description: 'Teplá mikina s kapucí',
          handle: 'madzone-mikina',
          thumbnail: '/api/placeholder/400/400',
          variants: [{
            id: 'variant-2',
            title: 'L / Šedá',
            prices: [{
              amount: 129900,
              currency_code: 'czk'
            }],
            inventory_quantity: 5
          }],
          collection: {
            id: 'col-1',
            title: 'Oblečení'
          },
          tags: [{
            id: 'tag-2',
            value: 'mikina'
          }],
          status: 'published'
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts
  };
}

// Hook pro správu košíku
export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializace nebo načtení košíku
  const initializeCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Zkusit načíst existující košík z localStorage
      const savedCartId = localStorage.getItem('medusa_cart_id');
      
      if (savedCartId) {
        try {
          const { cart } = await medusa.carts.retrieve(savedCartId);
          setCart(cart as unknown as Cart);
          return;
        } catch {
          // Košík neexistuje, vytvoříme nový
          localStorage.removeItem('medusa_cart_id');
        }
      }

      // Vytvořit nový košík
      const { cart: newCart } = await medusa.carts.create();
      setCart(newCart as unknown as Cart);
      localStorage.setItem('medusa_cart_id', newCart.id);
    } catch (err) {
      console.error('Chyba při inicializaci košíku:', err);
      setError('Nepodařilo se inicializovat košík');
      
      // Fallback mock košík
      const mockCart: Cart = {
        id: 'mock-cart',
        items: [],
        subtotal: 0,
        tax_total: 0,
        total: 0,
        currency_code: 'czk'
      };
      setCart(mockCart);
    } finally {
      setLoading(false);
    }
  }, []);

  // Přidat položku do košíku
  const addToCart = useCallback(async (variantId: string, quantity: number = 1) => {
    if (!cart) return;

    try {
      setLoading(true);
      setError(null);

      const { cart: updatedCart } = await medusa.carts.lineItems.create(cart.id, {
        variant_id: variantId,
        quantity
      });

      setCart(updatedCart as unknown as Cart);
    } catch (err) {
      console.error('Chyba při přidávání do košíku:', err);
      setError('Nepodařilo se přidat položku do košíku');
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Aktualizovat množství
  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    if (!cart) return;

    try {
      setLoading(true);
      setError(null);

      const { cart: updatedCart } = await medusa.carts.lineItems.update(cart.id, itemId, {
        quantity
      });

      setCart(updatedCart as unknown as Cart);
    } catch (err) {
      console.error('Chyba při aktualizaci množství:', err);
      setError('Nepodařilo se aktualizovat množství');
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Odstranit položku
  const removeItem = useCallback(async (itemId: string) => {
    if (!cart) return;

    try {
      setLoading(true);
      setError(null);

      const { cart: updatedCart } = await medusa.carts.lineItems.delete(cart.id, itemId);
      setCart(updatedCart as unknown as Cart);
    } catch (err) {
      console.error('Chyba při odstraňování položky:', err);
      setError('Nepodařilo se odstranit položku');
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Checkout proces
  const checkout = useCallback(async () => {
    if (!cart) return null;

    try {
      setLoading(true);
      setError(null);

      // Zde by byla logika pro checkout process
      // Pro teď jen redirectujeme na platební bránu
      
      // V reálné implementaci:
      // 1. Vytvořit payment session
      // 2. Redirect na Stripe/PayPal
      // 3. Zpracovat návrat z platby
      
      console.log('Iniciování checkout procesu pro košík:', cart.id);
      
      return cart.id;
    } catch (err) {
      console.error('Chyba při checkout:', err);
      setError('Nepodařilo se zahájit platbu');
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeItem,
    checkout,
    initializeCart
  };
}

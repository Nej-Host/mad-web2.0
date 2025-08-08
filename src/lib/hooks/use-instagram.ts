'use client';

import { useState, useEffect, useCallback } from 'react';

// Interface pro Instagram Graph API response
interface InstagramPost {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  children?: Array<{
    id: string;
    media_type: 'IMAGE' | 'VIDEO';
    media_url: string;
  }>;
}

interface InstagramApiResponse {
  data: InstagramPost[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

// Hook pro práci s Instagram Graph API
export function useInstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Funkce pro načtení dat z backendu
  const fetchInstagramPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Volání na náš backend endpoint
      const response = await fetch('/api/instagram/feed', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: InstagramApiResponse = await response.json();
      setPosts(data.data || []);
      setLastRefresh(new Date());
    } catch (err) {
      console.error('Chyba při načítání Instagram feedu:', err);
      setError('Nepodařilo se načíst Instagram příspěvky');
      
      // Fallback na mock data pro development/demo
      const mockPosts: InstagramPost[] = [
        {
          id: 'mock-1',
          caption: 'Nový merch je tady! 🔥 Podívejte se na naši nejnovější kolekci triček a mikin. #madzone #merch #fashion',
          media_type: 'IMAGE',
          media_url: '/api/placeholder/400/400',
          permalink: 'https://instagram.com/p/mock1',
          timestamp: '2025-01-15T10:00:00+0000',
          like_count: 234,
          comments_count: 12
        },
        {
          id: 'mock-2',
          caption: 'Behind the scenes z naší poslední akce 📸 Bylo to neuvěřitelné! #madzone #event #bts',
          media_type: 'CAROUSEL_ALBUM',
          media_url: '/api/placeholder/400/400',
          permalink: 'https://instagram.com/p/mock2',
          timestamp: '2025-01-12T15:30:00+0000',
          like_count: 456,
          comments_count: 23,
          children: [
            {
              id: 'mock-2-1',
              media_type: 'IMAGE',
              media_url: '/api/placeholder/400/400'
            },
            {
              id: 'mock-2-2',
              media_type: 'IMAGE',
              media_url: '/api/placeholder/400/400'
            }
          ]
        },
        {
          id: 'mock-3',
          caption: 'Timelapse z příprav na letošní velkou akci! ⏱️ #madzone #preparation #timelapse',
          media_type: 'VIDEO',
          media_url: '/api/placeholder/400/400',
          thumbnail_url: '/api/placeholder/400/400',
          permalink: 'https://instagram.com/p/mock3',
          timestamp: '2025-01-10T12:00:00+0000',
          like_count: 789,
          comments_count: 34
        },
        {
          id: 'mock-4',
          caption: 'Týmová fotka po úspěšně dokončeném projektu 👥 #madzone #team #success',
          media_type: 'IMAGE',
          media_url: '/api/placeholder/400/400',
          permalink: 'https://instagram.com/p/mock4',
          timestamp: '2025-01-08T09:15:00+0000',
          like_count: 321,
          comments_count: 18
        },
        {
          id: 'mock-5',
          caption: 'Sneak peek na to, co chystáme... 👀 #madzone #comingsoon #sneak',
          media_type: 'IMAGE',
          media_url: '/api/placeholder/400/400',
          permalink: 'https://instagram.com/p/mock5',
          timestamp: '2025-01-05T14:45:00+0000',
          like_count: 567,
          comments_count: 45
        },
        {
          id: 'mock-6',
          caption: 'Recap z minulého měsíce - děkujeme za vaši podporu! 🙏 #madzone #thankyou #recap',
          media_type: 'CAROUSEL_ALBUM',
          media_url: '/api/placeholder/400/400',
          permalink: 'https://instagram.com/p/mock6',
          timestamp: '2025-01-01T00:00:00+0000',
          like_count: 892,
          comments_count: 67
        }
      ];
      
      setPosts(mockPosts);
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  // Funkce pro ruční refresh
  const refreshFeed = useCallback(async () => {
    // Pokud byl poslední refresh před méně než 5 minutami, nerefreshujeme
    if (lastRefresh && Date.now() - lastRefresh.getTime() < 5 * 60 * 1000) {
      console.log('Instagram feed byl nedávno aktualizován, přeskakuji refresh');
      return;
    }

    await fetchInstagramPosts();
  }, [fetchInstagramPosts, lastRefresh]);

  // Automatické načtení při mount
  useEffect(() => {
    fetchInstagramPosts();
  }, [fetchInstagramPosts]);

  return {
    posts,
    loading,
    error,
    lastRefresh,
    refreshFeed
  };
}

// Hook pro statistiky Instagram účtu
export function useInstagramStats() {
  const [stats, setStats] = useState<{
    followers_count?: number;
    follows_count?: number;
    media_count?: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/instagram/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Chyba při načítání Instagram statistik:', err);
      setError('Nepodařilo se načíst statistiky');
      
      // Fallback mock data
      setStats({
        followers_count: 15230,
        follows_count: 892,
        media_count: 456
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
}

// Utility funkce pro formátování
export const formatInstagramCount = (count: number): string => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
};

export const formatInstagramDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 60) {
    return `před ${minutes} minutami`;
  }
  if (hours < 24) {
    return `před ${hours} hodinami`;
  }
  if (days < 7) {
    return `před ${days} dny`;
  }
  
  return new Intl.DateTimeFormat('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

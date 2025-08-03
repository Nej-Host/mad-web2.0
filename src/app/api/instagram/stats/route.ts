import { NextResponse } from 'next/server';

// Interface pro Instagram statistiky
interface InstagramStats {
  followers_count: number;
  follows_count: number;
  media_count: number;
  name?: string;
  username?: string;
  profile_picture_url?: string;
}

// Cache pro statistiky
let statsCache: {
  data: InstagramStats;
  lastUpdate: number;
} | null = null;

const CACHE_DURATION = 4 * 60 * 60 * 1000; // 4 hodiny pro statistiky

async function fetchInstagramStats(): Promise<InstagramStats> {
  // Zkontrolovat cache
  if (statsCache && Date.now() - statsCache.lastUpdate < CACHE_DURATION) {
    console.log('Použit cache pro Instagram statistiky');
    return statsCache.data;
  }

  const pageAccessToken = process.env.INSTAGRAM_PAGE_ACCESS_TOKEN;
  const pageId = process.env.INSTAGRAM_PAGE_ID;

  if (!pageAccessToken || !pageId ||
      pageAccessToken === 'development_placeholder' || 
      pageId === 'development_placeholder') {
    console.warn('Instagram API není nakonfigurováno, používám mock data pro statistiky');
    
    // Mock data pro development
    const mockStats: InstagramStats = {
      followers_count: 15230,
      follows_count: 892,
      media_count: 456,
      name: 'Madzone',
      username: 'madzone.cz'
    };

    // Uložit do cache
    statsCache = {
      data: mockStats,
      lastUpdate: Date.now()
    };

    return mockStats;
  }

  try {
    // Sestavit URL pro Instagram Graph API
    const fields = [
      'followers_count',
      'follows_count',
      'media_count',
      'name',
      'username',
      'profile_picture_url'
    ].join(',');

    const url = `https://graph.facebook.com/v18.0/${pageId}?fields=${fields}&access_token=${pageAccessToken}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status} ${response.statusText}`);
    }

    const data: InstagramStats = await response.json();

    // Uložit do cache
    statsCache = {
      data,
      lastUpdate: Date.now()
    };

    return data;
  } catch (error) {
    console.error('Chyba při načítání Instagram statistik:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });

    const stats = await fetchInstagramStats();

    return NextResponse.json(
      {
        ...stats,
        meta: {
          lastUpdate: statsCache?.lastUpdate || Date.now(),
          cached: true
        }
      },
      { 
        status: 200,
        headers 
      }
    );
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      {
        error: 'Nepodařilo se načíst Instagram statistiky',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

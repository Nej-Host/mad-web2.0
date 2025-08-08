import { NextResponse } from 'next/server';

// Interface pro Instagram Graph API response
interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  children?: {
    data: Array<{
      id: string;
      media_type: 'IMAGE' | 'VIDEO';
      media_url: string;
    }>;
  };
}

interface InstagramApiResponse {
  data: InstagramMedia[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

// Cache pro Instagram data (v produkci by se použila Redis nebo databáze)
let instagramCache: {
  data: InstagramMedia[];
  lastUpdate: number;
} | null = null;

const CACHE_DURATION = 60 * 60 * 1000; // 1 hodina v milisekundách

async function fetchInstagramFeed(): Promise<InstagramMedia[]> {
  // Zkontrolovat cache
  if (instagramCache && Date.now() - instagramCache.lastUpdate < CACHE_DURATION) {
    console.log('Použit Instagram cache');
    return instagramCache.data;
  }

  const pageAccessToken = process.env.INSTAGRAM_PAGE_ACCESS_TOKEN;
  const pageId = process.env.INSTAGRAM_PAGE_ID;

  if (!pageAccessToken || !pageId || 
      pageAccessToken === 'development_placeholder' || 
      pageId === 'development_placeholder') {
    console.warn('Instagram API není nakonfigurováno, používám mock data');
    
    // Mock data pro development
    const mockData: InstagramMedia[] = [
      {
        id: 'mock_1',
        caption: 'Nový merch je tady! 🔥 Podívejte se na naši nejnovější kolekci triček a mikin. #madzone #merch #fashion',
        media_type: 'IMAGE',
        media_url: 'https://picsum.photos/400/400?random=1',
        permalink: 'https://instagram.com/p/mock1',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 dny zpět
        like_count: 234,
        comments_count: 12
      },
      {
        id: 'mock_2',
        caption: 'Behind the scenes z naší poslední akce 📸 Bylo to neuvěřitelné! #madzone #event #bts',
        media_type: 'CAROUSEL_ALBUM',
        media_url: 'https://picsum.photos/400/400?random=2',
        permalink: 'https://instagram.com/p/mock2',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 dnů zpět
        like_count: 456,
        comments_count: 23,
        children: {
          data: [
            {
              id: 'mock_2_1',
              media_type: 'IMAGE',
              media_url: 'https://picsum.photos/400/400?random=21'
            },
            {
              id: 'mock_2_2',
              media_type: 'IMAGE',
              media_url: 'https://picsum.photos/400/400?random=22'
            }
          ]
        }
      },
      {
        id: 'mock_3',
        caption: 'Timelapse z příprav na letošní velkou akci! ⏱️ #madzone #preparation #timelapse',
        media_type: 'VIDEO',
        media_url: 'https://picsum.photos/400/400?random=3',
        thumbnail_url: 'https://picsum.photos/400/400?random=3',
        permalink: 'https://instagram.com/p/mock3',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dnů zpět
        like_count: 789,
        comments_count: 34
      },
      {
        id: 'mock_4',
        caption: 'Týmová fotka po úspěšně dokončeném projektu 👥 #madzone #team #success',
        media_type: 'IMAGE',
        media_url: 'https://picsum.photos/400/400?random=4',
        permalink: 'https://instagram.com/p/mock4',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 dnů zpět
        like_count: 321,
        comments_count: 18
      },
      {
        id: 'mock_5',
        caption: 'Sneak peek na to, co chystáme... 👀 #madzone #comingsoon #sneak',
        media_type: 'IMAGE',
        media_url: 'https://picsum.photos/400/400?random=5',
        permalink: 'https://instagram.com/p/mock5',
        timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 dnů zpět
        like_count: 567,
        comments_count: 45
      },
      {
        id: 'mock_6',
        caption: 'Recap z minulého měsíce - děkujeme za vaši podporu! 🙏 #madzone #thankyou #recap',
        media_type: 'CAROUSEL_ALBUM',
        media_url: 'https://picsum.photos/400/400?random=6',
        permalink: 'https://instagram.com/p/mock6',
        timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 dnů zpět
        like_count: 892,
        comments_count: 67
      }
    ];

    // Uložit do cache
    instagramCache = {
      data: mockData,
      lastUpdate: Date.now()
    };

    return mockData;
  }

  try {
    // Sestavit URL pro Instagram Graph API
    const fields = [
      'id',
      'caption',
      'media_type',
      'media_url',
      'thumbnail_url',
      'permalink',
      'timestamp',
      'like_count',
      'comments_count',
      'children{id,media_type,media_url}'
    ].join(',');

    const url = `https://graph.facebook.com/v18.0/${pageId}/media?fields=${fields}&access_token=${pageAccessToken}&limit=12`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status} ${response.statusText}`);
    }

    const data: InstagramApiResponse = await response.json();

    // Transformovat data do našeho formátu
    const transformedData: InstagramMedia[] = data.data.map(item => ({
      id: item.id,
      caption: item.caption || undefined,
      media_type: item.media_type,
      media_url: item.media_url,
      thumbnail_url: item.thumbnail_url || undefined,
      permalink: item.permalink,
      timestamp: item.timestamp,
      like_count: item.like_count || undefined,
      comments_count: item.comments_count || undefined,
      children: item.children ? { data: item.children.data } : undefined
    }));

    // Uložit do cache
    instagramCache = {
      data: transformedData,
      lastUpdate: Date.now()
    };

    return transformedData;
  } catch (error) {
    console.error('Chyba při načítání Instagram feedu:', error);
    throw error;
  }
}

export async function GET() {
  try {
    // Povolit CORS pro frontend
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });

    const instagramData = await fetchInstagramFeed();

    return NextResponse.json(
      {
        data: instagramData,
        meta: {
          total: instagramData.length,
          lastUpdate: instagramCache?.lastUpdate || Date.now(),
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
        error: 'Nepodařilo se načíst Instagram feed',
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

// Podporovat OPTIONS request pro CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

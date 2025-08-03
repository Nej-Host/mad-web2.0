'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';

// Dynamické načtení Leaflet komponent pro SSR kompatibilitu
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Interface pro lokace
interface Location {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  address?: string;
  website?: string;
  phone?: string;
  category?: 'headquarters' | 'event' | 'partner' | 'other';
}

interface LocationMapProps {
  locations: Location[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
}

// Výchozí lokace (centrum Prahy)
const DEFAULT_CENTER: [number, number] = [50.0755, 14.4378];
const DEFAULT_ZOOM = 13;

export function LocationMap({
  locations,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  height = '400px',
  className = ''
}: LocationMapProps) {
  useEffect(() => {
    // Dynamické načtení Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    return () => {
      // Cleanup při unmount
      document.head.removeChild(link);
    };
  }, []);

  const getCategoryIcon = (category?: string) => {
    // Můžeme použít různé ikony podle kategorie
    switch (category) {
      case 'headquarters':
        return '🏢';
      case 'event':
        return '🎉';
      case 'partner':
        return '🤝';
      default:
        return '📍';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'headquarters':
        return 'hsl(var(--primary))';
      case 'event':
        return 'hsl(var(--destructive))';
      case 'partner':
        return 'hsl(var(--muted-foreground))';
      default:
        return 'hsl(var(--secondary))';
    }
  };

  // Fallback pro když Leaflet není dostupný
  if (typeof window === 'undefined') {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center" style={{ height }}>
          <div className="text-center">
            <div className="text-2xl mb-2">🗺️</div>
            <p className="text-muted-foreground">Načítá se mapa...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div style={{ height, width: '100%' }}>
          <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={[location.latitude, location.longitude]}
                // Můžeme přidat custom ikonu zde
              >
                <Popup>
                  <div className="min-w-48">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-lg">
                        {getCategoryIcon(location.category)}
                      </span>
                      <div>
                        <h3 className="font-semibold text-sm">{location.name}</h3>
                        {location.category && (
                          <span 
                            className="inline-block px-2 py-1 text-xs rounded-full text-white"
                            style={{ backgroundColor: getCategoryColor(location.category) }}
                          >
                            {location.category === 'headquarters' && 'Sídlo'}
                            {location.category === 'event' && 'Událost'}
                            {location.category === 'partner' && 'Partner'}
                            {location.category === 'other' && 'Ostatní'}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {location.description && (
                      <p className="text-sm text-gray-600 mb-2">
                        {location.description}
                      </p>
                    )}
                    
                    {location.address && (
                      <p className="text-xs text-gray-500 mb-1">
                        📍 {location.address}
                      </p>
                    )}
                    
                    {location.phone && (
                      <p className="text-xs text-gray-500 mb-1">
                        📞 {location.phone}
                      </p>
                    )}
                    
                    {location.website && (
                      <a
                        href={location.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        🌐 Navštívit web
                      </a>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Wrapper komponenta s příkladovými daty
export function MadzoneLocationMap() {
  const locations: Location[] = [
    {
      id: '1',
      name: 'Madzone Headquarters',
      description: 'Hlavní sídlo společnosti Madzone',
      latitude: 50.0755,
      longitude: 14.4378,
      address: 'Václavské náměstí 1, Praha 1',
      website: 'https://madzone.cz',
      phone: '+420 123 456 789',
      category: 'headquarters'
    },
    {
      id: '2',
      name: 'Madzone Event 2025',
      description: 'Připravovaná akce pro rok 2025',
      latitude: 50.0875,
      longitude: 14.4213,
      address: 'Letná, Praha 7',
      category: 'event'
    },
    {
      id: '3',
      name: 'Partner Location',
      description: 'Místo našeho partnera',
      latitude: 50.0655,
      longitude: 14.4456,
      address: 'Národní třída 20, Praha 1',
      category: 'partner'
    }
  ];

  return (
    <LocationMap
      locations={locations}
      height="500px"
      className="w-full"
    />
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, ExternalLink, Instagram, Calendar } from 'lucide-react';

// Interface pro Instagram post
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

interface InstagramFeedProps {
  posts: InstagramPost[];
  loading?: boolean;
  error?: string | null;
  maxPosts?: number;
  columns?: number;
  showCaption?: boolean;
  showStats?: boolean;
  onRefresh?: () => void;
}

export function InstagramFeed({
  posts,
  loading = false,
  error = null,
  maxPosts = 12,
  columns = 3,
  showCaption = true,
  showStats = true,
  onRefresh
}: InstagramFeedProps) {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  const formatDate = (timestamp: string) => {
    return new Intl.DateTimeFormat('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(timestamp));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const truncateCaption = (caption: string, maxLength: number = 100) => {
    if (caption.length <= maxLength) return caption;
    return caption.substring(0, maxLength) + '...';
  };

  const getGridClass = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 4:
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Instagram size={64} className="text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nepodařilo se načíst Instagram feed</h3>
          <p className="text-muted-foreground text-center mb-6">
            {error}
          </p>
          {onRefresh && (
            <Button onClick={onRefresh} variant="outline">
              Zkusit znovu
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className={`grid ${getGridClass()} gap-4`}>
        {Array.from({ length: maxPosts }).map((_, index) => (
          <Card key={index} className="overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200" />
            {showCaption && (
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Instagram size={64} className="text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Žádné příspěvky</h3>
          <p className="text-muted-foreground text-center">
            Momentálně nejsou k dispozici žádné Instagram příspěvky.
          </p>
        </CardContent>
      </Card>
    );
  }

  const displayPosts = posts.slice(0, maxPosts);

  return (
    <>
      <div className={`grid ${getGridClass()} gap-4`}>
        {displayPosts.map((post) => (
          <Card 
            key={post.id} 
            className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <Image
                src={post.thumbnail_url || post.media_url}
                alt={post.caption || 'Instagram post'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes={`(max-width: 768px) 100vw, (max-width: 1200px) ${100/columns}vw, ${100/columns}vw`}
              />
              
              {/* Media type badge */}
              <div className="absolute top-2 right-2">
                {post.media_type === 'VIDEO' && (
                  <Badge variant="secondary" className="text-xs">
                    VIDEO
                  </Badge>
                )}
                {post.media_type === 'CAROUSEL_ALBUM' && (
                  <Badge variant="secondary" className="text-xs">
                    ALBUM
                  </Badge>
                )}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              
              {/* Stats overlay */}
              {showStats && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-4 text-white">
                    {post.like_count !== undefined && (
                      <div className="flex items-center gap-1">
                        <Heart size={20} className="fill-white" />
                        <span className="font-semibold">
                          {formatNumber(post.like_count)}
                        </span>
                      </div>
                    )}
                    {post.comments_count !== undefined && (
                      <div className="flex items-center gap-1">
                        <MessageCircle size={20} />
                        <span className="font-semibold">
                          {formatNumber(post.comments_count)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {showCaption && post.caption && (
              <CardContent className="p-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {truncateCaption(post.caption)}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>{formatDate(post.timestamp)}</span>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Modal pro detail příspěvku */}
      {selectedPost && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPost(null)}
        >
          <Card 
            className="max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={selectedPost.media_url}
                  alt={selectedPost.caption || 'Instagram post'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              <div className="p-6">
                {selectedPost.caption && (
                  <p className="text-sm mb-4">
                    {selectedPost.caption}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {selectedPost.like_count !== undefined && (
                      <div className="flex items-center gap-1">
                        <Heart size={16} />
                        <span>{formatNumber(selectedPost.like_count)} likes</span>
                      </div>
                    )}
                    {selectedPost.comments_count !== undefined && (
                      <div className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        <span>{formatNumber(selectedPost.comments_count)} komentářů</span>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a
                      href={selectedPost.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Zobrazit na Instagramu
                    </a>
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  {formatDate(selectedPost.timestamp)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

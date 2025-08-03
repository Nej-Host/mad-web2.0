'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Heart, Reply, Flag } from 'lucide-react'
import { useState } from 'react'

// Mock data pro komentáře
const mockComments = [
  {
    id: 1,
    author: 'Pavel Novotný',
    avatar: 'PN',
    date: '2025-07-29T14:30:00Z',
    content: 'Úžasný článek! Už dlouho sleduji vaše expedice a tohle byla jedna z nejzajímavějších. Ty EVP záznamy zní opravdu děsivě. Máte v plánu se na Kašperk vrátit?',
    likes: 12,
    replies: [
      {
        id: 2,
        author: 'Jan Novák',
        avatar: 'JN',
        date: '2025-07-29T16:45:00Z',
        content: 'Děkujeme za komentář! Ano, plánujeme se vrátit už příští měsíc s dalším vybavením. Budeme se snažit získat více důkazů.',
        likes: 8,
        isAuthor: true
      }
    ],
    liked: false
  },
  {
    id: 3,
    author: 'Marie Svobodová',
    avatar: 'MS',
    date: '2025-07-29T10:15:00Z',
    content: 'Skepticky ladění člověk ve mně říká, že to mohou být jen náhodné zvuky, ale musím přiznat, že ty EVP záznamy jsou opravdu znepokojivé. Máte k dispozici raw data?',
    likes: 7,
    replies: [],
    liked: false
  },
  {
    id: 4,
    author: 'Tomáš Černý',
    avatar: 'TČ',
    date: '2025-07-28T22:30:00Z',
    content: 'Skvělá práce tým! Jako někdo, kdo se také zabývá paranormálním výzkumem, oceňuji vaši metodiku. Ty thermal anomálie jsou fascinující. Používáte FLIR kamery?',
    likes: 15,
    replies: [
      {
        id: 5,
        author: 'Jan Novák',
        avatar: 'JN',
        date: '2025-07-29T09:20:00Z',
        content: 'Ano, používáme FLIR E95. Thermal anomálie byly nejpřesvědčivějším důkazem z celé expedice. Díky za podporu!',
        likes: 6,
        isAuthor: true
      }
    ],
    liked: true
  }
]

function formatCommentDate(dateString: string) {
  const now = new Date()
  const commentDate = new Date(dateString)
  const diffInHours = Math.floor((now.getTime() - commentDate.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    return 'před chvílí'
  } else if (diffInHours < 24) {
    return `před ${diffInHours}h`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `před ${diffInDays}d`
  }
}

interface BlogCommentsProps {
  articleId: string
}

export function BlogComments({ articleId }: BlogCommentsProps) {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [comments, setComments] = useState(mockComments)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [newReply, setNewReply] = useState('')

  // TODO: Použít articleId pro načtení komentářů z API
  console.log('Loading comments for article:', articleId)

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    
    // TODO: Odeslat komentář na API
    setTimeout(() => {
      const comment = {
        id: Date.now(),
        author: 'Anonymní uživatel',
        avatar: 'AU',
        date: new Date().toISOString(),
        content: newComment,
        likes: 0,
        replies: [],
        liked: false
      }
      
      setComments(prev => [comment, ...prev])
      setNewComment('')
      setIsSubmitting(false)
    }, 1000)
  }

  const handleSubmitReply = async (commentId: number) => {
    if (!newReply.trim()) return

    // TODO: Odeslat odpověď na API
    const reply = {
      id: Date.now(),
      author: 'Anonymní uživatel',
      avatar: 'AU',
      date: new Date().toISOString(),
      content: newReply,
      likes: 0,
      isAuthor: false
    }

    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ))
    
    setNewReply('')
    setReplyingTo(null)
  }

  const handleLikeComment = (commentId: number, isReply: boolean = false, parentId?: number) => {
    // TODO: Odeslat like na API
    if (isReply && parentId) {
      setComments(prev => prev.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply => 
                reply.id === commentId 
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              )
            }
          : comment
      ))
    } else {
      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
              liked: !comment.liked 
            }
          : comment
      ))
    }
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center">
              <MessageCircle className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                Komentáře ({comments.length})
              </h2>
            </div>
          </div>

          {/* Formulář pro nový komentář */}
          <Card className="bg-gray-900/50 border-gray-700/50 mb-12">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Přidat komentář</h3>
              <form onSubmit={handleSubmitComment}>
                <Textarea
                  placeholder="Napište svůj komentář..."
                  value={newComment}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 mb-4 min-h-24"
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Buďte ohleduplní a respektujte ostatní uživatele.
                  </p>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !newComment.trim()}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {isSubmitting ? 'Odesílám...' : 'Odeslat komentář'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Seznam komentářů */}
          <div className="space-y-8">
            {comments.map((comment) => (
              <Card key={comment.id} className="bg-gray-900/30 border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="flex-shrink-0">
                      <AvatarFallback className="bg-red-500/20 text-red-400">
                        {comment.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-white">{comment.author}</h4>
                        <span className="text-sm text-gray-500">
                          {formatCommentDate(comment.date)}
                        </span>
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {comment.content}
                      </p>

                      <div className="flex items-center space-x-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleLikeComment(comment.id)}
                          className={`text-xs ${comment.liked ? 'text-red-400' : 'text-gray-500 hover:text-white'}`}
                        >
                          <Heart className={`h-3 w-3 mr-1 ${comment.liked ? 'fill-current' : ''}`} />
                          {comment.likes}
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                          className="text-xs text-gray-500 hover:text-white"
                        >
                          <Reply className="h-3 w-3 mr-1" />
                          Odpovědět
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs text-gray-500 hover:text-white"
                        >
                          <Flag className="h-3 w-3 mr-1" />
                          Nahlásit
                        </Button>
                      </div>

                      {/* Formulář odpovědi */}
                      {replyingTo === comment.id && (
                        <div className="mt-4 p-4 bg-gray-800/30 rounded-lg">
                          <Textarea
                            placeholder="Napište odpověď..."
                            value={newReply}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewReply(e.target.value)}
                            className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 mb-3 min-h-20"
                          />
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm"
                              onClick={() => handleSubmitReply(comment.id)}
                              disabled={!newReply.trim()}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Odpovědět
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setReplyingTo(null)
                                setNewReply('')
                              }}
                              className="border-gray-600 text-gray-400"
                            >
                              Zrušit
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Odpovědi */}
                      {comment.replies.length > 0 && (
                        <div className="mt-6 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start space-x-4 pl-8 border-l-2 border-gray-700">
                              <Avatar className="flex-shrink-0 w-8 h-8">
                                <AvatarFallback className="bg-gray-600 text-gray-300 text-xs">
                                  {reply.avatar}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h5 className="font-medium text-white text-sm">{reply.author}</h5>
                                  {reply.isAuthor && (
                                    <Badge variant="secondary" className="bg-red-500/20 text-red-400 text-xs">
                                      Autor
                                    </Badge>
                                  )}
                                  <span className="text-xs text-gray-500">
                                    {formatCommentDate(reply.date)}
                                  </span>
                                </div>

                                <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                                  {reply.content}
                                </p>

                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleLikeComment(reply.id, true, comment.id)}
                                  className="text-xs text-gray-500 hover:text-white"
                                >
                                  <Heart className="h-3 w-3 mr-1" />
                                  {reply.likes}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load more comments */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-gray-600 text-gray-400 hover:text-white">
              Načíst další komentáře
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

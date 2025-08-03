'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  FileText, 
  BarChart3,
  LogOut,
  PenTool
} from 'lucide-react'
import { useAuth, useAuthGuard } from '@/store/auth-store'
import { useArticles, useArticleMutations } from '@/hooks/use-articles-graphql'
import Link from 'next/link'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const { isAuthenticated, isAdmin, isEditor } = useAuthGuard()
  const { articles, loading, error } = useArticles({ 
    sortBy: 'createdAt', 
    sortOrder: 'desc',
    limit: 50
  })
  const { deleteArticle } = useArticleMutations()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    if (!isEditor) {
      router.push('/blog')
      return
    }
  }, [isAuthenticated, isEditor, router])

  if (!isAuthenticated || !isEditor) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="mb-4">Ověřuji oprávnění...</div>
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const stats = {
    totalArticles: articles?.length || 0,
    publishedArticles: articles?.filter(a => a.status === 'PUBLISHED').length || 0,
    draftArticles: articles?.filter(a => a.status === 'DRAFT').length || 0,
    totalViews: articles?.reduce((sum, a) => sum + (a.views || 0), 0) || 0,
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
              <p className="text-gray-400">
                Vítejte, {user?.firstName} {user?.lastName}
                {isAdmin && <Badge className="ml-2 bg-red-500">Admin</Badge>}
                {isEditor && !isAdmin && <Badge className="ml-2 bg-blue-500">Editor</Badge>}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/blog">
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  <Eye className="w-4 h-4 mr-2" />
                  Zobrazit blog
                </Button>
              </Link>
              
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Odhlásit se
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Celkem článků</p>
                  <p className="text-3xl font-bold text-white">{stats.totalArticles}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Publikováno</p>
                  <p className="text-3xl font-bold text-white">{stats.publishedArticles}</p>
                </div>
                <Eye className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Koncepty</p>
                  <p className="text-3xl font-bold text-white">{stats.draftArticles}</p>
                </div>
                <PenTool className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Celkem zobrazení</p>
                  <p className="text-3xl font-bold text-white">{stats.totalViews.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white">Správa článků</h2>
          
          <Link href="/admin/articles/new">
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Nový článek
            </Button>
          </Link>
        </div>

        {/* Articles List */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Posledních 10 článků</CardTitle>
            <CardDescription className="text-gray-400">
              Rychlý přehled nejnovějších článků
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Načítání článků...</p>
              </div>
            ) : (articles?.length || 0) === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Zatím nemáte žádné články</p>
                <Link href="/admin/articles/new">
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Vytvořit první článek
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {(articles || []).slice(0, 10).map((article) => (
                  <div
                    key={article.id}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-white truncate">
                          {article.title}
                        </h3>
                        <Badge
                          variant={article.status === 'PUBLISHED' ? 'default' : 'secondary'}
                          className={
                            article.status === 'PUBLISHED'
                              ? 'bg-green-500/20 text-green-400 border-green-500/50'
                              : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                          }
                        >
                          {article.status === 'PUBLISHED' ? 'Publikováno' : 'Koncept'}
                        </Badge>
                        {article.featured && (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                            Doporučené
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>
                          {article.author.firstName} {article.author.lastName}
                        </span>
                        <span>
                          {new Date(article.createdAt).toLocaleDateString('cs-CZ')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views || 0}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Link href={`/blog/${article.slug}`}>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      
                      <Link href={`/admin/articles/edit/${article.id}`}>
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-400 hover:text-red-300"
                        onClick={async () => {
                          if (window.confirm('Opravdu chcete smazat tento článek?')) {
                            try {
                              await deleteArticle(article.id)
                            } catch (error) {
                              console.error('Failed to delete article:', error)
                              alert('Nepodařilo se smazat článek')
                            }
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {(articles?.length || 0) > 10 && (
                  <div className="text-center pt-4">
                    <Link href="/admin/articles">
                      <Button variant="outline" className="border-gray-600 text-gray-400">
                        Zobrazit všechny články ({articles?.length || 0})
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { useCallback, useEffect } from 'react'
import { useBlogStore } from '@/store/blog-store'
import { articlesApi, ArticleFilters } from '@/lib/api/articles'

// Simple toast replacement until we install a proper toast library
const toast = {
  success: (message: string) => console.log('✅', message),
  error: (message: string) => console.error('❌', message)
}

export const useArticles = () => {
  const {
    articles,
    featuredArticles,
    currentArticle,
    articlesLoading,
    articlesError,
    filters,
    setArticles,
    setFeaturedArticles,
    setCurrentArticle,
    setArticlesLoading,
    setArticlesError,
    setPagination,
    updateArticle,
    removeArticle,
    toggleArticleLike,
    toggleArticleBookmark
  } = useBlogStore()

  // Fetch articles with current filters
  const fetchArticles = useCallback(async (customFilters?: Partial<ArticleFilters>) => {
    setArticlesLoading(true)
    setArticlesError(null)

    try {
      const finalFilters = { ...filters, ...customFilters }
      const response = await articlesApi.getArticles(finalFilters)
      
      if (response.success && response.data) {
        setArticles(response.data.articles)
        setPagination({
          currentPage: response.data.pagination.page,
          totalPages: response.data.pagination.totalPages,
          hasNextPage: response.data.pagination.hasNext,
          hasPrevPage: response.data.pagination.hasPrev
        })
      } else {
        throw new Error(response.message || 'Failed to fetch articles')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch articles'
      setArticlesError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setArticlesLoading(false)
    }
  }, [filters, setArticles, setArticlesLoading, setArticlesError, setPagination])

  // Fetch featured articles
  const fetchFeaturedArticles = useCallback(async (limit = 5) => {
    try {
      const response = await articlesApi.getFeaturedArticles(limit)
      
      if (response.success && response.data) {
        setFeaturedArticles(response.data.articles)
      }
    } catch (error) {
      console.error('Failed to fetch featured articles:', error)
      // Don't show toast for featured articles as they're usually optional
    }
  }, [setFeaturedArticles])

  // Fetch single article
  const fetchArticle = useCallback(async (id: string) => {
    setArticlesLoading(true)
    setArticlesError(null)

    try {
      const response = await articlesApi.getArticle(id)
      
      if (response.success && response.data) {
        setCurrentArticle(response.data)
        return response.data
      } else {
        throw new Error(response.message || 'Article not found')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch article'
      setArticlesError(errorMessage)
      setCurrentArticle(null)
      throw error
    } finally {
      setArticlesLoading(false)
    }
  }, [setCurrentArticle, setArticlesLoading, setArticlesError])

  // Create new article
  const createArticle = useCallback(async (data: Parameters<typeof articlesApi.createArticle>[0]) => {
    setArticlesLoading(true)

    try {
      const response = await articlesApi.createArticle(data)
      
      if (response.success && response.data) {
        toast.success('Article created successfully')
        // Refresh articles list
        await fetchArticles()
        return response.data
      } else {
        throw new Error(response.message || 'Failed to create article')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create article'
      toast.error(errorMessage)
      throw error
    } finally {
      setArticlesLoading(false)
    }
  }, [fetchArticles, setArticlesLoading])

  // Update article
  const updateArticleData = useCallback(async (
    id: string, 
    data: Parameters<typeof articlesApi.updateArticle>[1]
  ) => {
    setArticlesLoading(true)

    try {
      const response = await articlesApi.updateArticle(id, data)
      
      if (response.success && response.data) {
        updateArticle(id, response.data)
        toast.success('Article updated successfully')
        return response.data
      } else {
        throw new Error(response.message || 'Failed to update article')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update article'
      toast.error(errorMessage)
      throw error
    } finally {
      setArticlesLoading(false)
    }
  }, [updateArticle, setArticlesLoading])

  // Delete article
  const deleteArticle = useCallback(async (id: string) => {
    setArticlesLoading(true)

    try {
      const response = await articlesApi.deleteArticle(id)
      
      if (response.success) {
        removeArticle(id)
        toast.success('Article deleted successfully')
      } else {
        throw new Error(response.message || 'Failed to delete article')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete article'
      toast.error(errorMessage)
      throw error
    } finally {
      setArticlesLoading(false)
    }
  }, [removeArticle, setArticlesLoading])

  // Toggle like
  const handleToggleLike = useCallback(async (id: string) => {
    try {
      const response = await articlesApi.toggleLike(id)
      
      if (response.success && response.data) {
        toggleArticleLike(id, response.data.liked, response.data.likesCount)
        toast.success(response.data.liked ? 'Article liked' : 'Like removed')
      } else {
        throw new Error(response.message || 'Failed to toggle like')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to toggle like'
      toast.error(errorMessage)
    }
  }, [toggleArticleLike])

  // Toggle bookmark
  const handleToggleBookmark = useCallback(async (id: string) => {
    try {
      const response = await articlesApi.toggleBookmark(id)
      
      if (response.success && response.data) {
        toggleArticleBookmark(id, response.data.bookmarked)
        toast.success(response.data.bookmarked ? 'Article bookmarked' : 'Bookmark removed')
      } else {
        throw new Error(response.message || 'Failed to toggle bookmark')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to toggle bookmark'
      toast.error(errorMessage)
    }
  }, [toggleArticleBookmark])

  // Search articles
  const searchArticles = useCallback(async (query: string, limit = 10) => {
    if (!query.trim()) {
      return []
    }

    try {
      const response = await articlesApi.searchArticles(query, limit)
      
      if (response.success && response.data) {
        return response.data.articles
      }
      return []
    } catch (error) {
      console.error('Search failed:', error)
      return []
    }
  }, [])

  return {
    // State
    articles,
    featuredArticles,
    currentArticle,
    loading: articlesLoading,
    error: articlesError,
    
    // Actions
    fetchArticles,
    fetchFeaturedArticles,
    fetchArticle,
    createArticle,
    updateArticle: updateArticleData,
    deleteArticle,
    toggleLike: handleToggleLike,
    toggleBookmark: handleToggleBookmark,
    searchArticles,
    
    // Helpers
    refetch: fetchArticles,
    hasData: articles.length > 0,
    hasFeatured: featuredArticles.length > 0
  }
}

// Specialized hook for fetching data on component mount
export const useArticlesData = (autoFetch = true) => {
  const { fetchArticles, fetchFeaturedArticles } = useArticles()
  
  useEffect(() => {
    if (autoFetch) {
      fetchArticles()
      fetchFeaturedArticles()
    }
  }, [autoFetch, fetchArticles, fetchFeaturedArticles])

  return useArticles()
}

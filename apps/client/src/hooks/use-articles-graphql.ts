import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import {
  GET_ARTICLES,
  GET_FEATURED_ARTICLES,
  GET_ARTICLE,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  TOGGLE_ARTICLE_LIKE,
  type Article,
  type ArticleFilters,
  type CreateArticleInput,
  type UpdateArticleInput,
  type ArticlesResponse,
} from '@/lib/graphql/articles';

// Hook for fetching articles with filters
export function useArticles(filters?: ArticleFilters) {
  const { data, loading, error, refetch } = useQuery<{
    articles: ArticlesResponse;
  }>(GET_ARTICLES, {
    variables: { filters },
    errorPolicy: 'all',
  });

  return {
    articles: data?.articles.articles || [],
    pagination: data?.articles.pagination,
    loading,
    error,
    refetch,
  };
}

// Hook for fetching featured articles
export function useFeaturedArticles(limit?: number) {
  const { data, loading, error } = useQuery<{
    featuredArticles: Article[];
  }>(GET_FEATURED_ARTICLES, {
    variables: { limit },
    errorPolicy: 'all',
  });

  return {
    articles: data?.featuredArticles || [],
    loading,
    error,
  };
}

// Hook for fetching single article
export function useArticle(id?: string, slug?: string) {
  const { data, loading, error, refetch } = useQuery<{
    article: Article | null;
  }>(GET_ARTICLE, {
    variables: { id, slug },
    skip: !id && !slug,
    errorPolicy: 'all',
  });

  return {
    article: data?.article,
    loading,
    error,
    refetch,
  };
}

// Hook for article mutations
export function useArticleMutations() {
  const client = useApolloClient();

  const [createArticle, { loading: creating }] = useMutation<
    { createArticle: Article },
    { input: CreateArticleInput }
  >(CREATE_ARTICLE, {
    onCompleted: () => {
      // Invalidate articles cache
      client.refetchQueries({
        include: [GET_ARTICLES, GET_FEATURED_ARTICLES],
      });
    },
  });

  const [updateArticle, { loading: updating }] = useMutation<
    { updateArticle: Article },
    { id: string; input: UpdateArticleInput }
  >(UPDATE_ARTICLE, {
    onCompleted: () => {
      // Invalidate articles cache
      client.refetchQueries({
        include: [GET_ARTICLES, GET_FEATURED_ARTICLES, GET_ARTICLE],
      });
    },
  });

  const [deleteArticle, { loading: deleting }] = useMutation<
    { deleteArticle: boolean },
    { id: string }
  >(DELETE_ARTICLE, {
    onCompleted: () => {
      // Invalidate articles cache
      client.refetchQueries({
        include: [GET_ARTICLES, GET_FEATURED_ARTICLES],
      });
    },
  });

  const [toggleLike, { loading: likingArticle }] = useMutation<
    { toggleArticleLike: Article },
    { articleId: string }
  >(TOGGLE_ARTICLE_LIKE, {
    onCompleted: () => {
      // Update cache for affected queries
      client.refetchQueries({
        include: [GET_ARTICLES, GET_FEATURED_ARTICLES, GET_ARTICLE],
      });
    },
  });

  return {
    createArticle: (input: CreateArticleInput) => 
      createArticle({ variables: { input } }),
    updateArticle: (id: string, input: UpdateArticleInput) => 
      updateArticle({ variables: { id, input } }),
    deleteArticle: (id: string) => 
      deleteArticle({ variables: { id } }),
    toggleLike: (articleId: string) => 
      toggleLike({ variables: { articleId } }),
    loading: {
      creating,
      updating,
      deleting,
      likingArticle,
    },
  };
}

// Combined hook for all article operations
export function useArticleOperations() {
  const mutations = useArticleMutations();

  return {
    // Hooks for queries (to be used directly in components)
    useArticles,
    useFeaturedArticles, 
    useArticle,
    // Mutations
    ...mutations,
  };
}

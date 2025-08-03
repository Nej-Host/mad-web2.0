import { gql } from '@apollo/client';

// Fragment for Article data
export const ARTICLE_FRAGMENT = gql`
  fragment ArticleFragment on Article {
    id
    title
    slug
    content
    excerpt
    coverImage
    status
    featured
    views
    readTime
    publishedAt
    createdAt
    updatedAt
    author {
      id
      firstName
      lastName
      imageUrl
    }
    category {
      id
      name
      slug
      description
    }
    tags {
      id
      name
      slug
    }
    likesCount
    commentsCount
  }
`;

// Query for getting articles with pagination and filters
export const GET_ARTICLES = gql`
  ${ARTICLE_FRAGMENT}
  query GetArticles($filters: ArticleFilters) {
    articles(filters: $filters) {
      articles {
        ...ArticleFragment
      }
      pagination {
        page
        limit
        total
        totalPages
        hasNext
        hasPrev
      }
    }
  }
`;

// Query for getting featured articles
export const GET_FEATURED_ARTICLES = gql`
  ${ARTICLE_FRAGMENT}
  query GetFeaturedArticles($limit: Int) {
    featuredArticles(limit: $limit) {
      ...ArticleFragment
    }
  }
`;

// Query for getting single article
export const GET_ARTICLE = gql`
  ${ARTICLE_FRAGMENT}
  query GetArticle($id: ID, $slug: String) {
    article(id: $id, slug: $slug) {
      ...ArticleFragment
    }
  }
`;

// Mutation for creating article
export const CREATE_ARTICLE = gql`
  ${ARTICLE_FRAGMENT}
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      ...ArticleFragment
    }
  }
`;

// Mutation for updating article
export const UPDATE_ARTICLE = gql`
  ${ARTICLE_FRAGMENT}
  mutation UpdateArticle($id: ID!, $input: UpdateArticleInput!) {
    updateArticle(id: $id, input: $input) {
      ...ArticleFragment
    }
  }
`;

// Mutation for deleting article
export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id)
  }
`;

// Mutation for toggling article like
export const TOGGLE_ARTICLE_LIKE = gql`
  ${ARTICLE_FRAGMENT}
  mutation ToggleArticleLike($articleId: ID!) {
    toggleArticleLike(articleId: $articleId) {
      ...ArticleFragment
    }
  }
`;

// Types for TypeScript
export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  views: number;
  readTime?: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    imageUrl?: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    description?: string;
  };
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  likesCount: number;
  commentsCount: number;
}

export interface ArticleFilters {
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  categoryId?: string;
  featured?: boolean;
  search?: string;
  tags?: string[];
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'publishedAt' | 'views' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface CreateArticleInput {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  categoryId: string;
  tags?: string[];
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured?: boolean;
}

export interface UpdateArticleInput {
  title?: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  categoryId?: string;
  tags?: string[];
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured?: boolean;
}

export interface ArticlesResponse {
  articles: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

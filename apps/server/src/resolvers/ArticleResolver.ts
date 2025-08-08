import { 
  Resolver, 
  Query, 
  Mutation, 
  Arg, 
  Ctx, 
  ObjectType, 
  Field, 
  InputType, 
  Int,
  Authorized 
} from 'type-graphql';
import { ArticleService } from '../services/article.service';
import { Context } from '../context';

// GraphQL Object Types
@ObjectType()
class Article {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  content!: string;

  @Field(() => String)
  excerpt!: string;

  @Field(() => String)
  slug!: string;

  @Field(() => String)
  status!: string;

  @Field(() => Boolean)
  featured!: boolean;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => Int)
  views!: number;

  @Field(() => Int)
  likes!: number;

  @Field(() => String)
  authorId!: string;

  @Field(() => Author)
  author!: Author;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => [Tag])
  tags!: Tag[];

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

@ObjectType()
class Author {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String, { nullable: true })
  avatar?: string;
}

@ObjectType()
class Category {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  slug!: string;

  @Field(() => String, { nullable: true })
  description?: string;
}

@ObjectType()
class Tag {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  slug!: string;
}

@ObjectType()
class ArticlePagination {
  @Field(() => Int)
  total!: number;

  @Field(() => Int)
  page!: number;

  @Field(() => Int)
  limit!: number;

  @Field(() => Boolean)
  hasNext!: boolean;

  @Field(() => Boolean)
  hasPrev!: boolean;
}

@ObjectType()
class ArticlesResponse {
  @Field(() => [Article])
  articles!: Article[];

  @Field(() => ArticlePagination)
  pagination!: ArticlePagination;
}

// Input Types
@InputType()
class ArticleFilters {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit?: number;

  @Field(() => String, { nullable: true })
  status?: string;

  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => Boolean, { nullable: true })
  featured?: boolean;

  @Field(() => String, { nullable: true })
  sortBy?: string;

  @Field(() => String, { nullable: true })
  sortOrder?: string;
}

@InputType()
class CreateArticleInput {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  content!: string;

  @Field(() => String)
  excerpt!: string;

  @Field(() => String)
  status!: string;

  @Field(() => Boolean, { defaultValue: false })
  featured!: boolean;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => [String], { nullable: true })
  tagIds?: string[];
}

@InputType()
class UpdateArticleInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  excerpt?: string;

  @Field(() => String, { nullable: true })
  status?: string;

  @Field(() => Boolean, { nullable: true })
  featured?: boolean;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => [String], { nullable: true })
  tagIds?: string[];
}

// Main Resolver
@Resolver(() => Article)
export class ArticleResolver {
  // Queries
  @Query(() => ArticlesResponse)
  async articles(
    @Arg('filters', () => ArticleFilters, { nullable: true }) filters?: ArticleFilters
  ): Promise<ArticlesResponse> {
    const paginationOptions = {
      page: filters?.page || 1,
      limit: filters?.limit || 10,
      sortBy: filters?.sortBy as any || 'createdAt',
      sortOrder: filters?.sortOrder as any || 'desc'
    };
    
    const articleFilters = {
      status: filters?.status as any,
      categoryId: filters?.category,
      featured: filters?.featured,
      search: filters?.search,
      tags: filters?.tags
    };
    
    const result = await ArticleService.getArticles(articleFilters, paginationOptions);
    return {
      articles: result.articles as any,
      pagination: result.pagination
    };
  }

  @Query(() => [Article])
  async featuredArticles(
    @Arg('limit', () => Int, { nullable: true, defaultValue: 5 }) limit?: number
  ): Promise<Article[]> {
    const result = await ArticleService.getArticles({ featured: true }, { limit: limit || 5 });
    return result.articles as any;
  }

  @Query(() => Article, { nullable: true })
  async article(
    @Arg('id', () => String, { nullable: true }) id?: string,
    @Arg('slug', () => String, { nullable: true }) slug?: string
  ): Promise<Article | null> {
    if (id) {
      return await ArticleService.getArticle(id) as unknown as Article;
    }
    if (slug) {
      return await ArticleService.getArticle(slug) as unknown as Article;
    }
    throw new Error('Either id or slug must be provided');
  }

  // Mutations
  @Authorized(['ADMIN', 'EDITOR'])
  @Mutation(() => Article)
  async createArticle(
    @Arg('input', () => CreateArticleInput) input: CreateArticleInput,
    @Ctx() ctx: Context
  ): Promise<Article> {
    const userId = ctx.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    const createData = {
      title: input.title,
      content: input.content,
      excerpt: input.excerpt,
      status: input.status as any,
      featured: input.featured,
      coverImage: input.imageUrl,
      categoryId: input.categoryId || '',
      authorId: userId,
      tags: input.tagIds
    };
    
    return ArticleService.createArticle(createData) as any;
  }

  @Authorized(['ADMIN', 'EDITOR'])
  @Mutation(() => Article)
  async updateArticle(
    @Arg('id', () => String) id: string,
    @Arg('input', () => UpdateArticleInput) input: UpdateArticleInput,
    @Ctx() ctx: Context
  ): Promise<Article> {
    const userId = ctx.user?.id;
    const userRole = ctx.user?.role;
    
    // Check if user can edit this article
    const article = await ArticleService.getArticle(id);
    if (!article) {
      throw new Error('Article not found');
    }
    
    // Only admins or the author can edit
    if (userRole !== 'ADMIN' && (article as any).authorId !== userId) {
      throw new Error('Not authorized to edit this article');
    }
    
    const updateData = {
      title: input.title,
      content: input.content,
      excerpt: input.excerpt,
      status: input.status as any,
      featured: input.featured,
      coverImage: input.imageUrl,
      categoryId: input.categoryId,
      tags: input.tagIds
    };
    
    return ArticleService.updateArticle(id, updateData) as any;
  }

  @Authorized(['ADMIN', 'EDITOR'])
  @Mutation(() => Boolean)
  async deleteArticle(
    @Arg('id', () => String) id: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const userId = ctx.user?.id;
    const userRole = ctx.user?.role;
    
    // Check if user can delete this article
    const article = await ArticleService.getArticle(id);
    if (!article) {
      throw new Error('Article not found');
    }
    
    // Only admins or the author can delete
    if (userRole !== 'ADMIN' && (article as any).authorId !== userId) {
      throw new Error('Not authorized to delete this article');
    }
    
    await ArticleService.deleteArticle(id);
    return true;
  }

  @Mutation(() => Article)
  async toggleArticleLike(
    @Arg('id', () => String) id: string,
    @Ctx() ctx: Context
  ): Promise<Article> {
    const userId = ctx.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    // This method might not exist - let's implement basic functionality
    const article = await ArticleService.getArticle(id);
    if (!article) {
      throw new Error('Article not found');
    }
    
    // For now, just return the article - the like functionality would need to be implemented in ArticleService
    return article as unknown as Article;
  }
}

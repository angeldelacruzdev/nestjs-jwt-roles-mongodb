import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { ArticleRepository } from './repository/article.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schema/article.schema';
import { CaslModule } from './../casl/casl.module';

@Module({
  controllers: [ArticlesController],
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    CaslModule,
  ],
  exports: [ArticlesService, ArticleRepository],
  providers: [ArticlesService, ArticleRepository],
})
export class ArticlesModule {}

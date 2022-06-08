import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';

import { Article, ArticleDocument } from '../schema/article.schema';

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectModel(Article.name)
    private readonly userModel: Model<ArticleDocument>,
  ) {}

  async findAll(): Promise<Article[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    return await this.userModel.findById(id).exec();
  }

  async create(article: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.userModel(article);
    return await createdArticle.save();
  }

  async update(id: string, article: UpdateArticleDto): Promise<Article> {
    return await this.userModel
      .findByIdAndUpdate(id, article, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Article> {
    return await this.userModel.findByIdAndRemove(id).exec();
  }
}

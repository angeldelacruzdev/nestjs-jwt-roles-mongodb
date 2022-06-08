import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './repository/article.repository';

@Injectable()
export class ArticlesService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async create(createArticleDto: CreateArticleDto) {
    return await this.articleRepository.create(createArticleDto);
  }

  async findAll() {
    return await this.articleRepository.findAll();
  }

  async findOne(id: string) {
    return await this.articleRepository.findOne(id);
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    return await this.articleRepository.update(id, updateArticleDto);
  }

  async remove(id: string) {
    return await this.articleRepository.delete(id);
  }
}

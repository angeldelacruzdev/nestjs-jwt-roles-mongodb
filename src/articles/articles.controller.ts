import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { AppAbility } from './../casl/casl-ability.factory';
import { CheckPolicies, GetCurrentUserId } from './../common/decorators';
import { PoliciesGuard } from './../common/guards';
import { Action } from './../enums';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Article))
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @GetCurrentUserId() userId: string,
  ) {
    createArticleDto.authorId = userId;
    createArticleDto.isPublished = true;
    return await this.articlesService.create(createArticleDto);
  }

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
  async findAll() {
    return await this.articlesService.findAll();
  }

  @Get(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
  async findOne(@Param('id') id: string) {
    return await this.articlesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Article))
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Article))
  async remove(@Param('id') id: string) {
    return await this.articlesService.remove(id);
  }
}

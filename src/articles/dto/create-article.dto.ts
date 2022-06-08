export class CreateArticleDto {
  title: string;
  body: string;
  tags: string[];
  authorId: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

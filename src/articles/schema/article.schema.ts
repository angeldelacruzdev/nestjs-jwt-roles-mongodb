import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './../../schemas/user.schema';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop([String])
  tags: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId: User;

  @Prop()
  isPublished: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

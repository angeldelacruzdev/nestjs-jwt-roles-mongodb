import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { RolesGuard } from './common/guards/roles.guard';
import { CaslModule } from './casl/casl.module';
import { ArticlesModule } from './articles/articles.module';
@Module({
  imports: [DataBaseModule, AuthModule, UsersModule, CaslModule, ArticlesModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule {}

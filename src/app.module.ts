import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import { RedisClient } from 'ioredis';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { LibrarianModule } from './librarian/librarian.module';
import { REDIS, RedisModule } from './redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot(),
    BooksModule,
    CategoriesModule,
    LibrarianModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(),
    },
  ],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(REDIS) private readonly redis: RedisClient,
    private configService: ConfigService,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            disableTouch: true,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: this.configService.get('COOKIE_SECRET'),
          resave: false,
          cookie: {
            maxAge: 1000 * 3600 * 24 * 365 * 10,
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
          },
        }),
      )
      .forRoutes('*');
  }
}

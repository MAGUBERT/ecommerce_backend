import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Módulos do seu projeto
import { CategoryModule } from './cases/categories/category.module';
import { BrandModule } from './cases/brands/brand.module';
import { ProductModule } from './cases/products/product.module';
import { CityModule } from './cases/cities/city.module';
import { CustomerModule } from './cases/customers/customer.module';
import { OrderModule } from './cases/orders/order.module';
import { FavoriteModule } from './cases/favorites/favorite.module';
import { ReviewModule } from './cases/reviews/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'src/.env'],
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,

      // Detecta SSL automaticamente (útil para Supabase) ou usa a variável SSL
      ssl: (process.env.SSL === 'true' || (process.env.DB_HOST && process.env.DB_HOST.includes('supabase.co')))
        ? { rejectUnauthorized: false }
        : false,
    }),

    CategoryModule,
    BrandModule,
    ProductModule,
    CityModule,
    CustomerModule,
    OrderModule,
    FavoriteModule,
    ReviewModule,
  ],
})
export class AppModule {}

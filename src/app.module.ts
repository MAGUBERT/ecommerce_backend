import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './cases/categories/category.module';
import { BrandModule } from './cases/brands/brand.module';
import { ProductModule } from './cases/products/product.module';
import { CustomerModule } from './cases/custumers/customer.module';
import { CityModule } from './cases/cities/modules/city.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-sa-east-1.pooler.supabase.com',
      port: +'5432',
      username: 'postgres.mnzbjdzmzhuxborzdtyc',
      password: '@Matheus0502@',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoryModule,
    BrandModule,
    ProductModule,
    CityModule,
    CustomerModule,
  ],
})
export class AppModule {}

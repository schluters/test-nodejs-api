import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

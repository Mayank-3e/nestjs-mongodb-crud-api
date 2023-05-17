import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';

@Module({
  imports:
  [
    ConfigModule.forRoot(),
    // ensure editing read write access in Mongodb Edit User in Database Access
    MongooseModule.forRoot(`mongodb+srv://${process.env.mongodb_user}:${process.env.mongopwd}@cluster0.szwbefi.mongodb.net/nestjs-demo?retryWrites=true&w=majority`),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
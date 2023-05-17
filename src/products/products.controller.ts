import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController
{
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct
  (
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  )
  {
    const generatedId =await this.productsService.insertProduct(title,description,price);
    return { id: generatedId };
  }

  @Get()
  async getAllProducts()
  {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string)
  {
    return await this.productsService.getSingleProduct(id);
  }

  @Patch(':id')
  async updateProduct
  (
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number
  )
  {
    await this.productsService.updateProduct(id,title,description,price);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string)
  {
    await this.productsService.deleteProduct(id);
  }
}

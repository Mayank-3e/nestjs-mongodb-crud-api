import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService
{
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async insertProduct(title: string, description: string, price: number)
  {
    const product = new this.productModel({title, description, price});
    const result=await product.save()
    return result.id as string;
  }

  async getProducts()
  {
    const products=await this.productModel.find().exec()
    return products.map(prod=>(
      {id: prod.id, title: prod.title, description: prod.description, price: prod.price}))
  }

  async getSingleProduct(id: string)
  {
    const product=await this.findProduct(id);
    return {id: product.id, title: product.title, description: product.description, price: product.price}
  }

  async updateProduct(id: string, title: string, description: string, price: number)
  {
    const product=await this.findProduct(id);
    if(title) product.title=title
    if(description) product.description=description
    if(price) product.price=price
    await product.save()
  }

  async deleteProduct(id: string)
  {
    try
    {
      await this.productModel.findByIdAndDelete(id).exec()
    }
    catch(err)
    {
      throw new Error('Internal server error')
    }
  }

  private async findProduct(id: string)
  {
    let product: Product
    try { product=await this.productModel.findById(id).exec() }
    catch(err)
    {
      throw new NotFoundException('Inavlid id.')
    }
    return product
  }
}

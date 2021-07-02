import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { EntityNotFoundError } from '../errors/entity-not-found.error';
import { EntityAlreadyExistsError } from '../errors/entity-already-exists.error';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(createProductDto: CreateProductDto) {
    const product = this.products.find(
      product => product?.sku === createProductDto.sku,
    );
    const newProduct: Product = {
      ...createProductDto,
    };
    if (product) {
      throw new EntityAlreadyExistsError(
        `Product with sku #${createProductDto.sku} already exists.`,
      );
    } else {
      this.products.push(newProduct);
    }
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(sku: number) {
    const product = this.products.find(product => product.sku === sku);
    if (!product) {
      throw new EntityNotFoundError(`Product with sku #${sku} was not found.`);
    } else {
      product.inventory.quantity = product.inventory.warehouses.reduce(
        (a, b) => a + b.quantity,
        0,
      );
      product.isMarketable = product.inventory.quantity > 0;
    }
    return product;
  }

  update(sku: number, updateProductDto: UpdateProductDto) {
    const product = this.findOne(sku);
    const newProduct: Product = {
      ...product,
      ...updateProductDto,
    };
    const index = this.products.indexOf(product);
    this.products[index] = newProduct;
    return newProduct;
  }

  remove(sku: number) {
    const product = this.findOne(sku);
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }
}

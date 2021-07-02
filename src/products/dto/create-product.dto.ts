import { IsNumber, IsObject, IsString } from "class-validator";
import { Product } from "../entities/product.entity";
export class warehousesDto {
  @IsString()
  locality: string;
  @IsNumber()
  quantity: number;
  @IsString()
  type: string;
}
export class CreateProductDto extends Product {
  @IsNumber()
  sku: number;
  @IsString()
  name: string;
  @IsObject()
  inventory: {
    warehouses: [warehousesDto];
  };
}

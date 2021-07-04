export class warehouses {
  locality: string;
  quantity: number;
  type: string;
}

export class Product {
  sku: number;
  name: string;
  inventory: {
    quantity?: number;
    warehouses: [warehouses];
  };
  isMarketable?: boolean;
}

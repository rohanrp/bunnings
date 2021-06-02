import { ProductSource } from './product-source.model';
import { CatalogueProduct } from './catalogue-product.interface';
import { ProductInventory } from './product-inventory.model';

export interface CatalogerService {
    addToInventory: (sourceList: ProductInventory, source: ProductSource) => CatalogueProduct[]; 
}
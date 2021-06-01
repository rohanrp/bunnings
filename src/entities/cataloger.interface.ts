import { ProductSource } from './product-source.model';
import { CatalogueProduct } from './catalogue-product.interface';

export interface CatalogerService {
    addToInventory: (source: ProductSource) => CatalogueProduct[]; 
}
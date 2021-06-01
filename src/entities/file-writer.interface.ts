import { CatalogueProduct } from './catalogue-product.interface';
export interface FileWriterService {
    logCatalogue(inventory: CatalogueProduct[], outputFolder: string): Promise<void>
}
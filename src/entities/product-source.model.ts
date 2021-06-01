import { ProductBarcodeItem } from './product-barcode-item.model';
import { ProductCatalogItem } from './product-catalog-item.model';
import { ProductSupplier } from './product-supplier.model';

export class ProductSource {
    public barcodes: ProductBarcodeItem[];
    public catalogItems: ProductCatalogItem[];
    public suppliers: ProductSupplier[];
    public id: string = Math.random().toString(36).substr(2, 9);

    constructor(public name: string) {}

    setInventory(barcodes: ProductBarcodeItem[], catalogItems: ProductCatalogItem[], suppliers: ProductSupplier[]): void {
        this.barcodes = barcodes;
        this.catalogItems = catalogItems;
        this.suppliers = suppliers;
    }
}


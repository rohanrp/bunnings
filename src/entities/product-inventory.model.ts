import { CatalogueProduct } from './catalogue-product.interface';
import { ProductSource } from './product-source.model';

export class ProductInventory {
    public sourceList: SourceState = {};
	public barcodeList: CatalogueBarcode = {};
	public productList: Set<CatalogueProduct> = new Set<CatalogueProduct>();
}


export interface SourceState {
	[sourceId: string]: {
		source: ProductSource,
		suppliers: Suppliers,
	}
}

export interface Suppliers {
	[supplierID: string]: Supplier
}

export interface Supplier {
	supplierName: string;
	catalog: SupplierCatalog;
}

export interface SupplierCatalog {
	[productSKU: string]: CatalogueProduct
}

export interface CatalogueProductInventoryItem{
	suppliers: Set<Supplier>,
	sources: Set<ProductSource>,
	product: CatalogueProduct,
}

export interface CatalogueBarcode {
	[barcodeId: string]: CatalogueProductInventoryItem
}
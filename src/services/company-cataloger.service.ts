import { injectable } from "inversify";
import { CatalogerService } from '../entities/cataloger.interface';
import { ProductSource } from '../entities/product-source.model';
import { CatalogueProduct } from '../entities/catalogue-product.interface';

@injectable()
export class CompanyCatalogerService implements CatalogerService {
	private sourceList: SourceState = {};
	private barcodeList: CatalogueBarcode = {};
	private productList: Set<CatalogueProduct> = new Set<CatalogueProduct>();

	public addToInventory(source: ProductSource): CatalogueProduct[] {
		this.sourceList[source.id] = {source, suppliers: {}};
		const sourceRef = this.sourceList[source.id];

		source.suppliers.forEach(supplier => {
			sourceRef.suppliers[supplier.id] = {supplierName: supplier.name, catalog: {}}
		});

		
		source.barcodes.forEach(barcodeItem => {
			const getDescriptionBySKU =  (sku: string): string => source.catalogItems.find(item => item.sku === sku)?.description || "";
			
			const supplier: Supplier = sourceRef.suppliers[barcodeItem.supplierID] = sourceRef.suppliers[barcodeItem.supplierID] || {};
			const product: CatalogueProduct = supplier.catalog[barcodeItem.sku] = supplier.catalog[barcodeItem.sku] || {};

			product.description = product.description || getDescriptionBySKU(barcodeItem.sku);
			product.barcodes = [...(product.barcodes || []), barcodeItem.barcode];
			product.sku = product.sku || barcodeItem.sku;
			product.source = product.source || source.name;

			const inventoryItem: CatalogueProductInventoryItem = this.barcodeList[barcodeItem.barcode] = this.barcodeList[barcodeItem.barcode] || {};
			inventoryItem.suppliers = inventoryItem.suppliers || new Set<Suppliers>();
			inventoryItem.suppliers.add(supplier);

			inventoryItem.sources = inventoryItem.sources  || new Set<ProductSource>();
			inventoryItem.sources.add(source);

			inventoryItem.product = inventoryItem.product || product;
			this.productList.add(inventoryItem.product);
		});
		return Array.from(this.productList);	
	}
}


interface SourceState {
	[sourceId: string]: {
		source: ProductSource,
		suppliers: Suppliers,
	}
}

interface Suppliers {
	[supplierID: string]: Supplier
}

interface Supplier {
	supplierName: string;
	catalog: SupplierCatalog;
}

interface SupplierCatalog {
	[productSKU: string]: CatalogueProduct
}

interface CatalogueProductInventoryItem{
	suppliers: Set<Supplier>,
	sources: Set<ProductSource>,
	product: CatalogueProduct,
}

interface CatalogueBarcode {
	[barcodeId: string]: CatalogueProductInventoryItem
}
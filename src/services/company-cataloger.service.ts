import { injectable } from "inversify";
import { CatalogerService } from '../entities/cataloger.interface';
import { ProductSource } from '../entities/product-source.model';
import { CatalogueProduct } from '../entities/catalogue-product.interface';
import { ProductInventory, Supplier, CatalogueProductInventoryItem, Suppliers } from '../entities/product-inventory.model';

@injectable()
export class CompanyCatalogerService implements CatalogerService {

	public addToInventory(sourceList: ProductInventory, source: ProductSource): CatalogueProduct[] {
		sourceList.sourceList[source.id] = {source, suppliers: {}};
		const sourceRef = sourceList.sourceList[source.id];

		source.suppliers.forEach(supplier => {
			sourceRef.suppliers[supplier.id] = {supplierName: supplier.name, catalog: {}}
		});

		
		source.barcodes.forEach(barcodeItem => {
			const getDescriptionBySKU =  (sku: string): string => source.catalogItems.find(item => item.sku === sku)?.description || "";
			
			const supplier: Supplier = sourceRef.suppliers[barcodeItem.supplierID] = sourceRef.suppliers[barcodeItem.supplierID] || {};
			

			const inventoryItem: CatalogueProductInventoryItem = sourceList.barcodeList[barcodeItem.barcode] = sourceList.barcodeList[barcodeItem.barcode] || {};
			if (!inventoryItem.product) {
				const product: CatalogueProduct = supplier.catalog[barcodeItem.sku] = supplier.catalog[barcodeItem.sku] || {};

				product.description = product.description || getDescriptionBySKU(barcodeItem.sku);
				product.barcodes = [...(product.barcodes || []), barcodeItem.barcode];
				product.sku = product.sku || barcodeItem.sku;
				product.source = product.source || source.name;

				inventoryItem.suppliers = inventoryItem.suppliers || new Set<Suppliers>();
				inventoryItem.suppliers.add(supplier);

				inventoryItem.sources = inventoryItem.sources  || new Set<ProductSource>();
				inventoryItem.sources.add(source);

				inventoryItem.product = product;
			}
			
			sourceList.productList.add(inventoryItem.product);
		});
		return Array.from(sourceList.productList);	
	}
}


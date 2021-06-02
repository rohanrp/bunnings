
import container from "../config/ioc-config";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import { ProductCatalogItem } from '../entities/product-catalog-item.model';
import { ProductSource } from '../entities/product-source.model';
import { ProductSupplier } from '../entities/product-supplier.model';
import { ProductBarcodeItem } from '../entities/product-barcode-item.model';
import { CatalogerService } from '../entities/cataloger.interface';
import { ProductInventory } from '../entities/product-inventory.model';

const cataloger = container.get<CatalogerService>(SERVICE_IDENTIFIER.CATALOGER);

describe('CompanyCatalogerService', () => {
	const catalogueItems: ProductCatalogItem[] = [];
	const barCodeItems: ProductBarcodeItem[] = [];
	const supplierItems: ProductSupplier[] = [];

	let sourceA: ProductSource;
	let sourceB: ProductSource;

	beforeEach(() => {
		catalogueItems.length = 0;
		barCodeItems.length = 0;
		supplierItems.length = 0;
		sourceA = new ProductSource("A");
		sourceB = new ProductSource("B");
	})

	it('can add to inventory', async () => {

		const supplier1 = new ProductSupplier();
		supplier1.id = "supp1";
		supplier1.name = "supp 1";
		supplierItems.push(supplier1);

		const supplier2 = new ProductSupplier();
		supplier2.id = "supp2";
		supplier2.name = "supp 2";
		supplierItems.push(supplier2);

		const catalogueItemA = new ProductCatalogItem();
		catalogueItemA.source = sourceA;
		catalogueItemA.description = "description1";
		catalogueItemA.sku = "sku1";
		catalogueItems.push(catalogueItemA);

		const catalogueItemB = new ProductCatalogItem();
		catalogueItemB.source = sourceA;
		catalogueItemB.description = "description2";
		catalogueItemB.sku = "sku2";
		catalogueItems.push(catalogueItemB);

		const catalogueItemC = new ProductCatalogItem();
		catalogueItemC.source = sourceB;
		catalogueItemC.description = "description3";
		catalogueItemC.sku = catalogueItemB.sku;

		const barCodeItemA1: ProductBarcodeItem = new ProductBarcodeItem();
		barCodeItemA1.barcode = "b1";
		barCodeItemA1.sku = catalogueItemA.sku;
		barCodeItemA1.source = catalogueItemA.source;
		barCodeItemA1.supplierID = supplier1.id;
		barCodeItems.push(barCodeItemA1);

		const barCodeItemA2: ProductBarcodeItem = new ProductBarcodeItem();
		barCodeItemA2.barcode = "b2";
		barCodeItemA2.sku = catalogueItemA.sku;
		barCodeItemA2.source = catalogueItemA.source;
		barCodeItemA2.supplierID = supplier1.id;
		barCodeItems.push(barCodeItemA2);

		const barCodeItemA3: ProductBarcodeItem = new ProductBarcodeItem();
		barCodeItemA3.barcode = "b3";
		barCodeItemA3.sku = catalogueItemB.sku;
		barCodeItemA3.source = catalogueItemB.source;
		barCodeItemA3.supplierID = supplier2.id;
		barCodeItems.push(barCodeItemA3);

		const barCodeItemA4: ProductBarcodeItem = new ProductBarcodeItem();
		barCodeItemA4.barcode = barCodeItemA1.barcode;
		barCodeItemA4.sku = "random";
		barCodeItemA4.source = catalogueItemB.source;
		barCodeItemA4.supplierID = supplier2.id;
		barCodeItems.push(barCodeItemA4);

		const barCodeItemA5: ProductBarcodeItem = new ProductBarcodeItem();
		barCodeItemA5.barcode = "random";
		barCodeItemA5.sku = barCodeItemA3.sku;
		barCodeItemA5.source = sourceB;
		barCodeItemA5.supplierID = supplier1.id;

		sourceA.setInventory(barCodeItems, catalogueItems, supplierItems);
		sourceB.setInventory([barCodeItemA5], [catalogueItemC], supplierItems);

		const inventory = new ProductInventory();
		cataloger.addToInventory(inventory, sourceA);
		const catalogue = cataloger.addToInventory(inventory, sourceB);

		expect(JSON.parse(JSON.stringify(catalogue))).toEqual([
			{
				description: "description1",
				barcodes: ["b1", "b2"],
				sku: "sku1",
				source: "A",
			},
			{
				description: "description2",
				barcodes: ["b3"],
				sku: "sku2",
				source: "A",
			},
			{
				barcodes: [
				  "random",
				],
				description: "description3",
				sku: "sku2",
				source: "B",
			}
    	]);
	})
})



import container from "../config/ioc-config";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import { FileReaderService } from "../entities/file-reader.interface";
import { ProductCatalogItem } from '../entities/product-catalog-item.model';
import { ProductSource } from '../entities/product-source.model';
import { ProductSupplier } from '../entities/product-supplier.model';
import { ProductBarcodeItem } from '../entities/product-barcode-item.model';

const reader = container.get<FileReaderService>(SERVICE_IDENTIFIER.FILE_READER);

describe('CSVReaderService', () => {

	it('parse a catalogue file', async () => {
		const folder ="test", source = new ProductSource("A"), fileName = "B";

		reader.readFile = jest.fn(() => Promise.resolve([
			{
				"SKU": "647-vyk-317",
				"Description": "Walkers Special Old Whiskey",
			},
			{
				"SKU": "280-oad-768",
				"Description": "Bread - Raisin",
			},
		]));
		const items: ProductCatalogItem[] = await reader.getLineItems<ProductCatalogItem>(folder, source, fileName, () => new ProductCatalogItem());
		expect(items.length).toEqual(2);
		expect(items[0].sku).toEqual('647-vyk-317');
		expect(items[0].description).toEqual('Walkers Special Old Whiskey');
	});


	it('parse a barcode file', async () => {
		const folder ="test", source = new ProductSource("A"), fileName = "B";

		reader.readFile = jest.fn(() => Promise.resolve([
			{
				"SupplierID": "00001",
				"SKU": "647-vyk-317",
				"Barcode": "z2783613083817"
			},
			{
				"SupplierID": "00001",
				"SKU": "647-vyk-317",
				"Barcode": "z2783613083817"
			},
		]));

		const items: ProductBarcodeItem[] = await reader.getLineItems<ProductBarcodeItem>(folder, source, fileName, () => new ProductBarcodeItem());
		expect(items.length).toEqual(2);
		expect(items[0].supplierID).toEqual('00001');
		expect(items[0].sku).toEqual('647-vyk-317');
		expect(items[0].barcode).toEqual('z2783613083817');
	});

	it('parse a supplier file', async () => {
		const folder ="test", source = new ProductSource("A"), fileName = "B";

		reader.readFile = jest.fn(() => Promise.resolve([
			{
				"ID": "00001",
				"Name": "Twitterbridge",
			},
			{
				"ID": "00002",
				"Name": "Thoughtsphere",
			},
		]));

		const items: ProductSupplier[] = await reader.getLineItems<ProductSupplier>(folder, source, fileName, () => new ProductSupplier());
		expect(items.length).toEqual(2);
		expect(items[0].id).toEqual('00001');
		expect(items[0].name).toEqual('Twitterbridge');
	});
})


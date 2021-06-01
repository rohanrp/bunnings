
import container from "./config/ioc-config";
import { FileReaderService } from "./entities";
import SERVICE_IDENTIFIER from "./constants/identifiers";
import { ProductBarcodeItem } from './entities/product-barcode-item.model';
import { ProductCatalogItem } from './entities/product-catalog-item.model';
import { ProductSupplier } from './entities/product-supplier.model';
import { CatalogerService } from './entities/cataloger.interface';
import { ProductSource } from './entities/product-source.model';
import { CatalogueProduct } from './entities/catalogue-product.interface';
import { FileWriterService } from './entities/file-writer.interface';

const reader = container.get<FileReaderService>(SERVICE_IDENTIFIER.FILE_READER);
const cataloger = container.get<CatalogerService>(SERVICE_IDENTIFIER.CATALOGER);
const writer = container.get<FileWriterService>(SERVICE_IDENTIFIER.FILE_WRITER);

const barcodeFilename: string = 'barcodes';
const catalogFilename: string = 'catalog';
const supplierFilename: string = 'suppliers';
const companies = ['A', 'B' ];
const folder = "input";
const outputFolder = "output";

(async function main() {
await companies
  .map((company: string) => new ProductSource(company))
  .map(async (source: ProductSource) => {
    source.setInventory(
      await reader.getLineItems<ProductBarcodeItem>(folder, source, barcodeFilename, () => new ProductBarcodeItem()),
      await reader.getLineItems<ProductCatalogItem>(folder, source, catalogFilename, () => new ProductCatalogItem()),
      await reader.getLineItems<ProductSupplier>(folder, source, supplierFilename, () => new ProductSupplier()),
    )
    return source;
  })
  .forEach(async (source, index) => {
    const inventoryList: CatalogueProduct[] = cataloger.addToInventory(await source);

    if(index === companies.length - 1) {
      writer.logCatalogue(inventoryList, outputFolder);
    }
  })
  
})();


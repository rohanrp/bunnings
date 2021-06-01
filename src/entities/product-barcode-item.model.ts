import { RawCSVLineItem } from './raw-csv-line-item.interface';
import { ProductSource } from './product-source.model';

export class ProductBarcodeItem implements RawCSVLineItem {
	supplierID: string;
    sku: string;
    barcode: string;
    source: ProductSource;

    parseJSON(json: {SupplierID?: string, SKU?: string, Barcode?: string}): void {
        let parseError: boolean = false;
        if (json.hasOwnProperty("SupplierID")) {
            this.supplierID = String(json.SupplierID);
        } else {
            parseError = true;
        }
        if (json.hasOwnProperty("SKU")) {
            this.sku = String(json.SKU);
        } else {
            parseError = true;
        }
        if (json.hasOwnProperty("Barcode")) {
            this.barcode = String(json.Barcode);
        } else {
            parseError = true;
        }

        if (parseError) {
            throw new Error("Unable to parse JSON")
        }
    }
}